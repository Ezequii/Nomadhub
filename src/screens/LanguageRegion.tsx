import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Check, AlertCircle, Save } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
}

const LANGUAGES: Language[] = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en-US', name: 'English (United States)', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español (España)', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français (France)', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano (Italia)', flag: '🇮🇹' }
];

const COUNTRIES: Country[] = [
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', currency: 'BRL' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', currency: 'EUR' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', currency: 'USD' },
  { code: 'ES', name: 'Espanha', flag: '🇪🇸', currency: 'EUR' },
  { code: 'DE', name: 'Alemanha', flag: '🇩🇪', currency: 'EUR' },
  { code: 'FR', name: 'França', flag: '🇫🇷', currency: 'EUR' },
  { code: 'IT', name: 'Itália', flag: '🇮🇹', currency: 'EUR' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧', currency: 'GBP' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦', currency: 'CAD' },
  { code: 'MX', name: 'México', flag: '🇲🇽', currency: 'MXN' }
];

export function LanguageRegion() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');
  const [selectedCountry, setSelectedCountry] = useState('BR');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('app-language') || 'pt-BR';
    const savedCountry = localStorage.getItem('app-country') || 'BR';
    setSelectedLanguage(savedLanguage);
    setSelectedCountry(savedCountry);
  }, []);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    setHasChanges(true);
  };

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('app-language', selectedLanguage);
      localStorage.setItem('app-country', selectedCountry);

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Preferências salvas com sucesso!');
      setHasChanges(false);
      navigate(-1);
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Erro ao salvar preferências. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Idioma e Região</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Language Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-gray-900 dark:text-white">Idioma da Interface</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Escolha o idioma que deseja usar no aplicativo
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[64px] ${
                  selectedLanguage === language.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                aria-pressed={selectedLanguage === language.code}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{language.flag}</span>
                  <span className="text-gray-900 dark:text-white">{language.name}</span>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Country Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-gray-900 dark:text-white">País Fiscal</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Selecione o país onde você declara seus impostos
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountryChange(country.code)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[64px] ${
                  selectedCountry === country.code ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                }`}
                aria-pressed={selectedCountry === country.code}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div className="text-left">
                    <div className="text-gray-900 dark:text-white">{country.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {country.currency}
                    </div>
                  </div>
                </div>
                {selectedCountry === country.code && (
                  <Check className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-yellow-900 dark:text-yellow-300 mb-1">
                Importante sobre configurações regionais
              </h4>
              <p className="text-yellow-800 dark:text-yellow-400">
                Essas configurações afetam seus relatórios fiscais, moeda padrão e formato de datas. 
                {selectedCountryData && (
                  <> Sua moeda será definida como <strong>{selectedCountryData.currency}</strong>.</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {hasChanges && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <h4 className="text-blue-900 dark:text-blue-300 mb-3">
              Resumo das alterações
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-400">Idioma:</span>
                <span className="text-blue-900 dark:text-blue-300">
                  {LANGUAGES.find(l => l.code === selectedLanguage)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-400">País:</span>
                <span className="text-blue-900 dark:text-blue-300">
                  {COUNTRIES.find(c => c.code === selectedCountry)?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-400">Moeda:</span>
                <span className="text-blue-900 dark:text-blue-300">
                  {selectedCountryData?.currency}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
          aria-label="Salvar preferências"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Salvar Preferências</span>
            </>
          )}
        </button>

        {!hasChanges && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Nenhuma alteração foi feita
          </p>
        )}
      </div>
    </div>
  );
}
