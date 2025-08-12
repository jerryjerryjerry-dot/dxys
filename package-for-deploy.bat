@echo off
chcp 65001 >nul
echo 🚀 项目打包部署脚本
echo ========================

set "PROJECT_NAME=traffic-security-app"
set "DEPLOY_DIR=%PROJECT_NAME%-deploy"

echo.
echo 📁 创建部署目录...
if exist "%DEPLOY_DIR%" (
    echo 删除旧的部署目录...
    rmdir /s /q "%DEPLOY_DIR%"
)
mkdir "%DEPLOY_DIR%"

echo.
echo 📋 复制核心文件...

:: 复制HTML页面
copy "*.html" "%DEPLOY_DIR%\" >nul 2>&1
echo ✅ 复制HTML页面完成

:: 复制CSS文件
copy "*.css" "%DEPLOY_DIR%\" >nul 2>&1
echo ✅ 复制CSS文件完成

:: 复制JS文件
copy "*.js" "%DEPLOY_DIR%\" >nul 2>&1
echo ✅ 复制JS文件完成

:: 复制views目录
if exist "views" (
    xcopy "views" "%DEPLOY_DIR%\views" /E /I /Q >nul 2>&1
    echo ✅ 复制views目录完成
)

:: 复制pages目录
if exist "pages" (
    xcopy "pages" "%DEPLOY_DIR%\pages" /E /I /Q >nul 2>&1
    echo ✅ 复制pages目录完成
)

:: 复制其他资源文件
if exist "assets" (
    xcopy "assets" "%DEPLOY_DIR%\assets" /E /I /Q >nul 2>&1
    echo ✅ 复制assets目录完成
)

if exist "images" (
    xcopy "images" "%DEPLOY_DIR%\images" /E /I /Q >nul 2>&1
    echo ✅ 复制images目录完成
)

echo.
echo 🔧 生成部署配置文件...

:: 创建.gitignore
echo node_modules/ > "%DEPLOY_DIR%\.gitignore"
echo *.log >> "%DEPLOY_DIR%\.gitignore"
echo .DS_Store >> "%DEPLOY_DIR%\.gitignore"
echo Thumbs.db >> "%DEPLOY_DIR%\.gitignore"

:: 创建README
echo # 流量安全识别系统 > "%DEPLOY_DIR%\README.md"
echo. >> "%DEPLOY_DIR%\README.md"
echo 这是一个纯前端的多页面应用，用于流量安全识别和管理。 >> "%DEPLOY_DIR%\README.md"
echo. >> "%DEPLOY_DIR%\README.md"
echo ## 功能特性 >> "%DEPLOY_DIR%\README.md"
echo - 🔍 应用识别 >> "%DEPLOY_DIR%\README.md"
echo - 📊 应用管理 >> "%DEPLOY_DIR%\README.md"
echo - 🎨 流量染色 >> "%DEPLOY_DIR%\README.md"
echo - 📝 数字水印 >> "%DEPLOY_DIR%\README.md"
echo - 💧 水印溯源 >> "%DEPLOY_DIR%\README.md"
echo - 📋 操作日志 >> "%DEPLOY_DIR%\README.md"
echo - 🔌 开放接口 >> "%DEPLOY_DIR%\README.md"
echo. >> "%DEPLOY_DIR%\README.md"
echo ## 技术栈 >> "%DEPLOY_DIR%\README.md"
echo - HTML5 + CSS3 + JavaScript >> "%DEPLOY_DIR%\README.md"
echo - IndexedDB 本地数据库 >> "%DEPLOY_DIR%\README.md"
echo - Dexie.js 数据库操作库 >> "%DEPLOY_DIR%\README.md"
echo. >> "%DEPLOY_DIR%\README.md"
echo ## 部署方式 >> "%DEPLOY_DIR%\README.md"
echo 1. 直接上传到任何静态托管服务 >> "%DEPLOY_DIR%\README.md"
echo 2. 或使用本地HTTP服务器运行 >> "%DEPLOY_DIR%\README.md"

:: 创建package.json (可选)
echo { > "%DEPLOY_DIR%\package.json"
echo   "name": "traffic-security-app", >> "%DEPLOY_DIR%\package.json"
echo   "version": "1.0.0", >> "%DEPLOY_DIR%\package.json"
echo   "description": "流量安全识别系统", >> "%DEPLOY_DIR%\package.json"
echo   "main": "index.html", >> "%DEPLOY_DIR%\package.json"
echo   "scripts": { >> "%DEPLOY_DIR%\package.json"
echo     "start": "npx serve . -p 8000", >> "%DEPLOY_DIR%\package.json"
echo     "dev": "python -m http.server 8000" >> "%DEPLOY_DIR%\package.json"
echo   }, >> "%DEPLOY_DIR%\package.json"
echo   "keywords": ["traffic", "security", "webapp"], >> "%DEPLOY_DIR%\package.json"
echo   "author": "Your Name", >> "%DEPLOY_DIR%\package.json"
echo   "license": "MIT" >> "%DEPLOY_DIR%\package.json"
echo } >> "%DEPLOY_DIR%\package.json"

echo.
echo 📊 生成文件清单...
dir "%DEPLOY_DIR%" /b > "%DEPLOY_DIR%\file-list.txt"

echo.
echo ✅ 打包完成！
echo.
echo 📁 部署文件位置: %DEPLOY_DIR%\
echo 📋 文件清单: %DEPLOY_DIR%\file-list.txt
echo.
echo 🚀 快速部署选项:
echo 1. 拖拽 %DEPLOY_DIR% 文件夹到 netlify.com
echo 2. 上传到 GitHub 并启用 Pages
echo 3. 上传到 Vercel 进行部署
echo.
echo 💻 本地测试:
echo cd %DEPLOY_DIR%
echo python -m http.server 8000
echo 然后访问: http://localhost:8000
echo.

:: 询问是否打开部署目录
set /p open_folder="是否打开部署目录? (y/n): "
if /i "%open_folder%"=="y" (
    explorer "%DEPLOY_DIR%"
)

:: 询问是否启动本地服务器
set /p start_server="是否启动本地服务器测试? (y/n): "
if /i "%start_server%"=="y" (
    cd "%DEPLOY_DIR%"
    echo 启动本地服务器...
    echo 访问: http://localhost:8000
    python -m http.server 8000
)

pause
