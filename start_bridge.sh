#!/usr/bin/env bash
# ================================================================
# Robotics Classroom — One-Click Bridge Launcher (macOS / Linux)
# ================================================================
# Run this script (or double-click it) to start the local Python
# bridge.  It will automatically set up a virtual environment and
# install all required dependencies — no terminal commands needed.
#
# Requirements: Python 3.8+ must be installed on this computer.
#   macOS:  brew install python3   (or download from python.org)
#   Linux:  sudo apt install python3 python3-venv
# ================================================================

set -e

echo "===================================================="
echo "  Robotics Classroom — Bridge Launcher"
echo "===================================================="
echo ""

# ---- Locate Python ----
PYTHON_CMD=""
for cmd in python3 python; do
    if command -v "$cmd" &>/dev/null; then
        PYTHON_CMD="$cmd"
        break
    fi
done

if [ -z "$PYTHON_CMD" ]; then
    echo "[ERROR] Python was not found on this computer."
    echo ""
    echo "  macOS:  brew install python3"
    echo "  Linux:  sudo apt install python3 python3-venv"
    echo "  Or download from: https://www.python.org/downloads/"
    echo ""
    read -rp "Press Enter to exit..."
    exit 1
fi

echo "[OK] Found Python: $PYTHON_CMD"

# ---- Change to the directory containing this script ----
cd "$(dirname "$0")"

# ---- Launch bridge.py (it handles venv + deps automatically) ----
echo "[OK] Starting the bridge server..."
echo ""
"$PYTHON_CMD" bridge.py

# ---- If bridge exits, keep the terminal open so the user can see errors ----
echo ""
echo "===================================================="
echo "  Bridge has stopped."
echo "  Close this window or press Enter to exit."
echo "===================================================="
read -rp "Press Enter to exit..."
