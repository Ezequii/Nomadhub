# 🧭 Guia Rápido de Navegação - NomadHub MVP

## 🚀 Como Navegar pelo App

### 📱 Navegação Principal (Bottom Tabs)

O app possui **5 tabs principais** fixas na parte inferior da tela:

```
┌─────────────────────────────────┐
│         [Header]                │
│                                 │
│      [Conteúdo da Tela]        │
│                                 │
│                                 │
├─────────────────────────────────┤
│  🏠    💼    🧭    💰    👤    │
│ Início Projetos Nômade Carteira Perfil│
└─────────────────────────────────┘
```

---

## 🏠 1. Tela Inicial (Home)

**Rota:** `/`

### O que você vê:
- **Saudação personalizada** com nome do usuário
- **Trust Score** (canto superior direito)
- **Card de Saldo** destacado
- **Quick Actions** (4 botões rápidos)
  - 🔍 Buscar projetos
  - 💸 Sacar
  - 📊 Ranking
  - 🤖 IA
- **Grid de Estatísticas** (4 cards)
  - Projetos concluídos
  - Em andamento
  - Avaliação
  - Disponíveis
- **Destaque da Comunidade** (card roxo)
- **Projetos Recentes** (últimos 3)

### Como navegar:
- Clique em qualquer **projeto recente** → vai para `/projects/:id`
- Clique em **"Ver todos"** → vai para `/projects`
- Clique no **card de comunidade** → vai para `/community`
- Use as **quick actions** para ações rápidas

---

## 💼 2. Projetos

**Rota:** `/projects`

### O que você vê:
- **Barra de busca** no topo
- **Filtros** (Todos, Abertos, Em Andamento, Entregues)
- **Cards de estatísticas** (3 números)
- **Lista de projetos** com cards detalhados

### Cada card de projeto mostra:
- Título e descrição
- Status (badge colorido)
- Orçamento
- Data de criação
- Botão de favorito ❤️

### Como navegar:
- Clique em **qualquer projeto** → vai para `/projects/:id` (Detalhes)
- Use a **busca** para filtrar por nome/descrição
- Use os **filtros** para filtrar por status
- Clique no **botão +** (canto inferior direito) para criar projeto

---

## 📄 3. Detalhes do Projeto

**Rota:** `/projects/:id`

### O que você vê:
- **Cabeçalho do projeto** com título, status e descrição
- **Barra de progresso** (se em andamento)
- **Grid de informações** (orçamento, prazo, cliente, categoria)
- **Botões de ação**
  - ✅ Finalizar Projeto
  - ⚠️ Abrir Disputa
- **Tabs** (3 abas)

### Aba "Detalhes":
- Escopo do projeto
- Funcionalidades principais
- Tecnologias necessárias

### Aba "Chat":
- Histórico de mensagens
- Campo para enviar mensagem
- Botão de anexar arquivo

### Aba "Entrega":
- Checklist de itens
- Status de cada item (✓ ou ○)
- Links para arquivos enviados

### Como navegar:
- Use as **tabs** para alternar entre seções
- Clique em **"Finalizar Projeto"** para completar
- Clique em **"Abrir Disputa"** → vai para `/contracts/:id/dispute`
- Volte com o **botão ← do header**

---

## 📝 4. Criar Proposta

**Rota:** `/projects/:projectId/proposal`

### O que você vê:
- **Resumo do projeto** (card no topo)
- **Escolha do método** (2 botões grandes)
  - 🤖 Com IA (automático)
  - ✍️ Manual (criar do zero)

### Modo IA:
1. Clique em "Gerar com IA"
2. Aguarde geração automática
3. Revise a proposta gerada
4. Edite se necessário
5. Clique em "Enviar Proposta"

### Modo Manual:
1. Preencha **Valor da Proposta** (R$)
2. Preencha **Prazo de Entrega** (ex: "4-6 semanas")
3. Escreva o **Escopo do Trabalho** (textarea grande)
4. Clique em "Enviar Proposta"

### Como navegar:
- Clique em **"Cancelar"** para voltar
- Clique em **"Enviar Proposta"** → cria proposta e volta para projeto

---

## 📑 5. Gerenciar Contrato

**Rota:** `/contracts/:contractId`

### O que você vê:
- **Card de informações do contrato** (ID, status, prazo)
- **Seção de Escrow** com 3 botões principais:
  - 💳 **Fundear Escrow** (escolher: Pix/PayPal/Cripto)
  - ✅ **Liberar Pagamento** (após entrega aceita)
  - ↩️ **Solicitar Estorno** (se necessário)
- **Seção de Entregas**
  - Botão "Nova Entrega" (se escrow está funded)
  - Lista de entregas anteriores
- **Botão de Disputa** (vermelho, na parte inferior)

