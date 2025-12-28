# 🔧 VERCEL TROUBLESHOOTING

## ❌ ERRO: "No output directory named 'dist' found"

### **Causa:**
O Vercel não está encontrando a pasta `dist` após o build.

### **Soluções:**

#### **Solução 1: Configurar no Dashboard**
1. Acesse https://vercel.com/dashboard
2. Clique no seu projeto
3. Settings → General → Build & Development Settings
4. Configure:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Salve e faça **Redeploy**

#### **Solução 2: Verificar vercel.json**
Certifique-se que o arquivo `/vercel.json` contém:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ]
}
```

#### **Solução 3: Testar build localmente**
```bash
# Limpe tudo primeiro
rm -rf node_modules dist

# Reinstale
npm install

# Teste o build
npm run build

# Deve criar a pasta dist/
ls dist/
```

Se o build funcionar localmente mas não no Vercel:
- Verifique a versão do Node (deve ser >= 18)
- Veja os logs do deploy no Vercel para o erro específico

---

## ❌ ERRO: Build falha com "TypeScript errors"

### **Causa:**
Erros de tipo no código.

### **Solução:**
```bash
# Execute o type-check localmente
npm run type-check

# Corrija todos os erros mostrados
# Depois tente o build novamente
npm run build
```

**Dica**: Adicione `--force` ao build se quiser ignorar erros de tipo (NÃO RECOMENDADO):
```json
"build": "tsc --noEmit --skipLibCheck && vite build"
```

---

## ❌ ERRO: 404 em rotas (ex: /projects, /profile)

### **Causa:**
O servidor não está redirecionando rotas para o React Router.

### **Solução:**
Certifique-se que o `/vercel.json` tem a configuração de rewrites:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Isso garante que TODAS as rotas retornem o `index.html`, deixando o React Router cuidar da navegação.

---

## ❌ ERRO: Assets não carregam (imagens, SVGs, etc)

### **Causa:**
Caminhos incorretos para assets.

### **Solução:**

#### Para imagens públicas:
```tsx
// ✅ CORRETO - na pasta public/
<img src="/logo.svg" alt="Logo" />

// ❌ ERRADO
<img src="./logo.svg" alt="Logo" />
```

#### Para imports de imagens:
```tsx
// ✅ CORRETO - com import
import logo from './assets/logo.svg';
<img src={logo} alt="Logo" />
```

#### Para Lucide icons:
```tsx
// ✅ CORRETO
import { Home } from 'lucide-react';
<Home className="w-6 h-6" />
```

---

## ❌ ERRO: "Failed to resolve module"

### **Causa:**
Imports incorretos ou dependências faltando.

### **Solução:**

#### 1. Verifique se a dependência está instalada:
```bash
npm install nome-do-pacote
```

#### 2. Verifique imports relativos:
```tsx
// ✅ CORRETO
import { Button } from '../components/ui/button';

// ❌ ERRADO (sem extensão, sem caminho correto)
import { Button } from 'button';
```

#### 3. Limpe o cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ❌ ERRO: "Out of memory" durante build

### **Causa:**
Build muito grande ou muitas dependências.

### **Solução:**

#### 1. Configure mais memória no Vercel:
No `vercel.json`:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist",
        "maxLambdaSize": "50mb"
      }
    }
  ]
}
```

#### 2. Otimize o build no `vite.config.ts`:
```ts
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false, // Desabilita sourcemaps
    minify: 'esbuild', // Minificação mais rápida
    chunkSizeWarningLimit: 1000,
  },
});
```

#### 3. Use code splitting:
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'router': ['react-router-dom'],
        'ui': ['lucide-react'],
      },
    },
  },
}
```

---

## ❌ ERRO: Dark mode não funciona

### **Causa:**
Context não está envolvendo a aplicação ou localStorage não está disponível.

### **Solução:**

#### 1. Verifique se o ThemeContext está no `main.tsx`:
```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

#### 2. Use estratégia SSR-safe:
```tsx
const [isDark, setIsDark] = useState(() => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('theme') === 'dark';
});
```

---

## ❌ ERRO: Variáveis de ambiente não funcionam

### **Causa:**
Variáveis não configuradas ou sem prefixo `VITE_`.

### **Solução:**

#### 1. No Vercel Dashboard:
- Settings → Environment Variables
- Adicione: `VITE_API_URL` = `https://api.exemplo.com`
- Redeploy

#### 2. No código:
```tsx
// ✅ CORRETO
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ ERRADO (sem VITE_)
const apiUrl = process.env.API_URL;
```

#### 3. No `.env.local` (desenvolvimento):
```
VITE_API_URL=http://localhost:3000
```

---

## ❌ ERRO: "Cannot find module 'motion/react'"

### **Causa:**
Pacote Framer Motion com namespace novo.

### **Solução:**
```bash
npm install framer-motion
```

Depois use:
```tsx
import { motion } from 'framer-motion';
```

Ou se for o novo namespace:
```tsx
import { motion } from 'motion/react';
```

---

## ⚡ OTIMIZAÇÕES PÓS-DEPLOY

### **1. Habilitar Analytics**
- Dashboard → Analytics → Enable

### **2. Configurar Cache**
No `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### **3. Comprimir Assets**
No `vite.config.ts`:
```ts
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' })
  ],
});
```

---

## 📊 LOGS E DEBUGGING

### **Ver logs do build:**
1. Vercel Dashboard
2. Deployments
3. Clique no deployment com erro
4. Veja a aba "Building"

### **Ver logs runtime:**
1. Vercel Dashboard
2. Deployments
3. Clique no deployment
4. Veja a aba "Functions" (se usar serverless)

### **Testar deployment específico:**
Cada deployment tem uma URL única:
```
https://nomadhub-abc123.vercel.app
```

---

## 🆘 COMANDOS DE EMERGÊNCIA

```bash
# Limpar tudo e recomeçar
rm -rf node_modules package-lock.json dist
npm install
npm run build

# Verificar versão do Node
node -v  # Deve ser >= 18

# Atualizar todas as dependências
npm update

# Reinstalar uma dependência específica
npm uninstall nome-pacote
npm install nome-pacote

# Build verbose (mais detalhes)
npm run build -- --debug

# Forçar deploy limpo no Vercel
vercel --prod --force
```

---

## 📞 AJUDA ADICIONAL

Se nenhuma solução funcionou:

1. **Vercel Discord**: https://vercel.com/discord
2. **Vercel Discussions**: https://github.com/vercel/vercel/discussions
3. **Stack Overflow**: Tag `vercel`

Ao pedir ajuda, inclua:
- URL do deployment
- Logs completos do erro
- Versão do Node
- Conteúdo do `vercel.json` e `package.json`

---

## ✅ CHECKLIST FINAL

Antes de pedir ajuda, confirme:

- [ ] `npm install` funciona sem erros
- [ ] `npm run type-check` passa
- [ ] `npm run build` cria `dist/`
- [ ] `npm run preview` funciona localmente
- [ ] Node.js >= 18
- [ ] `vercel.json` configurado corretamente
- [ ] Todas as dependências no `package.json`
- [ ] Código commitado no GitHub
- [ ] Sem arquivos `.env` commitados

Se tudo estiver ✅, o deploy deve funcionar! 🚀
