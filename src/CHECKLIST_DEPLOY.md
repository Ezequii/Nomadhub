# ✅ Checklist de Deploy - NomadHub

## 🎯 Antes de Fazer Deploy

### Arquivos Críticos

- [x] ✅ **package.json** - Scripts configurados
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```

- [x] ✅ **vite.config.ts** - Base path configurado
  ```ts
  export default defineConfig({
    base: '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  })
  ```

- [x] ✅ **vercel.json** - Output configurado
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

- [x] ✅ **.gitignore** - Dist ignorado
  ```
  dist
  build
  node_modules
  ```

---

## 🧪 Teste Local (OBRIGATÓRIO)

Execute ANTES de fazer deploy:

```bash
# 1. Limpe tudo
rm -rf dist node_modules

# 2. Instale dependências
npm install

# 3. Build
npm run build

# 4. Verifique dist/
ls dist/
```

### ✅ Resultado esperado:

```
dist/
├── index.html          ← DEVE EXISTIR!
├── vite.svg
└── assets/
    ├── index-abc123.js
    └── index-abc123.css
```

**Se `dist/index.html` não existir → NÃO FAÇA DEPLOY!**

---

## 📤 Git Push

```bash
# 1. Adicione tudo
git add .

# 2. Commit
git commit -m "chore: configurar build Vite e output dist para Vercel"

# 3. Push
git push origin main
```

---

## 🚀 Deploy no Vercel

### Método 1: Dashboard (RECOMENDADO)

1. **Acesse:** https://vercel.com/new

2. **Import Repository:**
   - Clique em "Import Git Repository"
   - Selecione o repositório `nomadhub`

3. **Configure Build:**
   ```
   Framework Preset:     Vite
   Build Command:        npm run build
   Output Directory:     dist
   Install Command:      npm install
   ```

4. **Deploy!**
   - Clique em "Deploy"
   - Aguarde completar (1-2 min)

---

### Método 2: CLI (Alternativo)

```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

---

## ✅ Validação Pós-Deploy

### 1. Checar Logs do Build

Vá em: **Deployments → [Seu Deploy] → Building**

**Procure por:**

```bash
Running "npm run build"
vite v5.x.x building for production...
✓ 150 modules transformed.

dist/index.html                    0.45 kB
dist/assets/index-abc123.css      12.34 kB  
dist/assets/index-abc123.js      156.78 kB

✓ built in 15s
✓ Deployment ready
```

**Se aparecer `✓ Deployment ready`** → SUCESSO! ✅

---

### 2. Testar URL

Acesse: `https://seu-projeto.vercel.app`

**Teste todas as rotas:**

- [ ] ✅ `/` - Home carrega
- [ ] ✅ `/projects` - Lista de projetos
- [ ] ✅ `/projects/1` - Detalhe do projeto
- [ ] ✅ `/nomad` - Nômade Digital
- [ ] ✅ `/wallet` - Carteira
- [ ] ✅ `/profile` - Perfil
- [ ] ✅ `/admin` - Dashboard Admin

**Se TODAS carregarem** → 100% FUNCIONAL! 🎉

---

### 3. Testar Assets

Verifique no navegador (F12 → Network):

- [ ] ✅ CSS carrega (200 OK)
- [ ] ✅ JS carrega (200 OK)
- [ ] ✅ Imagens carregam (200 OK)
- [ ] ✅ Sem erros 404

---

## ❌ Troubleshooting

### Erro: "Output directory not found"

**Solução:**

1. Verifique `vercel.json`:
   ```json
   { "outputDirectory": "dist" }
   ```

2. No Dashboard:
   - Settings → Build & Development Settings
   - Output directory: `dist`
   - Save

3. Redeploy **SEM CACHE**:
   - Deployments → 3 pontinhos → Redeploy
   - Desmarque "Use existing Build Cache"

---

### Erro: Página branca / Assets 404

**Solução:**

1. Verifique `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: '/'  // ← Deve ser '/'
   })
   ```

2. Verifique `vercel.json` tem rewrites:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

3. Commit e redeploy

---

### Erro: Build falha no Vercel

**Solução:**

1. Teste local primeiro:
   ```bash
   npm run build
   ```

2. Se falhar local, corrija erros de TypeScript:
   ```bash
   npm run type-check
   ```

3. Se passar local mas falhar no Vercel:
   - Verifique versão do Node (Settings → General)
   - Use Node 18.x ou 20.x

---

## 📊 Métricas de Sucesso

### Build

- ⏱️ Tempo: 15-30 segundos
- 📦 Tamanho: ~150-200 KB (gzipped)
- ✅ Status: Deployment ready

### Performance

- 🚀 First Load: < 2s
- 📱 Mobile Score: > 90
- 💻 Desktop Score: > 95

### Funcionalidade

- ✅ Todas as rotas funcionam
- ✅ Navegação smooth
- ✅ Mobile-first responsivo
- ✅ Dark mode funcional

---

## 🎉 Deploy Completo!

Se passou por TODOS os checks:

- [x] ✅ Build local OK
- [x] ✅ Git push OK
- [x] ✅ Deploy no Vercel OK
- [x] ✅ Logs sem erros
- [x] ✅ URL acessível
- [x] ✅ Rotas funcionando
- [x] ✅ Assets carregando

**PARABÉNS! 🚀 NomadHub está no ar!**

---

## 📝 Próximos Passos

1. **Custom Domain:**
   - Vercel → Settings → Domains
   - Adicionar `nomadhub.com`

2. **Analytics:**
   - Vercel → Settings → Analytics
   - Ativar Speed Insights

3. **CI/CD:**
   - Já configurado! ✅
   - Todo push → auto-deploy

4. **Monitoring:**
   - Vercel → Deployments
   - Monitorar logs e performance

---

**🌍 NomadHub - Conectando nômades digitais ao redor do mundo!**
