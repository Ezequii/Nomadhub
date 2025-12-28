# ⚡ COPIE E COLE - Deploy em 3 Minutos

## 🚀 COMANDOS PARA COPIAR E COLAR:

### Passo 1: Limpar tudo
```bash
rm -rf build dist node_modules
```

### Passo 2: Instalar e buildar
```bash
npm install && npm run build
```

### Passo 3: Verificar
```bash
ls -la dist/
```

**Deve mostrar:**
- ✅ `index.html`
- ✅ `assets/` (pasta)

### Passo 4: Commit e Push
```bash
git add .
git commit -m "fix: corrigir pasta de saída para dist"
git push origin main
```

---

## ⚙️ VERCEL DASHBOARD:

1. **Acesse:** https://vercel.com/dashboard
2. **Settings → Build & Output Settings**
3. **Configure:**
   - Output Directory: `dist`
4. **Save**

---

## 🔄 REDEPLOY:

**Deployments → ... → Redeploy** (desmarque cache)

**OU**

Aguarde auto-deploy após push (1-2 min)

---

## ✅ PRONTO!

URL: `https://seu-projeto.vercel.app`

---

**⏱️ Tempo: 3 minutos**
