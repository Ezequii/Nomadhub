#!/bin/bash

echo "🔍 NomadHub - Teste de Build para Vercel"
echo "========================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo "📦 Verificando Node.js..."
NODE_VERSION=$(node -v)
echo "   Node version: $NODE_VERSION"

if [[ "$NODE_VERSION" < "v18" ]]; then
    echo -e "${RED}❌ Node.js version deve ser >= 18${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js OK${NC}"
echo ""

# Verificar npm
echo "📦 Verificando npm..."
NPM_VERSION=$(npm -v)
echo "   npm version: $NPM_VERSION"
echo -e "${GREEN}✅ npm OK${NC}"
echo ""

# Limpar
echo "🧹 Limpando builds anteriores..."
rm -rf dist
echo -e "${GREEN}✅ Limpeza concluída${NC}"
echo ""

# Instalar dependências
echo "📥 Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Falha ao instalar dependências${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# Type check
echo "🔍 Verificando tipos TypeScript..."
npm run type-check
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erros de TypeScript encontrados${NC}"
    echo -e "${YELLOW}⚠️  Corrija os erros antes de fazer deploy${NC}"
    exit 1
fi
echo -e "${GREEN}✅ TypeScript OK${NC}"
echo ""

# Build
echo "🏗️  Executando build..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build falhou${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build concluído${NC}"
echo ""

# Verificar dist/
echo "📁 Verificando pasta dist/..."
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Pasta dist/ NÃO foi criada!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Pasta dist/ existe${NC}"

# Verificar index.html
if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ dist/index.html NÃO encontrado!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ dist/index.html existe${NC}"
echo ""

# Listar conteúdo
echo "📄 Conteúdo de dist/:"
ls -lh dist/
echo ""

# Tamanho total
DIST_SIZE=$(du -sh dist | cut -f1)
echo "📊 Tamanho total do build: $DIST_SIZE"
echo ""

# Resumo final
echo "========================================="
echo -e "${GREEN}✅ TUDO PRONTO PARA DEPLOY!${NC}"
echo "========================================="
echo ""
echo "Próximos passos:"
echo "1. Commit suas mudanças: git add . && git commit -m 'Fix build'"
echo "2. Push para GitHub: git push origin main"
echo "3. Deploy no Vercel: https://vercel.com/new"
echo ""
echo "Ou use: npm run preview para testar localmente"
echo ""
