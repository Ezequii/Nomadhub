import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { ProjectCard } from "../components/ProjectCard";
import { JourneyProgress } from "../components/JourneyProgress";
import { Logo } from "../components/Logo";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Button } from "../components/ui/button";
import { BalanceCard } from "../components/BalanceCard";
import { QuickActions } from "../components/QuickActions";
import { TrustScore } from "../components/TrustScore";
import { useUserRole } from "../contexts/UserRoleContext";
import {
  Briefcase,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Zap,
  Crown,
  Sparkles,
  Rocket,
  Users,
  Star,
  FileText,
  Wallet,
  Award,
} from "lucide-react";
import { api, type User, type Project } from "../api/client";

export function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [recentProjects, setRecentProjects] = useState<
    Project[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useUserRole();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, projectsData] = await Promise.all([
          api.getUser(),
          api.getProjects(),
        ]);
        setUser(userData);
        setRecentProjects(projectsData.slice(0, 3));
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Check if user is client/contractor
  const isClient = role === "client";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-gray-600 dark:text-gray-400">
            Carregando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Header title="NomadHub" showLogo={true} />

      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* Welcome Section with Trust Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h2 className="text-gray-900 dark:text-white mb-1">
              Olá, {user?.name?.split(" ")[0] || "Nomade"}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Bem-vindo ao NomadHub
            </p>
          </div>
          <TrustScore score={92} trend="up" size="lg" />
        </motion.div>

        {/* First Time User CTA */}
        {user?.completedProjects === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white mb-1">
                  {isClient
                    ? "Publique seu primeiro projeto!"
                    : "Crie sua primeira proposta!"}
                </h3>
                <p className="text-blue-100">
                  {isClient
                    ? "Receba propostas de freelancers qualificados"
                    : "Use a IA para ganhar tempo"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {isClient ? (
                <>
                  <Button
                    onClick={() => {
                      navigate("/project-publish");
                    }}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Publicar Projeto
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/proposals-received");
                    }}
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                  >
                    Ver Propostas
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate("/ai-proposal");
                    }}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar com IA
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/projects");
                    }}
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                  >
                    Ver Projetos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: user?.completedProjects === 0 ? 0.2 : 0.1,
          }}
          className="mb-6"
        >
          <BalanceCard balance={user?.balance || 0} />
        </motion.div>

        {/* Journey Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <JourneyProgress currentStep="home" compact />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: user?.completedProjects === 0 ? 0.3 : 0.2,
          }}
          className="mb-6"
        >
          <QuickActions
            onSearch={() => navigate("/projects")}
            onWithdraw={() => navigate("/wallet")}
            onRanking={() => navigate("/reviews")}
            onAI={() => console.log("AI")}
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl text-gray-900 dark:text-white mb-1">
              {user?.completedProjects || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Projetos concluídos
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl text-gray-900 dark:text-white mb-1">
              {
                recentProjects.filter(
                  (p) => p.status === "in_progress",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Em andamento
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="text-2xl text-gray-900 dark:text-white mb-1">
              {(user?.rating || 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avaliação
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-2xl text-gray-900 dark:text-white mb-1">
              {
                recentProjects.filter(
                  (p) => p.status === "open",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Disponíveis
            </div>
          </motion.div>
        </div>

        {/* Community Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div
            onClick={() => navigate("/nomad")}
            className="bg-purple-600 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white mb-1">
                    Comunidade NomadHub
                  </h3>
                  <p className="text-purple-100">
                    Conecte-se com outros nômades digitais
                  </p>
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white mb-1">12</p>
                <p className="text-purple-100">Mentorias</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white mb-1">8</p>
                <p className="text-purple-100">Eventos</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white mb-1">450+</p>
                <p className="text-purple-100">Membros</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pro Plan Promotion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <div
            onClick={() => navigate("/pricing")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white mb-1">
                    Turbine seus resultados com o Pro
                  </h3>
                  <p className="text-blue-100">
                    IA, templates e suporte prioritário
                  </p>
                </div>
              </div>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white mb-1">✨</p>
                <p className="text-blue-100 text-sm">
                  IA Avançada
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white mb-1">📊</p>
                <p className="text-blue-100 text-sm">
                  Analytics
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white mb-1">💬</p>
                <p className="text-blue-100 text-sm">
                  Suporte Pro
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white">
              Projetos Recentes
            </h3>
            <button
              onClick={() => navigate("/projects")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 min-h-[44px]"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() =>
                    navigate(`/projects/${project.id}`)
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}