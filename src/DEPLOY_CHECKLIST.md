# ✅ Checklist de Deploy - NomadHub

Use este checklist para garantir que tudo está pronto antes do deploy.

---

## 📦 Pré-Deploy

### 1. Código Local
- [ ] Build funciona sem erros
  ```bash
  npm run build
  ```
- [ ] Type checking passa
  ```bash
  npm run type-check
  ```
- [ ] App funciona em desenvolvimento
  ```bash
  npm run dev
  ```
- [ ] Testado em Chrome, Safari e Firefox
- [ ] Testado em mobile (DevTools responsive mode)

### 2. Arquivos de Configuração
- [ ] `package.json` tem todas as dependências corretas
- [ ] `vite.config.ts` está configurado
- [ ] `tsconfig.json` sem erros
- [ ] `.gitignore` ignora `node_modules`, `dist`, `.env`
- [ ] `vercel.json` ou `netlify.toml` criado
- [ ] `.env.example` documentado

### 3. Código Limpo
- [ ] Sem `console.log()` desnecessários
- [ ] Sem comentários de debug
- [ ] Sem imports não utilizados
- [ ] Sem variáveis mockadas hardcoded em produção
- [ ] API_URL configurada via `.env`

### 4. Segurança
- [ ] Nenhuma senha/token no código
- [ ] `.env` no `.gitignore`
- [ ] HTTPS configurado (Vercel/Netlify fazem automaticamente)
- [ ] CORS configurado no backend (quando integrar)

---

## 🐙 GitHub

### 1. Repositório
- [ ] Repositório criado no GitHub
- [ ] README.md completo e atualizado
- [ ] LICENSE file adicionado (se open source)
- [ ] `.gitignore` configurado corretamente

### 2. Commits
- [ ] Todos os commits têm mensagens descritivas
- [ ] Segue padrão de commits (feat, fix, docs, etc.)
- [ ] Branch `main` está atualizada

### 3. Documentação
- [ ] `EXPORT_AND_DEPLOY.md` revisado
- [ ] `API_DOCUMENTATION.md` atualizado
- [ ] `GITHUB_QUICK_GUIDE.md` disponível
- [ ] Links no README funcionam

---

## 🚀 Deploy

### Vercel

- [ ] Conta Vercel criada e conectada ao GitHub
- [ ] Projeto importado do GitHub
- [ ] Framework: **Vite** selecionado
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Variáveis de ambiente configuradas:
  - [ ] `VITE_API_URL`
  - [ ] `VITE_ENV=production`
  - [ ] Outras variáveis necessárias

### Netlify

- [ ] Conta Netlify criada e conectada ao GitHub
- [ ] Site importado do GitHub
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Variáveis de ambiente configuradas
- [ ] Redirects configurados (`netlify.toml`)

---

## 🧪 Pós-Deploy

### 1. Verificação Básica
- [ ] Site carrega sem erro 404
- [ ] Página inicial renderiza corretamente
- [ ] Todas as rotas funcionam (não retornam 404)
- [ ] Assets (imagens, CSS, JS) carregam
- [ ] Console do navegador sem erros críticos

### 2. Funcionalidades
- [ ] Navegação entre páginas funciona
- [ ] BottomTabs navegam corretamente
- [ ] Projetos listam (com dados mock)
- [ ] Formulários funcionam
- [ ] Modais abrem e fecham
- [ ] Toast notifications aparecem

### 3. Responsividade
- [ ] Mobile (< 640px) funciona
- [ ] Tablet (640px - 1024px) funciona
- [ ] Desktop (> 1024px) funciona
- [ ] Landscape mode testado

### 4. Performance
- [ ] Lighthouse Score > 80 (Performance)
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 4s
- [ ] Assets estão minificados
- [ ] Lazy loading implementado (se necessário)

### 5. SEO (Opcional)
- [ ] Meta tags configuradas (`index.html`)
- [ ] Open Graph tags (Facebook/LinkedIn)
- [ ] Twitter Card tags
- [ ] Favicon adicionado
- [ ] robots.txt (se necessário)

---

## 🔗 URLs de Produção

Após deploy, preencha:

```
🌐 App em Produção: https://nomadhub.vercel.app
🧪 Repositório GitHub: https://github.com/SEU_USUARIO/nomadhub
📊 Dashboard Vercel: https://vercel.com/SEU_USUARIO/nomadhub
```

---

## 🐛 Troubleshooting Pós-Deploy

### App em branco
- ✅ Verifique se `dist/index.html` foi gerado
- ✅ Verifique console do navegador (F12)
- ✅ Verifique `vercel.json` ou `netlify.toml` (redirects)

### 404 em rotas
- ✅ Configure SPA redirect:
  ```json
  // vercel.json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### Assets não carregam
- ✅ Verifique se imagens estão em `public/` ou importadas corretamente
- ✅ Use caminhos absolutos: `/logo.png` ao invés de `./logo.png`

### Build falha
- ✅ Rode `npm run build` localmente primeiro
- ✅ Verifique logs de build no Vercel/Netlify
- ✅ Certifique-se que `package.json` tem todas as deps

### Variáveis de ambiente não funcionam
- ✅ Prefixo `VITE_` é obrigatório (Vite)
- ✅ Re-deploy após adicionar variáveis
- ✅ Não use `.env` local em produção

---

## 📊 Monitoramento

### Analytics (Opcional)

Após deploy, configure:

- [ ] **Google Analytics**
  - Crie property em https://analytics.google.com
  - Adicione script no `index.html`
  
- [ ] **Vercel Analytics**
  - Ative em Project Settings → Analytics
  
- [ ] **Sentry** (Error Tracking)
  - Configure em https://sentry.io
  - Adicione SDK no projeto

### Performance Monitoring

- [ ] **Lighthouse CI** (GitHub Actions)
- [ ] **Web Vitals** tracking
- [ ] **Uptime monitoring** (UptimeRobot, Better Stack)

---

## 🎯 Próximos Passos

Depois do primeiro deploy:

1. **Domínio Customizado**
   - Compre domínio (Namecheap, Google Domains)
   - Configure DNS no Vercel/Netlify
   - Aguarde propagação (24-48h)

2. **CI/CD Automático**
   - Já está configurado! 🎉
   - Cada push em `main` → deploy automático

3. **Integrar Backend Real**
   - Substitua mocks em `/api/client.ts`
   - Configure CORS no backend
   - Adicione `VITE_API_URL` real

4. **PWA (Progressive Web App)**
   - Adicione `manifest.json`
   - Configure Service Worker
   - Ative "Add to Home Screen"

5. **Staging Environment**
   - Branch `develop` → deploy de staging
   - Teste features antes de produção

---

## 📞 Suporte

### Vercel
- 📖 Docs: https://vercel.com/docs
- 💬 Discord: https://vercel.com/discord
- 📧 Support: support@vercel.com

### Netlify
- 📖 Docs: https://docs.netlify.com
- 💬 Forum: https://answers.netlify.com
- 📧 Support: support@netlify.com

---

## ✅ Deploy Completo!

Quando todos os itens estiverem marcados:

```
🎉 PARABÉNS! Seu app está no ar!

Compartilhe:
🌐 https://nomadhub.vercel.app
🐦 Twitter: "Acabei de lançar o NomadHub! 🚀"
💼 LinkedIn: Post sobre o projeto
🧑‍💻 Dev.to: Escreva sobre o processo
```

---

Feito com 💙 no NomadHub
