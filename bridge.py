#!/usr/bin/env python3
"""
Local WebServer Bridge — Robotics Classroom Program
====================================================
Run this script on the same computer the Dobot is plugged into.
The browser IDE will connect via WebSocket and send Python code to execute.

Usage
-----
  python bridge.py          # auto-installs dependencies on first run
  # — OR —
  Double-click start_bridge.bat (Windows) / start_bridge.sh (macOS/Linux)

Then open the web IDE and click "Connect to Bridge".

Security notes
--------------
* Only binds to 127.0.0.1 (localhost) — not reachable from outside your PC.
* Does NOT receive, store, or forward GitHub tokens.
* Code is executed with the same OS user privileges as this script.
  Only run code that you have written yourself.
"""

import os
import sys
import subprocess
import tempfile
import threading

# ---------------------------------------------------------------------------
# Auto-install missing dependencies
# ---------------------------------------------------------------------------
# This allows students to run `python bridge.py` directly without a separate
# `pip install` step — helpful in school environments where terminal access
# or admin privileges may be restricted.

_REQUIRED_PACKAGES = [
    ('flask', 'flask>=2.3'),
    ('flask_socketio', 'flask-socketio>=5.3'),
    ('simple_websocket', 'simple-websocket'),
]


def _ensure_dependencies():
    """Check for required packages and install any that are missing."""
    missing = []
    for import_name, pip_name in _REQUIRED_PACKAGES:
        try:
            __import__(import_name)
        except ImportError:
            missing.append(pip_name)

    if not missing:
        return  # everything is already installed

    print('[bridge] Installing missing dependencies:', ', '.join(missing))

    # Determine the bridge directory for a local venv
    bridge_dir = os.path.dirname(os.path.abspath(__file__))
    venv_dir = os.path.join(bridge_dir, '.bridge_venv')

    # Strategy 1: Use a local virtual environment (no admin rights needed)
    if not os.path.isdir(venv_dir):
        print(f'[bridge] Creating virtual environment in {venv_dir} ...')
        try:
            import venv
            venv.create(venv_dir, with_pip=True)
        except Exception as exc:
            print(f'[bridge] Could not create venv ({exc}), trying --user install ...')
            _pip_install_user(missing)
            return

    # Determine the venv Python executable
    if sys.platform == 'win32':
        venv_python = os.path.join(venv_dir, 'Scripts', 'python.exe')
    else:
        venv_python = os.path.join(venv_dir, 'bin', 'python')

    # Install into the venv
    try:
        subprocess.check_call(
            [venv_python, '-m', 'pip', 'install', '--quiet'] + missing,
        )
        print('[bridge] Dependencies installed successfully into local venv.')
    except Exception as exc:
        print(f'[bridge] venv pip install failed ({exc}), trying --user install ...')
        _pip_install_user(missing)
        return

    # Re-launch this script inside the venv so imports resolve correctly
    print('[bridge] Restarting inside the virtual environment ...')
    os.execv(venv_python, [venv_python] + sys.argv)


def _pip_install_user(packages):
    """Fallback: install packages with --user flag (no admin required)."""
    try:
        subprocess.check_call(
            [sys.executable, '-m', 'pip', 'install', '--user', '--quiet'] + packages,
        )
        print('[bridge] Dependencies installed with --user flag.')
    except Exception as exc:
        print(f'[bridge] ❌ Could not install dependencies: {exc}')
        print('[bridge]    Try manually: pip install flask flask-socketio simple-websocket')
        sys.exit(1)


_ensure_dependencies()

from flask import Flask                         # noqa: E402
from flask_socketio import SocketIO, emit       # noqa: E402

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)

socketio = SocketIO(
    app,
    cors_allowed_origins='*',       # Required so GitHub Pages (HTTPS) can connect
    async_mode='threading',
    logger=False,
    engineio_logger=False,
)

# Track the currently running subprocess so we can terminate it on request.
_running_proc = None
_proc_lock = threading.Lock()


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

