#!/bin/bash

# 🚀 Script de Setup Git para NomadHub
# Este script automatiza a inicialização do Git e push para GitHub

echo "🌍 NomadHub - Setup Git"
echo "======================="
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git não está instalado!${NC}"
    echo "Baixe em: https://git-scm.com/downloads"
    exit 1
fi

echo -e "${GREEN}✅ Git encontrado: $(git --version)${NC}"
echo ""

# Verificar se já é um repositório Git
if [ -d .git ]; then
    echo -e "${YELLOW}⚠️  Repositório Git já existe!${NC}"
    read -p "Deseja continuar mesmo assim? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
else
    echo -e "${BLUE}📦 Inicializando repositório Git...${NC}"
    git init
    echo -e "${GREEN}✅ Repositório inicializado!${NC}"
    echo ""
fi

# Configurar usuário (se não configurado)
if [ -z "$(git config user.name)" ]; then
    echo -e "${YELLOW}⚙️  Configurando Git...${NC}"
    read -p "Seu nome: " git_name
    read -p "Seu email: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
    echo -e "${GREEN}✅ Git configurado!${NC}"
    echo ""
fi

# Adicionar arquivos
echo -e "${BLUE}📂 Adicionando arquivos...${NC}"
git add .
echo -e "${GREEN}✅ Arquivos adicionados!${NC}"
echo ""

# Commit inicial
echo -e "${BLUE}💾 Criando commit inicial...${NC}"
git commit -m "feat: initial commit - NomadHub MVP completo

- 16 telas funcionais (Home, Projetos, Perfil, Wallet, etc.)
- 25+ componentes reutilizáveis
- API client com 30+ endpoints mockados
- Sistema de tipos TypeScript completo
- Design mobile-first responsivo
- Trust Score e badges gamificados
- Chat integrado e checklist de entrega
- Sistema de escrow e verificação
- Pronto para deploy em Vercel/Netlify"

echo -e "${GREEN}✅ Commit criado!${NC}"
echo ""

# Solicitar URL do GitHub
echo -e "${BLUE}🐙 Configurando remote do GitHub...${NC}"
echo ""
echo -e "${YELLOW}Antes de continuar, crie um repositório no GitHub:${NC}"
echo "1. Acesse: https://github.com/new"
echo "2. Nome: nomadhub"
echo "3. NÃO marque 'Initialize with README'"
echo "4. Clique em 'Create repository'"
echo ""
read -p "Cole a URL do repositório (ex: https://github.com/usuario/nomadhub.git): " repo_url

if [ -z "$repo_url" ]; then
    echo -e "${RED}❌ URL não fornecida!${NC}"
    exit 1
fi

# Adicionar remote
if git remote | grep -q "origin"; then
    git remote remove origin
fi

git remote add origin "$repo_url"
echo -e "${GREEN}✅ Remote configurado!${NC}"
echo ""

# Renomear branch para main
echo -e "${BLUE}🌿 Configurando branch main...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch configurada!${NC}"
echo ""

# Push
echo -e "${BLUE}🚀 Fazendo push para o GitHub...${NC}"
echo ""
echo -e "${YELLOW}Você precisará autenticar:${NC}"
echo "- Username: seu_usuario_github"
echo "- Password: use um Personal Access Token"
echo "  (Crie em: https://github.com/settings/tokens)"
echo ""

if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅✅✅ SUCESSO! ✅✅✅${NC}"
    echo ""
    echo "🎉 Seu código está no GitHub!"
    echo ""
    echo -e "${BLUE}📍 Próximos passos:${NC}"
    echo "1. Acesse: $repo_url"
    echo "2. Verifique se todos os arquivos estão lá"
    echo "3. Siga o guia: EXPORT_AND_DEPLOY.md para fazer deploy"
    echo ""
    echo -e "${GREEN}🌐 Faça deploy no Vercel:${NC}"
    echo "   https://vercel.com/new"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Erro no push!${NC}"
    echo ""
    echo -e "${YELLOW}Possíveis soluções:${NC}"
    echo "1. Verifique se a URL do repositório está correta"
    echo "2. Crie um Personal Access Token:"
    echo "   https://github.com/settings/tokens"
    echo "3. Use o token como senha ao fazer push"
    echo ""
    echo "Para tentar novamente:"
    echo "   git push -u origin main"
    exit 1
fi
