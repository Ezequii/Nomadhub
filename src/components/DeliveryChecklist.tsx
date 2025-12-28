import { CheckCircle, Circle, Upload, AlertCircle } from 'lucide-react';

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  fileUrl?: string;
}

interface DeliveryChecklistProps {
  items: ChecklistItem[];
  onToggle?: (itemId: string) => void;
  onUpload?: (itemId: string) => void;
  editable?: boolean;
}

export function DeliveryChecklist({ items, onToggle, onUpload, editable = true }: DeliveryChecklistProps) {
  const completedCount = items.filter(item => item.completed).length;
  const requiredCount = items.filter(item => item.required).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      {/* Header with Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-900">Checklist de Entrega</h3>
          <span className="text-gray-600">
            {completedCount}/{items.length} concluídos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            className={`border rounded-lg p-3 ${
              item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => editable && onToggle?.(item.id)}
                disabled={!editable}
                className="flex-shrink-0 mt-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`${item.completed ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                    {item.title}
                  </h4>
                  {item.required && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">
                      Obrigatório
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{item.description}</p>

                {/* File Upload/Display */}
                {item.fileUrl ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Arquivo anexado</span>
                  </div>
                ) : editable ? (
                  <button
                    onClick={() => onUpload?.(item.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors min-h-[44px]"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Anexar arquivo</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning for Required Items */}
      {requiredCount > 0 && completedCount < requiredCount && (
        <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-800">
            Complete todos os itens obrigatórios antes de finalizar a entrega
          </p>
        </div>
      )}
    </div>
  );
}