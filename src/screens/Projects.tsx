import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Filter, Plus, Sparkles, Target } from 'lucide-react';
import { api } from '../api/client';
import type { Project, ProjectStatus } from '../types';
import { SlidersHorizontal } from 'lucide-react';

export function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const params = filter === 'all' ? {} : { status: filter as ProjectStatus };
        const data = await api.getProjects(params);
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [filter]);

  const filters: Array<{ value: ProjectStatus | 'all'; label: string; count?: number }> = [
    { value: 'all', label: 'Todos' },
    { value: 'open' as ProjectStatus, label: 'Abertos' },
    { value: 'in_progress' as ProjectStatus, label: 'Em Andamento' },
    { value: 'delivered' as ProjectStatus, label: 'Entregues' }
  ];

  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20">
        <div className="text-gray-600">Carregando projetos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Projetos" />
      
      <div className="px-4 py-6 max-w-screen-xl mx-auto">
        {/* AI Search Banner */}
        <div
          onClick={() => navigate('/project-search')}
          className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1 flex items-center gap-2">
                🤖 Busca Inteligente com IA
              </h3>
              <p className="text-purple-100">
                Encontre projetos perfeitos para seu perfil
              </p>
            </div>
            <Target className="w-6 h-6 text-white opacity-80" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar projetos..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
              {f.count !== undefined && ` (${f.count})`}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl text-gray-900 mb-1">
              {projects.filter(p => p.status === 'open').length}
            </div>
            <div className="text-sm text-gray-600">Disponíveis</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl text-gray-900 mb-1">
              {projects.filter(p => p.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-600">Ativos</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl text-gray-900 mb-1">
              {projects.filter(p => p.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600">Entregues</div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Nenhum projeto encontrado</p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/project-search')}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Busca Inteligente</span>
          </button>
          <button
            onClick={() => navigate('/project-filters')}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => navigate('/project-publish')}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all"
          >
            <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}