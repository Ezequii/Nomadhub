import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';
import { 
  Globe, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Wallet,
  CheckCircle,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Pagamentos Seguros',
      description: 'Sistema de escrow protege 100% das transações',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: Sparkles,
      title: 'IA Integrada',
      description: 'Propostas profissionais geradas em segundos',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Trust Score',
      description: 'Reputação verificada e transparente',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      icon: Users,
      title: 'Comunidade Global',
      description: 'Conecte-se com nômades digitais',
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Freelancers' },
    { value: '5K+', label: 'Projetos' },
    { value: '$2M+', label: 'Transacionado' },
    { value: '4.9★', label: 'Avaliação' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo variant="full" size="md" />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/auth')}
              className="text-gray-700 dark:text-gray-300"
            >
              Entrar
            </Button>
            <Button
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Começar Grátis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Trabalho remoto com confiança e agilidade
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Conectando Talentos
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ao Redor do Mundo
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              A plataforma completa para freelancers e contratantes. Sistema de escrow, IA para propostas, 
              Trust Score e comunidade global.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all text-lg px-8 py-6"
              >
                <Globe className="w-5 h-5 mr-2" />
                Criar Conta Grátis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/projects')}
                className="border-2 border-gray-300 dark:border-gray-700 text-lg px-8 py-6"
              >
                Ver Projetos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Por que escolher o NomadHub?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Tudo que você precisa para trabalhar remotamente com segurança
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Em 3 passos simples você começa a trabalhar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Crie seu Perfil',
                description: 'Cadastre-se gratuitamente como freelancer ou contratante',
                icon: Users,
                color: 'from-blue-600 to-blue-400'
              },
              {
                step: '2',
                title: 'Encontre Projetos',
                description: 'Browse milhares de projetos ou publique o seu',
                icon: Sparkles,
                color: 'from-purple-600 to-purple-400'
              },
              {
                step: '3',
                title: 'Trabalhe com Segurança',
                description: 'Sistema de escrow protege todos os pagamentos',
                icon: Shield,
                color: 'from-green-600 to-green-400'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-6xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent opacity-20`}>
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Junte-se a milhares de freelancers e empresas que confiam no NomadHub
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl text-lg px-8 py-6"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Criar Conta Grátis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                Já tenho conta
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-6">
              ✨ Sem cartão de crédito • ⚡ Comece em 1 minuto • 🔒 100% seguro
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <Logo variant="full" size="md" className="mb-6 justify-center" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A plataforma de trabalho remoto mais confiável do mundo
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Sobre</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Blog</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Ajuda</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Termos</a>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-8">
            © 2025 NomadHub. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
