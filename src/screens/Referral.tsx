import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Copy, Check, Share2, Gift, DollarSign, Trophy, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../components/Toast';
import { useTheme } from '../contexts/ThemeContext';

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'completed';
  joinedAt: string;
  earned: number;
}

const mockReferrals: Referral[] = [
  {
    id: '1',
    name: 'Ana Costa',
    email: 'ana@email.com',
    status: 'completed',
    joinedAt: '2025-01-15',
    earned: 50,
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos@email.com',
    status: 'active',
    joinedAt: '2025-02-01',
    earned: 25,
  },
  {
    id: '3',
    name: 'Maria Silva',
    email: 'maria@email.com',
    status: 'pending',
    joinedAt: '2025-02-20',
    earned: 0,
  },
];

export function Referral() {
  const { showToast } = useToast();
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');

  const referralCode = 'NOMAD-JS2025';
  const referralLink = `https://nomadhub.com/join/${referralCode}`;

  const totalEarned = mockReferrals.reduce((sum, ref) => sum + ref.earned, 0);
  const totalReferrals = mockReferrals.length;
  const activeReferrals = mockReferrals.filter((r) => r.status === 'active' || r.status === 'completed').length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      showToast('success', 'Copiado!', 'Link copiado para a área de transferência');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast('error', 'Erro', 'Não foi possível copiar o link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NomadHub - Trabalhe de Qualquer Lugar',
          text: `Junte-se ao NomadHub e ganhe $25! Use meu código: ${referralCode}`,
          url: referralLink,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  const handleSendInvite = () => {
    if (!email) {
      showToast('warning', 'Atenção', 'Digite um email válido');
      return;
    }
    showToast('success', 'Convite enviado!', `Convite enviado para ${email}`);
    setEmail('');
  };

  const getStatusColor = (status: Referral['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'active':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const getStatusText = (status: Referral['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'active':
        return 'Ativo';
      case 'completed':
        return 'Completo';
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-white p-6 rounded-b-3xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8" />
          <div>
            <h1>Programa de Indicação</h1>
            <p className="text-blue-100">Convide amigos e ganhe recompensas</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="mb-1">{totalReferrals}</p>
            <p className="text-blue-100">Convites</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="mb-1">{activeReferrals}</p>
            <p className="text-blue-100">Ativos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="mb-1">${totalEarned}</p>
            <p className="text-blue-100">Ganhos</p>
          </div>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-gray-900 dark:text-white">Como Funciona</h2>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Compartilhe seu link</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Envie para amigos e colegas
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Eles se cadastram</p>
                <p className="text-gray-600 dark:text-gray-400">
                  E ganham $25 de bônus
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">Você ganha $50</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Quando eles completam o primeiro projeto
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-gray-900 dark:text-white mb-4">Seu Link de Convite</h3>

          <div className="flex gap-2 mb-4">
            <Input
              value={referralLink}
              readOnly
              className="flex-1 bg-gray-50 dark:bg-gray-900"
            />
            <Button onClick={handleCopy} className="flex-shrink-0">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </motion.div>

        {/* Email Invite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-gray-900 dark:text-white mb-4">Convidar por Email</h3>

          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSendInvite}>
              <Mail className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <h3 className="text-gray-900 dark:text-white">Recompensas</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">5 Indicações</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Badge Recrutador</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">🥉</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">20 Indicações</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Badge Embaixador + $500 bônus</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">🥈</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">50 Indicações</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Badge Lenda + $2000 bônus</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">🥇</span>
            </div>
          </div>
        </motion.div>

        {/* Referrals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-gray-900 dark:text-white mb-4">
            Suas Indicações ({totalReferrals})
          </h3>

          {mockReferrals.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Você ainda não indicou ninguém
            </p>
          ) : (
            <div className="space-y-3">
              {mockReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {referral.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{referral.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {new Date(referral.joinedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(referral.status)}`}>
                      {getStatusText(referral.status)}
                    </span>
                    {referral.earned > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        +${referral.earned}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}