### Fluxo do Escrow:
```
1. Pending → Fundear → Funded
2. Funded → Criar Entrega → Aguardar Aprovação
3. Aprovado → Liberar Pagamento → Released
   OU
   Recusado → Solicitar Estorno → Refunded
```

### Como navegar:
- Clique em **"Fundear Escrow"** → escolha método de pagamento
- Clique em **"Nova Entrega"** → preencha checklist
- Clique em **"Abrir ou Ver Disputa"** → vai para `/contracts/:id/dispute`

---

## 💰 6. Carteira

**Rota:** `/wallet`

### O que você vê:
- **Card de saldo destacado** (topo)
- **Métodos de pagamento** (3 cards)
  - 💚 Pix
  - 💙 PayPal
  - 🧡 Cripto
- **Gráfico de Receita Mensal** (linha)
- **Relatórios Fiscais** (2 exemplos)
  - Download PDF Brasil (IRPF)
  - Download PDF Portugal (IRS)
- **Tabs de transações** (Todas, Recebidas, Enviadas)
- **Lista de transações** com detalhes

### Cada transação mostra:
- Ícone de tipo (↑ enviada ou ↓ recebida)
- Descrição
- Valor (verde + ou vermelho -)
- Data
- Status (✓ concluída, ⏱ pendente, ✗ falhou)

### Como navegar:
- Use as **tabs** para filtrar transações
- Clique nos **relatórios fiscais** → vai para `/fiscal-reports`
- Clique nos **métodos de pagamento** para gerenciar

---

## 🧭 7. Nômade Digital

**Rota:** `/nomad`

### O que você vê:
- **Card de introdução** (roxo, com stats da plataforma)
- **Tabs** (Feed, Destinos, Grupos)

### Aba "Feed":
- Posts da comunidade
- Eventos
- Mentorias
- Cada card mostra:
  - Autor e papel
  - Conteúdo
  - Localização (se evento)
  - Data/horário
  - Likes e comentários

### Aba "Destinos":
- Grid de destinos para nômades
- Cada card mostra:
  - Imagem do local
  - Nome e avaliação
  - Descrição
  - WiFi uptime %
  - Coworking disponível
  - Custo mensal estimado
  - Botão "Ver detalhes"

### Aba "Grupos":
- Lista de grupos de networking
- Cada item mostra:
  - Nome do grupo
  - Número de membros
  - Stack/Tecnologia
  - País
  - Botão "Entrar"

---

## 👤 8. Perfil

**Rota:** `/profile`

### O que você vê (de cima para baixo):

1. **Card de perfil** (grande, com cover)
   - Avatar com badge de edição
   - Nome + verificação ✓
   - Trust Score
   - Papel (Nômade/Cliente)
   - Localização
   - Grid de 4 stats (Avaliação, Projetos, Seguidores, Badges)

2. **Bio** (card branco)

3. **Quick Stats** (2 cards)
   - 💰 Carteira (saldo + % crescimento)
   - ⭐ Avaliações (nota + número de reviews)

4. **Tabs** (Sobre, Portfólio, Reviews)
   - **Sobre:** E-mail, telefone, localização, habilidades
   - **Portfólio:** Grid de projetos com preview
   - **Reviews:** Lista de avaliações recebidas

5. **Conquistas Recentes** (4 badges)

6. **Quick Actions** (grid 2x2)
   - 💼 Meu Portfólio
   - ❤️ Favoritos
   - 🏆 Conquistas
   - 👥 Indicar Amigos

7. **Menu de Configurações** (lista)
   - ⚙️ Configurações
   - 🔔 Notificações
   - 🛡️ Privacidade e Segurança
   - ❓ Central de Ajuda
   - 🚪 Sair da conta

### Como navegar:
- Clique nas **quick actions** para acessar seções específicas
- Clique no **menu de configurações** para navegar
- Use as **tabs** para ver diferentes informações

---

## 🔔 9. Notificações

**Rota:** `/notifications`

### O que você vê:
- **Header com contador** de notificações não lidas
- **Tabs** (Todas, Não lidas)
- **Lista de notificações** agrupadas por data

### Cada notificação mostra:
- Ícone do tipo (💼 projeto, 💰 pagamento, etc)
- Título
- Descrição
- Timestamp
- Indicador de lida/não lida

### Tipos de notificações:
- 💼 Projeto atribuído
- 💰 Pagamento recebido
- ⭐ Nova avaliação
- 💬 Nova mensagem
- 📝 Proposta aceita
- ✅ Entrega aprovada

---

## 🎯 10. Conquistas

**Rota:** `/achievements`

### O que você vê:
- **Banner de progresso** (topo, roxo/azul)
  - Total desbloqueadas
  - Barra de progresso
- **Grid de conquistas** (2 colunas)

