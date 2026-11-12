@echo off
setlocal
cd /d "%~dp0"

set "NODE_EXE=C:\Program Files\nodejs\node.exe"
if not exist "%NODE_EXE%" (
    for %%I in (node.exe) do set "NODE_EXE=%%~$PATH:I"
)

if "%NODE_EXE%"=="" (
    echo [ERROR] No se encontro Node.js. Instalalo o revisa la ruta C:\Program Files\nodejs\node.exe
    pause
    exit /b 1
)

if not exist "%~dp0pokemon-showdown\dist\sim\dex.js" (
    echo Primera ejecucion detectada: compilando el servidor Backend...
    pushd "%~dp0pokemon-showdown"
    "%NODE_EXE%" build
    popd
)

echo Iniciando servidor Backend de Pokemon Z (puerto 8000)...
start "Pokemon Z - Backend (8000)" cmd /k ""%NODE_EXE%" "%~dp0pokemon-showdown\pokemon-showdown" start --skip-build"

echo Iniciando servidor Cliente Web de Pokemon Z (puerto 8080)...
start "Pokemon Z - Cliente Web (8080)" cmd /k ""%NODE_EXE%" "%~dp0serve_client.js""

echo Esperando a que arranquen los servidores...
timeout /t 2 /nobreak >nul

echo Abriendo http://localhost:8080 en el navegador...
start "" "http://localhost:8080"

endlocal
