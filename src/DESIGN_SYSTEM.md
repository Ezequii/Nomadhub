# 🎨 NomadHub Design System

## Identidade Visual Completa

A identidade visual do NomadHub foi criada para transmitir **simplicidade, confiança, modernidade** e foco em freelancers e contratantes globais.

---

## 1. 🏷️ Logo

### Conceito
Logo minimalista que combina um ícone de globo (simbolizando nomadismo digital e conexão global) com tipografia limpa e moderna.

### Variantes

#### **Logo Completo** (variant="full")
- Ícone gradiente azul-roxo em container arredondado
- Nome "NomadHub" em negrito
- Tagline "Trabalho remoto" em texto menor
- **Uso**: Onboarding, splash screen, cabeçalhos principais

#### **Logo Ícone** (variant="icon")
- Apenas o ícone de globo em container gradiente
- **Uso**: Favicon, app icon, navegação mobile, loading states

#### **Logo Minimal** (variant="minimal")
- Apenas o nome "NomadHub" com gradiente
- **Uso**: Headers compactos, assinaturas, footers

### Tamanhos Disponíveis
- `sm`: 32px (mobile, badges)
- `md`: 48px (padrão, headers)
- `lg`: 64px (landing pages)
- `xl`: 80px (splash screens)

### Implementação
```tsx
import { Logo } from '@/components/Logo';

// Logo completo
<Logo variant="full" size="md" />

// Apenas ícone
<Logo variant="icon" size="sm" />

// Minimal
<Logo variant="minimal" size="md" />
```

---

## 2. 🎨 Paleta de Cores

### Cores Primárias

#### **Azul** (Primary - Confiança & Tecnologia)
```css
--blue-50: #eff6ff;   /* Backgrounds suaves */
--blue-100: #dbeafe;  /* Hover states */
--blue-500: #3b82f6;  /* CTAs principais */
--blue-600: #2563eb;  /* Botões hover */
--blue-900: #1e3a8a;  /* Textos de destaque */
```

**Uso**:
- CTAs principais
- Links e navegação
- Estados de foco
- Indicadores de confiança (Trust Score)

#### **Verde** (Secondary - Crescimento & Sucesso)
```css
--green-50: #f0fdf4;   /* Success backgrounds */
--green-100: #dcfce7;  /* Badges de sucesso */
--green-500: #22c55e;  /* Sucesso ativo */
--green-600: #16a34a;  /* Botões de confirmação */
```

**Uso**:
- Mensagens de sucesso
- Indicadores positivos
- Ganhos e receitas
- Status "Concluído" ou "Ativo"

### Cores Secundárias

#### **Roxo** (Accent - Premium & Pro)
```css
--purple-500: #a855f7;  /* Elementos Pro */
--purple-600: #9333ea;  /* Gradientes premium */
```

**Uso**:
- Features Pro/Premium
- Upgrade prompts
- Badges especiais
- Gamificação avançada

#### **Âmbar** (Warning - Atenção)
```css
--warning: #f59e0b;       /* Alertas */
--warning-light: #fef3c7; /* Backgrounds de alerta */
```

**Uso**:
- Avisos importantes
- Saldos pendentes
- Prazos próximos

#### **Vermelho** (Error - Erros)
```css
--error: #ef4444;       /* Mensagens de erro */
--error-light: #fee2e2; /* Backgrounds de erro */
```

**Uso**:
- Mensagens de erro
- Validações falhadas
- Ações destrutivas
- Disputas

### Escala de Cinza

```css
--gray-50: #f9fafb;   /* Backgrounds suaves */
--gray-100: #f3f4f6;  /* Inputs, cards secundários */
--gray-200: #e5e7eb;  /* Bordas */
--gray-400: #9ca3af;  /* Placeholders */
--gray-500: #6b7280;  /* Textos secundários */
--gray-600: #4b5563;  /* Textos terciários */
--gray-900: #111827;  /* Textos principais */
--gray-950: #030712;  /* Background dark mode */
```

### Gradientes

```css
/* Gradient Primary (Azul → Roxo) */
--gradient-primary: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
/* Uso: CTAs principais, headers premium */

/* Gradient Success (Verde) */
--gradient-success: linear-gradient(135deg, #16a34a 0%, #4ade80 100%);
/* Uso: Confirmações, ganhos */

/* Gradient Gold (Premium) */
--gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
/* Uso: Plano Pro, badges premium */
```

---

## 3. 📝 Tipografia

