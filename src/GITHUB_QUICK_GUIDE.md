# 🐙 Guia Rápido GitHub - NomadHub

Este guia te ajuda a subir o NomadHub no GitHub passo a passo.

---

## 📋 Pré-requisitos

### 1. Instalar Git
```bash
# Verificar se Git está instalado
git --version

# Se não estiver, baixe em: https://git-scm.com/downloads
```

### 2. Configurar Git (primeira vez)
```bash
# Configure seu nome e email
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Verifique a configuração
git config --list
```

### 3. Criar conta no GitHub
- Acesse: https://github.com/signup
- Crie sua conta gratuita

---

## 🚀 Subir Projeto no GitHub

### Passo 1: Criar Repositório no GitHub

1. **Acesse:** https://github.com/new
2. **Preencha:**
   - **Repository name:** `nomadhub`
   - **Description:** `Plataforma mobile-first para nômades digitais conectarem-se com projetos remotos`
   - **Visibility:** 
     - ✅ **Private** (se quiser manter privado)
     - ⬜ **Public** (se quiser open source)
3. **NÃO marque:**
   - ⬜ Add a README file
   - ⬜ Add .gitignore
   - ⬜ Choose a license
4. **Clique:** **"Create repository"**

### Passo 2: Inicializar Git Localmente

```bash
# Navegue até a pasta do projeto
cd nomadhub

# Inicialize o repositório Git
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "feat: initial commit - NomadHub MVP completo"
```

### Passo 3: Conectar ao GitHub

Copie a URL do seu repositório (aparece na tela após criar):
- **HTTPS:** `https://github.com/SEU_USUARIO/nomadhub.git`
- **SSH:** `git@github.com:SEU_USUARIO/nomadhub.git`

```bash
# Adicione o remote (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/nomadhub.git

# Verifique se foi adicionado
git remote -v
```

### Passo 4: Fazer Push

```bash
# Renomeie a branch principal para 'main'
git branch -M main

# Faça o push inicial
git push -u origin main
```

**Se pedir autenticação:**
- **Username:** seu_usuario_github
- **Password:** use um **Personal Access Token** (não sua senha)

---

## 🔑 Criar Personal Access Token (PAT)

Se o push pedir senha:

1. **Acesse:** https://github.com/settings/tokens
2. **Clique:** "Generate new token" → "Generate new token (classic)"
3. **Preencha:**
   - **Note:** `NomadHub Deploy`
   - **Expiration:** 90 days (ou No expiration)
   - **Scopes:** Marque `repo` (todos os sub-itens)
4. **Clique:** "Generate token"
5. **Copie o token** (só aparece uma vez!)
6. **Use como senha** no comando `git push`

### Salvar Credenciais (opcional)

```bash
# Para não precisar digitar sempre
git config --global credential.helper store

# No próximo push, salva automaticamente
```

---

## ✅ Verificar Upload

1. Acesse: `https://github.com/SEU_USUARIO/nomadhub`
2. Verifique se todos os arquivos estão lá
3. Confira a árvore de arquivos

---

## 🔄 Comandos Git do Dia a Dia

### Fazer Alterações e Subir

```bash
# 1. Fazer alterações nos arquivos...

# 2. Ver o que mudou
git status

# 3. Adicionar arquivos modificados
git add .
# ou arquivos específicos:
git add src/components/Header.tsx

# 4. Fazer commit
git commit -m "feat: adiciona nova funcionalidade X"

# 5. Enviar para o GitHub
git push
```

### Padrão de Commits (Conventional Commits)

```bash
# Novas funcionalidades
git commit -m "feat: adiciona chat em tempo real"

# Correções de bugs
git commit -m "fix: corrige erro no login"

# Documentação
git commit -m "docs: atualiza README com instruções de deploy"

# Estilização
git commit -m "style: ajusta espaçamento do header"

# Refatoração
git commit -m "refactor: melhora performance do ProjectCard"

# Testes
git commit -m "test: adiciona testes para EscrowFlow"

# Build/CI
git commit -m "build: atualiza dependências"
```

### Criar Branch para Nova Feature

