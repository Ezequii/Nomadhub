# 🛠️ Scripts de Automação - NomadHub

Scripts para facilitar o setup e deploy do projeto.

---

## 📜 Scripts Disponíveis

### 1. setup-git.sh (Mac/Linux)
### 2. setup-git.bat (Windows)

Ambos fazem a mesma coisa: automatizam completamente o processo de subir o código no GitHub!

---

## 🐧 Mac/Linux - setup-git.sh

### O que faz:

```
✅ Verifica se Git está instalado
✅ Inicializa repositório Git
✅ Configura usuário (se necessário)
✅ Adiciona todos os arquivos
✅ Cria commit inicial
✅ Pede URL do repositório GitHub
✅ Configura remote
✅ Faz push para GitHub
✅ Mostra mensagem de sucesso
```

### Como usar:

```bash
# 1. Dar permissão de execução
chmod +x scripts/setup-git.sh

# 2. Executar
./scripts/setup-git.sh

# 3. Seguir as instruções
```

### Exemplo de execução:

```bash
$ ./scripts/setup-git.sh

🌍 NomadHub - Setup Git
=======================

✅ Git encontrado: git version 2.39.0

📦 Inicializando repositório Git...
✅ Repositório inicializado!

📂 Adicionando arquivos...
✅ Arquivos adicionados!

💾 Criando commit inicial...
✅ Commit criado!

🐙 Configurando remote do GitHub...

Antes de continuar, crie um repositório no GitHub:
1. Acesse: https://github.com/new
2. Nome: nomadhub
3. NÃO marque 'Initialize with README'
4. Clique em 'Create repository'

Cole a URL do repositório: https://github.com/seu-usuario/nomadhub.git
✅ Remote configurado!

🌿 Configurando branch main...
✅ Branch configurada!

🚀 Fazendo push para o GitHub...

Você precisará autenticar:
- Username: seu_usuario_github
- Password: use um Personal Access Token

Enumerating objects: 52, done.
Writing objects: 100% (52/52), done.
✅✅✅ SUCESSO! ✅✅✅

🎉 Seu código está no GitHub!
```

---

## 🪟 Windows - setup-git.bat

### O que faz:

Exatamente o mesmo que `setup-git.sh`, mas formatado para Windows.

### Como usar:

```bash
# No Command Prompt ou PowerShell
scripts\setup-git.bat

# Ou simplesmente clique duas vezes no arquivo
```

### Exemplo de execução:

```cmd
C:\nomadhub> scripts\setup-git.bat

🌍 NomadHub - Setup Git
=======================

✅ Git encontrado
git version 2.39.0.windows.1

📦 Inicializando repositório Git...
✅ Repositório inicializado!

📂 Adicionando arquivos...
✅ Arquivos adicionados!

💾 Criando commit inicial...
✅ Commit criado!

🐙 Configurando remote do GitHub...

Antes de continuar, crie um repositório no GitHub:
1. Acesse: https://github.com/new
2. Nome: nomadhub
3. NÃO marque 'Initialize with README'
4. Clique em 'Create repository'

Cole a URL do repositório: https://github.com/seu-usuario/nomadhub.git
✅ Remote configurado!

🌿 Configurando branch main...
✅ Branch configurada!

🚀 Fazendo push para o GitHub...
✅✅✅ SUCESSO! ✅✅✅

🎉 Seu código está no GitHub!

Pressione qualquer tecla para continuar...
```

---

## 🔑 Personal Access Token

Ambos os scripts vão pedir autenticação. **NÃO use sua senha do GitHub!**

### Como criar PAT:

1. **Acesse:** https://github.com/settings/tokens
2. **Clique:** "Generate new token" → "Generate new token (classic)"
3. **Preencha:**
   - Note: `NomadHub Deploy`
   - Expiration: `90 days` (ou No expiration)
   - **Scopes:** Marque **`repo`** (todos os sub-itens)
4. **Clique:** "Generate token"
5. **Copie** o token (aparece só uma vez!)
6. **Use como senha** quando o script pedir

### Exemplo:

```
Username: seu_usuario_github
Password: ghp_1234567890abcdefghijklmnopqrstuvwxyz
           ↑↑↑ Use o PAT aqui, não sua senha!
```

---

## ⚠️ Pré-requisitos

### Antes de executar os scripts:

1. ✅ **Git instalado**
   ```bash
   git --version
   # Se não estiver instalado: https://git-scm.com/downloads
   ```

2. ✅ **Repositório GitHub criado**
   - Acesse: https://github.com/new
   - Crie repositório `nomadhub`
   - **NÃO** marque "Initialize with README"

