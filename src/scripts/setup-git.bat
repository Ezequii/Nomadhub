@echo off
REM 🚀 Script de Setup Git para NomadHub (Windows)
REM Este script automatiza a inicialização do Git e push para GitHub

echo 🌍 NomadHub - Setup Git
echo =======================
echo.

REM Verificar se Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git não está instalado!
    echo Baixe em: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo ✅ Git encontrado
git --version
echo.

REM Verificar se já é um repositório Git
if exist .git (
    echo ⚠️  Repositório Git já existe!
    set /p continue="Deseja continuar mesmo assim? (s/n): "
    if /i not "%continue%"=="s" exit /b 0
) else (
    echo 📦 Inicializando repositório Git...
    git init
    echo ✅ Repositório inicializado!
    echo.
)

REM Configurar usuário (se necessário)
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚙️  Configurando Git...
    set /p git_name="Seu nome: "
    set /p git_email="Seu email: "
    git config --global user.name "%git_name%"
    git config --global user.email "%git_email%"
    echo ✅ Git configurado!
    echo.
)

REM Adicionar arquivos
echo 📂 Adicionando arquivos...
git add .
echo ✅ Arquivos adicionados!
echo.

REM Commit inicial
echo 💾 Criando commit inicial...
git commit -m "feat: initial commit - NomadHub MVP completo"
echo ✅ Commit criado!
echo.

REM Solicitar URL do GitHub
echo 🐙 Configurando remote do GitHub...
echo.
echo Antes de continuar, crie um repositório no GitHub:
echo 1. Acesse: https://github.com/new
echo 2. Nome: nomadhub
echo 3. NÃO marque 'Initialize with README'
echo 4. Clique em 'Create repository'
echo.
set /p repo_url="Cole a URL do repositório: "

if "%repo_url%"=="" (
    echo ❌ URL não fornecida!
    pause
    exit /b 1
)

REM Adicionar remote
git remote remove origin >nul 2>&1
git remote add origin %repo_url%
echo ✅ Remote configurado!
echo.

REM Renomear branch para main
echo 🌿 Configurando branch main...
git branch -M main
echo ✅ Branch configurada!
echo.

REM Push
echo 🚀 Fazendo push para o GitHub...
echo.
echo Você precisará autenticar:
echo - Username: seu_usuario_github
echo - Password: use um Personal Access Token
echo   (Crie em: https://github.com/settings/tokens)
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅✅✅ SUCESSO! ✅✅✅
    echo.
    echo 🎉 Seu código está no GitHub!
    echo.
    echo 📍 Próximos passos:
    echo 1. Acesse: %repo_url%
    echo 2. Verifique se todos os arquivos estão lá
    echo 3. Siga o guia: EXPORT_AND_DEPLOY.md para fazer deploy
    echo.
    echo 🌐 Faça deploy no Vercel:
    echo    https://vercel.com/new
    echo.
) else (
    echo.
    echo ❌ Erro no push!
    echo.
    echo Possíveis soluções:
    echo 1. Verifique se a URL do repositório está correta
    echo 2. Crie um Personal Access Token:
    echo    https://github.com/settings/tokens
    echo 3. Use o token como senha ao fazer push
    echo.
    echo Para tentar novamente:
    echo    git push -u origin main
)

echo.
pause
