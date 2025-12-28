# 🚀 Deploy Vercel - Guia Definitivo (Projeto Vite + React)

## ✅ Passo a Passo — Projeto Vite (React)

### 1️⃣ Verificar scripts no package.json

✅ **CONFIRMADO!** O `package.json` já possui os scripts corretos:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

### 2️⃣ Rodar build local para gerar dist

No terminal, executar:

```bash
npm install
npm run build
```

**✅ Resultado esperado:** pasta `dist/` criada na raiz do projeto.

**Verifique:**
```bash
ls dist/
```

Deve mostrar:
```
dist/
├── index.html          ← Arquivo principal
├── vite.svg
└── assets/
    ├── index-abc123.js
    └── index-abc123.css
```

Se `dist/index.html` existir → **SUCESSO!** ✅

---

### 3️⃣ Criar vercel.json para fixar saída

✅ **CRIADO!** Na raiz do repositório, o arquivo `/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

### 4️⃣ Commit e push para o GitHub

Confirmar que `package.json` e `vercel.json` estão versionados.

Executar:

```bash
git add .
git commit -m "chore: configurar build Vite e output dist para Vercel"
git push
```

---

## ⚙️ Configuração no Vercel

### 1️⃣ Importar o repositório

1. Acesse: https://vercel.com/new
2. Clique em **"New Project"**
3. Selecione o repositório do GitHub

---

### 2️⃣ Build & Output Settings

Configure exatamente assim:

```
Framework preset:     Vite
Build command:        npm run build
Output directory:     dist
Install command:      npm install
```

**Salvar** e iniciar deploy.

---

### 3️⃣ Variáveis de ambiente (se houver API)

Adicionar em **"Settings → Environment Variables"**.

Exemplos:

```env
VITE_API_URL=https://api.nomadhub.com
NODE_ENV=production
```

---

## ✅ Validação pós-deploy

### 1️⃣ Checar logs

1. Abrir o deploy
2. Verificar se o build terminou sem erros

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

Se aparecer `✓ Deployment ready` → **SUCESSO!** 🎉

---

### 2️⃣ Testar preview

1. Acessar a URL gerada (`*.vercel.app`)
2. Navegar pelas páginas:
   - `/` - Home
   - `/projects` - Projetos
   - `/profile` - Perfil

**Se todas carregarem** → **100% FUNCIONAL!** ✅

---

### 3️⃣ Ajustar base do Vite (se necessário)

✅ **JÁ CONFIGURADO!** O `vite.config.ts` já tem:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/'  // ← Garante que assets carregam em produção
})
```

Se os assets não carregarem, o `base: '/'` já está correto.

---

## ❌ Erros comuns e correções

### Erro 1: "Nenhum diretório de saída chamado dist foi encontrado"

**Correção:**

1. Garantir que `npm run build` funciona local:
   ```bash
   npm run build
   ls dist/
   ```

2. Verificar `vercel.json`:
   ```json
   {
     "outputDirectory": "dist"
   }
   ```

3. No Vercel Dashboard:
   - Settings → Build & Development Settings
   - Output directory: `dist`
   - Save

4. Redeploy **SEM CACHE**:
   - Deployments → 3 pontinhos → Redeploy
   - **Desmarque** "Use existing Build Cache"

---

### Erro 2: Rota/asset quebrado em produção

**Sintomas:**
- Página branca
- Assets 404
- Rotas não funcionam

**Correção:**

1. Definir `base: '/'` no `vite.config.ts` ✅ (já configurado!)

2. Verificar `<base>` no HTML:
   ```html
   <!-- NÃO adicionar <base href="/subpath/"> -->
   ```

3. Rotas no Vercel (SPA):
   
   O `vercel.json` deve ter rewrites (opcional):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

---

### Erro 3: Falha por dependências não instaladas

**Correção:**

1. Garantir `package.json` tem todas as deps:
   ```bash
   npm install
   ```

2. Verificar versões do Node:
   ```json
   {
     "engines": {
       "node": ">=18.0.0",
       "npm": ">=9.0.0"
     }
   }
   ```

3. No Vercel, forçar versão:
   - Settings → General → Node.js Version
   - Selecionar **18.x** ou **20.x**

---

## 📋 Checklist Final

Antes de fazer deploy, confirme:

- [ ] ✅ `npm run build` gera `dist/index.html`
- [ ] ✅ `package.json` tem `"build": "vite build"`
- [ ] ✅ `vercel.json` tem `"outputDirectory": "dist"`
- [ ] ✅ `vite.config.ts` tem `base: '/'`
- [ ] ✅ `.gitignore` ignora `dist/` e `node_modules/`
- [ ] ✅ Commit feito e pushed para GitHub
- [ ] ✅ Vercel configurado: Output Directory = `dist`
- [ ] ✅ Build no Vercel mostra `dist/index.html`
- [ ] ✅ URL `.vercel.app` carrega corretamente

Se **TODOS** estão ✅ → **DEPLOY GARANTIDO!** 🚀

---

## 🎯 Resumo Executivo

### Arquivos configurados:

1. ✅ `package.json` - Scripts de build
2. ✅ `vite.config.ts` - Base path e output
3. ✅ `vercel.json` - Configuração do Vercel
4. ✅ `.gitignore` - Ignora dist/

### Comandos para executar:

```bash
# 1. Build local
npm install
npm run build
ls dist/

# 2. Commit
git add .
git commit -m "chore: configurar build Vite e output dist para Vercel"
git push

# 3. Deploy no Vercel (via Dashboard)
# - New Project → Import → Configure → Deploy
```

---

## 🆘 Suporte

Se ainda tiver problemas:

1. **Logs do build local:**
   ```bash
   npm run build 2>&1 | tee build.log
   ```

2. **Logs do Vercel:**
   - Copie todo o log da aba "Building"

3. **Configuração do Dashboard:**
   - Screenshot de Settings → Build & Development Settings

4. **Estrutura do projeto:**
   ```bash
   ls -la
   ```

---

## 🎉 Sucesso!

Se seguiu todos os passos:

✅ Build local funciona  
✅ Deploy no Vercel funciona  
✅ URL pública acessível  
✅ Rotas funcionando  
✅ Assets carregando  

**PARABÉNS! 🚀 Seu projeto está no ar!**

---

**Desenvolvido com ❤️ para NomadHub** 🌍