### Fonte Base
**Inter** (com fallback para system fonts)
```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

**Características**:
- Extremamente legível em qualquer tamanho
- Ótima para interfaces digitais
- Suporta números tabulares
- Excelente em telas de alta e baixa resolução

### Escala de Tamanhos

```css
--text-xs: 0.75rem;    /* 12px - Labels pequenos */
--text-sm: 0.875rem;   /* 14px - Textos secundários */
--text-base: 1rem;     /* 16px - Corpo de texto */
--text-lg: 1.125rem;   /* 18px - Subtítulos */
--text-xl: 1.25rem;    /* 20px - Títulos de seção */
--text-2xl: 1.5rem;    /* 24px - Títulos de página */
--text-3xl: 1.875rem;  /* 30px - Títulos principais */
--text-4xl: 2.25rem;   /* 36px - Títulos hero */
```

### Pesos de Fonte

```css
--font-weight-normal: 400;    /* Corpo de texto */
--font-weight-medium: 500;    /* Labels, navegação */
--font-weight-semibold: 600;  /* Subtítulos */
--font-weight-bold: 700;      /* Títulos, CTAs */
```

### Hierarquia Tipográfica

#### **H1 - Títulos Principais**
- Tamanho: 30px (1.875rem)
- Peso: Bold (700)
- Uso: Páginas principais, splash screens

#### **H2 - Títulos de Seção**
- Tamanho: 24px (1.5rem)
- Peso: Semibold (600)
- Uso: Seções de página, modals importantes

#### **H3 - Subtítulos**
- Tamanho: 20px (1.25rem)
- Peso: Semibold (600)
- Uso: Cards, subsecções

#### **H4 - Títulos de Card**
- Tamanho: 18px (1.125rem)
- Peso: Medium (500)
- Uso: Títulos de card, listas

#### **Body - Texto Padrão**
- Tamanho: 16px (1rem)
- Peso: Normal (400)
- Line-height: 1.75 (relaxed)
- Uso: Parágrafos, descrições

#### **Small - Textos Menores**
- Tamanho: 14px (0.875rem)
- Peso: Normal (400)
- Uso: Labels, metadados, timestamps

#### **Labels**
- Tamanho: 14px (0.875rem)
- Peso: Medium (500)
- Uso: Formulários, inputs

---

## 4. 🎯 Ícones

### Biblioteca
**Lucide React** - Ícones lineares, minimalistas e consistentes

### Estilo
- **Lineares**: 2px de stroke
- **Universais**: Facilmente reconhecíveis
- **Simples**: Sem detalhes excessivos
- **Escaláveis**: Funcionam em qualquer tamanho

### Tamanhos Padrão

```tsx
<Icon className="w-4 h-4" />  // 16px - Inline, badges
<Icon className="w-5 h-5" />  // 20px - Botões, navegação
<Icon className="w-6 h-6" />  // 24px - Headers, cards
<Icon className="w-8 h-8" />  // 32px - Ilustrações pequenas
<Icon className="w-12 h-12" /> // 48px - Estados vazios
```

### Principais Ícones

| Funcionalidade | Ícone | Uso |
|----------------|-------|-----|
| Contratos | `FileText` | Gestão de contratos |
| Carteira | `Wallet` | Saldo, pagamentos |
| IA | `Sparkles` | Features de IA |
| Suporte | `MessageSquare` | Chat, ajuda |
| Perfil | `User` | Conta, configurações |
| Notificações | `Bell` | Alertas |
| Projetos | `Briefcase` | Lista de projetos |
| Busca | `Search` | Pesquisa |
| Filtros | `SlidersHorizontal` | Filtros avançados |
| Sucesso | `CheckCircle` | Confirmações |
| Erro | `AlertCircle` | Erros, avisos |
| Trust Score | `TrendingUp` | Reputação |
| Gamificação | `Award` | Badges, conquistas |

### Regras de Uso

1. **Sempre com label**: Ícones nunca aparecem sozinhos sem contexto
2. **Cores consistentes**: Usar cores semânticas (azul para ação, verde para sucesso, etc)
3. **Tamanho mínimo**: 20px para garantir legibilidade
4. **Acessibilidade**: Incluir aria-label quando o ícone é interativo

---

## 5. 🧩 Componentes

### Botões

#### **Primary** (CTA Principal)
```tsx
className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
```
- **Uso**: Ações principais (Criar proposta, Enviar, Confirmar)
- **Altura**: 44px (touch target)
- **Border-radius**: 12px

#### **Secondary** (CTA Secundário)
```tsx
className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
```
- **Uso**: Ações de confirmação, sucesso
- **Altura**: 44px
- **Border-radius**: 12px

#### **Outline** (Ação Neutra)
```tsx
className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
```
- **Uso**: Ações secundárias, cancelar
- **Altura**: 44px
- **Border-radius**: 12px

#### **Ghost** (Ação Sutil)
```tsx
className="text-gray-600 hover:bg-gray-100"
```
- **Uso**: Navegação, ações terciárias
- **Altura**: 40px
- **Border-radius**: 8px

### Cards

#### **Card Padrão**
```tsx
className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6"
```

#### **Card Elevated** (Com sombra)
```tsx
className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
```

#### **Card Premium** (Pro/Upgrade)
```tsx
className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-6 text-white"
```

### Inputs

```tsx
className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
```

**Características**:
- Altura mínima: 44px (touch target)
- Border-radius: 12px
- Focus ring: 2px azul

### Modais

```tsx
className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8"
```

**Características**:
- Border-radius: 24px (2xl)
- Backdrop: Semi-transparente com blur
- Animação: Slide-up ou scale-in

### Skeletons (Loading)

```tsx
className="skeleton h-4 w-3/4 rounded-lg"
```

**Animação**:
- Gradiente linear que se move horizontalmente
- Duração: 1.5s
- Cores: gray-200 → gray-300 → gray-200

### Toasts (Feedback)

#### **Sucesso**
```tsx
className="bg-green-50 border border-green-200 text-green-900"
```

#### **Erro**
```tsx
className="bg-red-50 border border-red-200 text-red-900"
```

#### **Info**
```tsx
className="bg-blue-50 border border-blue-200 text-blue-900"
```

#### **Warning**
```tsx
className="bg-yellow-50 border border-yellow-200 text-yellow-900"
```

### Badges

#### **Trust Score**
```tsx
// Excellent (90+)
className="bg-green-600 text-white"

