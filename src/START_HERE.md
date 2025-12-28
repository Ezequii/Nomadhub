# 🎯 COMECE AQUI - Deploy NomadHub

**Objetivo:** Colocar o NomadHub no ar em produção em 3 passos simples!

---

## 📦 PASSO 1: Exportar do Figma Make

### Como exportar:

1. **No Figma Make**, procure o botão **"Export"** ou **"Download"**
2. Baixe o projeto como ZIP
3. Extraia a pasta em seu computador
4. Abra a pasta no terminal/cmd

**OU** copie todos os arquivos manualmente se não houver botão de export.

---

## 🐙 PASSO 2: Subir no GitHub

### Opção A: Script Automático (RECOMENDADO)

**Mac/Linux:**
```bash
chmod +x scripts/setup-git.sh
./scripts/setup-git.sh
```

**Windows:**
```bash
scripts\setup-git.bat
```

O script fará tudo automaticamente! ✨

### Opção B: Manual

```bash
# 1. Inicializar Git
git init
git add .
git commit -m "feat: initial commit - NomadHub MVP"

# 2. Criar repositório no GitHub
# Acesse: https://github.com/new
# Nome: nomadhub
# Clique em "Create repository"

# 3. Conectar e fazer push (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/nomadhub.git
git branch -M main
git push -u origin main
```

**📖 Problemas?** Veja [GITHUB_QUICK_GUIDE.md](./GITHUB_QUICK_GUIDE.md)

---

## 🚀 PASSO 3: Deploy no Vercel

### 3 minutos para colocar no ar:

1. **Acesse:** https://vercel.com/signup
2. **Faça login** com sua conta do GitHub
3. **Clique em:** "Add New Project"
4. **Selecione:** repositório `nomadhub`
5. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Clique em:** "Deploy"

**🎉 Pronto! Em 1-2 minutos seu app estará no ar!**

Você receberá uma URL como: `https://nomadhub.vercel.app`

**📖 Instruções detalhadas:** [EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md)

---

## ✅ Checklist Final

Depois do deploy:

- [ ] App carrega sem erro 404
- [ ] Navegação entre páginas funciona
- [ ] Testado em mobile (DevTools responsive)
- [ ] Console sem erros críticos

Use o checklist completo: [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)

---

## 🔗 Seus Links

Depois do deploy, preencha aqui:

```
🌐 App: https://nomadhub.vercel.app
🧪 GitHub: https://github.com/SEU_USUARIO/nomadhub
📊 Vercel: https://vercel.com/SEU_USUARIO/nomadhub
```

---

## 📚 Documentação Completa

- 🚀 **[EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md)** - Guia completo de deploy
- 🐙 **[GITHUB_QUICK_GUIDE.md](./GITHUB_QUICK_GUIDE.md)** - Comandos Git
- 📡 **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Endpoints da API
- ✅ **[DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)** - Checklist pré/pós deploy
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir
- 📖 **[README.md](./README.md)** - Visão geral do projeto

---

## 🆘 Precisa de Ajuda?

### Problemas Comuns

**"Git não é reconhecido"**
- Instale o Git: https://git-scm.com/downloads

**"Build falha no Vercel"**
- Rode `npm run build` localmente primeiro
- Verifique os logs de erro no Vercel

**"App em branco após deploy"**
- Verifique console do navegador (F12)
- Certifique-se que `vercel.json` existe

**"404 em rotas"**
- Já configurado! Verifique se `vercel.json` tem redirects

### Onde Buscar Ajuda

1. **Documentação completa:** [EXPORT_AND_DEPLOY.md](./EXPORT_AND_DEPLOY.md)
2. **Vercel Docs:** https://vercel.com/docs
3. **GitHub Issues:** Crie uma issue no repositório

---

## 🎯 Próximos Passos

Depois do deploy:

1. ✅ **Domínio Customizado**
   - Compre em Namecheap, Google Domains
   - Configure no Vercel (Settings → Domains)

2. ✅ **Integrar API Real**
   - Substitua mocks em `/api/client.ts`
   - Configure `VITE_API_URL` no Vercel

3. ✅ **Analytics**
   - Ative Vercel Analytics (grátis)
   - Ou adicione Google Analytics

4. ✅ **PWA**
   - Adicione manifest.json
   - Configure Service Worker
   - Permita "Add to Home Screen"

---

## 🎉 Parabéns!

Em 3 passos você colocou o NomadHub no ar! 🚀

**Compartilhe seu sucesso:**
- 🐦 Twitter: "Acabei de fazer deploy do NomadHub!"
- 💼 LinkedIn: Post sobre o projeto
- 🧑‍💻 Dev.to: Escreva sobre o processo

---

**Desenvolvido com ❤️ para nômades digitais** 🌍

Dúvidas? Abra uma issue no GitHub!
