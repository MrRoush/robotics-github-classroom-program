/**
 * LocalBridge — WebSocket client for the local Python bridge server.
 *
 * Connects to ws://127.0.0.1:5000 via Socket.IO.
 * Provides connect / disconnect / runCode / stopCode helpers consumed by app.js.
 *
 * SECURITY NOTE: GitHub tokens are never sent to or through this bridge.
 * All GitHub API calls remain client-side in github-api.js.
 *
 * MIXED CONTENT NOTE:
 * Modern browsers (Chrome, Firefox) allow an HTTPS page to open a WebSocket
 * to 127.0.0.1 because localhost is treated as a "secure context".
 * The bridge server also sends Access-Control-Allow-Private-Network: true
 * to satisfy Chrome's Private Network Access preflight checks.
 */

const LocalBridge = (() => {
  let _socket = null;
  let _connected = false;

  // Callbacks registered by the caller
  let _onStatus = null;
  let _onOutput = null;
  let _onDone   = null;

  const BRIDGE_URL = 'http://127.0.0.1:5000';

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Connect to the local bridge server.
   *
   * @param {object} callbacks
   * @param {function} callbacks.onStatus  Called with { connected, message?, error? }
   * @param {function} callbacks.onOutput  Called with { stream, data } ('stdout'|'stderr'|'info')
   * @param {function} callbacks.onDone    Called with { returncode }
   */
  const connect = (callbacks = {}) => {
    _onStatus = callbacks.onStatus || (() => {});
    _onOutput = callbacks.onOutput || (() => {});
    _onDone   = callbacks.onDone   || (() => {});

    // Tear down any previous connection first
    if (_socket) {
      _socket.disconnect();
      _socket = null;
    }

    // io() is provided by the Socket.IO v4 CDN script loaded in index.html.
    _socket = io(BRIDGE_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    _socket.on('connect', () => {
      _connected = true;
      _onStatus({ connected: true });
    });

    _socket.on('connect_error', (err) => {
      _connected = false;
      _onStatus({ connected: false, error: err.message });
    });

    _socket.on('disconnect', () => {
      _connected = false;
      _onStatus({ connected: false });
    });

    _socket.on('status', (data) => {
      // Informational status message from the server
      _onStatus({ connected: _connected, message: data.message });
    });

    _socket.on('output', (data) => {
      _onOutput(data);
    });

    _socket.on('done', (data) => {
      _onDone(data);
    });

    // Ignore heartbeat pongs silently
    _socket.on('pong', () => {});
  };

  /**
   * Disconnect from the bridge.
   */
  const disconnect = () => {
    if (_socket) {
      _socket.disconnect();
      _socket = null;
    }
    _connected = false;
  };

  /**
   * Send a Python code string to the bridge for execution.
   *
   * @param {string} code  The Python source code to run.
   * @param {string} port  The robot's COM/serial port (e.g. 'COM3' or '/dev/ttyUSB0').
   */
  const runCode = (code, port = 'COM3') => {
    if (!_connected || !_socket) {
      throw new Error('Not connected to the local bridge.');
    }
    _socket.emit('run_code', { code, port });
  };

  /**
   * Ask the bridge to terminate the currently running subprocess.
   */
  const stopCode = () => {
    if (_socket) {
      _socket.emit('stop_code');
    }
  };

  /** Returns true when the WebSocket connection is established. */
  const isConnected = () => _connected;

  // -------------------------------------------------------------------------
  return { connect, disconnect, runCode, stopCode, isConnected };
})();
