@echo off
:: ================================================================
:: Robotics Classroom — One-Click Bridge Launcher (Windows)
:: ================================================================
:: Double-click this file to start the local Python bridge.
:: It will automatically set up a virtual environment and install
:: all required dependencies — no terminal commands needed.
::
:: Requirements: Python 3.8+ must be installed on this computer.
::   Download from https://www.python.org/downloads/ if needed.
:: ================================================================

title Robotics Classroom — Bridge Launcher

echo ====================================================
echo   Robotics Classroom - Bridge Launcher
echo ====================================================
echo.

:: ---- Locate Python ----
where python >nul 2>&1
if %errorlevel%==0 (
    set "PYTHON_CMD=python"
    goto :found_python
)
where python3 >nul 2>&1
if %errorlevel%==0 (
    set "PYTHON_CMD=python3"
    goto :found_python
)
where py >nul 2>&1
if %errorlevel%==0 (
    set "PYTHON_CMD=py"
    goto :found_python
)

echo [ERROR] Python was not found on this computer.
echo.
echo   Please install Python 3.8 or newer:
echo   https://www.python.org/downloads/
echo.
echo   IMPORTANT: During installation, check the box that says
echo   "Add Python to PATH"
echo.
pause
exit /b 1

:found_python
echo [OK] Found Python: %PYTHON_CMD%

:: ---- Change to the directory containing this script ----
cd /d "%~dp0"

:: ---- Launch bridge.py (it handles venv + deps automatically) ----
echo [OK] Starting the bridge server...
echo.
%PYTHON_CMD% bridge.py

:: ---- If bridge exits, keep the window open so the user can see errors ----
echo.
echo ====================================================
echo   Bridge has stopped.
echo   Close this window or press any key to exit.
echo ====================================================
pause >nul