@app.after_request
def _add_cors_headers(response):
    """
    Allow cross-origin requests from an HTTPS GitHub Pages host.

    Chrome's Private Network Access policy blocks HTTPS→localhost requests
    unless the server explicitly opts in via these headers.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Private-Network'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = (
        'Content-Type, Access-Control-Request-Private-Network'
    )
    return response


@app.route('/health')
def health():
    """Simple health-check endpoint so the UI can detect the bridge."""
    return {'status': 'ok', 'bridge': 'robotics-classroom'}


# ---------------------------------------------------------------------------
# WebSocket events
# ---------------------------------------------------------------------------

@socketio.on('connect')
def on_connect():
    emit('status', {'connected': True, 'message': 'Bridge ready'})
    print('[bridge] Client connected')


@socketio.on('disconnect')
def on_disconnect():
    print('[bridge] Client disconnected')


@socketio.on('ping')
def on_ping():
    emit('pong', {'ok': True})


@socketio.on('run_code')
def on_run_code(data):
    """
    Receive a Python code string from the browser, write it to a temporary
    file, execute it in a subprocess, and stream stdout/stderr back.
    """
    global _running_proc

    code = data.get('code', '').strip()
    port = data.get('port', 'COM3')

    if not code:
        emit('output', {'stream': 'stderr', 'data': 'No code received.\n'})
        emit('done', {'returncode': 1})
        return

    # Directory where bridge.py (and dobot_wrapper/) lives.  We add it to
    # PYTHONPATH so the subprocess can ``from dobot_wrapper import …`` even
    # though the temp script is written to the OS temp directory.
    bridge_dir = os.path.dirname(os.path.abspath(__file__))

    # Pass the configured serial port to the child process via the environment
    # so dobot_wrapper can find it without the user having to edit the code.
    env = os.environ.copy()
    env['DOBOT_DEFAULT_PORT'] = port

    # Force UTF-8 encoding so emojis and special characters print correctly on
    # Windows (which otherwise defaults to cp1252).
    env['PYTHONIOENCODING'] = 'utf-8'

    # Prepend the bridge directory so dobot_wrapper is importable.
    existing = env.get('PYTHONPATH', '')
    env['PYTHONPATH'] = bridge_dir + (os.pathsep + existing if existing else '')

    # Write code to a temp file instead of using -c to avoid quoting problems
    # with multi-line code and to give the subprocess a proper __file__ path.
    try:
        tmp = tempfile.NamedTemporaryFile(
            mode='w', suffix='.py', delete=False, encoding='utf-8'
        )
        tmp.write(code)
        tmp_path = tmp.name
        tmp.close()
    except OSError as exc:
        emit('output', {'stream': 'stderr', 'data': f'Could not write temp file: {exc}\n'})
        emit('done', {'returncode': 1})
        return

    emit('output', {'stream': 'info', 'data': '▶ Running program...\n'})

    def _stream():
        global _running_proc
        returncode = 1
        try:
            proc = subprocess.Popen(
                [sys.executable, tmp_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                env=env,
                cwd=bridge_dir,
            )
            with _proc_lock:
                _running_proc = proc

            def _read_pipe(pipe, stream_name):
                for line in iter(pipe.readline, ''):
                    socketio.emit('output', {'stream': stream_name, 'data': line})
                pipe.close()

            t_out = threading.Thread(
                target=_read_pipe, args=(proc.stdout, 'stdout'), daemon=True
            )
            t_err = threading.Thread(
                target=_read_pipe, args=(proc.stderr, 'stderr'), daemon=True
            )
            t_out.start()
            t_err.start()
            t_out.join()
            t_err.join()

            proc.wait()
            returncode = proc.returncode

        except Exception as exc:
            socketio.emit('output', {'stream': 'stderr', 'data': f'Bridge error: {exc}\n'})

        finally:
            with _proc_lock:
                _running_proc = None
            try:
                os.unlink(tmp_path)
            except OSError:
                pass
            socketio.emit('done', {'returncode': returncode})

    threading.Thread(target=_stream, daemon=True).start()


@socketio.on('stop_code')
def on_stop_code():
    """Terminate the currently running subprocess."""
    _stop_running()
    emit('output', {'stream': 'info', 'data': '⏹ Stopped by user.\n'})
    emit('done', {'returncode': -15})    # -15 matches SIGTERM convention


def _stop_running():
    global _running_proc
    with _proc_lock:
        if _running_proc and _running_proc.poll() is None:
            _running_proc.terminate()
            try:
                _running_proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                _running_proc.kill()
            _running_proc = None


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == '__main__':
    print('=' * 52)
    print('  Robotics Classroom — Local Bridge')
    print('  Listening on  http://127.0.0.1:5000')
    print('  Press Ctrl+C to stop')
    print('=' * 52)
    socketio.run(app, host='127.0.0.1', port=5000, debug=False)
