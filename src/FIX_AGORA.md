# ⚡ FIX AGORA - 5 Comandos

## 🔥 PROBLEMA: Gera build/ ao invés de dist/

## ✅ SOLUÇÃO: 5 comandos

```bash
# 1. LIMPAR TUDO
rm -rf build dist .vite node_modules package-lock.json

# 2. INSTALAR
npm install

# 3. BUILDAR
npm run build

# 4. VERIFICAR (deve aparecer dist/)
ls -la dist/

# 5. COMMIT E PUSH
git add .
git commit -m "fix: forçar output dist"
git push origin main
```

---

## ⚙️ NO VERCEL:

1. **Settings → Output Directory:** `dist`
2. **Redeploy SEM CACHE**

---

## ✅ LOGS DEVEM MOSTRAR:

```
dist/index.html        ← SUCESSO!
dist/assets/...        ← SUCESSO!
```

**NÃO deve aparecer** `build/`

---

## 📚 GUIA COMPLETO:

[CORRECAO_BUILD_DIST.md](./CORRECAO_BUILD_DIST.md)

---

**⏱️ 5 minutos**
