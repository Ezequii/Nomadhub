# 🚀 Guia de Exportação e Deploy - NomadHub

Este guia te ajudará a exportar o projeto do Figma Make e fazer deploy em produção.

---

## 📦 Passo 1: Exportar do Figma Make

### Opção A: Download Manual
1. No Figma Make, clique no botão **"Export"** ou **"Download"**
2. Baixe o arquivo ZIP com todo o código
3. Extraia os arquivos em uma pasta local

### Opção B: Copiar Arquivos Manualmente
Se não houver opção de export automático:
1. Crie uma pasta local: `mkdir nomadhub && cd nomadhub`
2. Copie todos os arquivos e pastas do Figma Make para esta pasta
3. Certifique-se de copiar:
   - ✅ Todos os arquivos `.tsx`, `.ts`, `.css`
   - ✅ Pastas `components/`, `screens/`, `api/`, `contexts/`, `types/`
   - ✅ Arquivos de configuração (package.json, vite.config.ts, etc.)

---

## 🔧 Passo 2: Configurar Localmente

### 1. Instalar Node.js
Certifique-se de ter Node.js 18+ instalado:
```bash
node --version  # Deve ser 18.0.0 ou superior
```

Se não tiver, baixe em: https://nodejs.org/

### 2. Instalar Dependências
```bash
cd nomadhub
npm install
```

### 3. Testar Localmente
```bash
npm run dev
```

Abra http://localhost:3000 - a aplicação deve funcionar! 🎉

### 4. Criar Build de Produção
```bash
npm run build
```

Isso criará a pasta `dist/` com arquivos otimizados.

---

## 📤 Passo 3: Subir no GitHub

### 1. Criar Repositório no GitHub
1. Acesse https://github.com/new
2. Nome do repositório: `nomadhub`
3. Descrição: `Plataforma mobile-first para nômades digitais`
4. Escolha: **Private** ou **Public**
5. **NÃO** marque "Initialize with README"
6. Clique em **"Create repository"**

### 2. Inicializar Git Localmente
```bash
# Na pasta do projeto
git init
git add .
git commit -m "feat: initial commit - NomadHub MVP"
```

### 3. Conectar ao GitHub e Fazer Push
```bash
# Substitua SEU_USUARIO pelo seu username do GitHub
git remote add origin https://github.com/SEU_USUARIO/nomadhub.git
git branch -M main
git push -u origin main
```

---

## 🌐 Passo 4: Deploy no Vercel (RECOMENDADO)

### Por que Vercel?
- ✅ Deploy automático a cada commit
- ✅ Suporte nativo a Vite/React
- ✅ SSL gratuito e CDN global
- ✅ Preview deployments
- ✅ 100% gratuito para projetos pessoais

### 1. Criar Conta Vercel
1. Acesse https://vercel.com/signup
2. Faça login com sua conta do GitHub

### 2. Importar Projeto
1. Clique em **"Add New Project"**
2. Selecione o repositório `nomadhub`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Variáveis de Ambiente (Opcional)
Na seção "Environment Variables", adicione:
```
VITE_API_URL=https://api.nomadhub.com
VITE_ENV=production
```

### 4. Deploy!
1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. Seu app estará no ar! 🎉

Você receberá uma URL como: `https://nomadhub.vercel.app`

---

## 🎨 Alternativa: Deploy no Netlify

### 1. Criar Conta Netlify
1. Acesse https://app.netlify.com/signup
2. Faça login com sua conta do GitHub

### 2. Importar Projeto
1. Clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"GitHub"** e autorize
3. Selecione o repositório `nomadhub`

### 3. Configurar Build
- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 4. Deploy!
Clique em **"Deploy site"** e aguarde.

Você receberá uma URL como: `https://nomadhub.netlify.app`

---

## 🔄 Próximos Deploys (Automático)

Depois do primeiro deploy:

1. Faça alterações no código localmente
2. Commit e push para GitHub:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   git push
   ```
3. **Deploy automático** acontece em 1-2 minutos! ✨

---

## 🎯 Customizar Domínio (Opcional)

### No Vercel:
1. Vá em **Settings** → **Domains**
2. Adicione seu domínio customizado
3. Configure DNS conforme instruções

### No Netlify:
1. Vá em **Domain settings**
2. Clique em **"Add custom domain"**
3. Configure DNS conforme instruções

---

## ✅ Checklist Final

Antes de compartilhar seu app em produção:

- [ ] App funciona localmente (`npm run dev`)
- [ ] Build sem erros (`npm run build`)
- [ ] Código no GitHub
- [ ] Deploy no Vercel/Netlify bem-sucedido
- [ ] App acessível via URL pública
- [ ] Testado em mobile e desktop
- [ ] Variáveis de ambiente configuradas (se necessário)

---

## 🐛 Problemas Comuns

### Build falha com erro de TypeScript
```bash
npm run type-check
# Corrija os erros apontados
```

### App em branco após deploy
- Verifique se `dist/` foi gerado corretamente
- Verifique se as rotas estão configuradas (vercel.json / netlify.toml)
- Abra o console do navegador para ver erros

### Imagens não carregam
- Certifique-se de que as imagens estão em `public/` ou importadas corretamente
- Use caminhos relativos (`/imagem.png` ao invés de `./imagem.png`)

---

## 📞 Suporte

- 📧 Vercel: https://vercel.com/support
- 📧 Netlify: https://www.netlify.com/support/
- 💬 GitHub Issues: Crie issues no seu repositório

---

## 🎉 Parabéns!

Seu app está no ar! Agora você pode compartilhar:

```
🌐 App: https://nomadhub.vercel.app
🧪 Repo: https://github.com/SEU_USUARIO/nomadhub
```

**Próximos passos sugeridos:**
1. Integrar API real (substituir mocks em `/api/client.ts`)
2. Adicionar analytics (Google Analytics, Mixpanel)
3. Configurar CI/CD com testes automatizados
4. Implementar PWA para instalação mobile
5. Conectar backend NestJS real

---

Feito com 💙 no Figma Make
