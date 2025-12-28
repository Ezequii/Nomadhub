@echo off
echo ===========================================
echo NomadHub - Teste de Build para Vercel
echo ===========================================
echo.

REM Verificar Node.js
echo Verificando Node.js...
node -v
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    exit /b 1
)
echo OK: Node.js encontrado
echo.

REM Verificar npm
echo Verificando npm...
npm -v
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado!
    exit /b 1
)
echo OK: npm encontrado
echo.

REM Limpar
echo Limpando builds anteriores...
if exist dist rmdir /s /q dist
echo OK: Limpeza concluida
echo.

REM Instalar dependências
echo Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias
    exit /b 1
)
echo OK: Dependencias instaladas
echo.

REM Type check
echo Verificando tipos TypeScript...
call npm run type-check
if %errorlevel% neq 0 (
    echo ERRO: Erros de TypeScript encontrados
    echo Corrija os erros antes de fazer deploy
    exit /b 1
)
echo OK: TypeScript OK
echo.

REM Build
echo Executando build...
call npm run build
if %errorlevel% neq 0 (
    echo ERRO: Build falhou
    exit /b 1
)
echo OK: Build concluido
echo.

REM Verificar dist/
echo Verificando pasta dist/...
if not exist dist (
    echo ERRO: Pasta dist/ NAO foi criada!
    exit /b 1
)
echo OK: Pasta dist/ existe

REM Verificar index.html
if not exist dist\index.html (
    echo ERRO: dist/index.html NAO encontrado!
    exit /b 1
)
echo OK: dist/index.html existe
echo.

REM Listar conteúdo
echo Conteudo de dist/:
dir dist
echo.

REM Resumo final
echo ===========================================
echo TUDO PRONTO PARA DEPLOY!
echo ===========================================
echo.
echo Proximos passos:
echo 1. Commit: git add . ^&^& git commit -m "Fix build"
echo 2. Push: git push origin main
echo 3. Deploy: https://vercel.com/new
echo.
echo Ou use: npm run preview para testar localmente
echo.
pause
