import { DollarSign, Calendar, User, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project, ProjectStatus } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(project.id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: project.currency || 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
    open: { label: 'Aberto', className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    in_progress: { label: 'Em andamento', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    delivered: { label: 'Entregue', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    disputed: { label: 'Em disputa', className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    closed: { label: 'Fechado', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' }
  };

  // Garantir que status sempre tenha um valor válido
  const projectStatus = (project.status as ProjectStatus) || 'open';
  const status = statusConfig[projectStatus] || statusConfig.open;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(project.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-gray-900 dark:text-white flex-1 pr-2">{project.title}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs ${status.className} whitespace-nowrap`}>
            {status.label}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                favorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            />
          </motion.button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>
            {project.budgetMin && project.budgetMax
              ? `${formatCurrency(project.budgetMin)} - ${formatCurrency(project.budgetMax)}`
              : project.budgetMin
              ? formatCurrency(project.budgetMin)
              : 'A combinar'}
          </span>
        </div>
        {project.createdAt && (
          <>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}