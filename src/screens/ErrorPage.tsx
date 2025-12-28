import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCcw, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorPage({ error, resetErrorBoundary }: ErrorPageProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    navigate('/');
  };

  const handleRefresh = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    window.location.reload();
  };

  const handleGoBack = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-gray-900 dark:text-white mb-3">
          Ops! Algo deu errado
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Encontramos um problema inesperado. Não se preocupe, estamos trabalhando para resolver isso.
        </p>

        {/* Error Details (Dev Mode) */}
        {error && process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-left">
            <h3 className="text-red-900 dark:text-red-100 mb-2">Detalhes do erro:</h3>
            <p className="text-red-700 dark:text-red-300 text-sm font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleRefresh}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl min-h-[56px]"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Tentar Novamente
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="py-3"
            >
              <Home className="w-4 h-4 mr-2" />
              Início
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-gray-500 dark:text-gray-500">
          <p className="mb-2">Precisa de ajuda?</p>
          <button
            onClick={() => navigate('/support')}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Entre em contato com o suporte
          </button>
        </div>
      </div>
    </div>
  );
}
