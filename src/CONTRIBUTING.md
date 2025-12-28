# 🤝 Contribuindo para o NomadHub

Obrigado por considerar contribuir com o NomadHub! Este documento fornece diretrizes para contribuições.

---

## 📋 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub (botão "Fork")

# Clone seu fork
git clone https://github.com/SEU_USUARIO/nomadhub.git
cd nomadhub

# Adicione o upstream
git remote add upstream https://github.com/ORIGINAL_USUARIO/nomadhub.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature/fix
git checkout -b feature/minha-feature
```

### 3. Faça suas Alterações

- Siga o estilo de código do projeto
- Adicione comentários quando necessário
- Teste suas alterações localmente

```bash
# Teste
npm run dev

# Build
npm run build

# Type check
npm run type-check
```

### 4. Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: adiciona funcionalidade X"
```

**Tipos de commit:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, ponto-e-vírgula, etc
- `refactor`: Refatoração de código
- `test`: Adição de testes
- `chore`: Tarefas de build, configuração

### 5. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/minha-feature
```

No GitHub:
1. Vá para seu fork
2. Clique em "Compare & pull request"
3. Preencha o template de PR
4. Aguarde review

---

## 🎯 Diretrizes de Código

### TypeScript
- Use tipos explícitos quando possível
- Evite `any`
- Prefira `interface` a `type` para objetos

### React
- Use componentes funcionais
- Prefira hooks a classes
- Mantenha componentes pequenos e focados
- Use `memo()` para componentes pesados

### Estilo
- Use Tailwind CSS (não CSS modules)
- Não use classes de font-size/weight (globals.css define)
- Mobile-first (min-width breakpoints)

### Nomenclatura
- Componentes: `PascalCase` (`ProjectCard.tsx`)
- Funções: `camelCase` (`getUserData()`)
- Constantes: `UPPER_SNAKE_CASE` (`API_BASE_URL`)
- Arquivos: `kebab-case` ou `PascalCase` (seja consistente)

---

## 🐛 Reportar Bugs

Antes de reportar:
1. Verifique se já não existe uma issue
2. Teste em desenvolvimento (`npm run dev`)
3. Teste na última versão

Ao reportar, inclua:
- **Descrição clara** do bug
- **Passos para reproduzir**
- **Comportamento esperado** vs **atual**
- **Screenshots** (se aplicável)
- **Ambiente**: OS, navegador, versão do Node

**Template:**
```markdown
**Descrição**
[Descrição clara do bug]

**Passos para reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento esperado**
[O que deveria acontecer]

**Screenshots**
[Se aplicável]

**Ambiente**
- OS: [ex: macOS 13.0]
- Navegador: [ex: Chrome 120]
- Node: [ex: 18.17.0]
```

---

## ✨ Sugerir Features

Antes de sugerir:
1. Verifique o roadmap no README
2. Verifique se já não existe uma issue/discussion

Ao sugerir, inclua:
- **Problema** que a feature resolve
- **Solução proposta**
- **Alternativas** consideradas
- **Mockups/exemplos** (se aplicável)

---

## 🔍 Code Review

Todos os PRs passam por review. O que buscamos:

### ✅ Checklist do PR
- [ ] Código funciona localmente
- [ ] Build passa (`npm run build`)
- [ ] Types corretos (`npm run type-check`)
- [ ] Sem console.logs desnecessários
- [ ] Commits seguem padrão
- [ ] Descrição do PR clara

### 📝 Descrição do PR

**Bom exemplo:**
```markdown
## Descrição
Adiciona filtro por categoria na página de Projetos

## Mudanças
- Componente `CategoryFilter` criado
- Estado `selectedCategory` adicionado
- API client atualizado com query params

## Screenshots
[imagem do filtro funcionando]

## Checklist
- [x] Testado em mobile
- [x] Testado em desktop
- [x] Build passa
```

---

## 🎨 Sugestões de Contribuição

### Iniciantes
- 📝 Melhorar documentação
- 🐛 Corrigir typos
- 🎨 Ajustar espaçamentos/cores
- ✅ Adicionar testes

### Intermediário
- 🧩 Criar componentes reutilizáveis
- 📊 Adicionar gráficos/dashboards
- 🔍 Implementar busca/filtros
- 📱 Melhorar responsividade

### Avançado
- 🤖 Integrar APIs reais
- 🔐 Implementar autenticação
- 💾 Adicionar cache/estado global
- 🚀 Otimizar performance

---

## 🌳 Fluxo de Branches

```
main                    # Produção (protegida)
  ↑
develop                 # Desenvolvimento
  ↑
feature/nova-feature    # Suas features
```

**Regras:**
- `main` → Apenas via PR, sempre estável
- `develop` → Código em desenvolvimento
- `feature/*` → Novas funcionalidades
- `fix/*` → Correções de bugs
- `hotfix/*` → Correções urgentes em produção

---

## 📦 Publicar Release

Apenas mantenedores:

```bash
# Atualizar versão
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Push tags
git push --follow-tags

# GitHub Actions faz deploy automático
```

---

## 🙋 Dúvidas?

- 💬 **GitHub Discussions**: Para perguntas gerais
- 🐛 **GitHub Issues**: Para bugs e features
- 📧 **Email**: hello@nomadhub.com
- 💼 **Discord**: https://discord.gg/nomadhub

---

## 📜 Código de Conduta

### Nosso Compromisso

Estamos comprometidos em fornecer uma experiência acolhedora e inspiradora para todos.

### Comportamento Esperado

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade

### Comportamento Inaceitável

- Linguagem ofensiva ou discriminatória
- Assédio público ou privado
- Trolling ou comentários depreciativos

### Reporte

Violações podem ser reportadas em: conduct@nomadhub.com

---

## 🏆 Reconhecimento

Contribuidores são adicionados automaticamente ao README!

Top contributors ganham:
- 🎖️ Badge de contributor
- 📣 Mention em releases
- ✨ Acesso early-access a features

---

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT.

---

**Obrigado por contribuir com o NomadHub! 💙**

Juntos estamos construindo a melhor plataforma para nômades digitais! 🌍