### Cada conquista mostra:
- Ícone animado
- Título
- Descrição
- Raridade (common, rare, epic, legendary)
- Progresso (se bloqueada)
- Data de desbloqueio (se desbloqueada)

### Raridades (cores):
- ⚪ **Common** - Cinza
- 🔵 **Rare** - Azul
- 🟣 **Epic** - Roxo
- 🟡 **Legendary** - Dourado

---

## 🔐 11. Login/Cadastro

**Rota:** `/auth`

### O que você vê:
- **Logo animado** do NomadHub
- **Tabs** (Entrar / Cadastrar)

### Modo "Entrar":
- Campo de e-mail
- Campo de senha (com botão mostrar/ocultar)
- Link "Esqueceu a senha?"
- Botão "Entrar"
- Botões de login social (Google, GitHub)

### Modo "Cadastrar":
- Campo de nome completo
- **Seleção de papel** (2 botões grandes)
  - 💼 Freelancer
  - 📍 Cliente
- Campo de e-mail
- Campo de senha
- Botão "Criar conta"
- Termos de serviço e privacidade
- Botões de cadastro social

### Como navegar:
- Após login/cadastro → vai para `/` (Home)
- Alterne entre **Entrar/Cadastrar** com os tabs
- Use **login social** para acesso rápido

---

## 🎨 Navegação Extra

### Telas Acessíveis pelo Menu/Perfil:

- **Favoritos** (`/favorites`) - Projetos salvos
- **Configurações** (`/settings`) - Preferências do app
- **Indicações** (`/referral`) - Programa de referência
- **Portfólio** (`/portfolio`) - Projetos do usuário
- **Avaliações** (`/reviews`) - Reviews recebidas/dadas
- **Comunidade** (`/community`) - Feed social completo
- **Relatórios Fiscais** (`/fiscal-reports`) - Documentos tributários

### Telas Especiais:

- **Chat** (`/chat/:chatId`) - Chat fullscreen (sem tabs)
- **Disputas** (`/contracts/:id/dispute`) - Resolver conflitos
- **Analytics** (`/analytics`) - Estatísticas avançadas (Fase 2)
- **Admin** (`/admin`) - Dashboard administrativo (Fase 2)

---

## 💡 Dicas de Navegação

### Atalhos Rápidos:

1. **Voltar:** Use o botão ← no header
2. **Home:** Clique no tab 🏠 em qualquer tela
3. **Notificações:** Ícone 🔔 no header (badge com contador)
4. **Menu:** Ícone ☰ no header (algumas telas)
5. **FAB:** Botão flutuante + na home para ações rápidas

### Indicadores Visuais:

- **Badge azul** no tab = Tab ativa
- **Badge vermelho** = Notificações não lidas
- **❤️ preenchido** = Projeto favoritado
- **✓ verde** = Ação concluída
- **⏱ amarelo** = Ação pendente
- **✗ vermelho** = Ação falhou

### Estados de Projeto:

- 🟢 **Aberto** - Disponível para propostas
- 🔵 **Em andamento** - Aceito e em desenvolvimento
- 🟣 **Entregue** - Aguardando aprovação
- 🔴 **Em disputa** - Problema a resolver
- ⚫ **Fechado** - Concluído e pago

---

## 🚀 Fluxo Completo Recomendado

### Para testar todo o MVP:

```
1. /auth (Fazer login/cadastro)
   ↓
2. Ver onboarding (5 slides)
   ↓
3. / (Home - ver saldo e projetos)
   ↓
4. /projects (Buscar projeto)
   ↓
5. /projects/:id (Ver detalhes)
   ↓
6. /projects/:id/proposal (Criar proposta)
   ↓
7. /contracts/:id (Gerenciar contrato)
   ↓
8. Fundear escrow → Criar entrega → Liberar pagamento
   ↓
9. /wallet (Ver saldo atualizado)
   ↓
10. /profile (Ver conquistas e stats)
```

---

## ⚡ Funcionalidades Interativas

### Clicáveis em qualquer tela:

- ❤️ **Favoritar projeto** - Adiciona aos favoritos
- 🔔 **Notificações** - Abre painel de notificações
- 👤 **Avatar** - Vai para perfil
- 🌙/☀️ **Theme toggle** - Alterna dark/light mode
- 📱 **Bottom tabs** - Navegação principal
- ← **Voltar** - Retorna à tela anterior

### Ações com feedback:

- **Toast notifications** - Confirmações de ações
- **Loading states** - Spinners e skeletons
- **Error states** - Mensagens de erro
- **Empty states** - Quando não há dados
- **Animations** - Transições suaves

---

**Dica Final:** Explore livremente! Todas as telas estão conectadas e navegáveis. Use os bottom tabs como ponto de referência para voltar às telas principais.

🎉 **Bom uso do NomadHub!**
