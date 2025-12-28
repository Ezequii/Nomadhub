import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { ThumbsUp, Plus, Award, TrendingUp, Star } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  endorsements: Endorsement[];
  yearsOfExperience?: number;
}

interface Endorsement {
  id: string;
  skillId: string;
  endorserId: string;
  endorserName: string;
  endorserAvatar?: string;
  createdAt: string;
}

interface SkillsEndorsementProps {
  editable?: boolean;
}

export function SkillsEndorsement({ editable = true }: SkillsEndorsementProps) {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'React',
      category: 'Frontend',
      level: 'expert',
      yearsOfExperience: 5,
      endorsements: [
        {
          id: '1',
          skillId: '1',
          endorserId: '101',
          endorserName: 'Ana Silva',
          endorserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
          createdAt: '2024-12-01'
        },
        {
          id: '2',
          skillId: '1',
          endorserId: '102',
          endorserName: 'Carlos Mendes',
          endorserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
          createdAt: '2024-11-28'
        },
        {
          id: '3',
          skillId: '1',
          endorserId: '103',
          endorserName: 'Maria Costa',
          endorserAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
          createdAt: '2024-11-25'
        }
      ]
    },
    {
      id: '2',
      name: 'TypeScript',
      category: 'Frontend',
      level: 'expert',
      yearsOfExperience: 4,
      endorsements: [
        {
          id: '4',
          skillId: '2',
          endorserId: '104',
          endorserName: 'Pedro Santos',
          endorserAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
          createdAt: '2024-12-05'
        },
        {
          id: '5',
          skillId: '2',
          endorserId: '105',
          endorserName: 'Sofia Oliveira',
          endorserAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop',
          createdAt: '2024-11-20'
        }
      ]
    },
    {
      id: '3',
      name: 'Node.js',
      category: 'Backend',
      level: 'advanced',
      yearsOfExperience: 3,
      endorsements: [
        {
          id: '6',
          skillId: '3',
          endorserId: '106',
          endorserName: 'Lucas Ferreira',
          endorserAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
          createdAt: '2024-12-10'
        }
      ]
    },
    {
      id: '4',
      name: 'UI/UX Design',
      category: 'Design',
      level: 'intermediate',
      yearsOfExperience: 2,
      endorsements: []
    },
    {
      id: '5',
      name: 'PostgreSQL',
      category: 'Database',
      level: 'advanced',
      yearsOfExperience: 3,
      endorsements: [
        {
          id: '7',
          skillId: '5',
          endorserId: '102',
          endorserName: 'Carlos Mendes',
          endorserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
          createdAt: '2024-12-08'
        }
      ]
    }
  ]);

  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'intermediate': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'advanced': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'expert': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getLevelProgress = (level: string) => {
    switch (level) {
      case 'beginner': return 25;
      case 'intermediate': return 50;
      case 'advanced': return 75;
      case 'expert': return 100;
      default: return 0;
    }
  };

  const handleEndorse = (skillId: string) => {
    // Mock endorsement
    const newEndorsement: Endorsement = {
      id: Date.now().toString(),
      skillId,
      endorserId: 'current-user',
      endorserName: 'Você',
      createdAt: new Date().toISOString()
    };

    setSkills(skills.map(skill =>
      skill.id === skillId
        ? { ...skill, endorsements: [...skill.endorsements, newEndorsement] }
        : skill
    ));
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsements.length, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <div className="text-gray-900 dark:text-white mb-1">
              {skills.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Skills</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
            <div className="text-gray-900 dark:text-white mb-1">
              {totalEndorsements}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Endossos</div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex flex-col items-center text-center">
            <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="text-gray-900 dark:text-white mb-1">
              {skills.filter(s => s.level === 'expert').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Expert</div>
          </div>
        </Card>
      </div>

      {editable && (
        <Button className="w-full" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Nova Skill
        </Button>
      )}

      {/* Skills by Category */}
      {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
        <div key={category}>
          <h3 className="text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            {category}
          </h3>

          <div className="space-y-3">
            {categorySkills.map((skill, skillIndex) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div
                    className="cursor-pointer"
                    onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-gray-900 dark:text-white">{skill.name}</h4>
                          <Badge className={getLevelColor(skill.level)}>
                            {skill.level}
                          </Badge>
                        </div>
                        {skill.yearsOfExperience && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'ano' : 'anos'} de experiência
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{skill.endorsements.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <Progress value={getLevelProgress(skill.level)} className="mb-3 h-2" />

                    {/* Endorsers Avatars */}
                    {skill.endorsements.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex -space-x-2">
                          {skill.endorsements.slice(0, 5).map((endorsement) => (
                            <Avatar key={endorsement.id} className="w-8 h-8 border-2 border-white dark:border-gray-800">
                              <AvatarImage src={endorsement.endorserAvatar} alt={endorsement.endorserName} />
                              <AvatarFallback>{endorsement.endorserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        {skill.endorsements.length > 5 && (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            +{skill.endorsements.length - 5}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Expanded View */}
                  {expandedSkill === skill.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"
                    >
                      <div className="space-y-2 mb-3">
                        <h5 className="text-sm text-gray-700 dark:text-gray-300">
                          Endossado por:
                        </h5>
                        {skill.endorsements.length > 0 ? (
                          skill.endorsements.map((endorsement) => (
                            <div key={endorsement.id} className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={endorsement.endorserAvatar} alt={endorsement.endorserName} />
                                <AvatarFallback>{endorsement.endorserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {endorsement.endorserName}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">
                                {new Date(endorsement.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            Nenhum endosso ainda
                          </p>
                        )}
                      </div>

                      {editable && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEndorse(skill.id);
                          }}
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Endossar Skill
                        </Button>
                      )}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