// Good (70-89)
className="bg-blue-600 text-white"

// Average (50-69)
className="bg-yellow-600 text-white"

// Poor (<50)
className="bg-red-600 text-white"
```

#### **Status**
```tsx
// Concluído
className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"

// Em andamento
className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"

// Pendente
className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"

// Cancelado
className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
```

---

## 6. 📐 Espaçamento

### Sistema de Spacing (baseado em 4px)

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

### Aplicação

- **Gap entre elementos inline**: 8px (sm)
- **Gap entre cards**: 12px-16px (md)
- **Padding de card**: 16px-24px (md-lg)
- **Margin de seção**: 24px-32px (lg-xl)
- **Padding de página**: 16px (md)

---

## 7. 🎭 Estados Visuais

### Estados de Componente

#### **Default** (Padrão)
- Cores normais
- Sem sombra ou sombra suave

#### **Hover** (Mouse sobre)
- Mudança sutil de cor (5-10% mais escuro)
- Sombra mais pronunciada
- Transição: 200ms

#### **Active** (Pressionado)
- Cor mais escura
- Sombra interna ou reduzida
- Scale: 0.98

#### **Focus** (Foco de teclado)
- Ring azul de 2px
- Offset: 2px
- Sempre visível para acessibilidade

#### **Disabled** (Desabilitado)
- Opacity: 0.5
- Cursor: not-allowed
- Sem interação

### Estados de Página

#### **Empty** (Vazio)
- Ícone grande centralizado (48px)
- Título descritivo
- Mensagem explicativa
- CTA para ação

#### **Loading** (Carregando)
- Skeleton screens
- Spinners para ações pontuais
- Mensagem "Carregando..."

#### **Error** (Erro)
- Ícone de erro (AlertCircle)
- Mensagem clara do problema
- Botão "Tentar novamente"
- Link para suporte

#### **Success** (Sucesso)
- Ícone de sucesso (CheckCircle)
- Mensagem de confirmação
- Próxima ação sugerida

---

## 8. ♿ Acessibilidade

### Contraste

**WCAG AA Compliance**:
- Texto normal: Mínimo 4.5:1
- Texto grande: Mínimo 3:1
- UI components: Mínimo 3:1

### Touch Targets

**Tamanho mínimo**: 44x44px (WCAG 2.1)

Aplicado em:
- Botões
- Links
- Checkboxes
- Radio buttons
- Toggles
- Ícones interativos

### Labels e ARIA

```tsx
// Sempre incluir labels visíveis
<label htmlFor="email">E-mail</label>
<input id="email" type="email" />

// Ícones interativos
<button aria-label="Fechar modal">
  <X className="w-5 h-5" />
</button>

// Status dinâmicos
<div role="status" aria-live="polite">
  {message}
