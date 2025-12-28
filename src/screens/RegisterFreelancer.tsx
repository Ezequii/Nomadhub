import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Globe, DollarSign, Flag, Eye, EyeOff, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/Toast';

export function RegisterFreelancer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'BR',
    currency: 'BRL',
    language: 'pt-BR',
    skills: [] as string[],
    agreeTerms: false
  });

  const countries = [
    { code: 'BR', name: 'Brasil', currency: 'BRL' },
    { code: 'US', name: 'Estados Unidos', currency: 'USD' },
    { code: 'PT', name: 'Portugal', currency: 'EUR' },
    { code: 'AR', name: 'Argentina', currency: 'ARS' },
    { code: 'MX', name: 'México', currency: 'MXN' }
  ];

  const suggestedSkills = [
    'React', 'Node.js', 'TypeScript', 'Python', 'UI/UX Design',
    'Figma', 'WordPress', 'Mobile Apps', 'Marketing Digital', 'Copywriting'
  ];

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
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!formData.agreeTerms) {
        toast({ title: 'Você precisa aceitar os termos', variant: 'destructive' });
        return;
      }

      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('nomadhub-user-type', 'freelancer');
      localStorage.setItem('nomadhub-user-profile', JSON.stringify({
        name: formData.name,
        email: formData.email,
        country: formData.country,
        currency: formData.currency,
        language: formData.language,
        skills: formData.skills
      }));

      toast({ title: '🎉 Conta criada com sucesso!', variant: 'success' });
      navigate('/tour');
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
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
            <h1 className="text-gray-900 dark:text-white">Criar Conta - Freelancer</h1>
            <p className="text-gray-600 dark:text-gray-400">Passo {step} de 3</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-4 pt-4">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
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
            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Nome completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Regional Settings */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">País fiscal</label>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => {
                    const country = countries.find(c => c.code === e.target.value);
                    setFormData({ 
                      ...formData, 
                      country: e.target.value,
                      currency: country?.currency || formData.currency
                    });
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Moeda preferida</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.currency}
                  disabled
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                Definida automaticamente baseada no seu país
              </p>
            </div>

            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Idioma</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Skills & Terms */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="text-gray-900 dark:text-white mb-2 block">Suas principais skills</label>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Selecione até 5 habilidades que você domina
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    disabled={!formData.skills.includes(skill) && formData.skills.length >= 5}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {skill}
                    {formData.skills.includes(skill) && (
                      <Check className="w-4 h-4 inline ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-blue-900 dark:text-blue-100 flex-1">
                  Aceito os{' '}
                  <a href="/terms" className="underline hover:text-blue-600">
                    Termos de Uso
                  </a>{' '}
                  e{' '}
                  <a href="/privacy" className="underline hover:text-blue-600">
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl min-h-[56px]"
          >
            {step < 3 ? 'Continuar' : 'Criar minha conta'}
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