3. ✅ **Na pasta do projeto**
   ```bash
   cd nomadhub
   # Você deve estar na raiz do projeto
   ```

---

## 🐛 Problemas Comuns

### Script não executa (Mac/Linux)

```bash
# Erro: Permission denied
./scripts/setup-git.sh

# Solução: Dar permissão
chmod +x scripts/setup-git.sh
./scripts/setup-git.sh
```

### Git não reconhecido

```bash
# Erro: 'git' is not recognized...

# Solução:
1. Instale o Git: https://git-scm.com/downloads
2. Reinicie o terminal
3. Execute novamente
```

### Push falha com erro 403

```bash
# Erro: remote: Permission to ... denied

# Solução:
1. Use Personal Access Token (não senha)
2. Verifique se o repositório existe
3. Verifique se a URL está correta
```

### "Repository not found"

```bash
# Erro: fatal: repository '...' not found

# Solução:
1. Crie o repositório no GitHub primeiro
2. Verifique a URL (https://github.com/USER/REPO.git)
3. Certifique-se que USER está correto
```

---

## 🔧 Personalização

### Editar mensagem de commit:

Abra o script e encontre:

```bash
# setup-git.sh (linha ~45)
git commit -m "feat: initial commit - NomadHub MVP completo"

# Altere para:
git commit -m "Sua mensagem aqui"
```

### Adicionar etapas extras:

```bash
# Adicione antes do push:
npm install
npm run build
npm run test
```

---

## 📋 O que os scripts fazem exatamente

### Passo a passo:

```bash
1. git --version
   # Verifica se Git está instalado

2. git init
   # Inicializa repositório Git local

3. git config --global user.name "Seu Nome"
   git config --global user.email "seu@email.com"
   # Configura identidade (só se não configurado)

4. git add .
   # Adiciona todos os arquivos ao stage

5. git commit -m "feat: initial commit..."
   # Cria o commit inicial

6. git remote add origin URL
   # Conecta ao repositório GitHub

7. git branch -M main
   # Renomeia branch para 'main'

8. git push -u origin main
   # Envia código para GitHub
```

---

## 🎯 Quando usar

### Use os scripts quando:

- ✅ É a primeira vez subindo no GitHub
- ✅ Quer automatizar o processo
- ✅ Não tem experiência com Git
- ✅ Quer economizar tempo

### NÃO use os scripts quando:

- ❌ Já tem repositório Git inicializado
- ❌ Quer controle manual total
- ❌ Tem workflow Git específico
- ❌ Já configurou remote

---

## 🔄 Alternativa Manual

Se preferir fazer manualmente:

```bash
# 1. Inicializar
git init

# 2. Adicionar arquivos
git add .

# 3. Commit
git commit -m "feat: initial commit - NomadHub MVP"

# 4. Conectar ao GitHub
git remote add origin https://github.com/SEU_USUARIO/nomadhub.git

# 5. Renomear branch
git branch -M main

# 6. Push
git push -u origin main
```

Veja o guia completo: [GITHUB_QUICK_GUIDE.md](../GITHUB_QUICK_GUIDE.md)

---

## 📊 Comparação

| Método | Tempo | Dificuldade | Controle |
|--------|-------|-------------|----------|
| **Scripts automáticos** | 2 min | Fácil | Baixo |
| **Manual** | 5 min | Médio | Alto |
| **GitHub Desktop** | 3 min | Fácil | Médio |

---

## 🎉 Próximos Passos

Depois de executar os scripts:

1. ✅ **Verificar no GitHub**
   - Acesse: https://github.com/SEU_USUARIO/nomadhub
   - Confira se todos os arquivos estão lá

2. ✅ **Fazer deploy**
   - Siga: [EXPORT_AND_DEPLOY.md](../EXPORT_AND_DEPLOY.md)
   - Ou use: [START_HERE.md](../START_HERE.md)

3. ✅ **Atualizar links**
   - Edite: [QUICK_LINKS.md](../QUICK_LINKS.md)
   - Adicione suas URLs

---

## 📞 Suporte

### Para problemas com os scripts:

1. Verifique os [Problemas Comuns](#-problemas-comuns)
2. Consulte [GITHUB_QUICK_GUIDE.md](../GITHUB_QUICK_GUIDE.md)
3. Execute manualmente os comandos um por um

### Links úteis:

- Git Docs: https://git-scm.com/doc
- GitHub Help: https://docs.github.com
- Personal Access Tokens: https://github.com/settings/tokens

---

## 📜 Licença

Estes scripts fazem parte do projeto NomadHub e estão sob licença MIT.

---

**Dica:** Se você nunca usou Git antes, os scripts são a maneira mais fácil de começar! 🚀

---

Feito com 💙 no NomadHub