</div>
```

### Navegação por Teclado

- **Tab**: Navegar entre elementos
- **Enter**: Ativar botão/link
- **Escape**: Fechar modal/dropdown
- **Arrows**: Navegar em listas/menus
- **Space**: Toggle checkboxes

### Focus Visible

```css
.focus-ring {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

## 9. 🌓 Dark Mode

### Implementação

Todas as cores têm variantes para dark mode automaticamente via CSS variables.

```tsx
// Usar classes com dark: prefix
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">
    Texto que se adapta
  </p>
</div>
```

### Ajustes Específicos

- **Sombras mais intensas**: Para destacar no fundo escuro
- **Bordas mais suaves**: gray-800 ao invés de gray-200
- **Backgrounds**: gray-900/950 ao invés de white
- **Textos**: gray-50/100 ao invés de gray-900

---

## 10. 📱 Responsividade

### Breakpoints

```css
sm: 640px    /* Smartphones landscape */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

### Mobile-First

Todo o design é mobile-first:
- Layout em coluna única por padrão
- Grid responsivo com `sm:grid-cols-2 lg:grid-cols-3`
- Text stacks verticalmente, depois horizontalmente
- Navegação bottom-tab no mobile

---

## 11. ✨ Animações

### Transições

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);   /* Micro-interações */
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);   /* Padrão */
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);   /* Modais, slides */
```

### Animações Disponíveis

```css
.animate-fade-in      /* Fade simples */
.animate-slide-up     /* Slide de baixo para cima */
.animate-slide-down   /* Slide de cima para baixo */
.animate-scale-in     /* Scale 0.95 → 1 */
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Todas as animações reduzidas a 1ms */
}
```

---

## 12. 🎨 Aplicação nas Telas

### Onboarding
- **Logo completo** no topo
- **Gradientes vibrantes** nos CTAs
- **Ilustrações leves** (ícones grandes)
- **Slogan motivacional**: "Trabalho remoto com confiança e agilidade"

### Home (Dashboard)
- **Cards elevados** com sombra
- **Stats em destaque** (Trust Score, projetos, ganhos)
- **CTAs em gradiente azul-roxo**
- **Quick actions** com ícones coloridos

### Projetos
- **Cards com tags coloridas** (categoria)
- **Filtros horizontais** com scroll
- **Estados visuais claros** (aberto, andamento, concluído)
- **Busca inteligente destacada** com gradiente roxo

### Propostas
- **Editor limpo** com foco no conteúdo
- **Ícone IA especial** (Sparkles) em destaque
- **Histórico de versões** em timeline
- **Feedback imediato** com toasts

### Carteira
- **Saldo em destaque** no topo
- **Gráficos coloridos** (recharts)
- **Transparência de taxas** em cards claros
- **CTAs diferenciados** (verde para adicionar, azul para sacar)

### Gamificação
- **Badges coloridos** com gradientes
- **Barra de progresso visual** (Trust Score)
- **Ranking com posições** (ouro, prata, bronze)
- **Pop-ups celebratórios** para desbloqueios

### Upgrade Pro
- **Gradiente dourado** (yellow-amber)
- **Ícone coroa** (Crown)
- **Comparação clara** de planos
- **CTA destacado** para upgrade

### Comunidade
- **Feed limpo** estilo social
- **Avatars coloridos** (gradientes)
- **Trust Score visível** em badges
- **Interações claras** (like, comment, share)

---

## 13. 📋 Checklist de Consistência

Ao criar uma nova tela, verificar:

- [ ] Logo NomadHub no lugar apropriado
- [ ] Paleta de cores consistente (azul/verde/roxo)
- [ ] Tipografia Inter aplicada
- [ ] Ícones Lucide com tamanhos corretos
- [ ] Botões com 44px de altura mínima
- [ ] Cards com border-radius 16px-24px
- [ ] Espaçamento baseado no sistema (4px)
- [ ] Estados visuais (empty, loading, error, success)
- [ ] Dark mode funcionando
- [ ] Responsividade mobile-first
- [ ] Acessibilidade (contraste, touch targets, labels)
- [ ] Animações suaves (200ms padrão)

---

## 14. 🛠️ Ferramentas

### Figma
- **Design System Library** com todos os componentes
- **Tokens** de cor, tipografia e espaçamento
- **Auto-layout** para responsividade
- **Variants** para estados (hover, focus, disabled)

### Código
- **Tailwind CSS** para estilização
- **CSS Variables** para tokens
- **Lucide React** para ícones
- **Motion (Framer Motion)** para animações

---

## 15. 🎯 Próximos Passos

1. **Exportar assets** do Figma (logo em SVG, ícones)
2. **Criar biblioteca de componentes** Storybook (opcional)
3. **Documentar padrões** de uso para equipe
4. **Testes de acessibilidade** (WAVE, axe)
5. **Otimização de performance** (lazy loading de ícones)

---

## 📞 Contato

Para dúvidas sobre o Design System:
- **Documentação**: Este arquivo
- **Código**: `/styles/globals.css` e `/components/`
- **Exemplos**: Todas as telas em `/screens/`

---

**Versão**: 1.0  
**Última atualização**: Dezembro 2025  
**Mantido por**: Equipe NomadHub

✅ **Design System completo e pronto para uso!**