```bash
# Criar e mudar para nova branch
git checkout -b feature/chat-real-time

# Fazer commits na branch...
git add .
git commit -m "feat: implementa chat em tempo real"

# Enviar branch para GitHub
git push -u origin feature/chat-real-time

# Depois, criar Pull Request no GitHub
```

### Voltar para Main

```bash
# Mudar para branch main
git checkout main

# Atualizar com o remoto
git pull
```

### Ver Histórico

```bash
# Ver commits
git log

# Ver commits (resumido)
git log --oneline

# Ver mudanças de um arquivo
git log -- src/App.tsx
```

### Desfazer Alterações

```bash
# Desfazer mudanças em arquivo (antes do add)
git checkout -- src/App.tsx

# Desfazer add (antes do commit)
git reset HEAD src/App.tsx

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Desfazer último commit (descarta alterações)
git reset --hard HEAD~1
```

---

## 🌳 Estrutura de Branches Recomendada

```
main              # Código em produção (protegido)
├── develop       # Branch de desenvolvimento
│   ├── feature/chat
│   ├── feature/notifications
│   └── feature/analytics
├── hotfix/login-bug
└── release/v1.1.0
```

### Criar Estrutura

```bash
# Criar branch develop
git checkout -b develop
git push -u origin develop

# Criar feature a partir de develop
git checkout develop
git checkout -b feature/chat
```

---

## 📝 .gitignore (Já Criado)

O arquivo `.gitignore` já está configurado para ignorar:

```
node_modules/     # Dependências
dist/             # Build
.env              # Variáveis secretas
.DS_Store         # Arquivos do Mac
.vercel/          # Deploy Vercel
```

**NUNCA commite:**
- ❌ `node_modules/`
- ❌ `.env` (senhas, tokens)
- ❌ Builds (`dist/`)
- ❌ Arquivos pessoais (`.vscode/`)

---

## 🔒 Proteger Branch Main (Recomendado)

Para projetos em equipe:

1. **No GitHub:** `Settings` → `Branches`
2. **Add rule** para `main`
3. **Marque:**
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Include administrators (opcional)
4. **Save changes**

Agora só é possível fazer merge via Pull Request!

---

## 🐛 Problemas Comuns

### "fatal: not a git repository"
```bash
# Você não está na pasta do projeto
cd nomadhub
git init
```

### "remote origin already exists"
```bash
# Remova o remote antigo e adicione novamente
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/nomadhub.git
```

### "failed to push some refs"
```bash
# Alguém fez push antes de você, puxe as mudanças primeiro
git pull --rebase
git push
```

### "Permission denied (publickey)"
```bash
# Se usar SSH, configure suas chaves:
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

---

## 📊 GitHub Actions (CI/CD Automático)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
```

---

## 🎯 Checklist Final

Antes de compartilhar seu repositório:

- [ ] README.md está completo e atualizado
- [ ] .gitignore está configurado
- [ ] Não há senhas/tokens no código
- [ ] package.json tem scripts corretos
- [ ] Código builda sem erros (`npm run build`)
- [ ] Documentação da API está atualizada
- [ ] LICENSE file está presente (se open source)
- [ ] CONTRIBUTING.md (se aceitar contribuições)

---

## 🔗 Links Úteis

- 📖 **Git Docs:** https://git-scm.com/doc
- 🐙 **GitHub Docs:** https://docs.github.com
- 🎓 **Git Tutorial:** https://www.atlassian.com/git/tutorials
- 💬 **GitHub Skills:** https://skills.github.com/

---

## 🎉 Próximos Passos

Depois do código no GitHub:

1. ✅ **Deploy no Vercel/Netlify** ([EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md))
2. 📊 **Configure GitHub Actions** (CI/CD)
3. 🐛 **Crie Issues** para bugs e features
4. 📝 **Use Projects** para kanban
5. 👥 **Convide colaboradores** (Settings → Collaborators)

---

**Seu código está no GitHub! 🎊**

```
🧪 Repositório: https://github.com/SEU_USUARIO/nomadhub
```

Agora você pode compartilhar, colaborar e fazer deploy automaticamente!

---

Feito com 💙 no NomadHub
