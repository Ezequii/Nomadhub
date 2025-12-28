import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Mail,
  MessageSquare,
  DollarSign,
  Shield,
  Eye,
  EyeOff,
  Save,
  Crown,
  Sparkles,
  FileText,
  Building2,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../components/Toast';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';

type SettingSection = 'main' | 'account' | 'notifications' | 'privacy' | 'payment' | 'language';

export function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { resetOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SettingSection>('main');

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [language, setLanguage] = useState('pt-BR');
  const [currency, setCurrency] = useState('BRL');

  const handleSave = () => {
    showToast('success', 'Salvo!', 'Suas configurações foram atualizadas');
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      showToast('info', 'Até logo!', 'Você foi desconectado');
      navigate('/login');
    }
  };

  const handleResetOnboarding = () => {
    resetOnboarding();
    showToast('success', 'Tutorial resetado!', 'Recarregue a página para ver o onboarding novamente');
  };

  const menuItems = [
    { id: 'account', icon: User, label: 'Conta', color: 'text-blue-600' },
    { id: 'notifications', icon: Bell, label: 'Notificações', color: 'text-purple-600' },
    { id: 'privacy', icon: Lock, label: 'Privacidade', color: 'text-green-600' },
    { id: 'payment', icon: CreditCard, label: 'Pagamento', color: 'text-yellow-600' },
    { id: 'language', icon: Globe, label: 'Idioma & Moeda', color: 'text-pink-600' },
  ];

  if (activeSection === 'main') {
    return (
      <div className="pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 text-white p-6 rounded-b-3xl"
        >
          <div className="flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            <div>
              <h1>Configurações</h1>
              <p className="text-blue-100">Gerencie suas preferências</p>
            </div>
          </div>
        </motion.div>

        <div className="p-4 space-y-4">
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-purple-600" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-600" />
                )}
                <div>
                  <p className="text-gray-900 dark:text-white">Tema Escuro</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {isDark ? 'Ativado' : 'Desativado'}
                  </p>
                </div>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </motion.div>

          {/* Pro Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6" />
              <h3 className="text-white">Recursos Premium</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => navigate('/ai-proposal')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors min-h-[60px] text-left"
              >
                <Sparkles className="w-5 h-5 mb-1" />
                <p className="text-sm">IA Propostas</p>
              </button>
              <button
                onClick={() => navigate('/ai-delivery')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors min-h-[60px] text-left"
              >
                <Sparkles className="w-5 h-5 mb-1" />
                <p className="text-sm">IA Entregas</p>
              </button>
              <button
                onClick={() => navigate('/templates-marketplace')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors min-h-[60px] text-left"
              >
                <FileText className="w-5 h-5 mb-1" />
                <p className="text-sm">Templates</p>
              </button>
              <button
                onClick={() => navigate('/pro-support')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors min-h-[60px] text-left"
              >
                <HelpCircle className="w-5 h-5 mb-1" />
                <p className="text-sm">Suporte Pro</p>
              </button>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]"
            >
              Fazer upgrade para Pro
            </button>
          </motion.div>

          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveSection(item.id as SettingSection)}
                className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow min-h-[60px]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  } flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-gray-900 dark:text-white">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            );
          })}

          <Separator className="my-4" />

          {/* Reset Onboarding */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={handleResetOnboarding}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-between min-h-[60px]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              } flex items-center justify-center`}>
                <RotateCcw className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 dark:text-white">Reiniciar Tutorial</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.button>

          {/* Help */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-between min-h-[60px]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              } flex items-center justify-center`}>
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-900 dark:text-white">Ajuda & Suporte</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.button>

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={handleLogout}
            className="w-full bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 shadow-sm flex items-center justify-between min-h-[60px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-red-600">Sair</span>
            </div>
          </motion.button>

          {/* Version */}
          <p className="text-center text-gray-400 pt-4">
            NomadHub v1.0.0 • Made with ❤️
          </p>
        </div>
      </div>
    );
  }

  // Subsections
  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-white p-6 rounded-b-3xl"
      >
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-white/80 mb-3 hover:text-white transition-colors min-h-[44px]"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Voltar
        </button>
        <h1>
          {menuItems.find((item) => item.id === activeSection)?.label}
        </h1>
      </motion.div>

      <div className="p-4 space-y-6">
        {activeSection === 'account' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="João Silva" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="joao@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Desenvolvedor Full Stack • Nômade Digital" />
              </div>

              <Button onClick={handleSave} className="w-full min-h-[44px]">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-gray-900 dark:text-white mb-4">Alterar Senha</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Senha Atual</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">Nova Senha</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmar Nova Senha</Label>
                  <Input id="confirm" type="password" />
                </div>
                <Button onClick={handleSave} variant="outline" className="w-full min-h-[44px]">
                  Atualizar Senha
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {activeSection === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900 dark:text-white">Email</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receber notificações por email
                  </p>
                </div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <Separator />

            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-gray-900 dark:text-white">Push</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Notificações push no navegador
                  </p>
                </div>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <Separator />

            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-gray-900 dark:text-white">Atualizações de Projetos</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Novas propostas e mensagens
                  </p>
                </div>
              </div>
              <Switch checked={projectUpdates} onCheckedChange={setProjectUpdates} />
            </div>

            <Separator />

            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-gray-900 dark:text-white">Marketing</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Novidades e promoções
                  </p>
                </div>
              </div>
              <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
            </div>

            <Button onClick={handleSave} className="w-full mt-6 min-h-[44px]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Preferências
            </Button>
          </motion.div>
        )}

        {activeSection === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-gray-900 dark:text-white">Perfil Público</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Tornar perfil visível
                  </p>
                </div>
              </div>
              <Switch checked={showProfile} onCheckedChange={setShowProfile} />
            </div>

            <Separator />

            <div className="flex items-center justify-between min-h-[44px]">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-gray-900 dark:text-white">Mostrar Atividade</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Projetos e avaliações
                  </p>
                </div>
              </div>
              <Switch checked={showActivity} onCheckedChange={setShowActivity} />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-gray-900 dark:text-white">Dados Pessoais</h4>
              <Button variant="outline" className="w-full min-h-[44px]">
                Baixar Meus Dados
              </Button>
              <Button variant="outline" className="w-full text-red-600 min-h-[44px]">
                Excluir Conta
              </Button>
            </div>
          </motion.div>
        )}

        {activeSection === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-900 dark:text-white mb-4">Métodos de Pagamento</h3>
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between min-h-[60px]">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-gray-900 dark:text-white">•••• 4242</p>
                      <p className="text-gray-500 dark:text-gray-400">Padrão</p>
                    </div>
                  </div>
                  <span className="text-gray-500">Visa</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 min-h-[44px]">
                Adicionar Método
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-900 dark:text-white mb-4">Pix</h3>
              <Input placeholder="Chave Pix" />
              <Button onClick={handleSave} className="w-full mt-4 min-h-[44px]">
                Salvar Chave Pix
              </Button>
            </div>
          </motion.div>
        )}

        {activeSection === 'language' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">🇧🇷 Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">🇺🇸 English (US)</SelectItem>
                  <SelectItem value="es-ES">🇪🇸 Español</SelectItem>
                  <SelectItem value="fr-FR">🇫🇷 Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Moeda</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL (R$)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave} className="w-full min-h-[44px]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Preferências
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}