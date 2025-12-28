# 🚀 DEPLOY NO VERCEL - PASSO A PASSO

## ✅ Arquivos Configurados

Todos os arquivos necessários já foram configurados:

- ✅ `/vercel.json` - Configuração do Vercel
- ✅ `/.vercelignore` - Arquivos a ignorar no deploy
- ✅ `/vite.config.ts` - Build configurado para `dist`
- ✅ `/package.json` - Scripts de build prontos

---

## 📋 PASSO A PASSO PARA DEPLOY

### **Método 1: Deploy via Dashboard do Vercel (RECOMENDADO)**

1. **Acesse**: https://vercel.com/new

2. **Conecte seu repositório GitHub**
   - Clique em "Import Git Repository"
   - Selecione o repositório do NomadHub
   - Clique em "Import"

3. **Configure o projeto** (se necessário)
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Node Version**: `18.x` ou superior

4. **Clique em "Deploy"**
   - O Vercel irá:
     - Instalar as dependências
     - Rodar o TypeScript check
     - Fazer o build do Vite
     - Publicar na URL gerada

5. **Aguarde o deploy** (2-5 minutos)
   - Você verá logs em tempo real
   - Quando terminar, terá uma URL: `https://seu-projeto.vercel.app`

---

### **Método 2: Deploy via CLI do Vercel**

Se preferir usar a linha de comando:

```bash
# 1. Instale o Vercel CLI (uma vez)
npm install -g vercel

# 2. Faça login no Vercel
vercel login

# 3. Deploy para produção
vercel --prod
```

---

## 🔍 VERIFICAÇÃO DO BUILD LOCAL

Antes de fazer o deploy, teste o build localmente:

```bash
# 1. Instale as dependências
npm install

# 2. Faça o build
npm run build

# 3. Verifique se a pasta dist foi criada
ls dist/

# 4. Teste localmente
npm run preview
```

Se tudo funcionar localmente, funcionará no Vercel!

---

## ⚠️ TROUBLESHOOTING

### **Erro: "No output directory named 'dist' found"**

**Solução:**
1. Verifique se o `vercel.json` está correto (já está!)
2. No dashboard do Vercel, vá em:
   - Settings → General → Build & Development Settings
   - **Output Directory**: `dist`
   - Salve e faça redeploy

### **Erro de build TypeScript**

**Solução:**
```bash
# Execute localmente primeiro
npm run type-check

# Se houver erros, corrija-os
# Depois faça o build
npm run build
```

### **Erro 404 em rotas**

**Solução:**
- O `vercel.json` já está configurado com rewrites
- Todas as rotas redirecionam para `/index.html`
- O React Router cuida do resto

### **Assets não carregando**

**Solução:**
- Verifique se os imports estão corretos
- Use caminhos relativos ou absolutos consistentes
- Ex: `/assets/logo.svg` ou `./assets/logo.svg`

---

## 🎯 VARIÁVEIS DE AMBIENTE (OPCIONAL)

Se seu projeto usar variáveis de ambiente:

1. **No Dashboard do Vercel**:
   - Settings → Environment Variables
   - Adicione suas variáveis (ex: `VITE_API_URL`)

2. **Localmente (desenvolvimento)**:
   - Crie `.env.local`
   - Adicione suas variáveis:
     ```
     VITE_API_URL=https://api.exemplo.com
     ```

**IMPORTANTE**: Variáveis no Vite devem começar com `VITE_`

---

## 📊 APÓS O DEPLOY

### **URLs Geradas:**

- **Produção**: `https://nomadhub.vercel.app`
- **Preview**: `https://nomadhub-git-main-seucuario.vercel.app`

### **Configurar Domínio Customizado (Opcional):**

1. No Vercel Dashboard:
   - Settings → Domains
   - Clique em "Add Domain"
   - Digite seu domínio (ex: `nomadhub.com`)
   - Siga as instruções para configurar DNS

---

## 🔄 DEPLOYS AUTOMÁTICOS

O Vercel faz deploy automático quando você:

1. **Push para `main`**: Deploy em produção
2. **Push para outras branches**: Deploy de preview
3. **Pull Request**: Deploy de preview para testar

---

## 📈 MONITORAMENTO

Após o deploy, você pode monitorar:

- **Analytics**: Visitas, pageviews, etc
- **Speed Insights**: Performance do site
- **Logs**: Erros e avisos
- **Deployments**: Histórico de deploys

Acesse tudo em: https://vercel.com/dashboard

---

## ✅ CHECKLIST PRÉ-DEPLOY

Antes de fazer o deploy, verifique:

- [ ] `npm install` funciona sem erros
- [ ] `npm run type-check` passa sem erros
- [ ] `npm run build` cria a pasta `dist`
- [ ] `npm run preview` funciona localmente
- [ ] Código commitado no GitHub
- [ ] `vercel.json` configurado (já está!)
- [ ] README.md atualizado com URL de produção

---

## 🚀 COMANDOS RÁPIDOS

```bash
# Instalar dependências
npm install

# Verificar tipos
npm run type-check

# Build local
npm run build

# Preview local
npm run preview

# Deploy via CLI (se instalou o Vercel CLI)
vercel --prod
```

---

## 📞 SUPORTE

- **Documentação Vercel**: https://vercel.com/docs
- **Status do Vercel**: https://vercel-status.com
- **Suporte**: https://vercel.com/support

---

## 🎉 PRONTO!

Seu projeto está configurado e pronto para deploy no Vercel!

**Recomendação**: Use o **Método 1** (Dashboard) na primeira vez, é mais visual e fácil de debugar.

Boa sorte com o deploy! 🚀✨
