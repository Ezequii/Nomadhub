import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Building2, Users, Flag, Globe, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/Toast';

export function RegisterClient() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<'personal' | 'company'>('personal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'BR',
    language: 'pt-BR',
    // Company fields
    companyName: '',
    companySize: '',
    industry: '',
    taxId: '',
    agreeTerms: false
  });

  const handleSubmit = async () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        toast({ title: 'Preencha todos os campos', variant: 'destructive' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({ title: 'As senhas não coincidem', variant: 'destructive' });
        return;
      }
      if (formData.password.length < 8) {
        toast({ title: 'A senha deve ter no mínimo 8 caracteres', variant: 'destructive' });
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.agreeTerms) {
        toast({ title: 'Você precisa aceitar os termos', variant: 'destructive' });
        return;
      }

      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('nomadhub-user-type', 'client');
      localStorage.setItem('nomadhub-user-role', accountType);
      localStorage.setItem('nomadhub-user-profile', JSON.stringify({
        name: formData.name,
        email: formData.email,
        country: formData.country,
        language: formData.language,
        accountType,
        companyName: formData.companyName,
        companySize: formData.companySize
      }));

      toast({ title: '🎉 Conta criada com sucesso!', variant: 'success' });
      navigate('/tour');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 dark:text-white">Criar Conta - Contratante</h1>
            <p className="text-gray-600 dark:text-gray-400">Passo {step} de 2</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 pt-4">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-2">
            {[1, 2].map(s => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Account Type Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setAccountType('personal')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  accountType === 'personal'
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-gray-900 dark:text-white">Pessoa Física</p>
              </button>
              <button
                onClick={() => setAccountType('company')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  accountType === 'company'
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Building2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-gray-900 dark:text-white">Empresa</p>
              </button>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">
                {accountType === 'company' ? 'Nome do responsável' : 'Nome completo'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            {accountType === 'company' && (
              <>
                <div>
                  <label className="text-gray-900 dark:text-white mb-2 block">Nome da empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Nome da empresa"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-900 dark:text-white mb-2 block">Tamanho da empresa</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    >
                      <option value="">Selecione</option>
                      <option value="1-10">1-10 funcionários</option>
                      <option value="11-50">11-50 funcionários</option>
                      <option value="51-200">51-200 funcionários</option>
                      <option value="201-500">201-500 funcionários</option>
                      <option value="500+">500+ funcionários</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Confirmar senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Digite a senha novamente"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Regional & Terms */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">País</label>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="BR">Brasil</option>
                  <option value="US">Estados Unidos</option>
                  <option value="PT">Portugal</option>
                  <option value="AR">Argentina</option>
                  <option value="MX">México</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Idioma</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-green-900 dark:text-green-100 flex-1">
                  Aceito os{' '}
                  <a href="/terms" className="underline hover:text-green-600">
                    Termos de Uso
                  </a>{' '}
                  e{' '}
                  <a href="/privacy" className="underline hover:text-green-600">
                    Política de Privacidade
                  </a>
                </span>
              </label>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl min-h-[56px]"
          >
            {step < 2 ? 'Continuar' : 'Criar minha conta'}
          </Button>

          <div className="text-center">
            <button
              onClick={() => navigate('/auth')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Já tenho uma conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
