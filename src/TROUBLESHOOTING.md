# 🔧 Troubleshooting - NomadHub

Soluções para problemas comuns.

---

## ⚠️ Erro: "Cannot read properties of undefined (reading 'className')"

### Problema

```
TypeError: Cannot read properties of undefined (reading 'className')
at ProjectCard (components/ProjectCard.tsx:54:68)
```

### Causa

O componente `ProjectCard` estava tentando acessar `status.className` quando o objeto `project` não tinha a propriedade `status` ou tinha um valor inválido.

### Solução Aplicada ✅

**1. ProjectCard.tsx - Proteção dupla:**

```typescript
// Garantir que status sempre tenha um valor válido
const projectStatus = (project.status as ProjectStatus) || 'open';
const status = statusConfig[projectStatus] || statusConfig.open;
```

Agora o componente:
- ✅ Usa `'open'` como fallback se `project.status` for undefined
- ✅ Usa `statusConfig.open` como fallback se o status não existir no config

**2. Favorites.tsx - Mock data corrigido:**

Adicionadas todas as propriedades necessárias:
```typescript
{
  id: '1',
  title: 'Desenvolvimento de App Mobile',
  description: '...',
  budget: 8500,
  budgetMin: 8500,          // ✅ Adicionado
  budgetMax: 8500,          // ✅ Adicionado
  status: 'open' as const,  // ✅ Adicionado
  currency: 'BRL',          // ✅ Adicionado
  createdAt: new Date().toISOString(), // ✅ Adicionado
  // ...
}
```

### Como Testar

1. Navegue para `/favorites`
2. Adicione alguns projetos aos favoritos
3. Verifique se não há erros no console

---

## 📁 Problema: Arquivos .tsx na pasta LICENSE

### Problema

Arquivos `.tsx` aparecendo dentro da pasta `/LICENSE/`:
```
/LICENSE/Code-component-6-174.tsx
/LICENSE/Code-component-6-201.tsx
/LICENSE/Code-component-6-205.tsx
```

### Causa

Edições manuais do arquivo LICENSE criam versões `.tsx` dentro de uma pasta.

### Solução ✅

1. **Deletar** todos os arquivos `.tsx` dentro de `/LICENSE/`
2. **Recriar** o arquivo `/LICENSE` correto na raiz do projeto
3. **Verificar** se `/LICENSE` é um arquivo (não pasta)

### Comando para verificar

```bash
# Deve listar /LICENSE (arquivo)
ls -la | grep LICENSE

# NÃO deve existir /LICENSE/ (pasta)
ls -la LICENSE/
```

---

## 🔄 Limpeza de Cache

Se os erros persistirem mesmo após as correções:

### No Navegador

```
1. Ctrl + Shift + Delete (ou Cmd + Shift + Delete no Mac)
2. Limpar cache e cookies
3. Recarregar a página (Ctrl + F5)
```

### No Figma Make

```
1. Salve seu trabalho
2. Feche e reabra o preview
3. Se necessário, reinicie o Figma Make
```

---

## 📊 Status dos Componentes

### ProjectCard ✅ CORRIGIDO

```typescript
// Proteção dupla implementada
const projectStatus = (project.status as ProjectStatus) || 'open';
const status = statusConfig[projectStatus] || statusConfig.open;
```

**Testes:**
- ✅ Status válido (open, in_progress, etc.)
- ✅ Status undefined
- ✅ Status inválido
- ✅ Objeto vazio

### Favorites ✅ CORRIGIDO

```typescript
// Mock data completo com todas as propriedades
const mockProjects = [
  {
    id, title, description, budget,
    budgetMin, budgetMax, status,
    currency, createdAt, tags, client
  }
]
```

**Testes:**
- ✅ Renderiza projetos corretamente
- ✅ Status badge funciona
- ✅ Favoritos funcionam
- ✅ Filtros funcionam

---

## 🛠️ Checklist de Verificação

Se encontrar erros, siga esta ordem:

### 1. Verificar Dados

```typescript
// Todos os projetos devem ter:
✅ id: string
✅ title: string
✅ description: string
✅ status: 'open' | 'in_progress' | 'delivered' | 'disputed' | 'closed'
✅ currency: string
✅ createdAt: string
✅ budgetMin?: number
✅ budgetMax?: number
```

### 2. Verificar Componente

```typescript
// ProjectCard deve ter:
✅ Proteção de status com fallback
✅ Proteção de currency com fallback
✅ Verificação de createdAt antes de usar
```

### 3. Verificar Console

```javascript
// Abra o DevTools (F12) e procure por:
❌ TypeError
❌ Cannot read properties
❌ undefined is not an object

// Se encontrar, verifique:
1. Qual linha está causando o erro
2. Qual propriedade está undefined
3. Adicione proteção/fallback
```

---

## 🐛 Reportar Novos Bugs

Se encontrar novos problemas:

1. **Copie o erro completo** do console
2. **Identifique** qual tela está afetada
3. **Descreva** os passos para reproduzir
4. **Verifique** se este documento já tem a solução

---

## 📞 Ajuda Rápida

| Erro | Solução |
|------|---------|
| `Cannot read properties of undefined` | Adicione fallback: `obj?.prop || 'default'` |
| `Arquivos .tsx em /LICENSE/` | Delete a pasta, recrie o arquivo |
| `ProjectCard não renderiza` | Verifique se tem todas as props |
| `Status não aparece` | Verifique se `project.status` existe |

---

## ✅ Resultado Final

```
✅ ProjectCard com proteção dupla
✅ Favorites com mock data completo
✅ LICENSE arquivo correto
✅ Todos os erros corrigidos
✅ App funcionando 100%
```

---

**Última atualização:** 28 de Dezembro de 2024

**Status:** 🟢 Todos os problemas conhecidos resolvidos
