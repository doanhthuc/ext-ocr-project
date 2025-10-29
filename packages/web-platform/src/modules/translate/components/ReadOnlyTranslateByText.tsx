import { IconCopy } from '~icons';

type ReadOnlyTranslateByTextProps = {
  translations?: Array<{
    id: string;
    text: string;
  }>;
};

type TranslationItem = {
  id: string;
  text: string;
};

export function ReadOnlyTranslateByText({
  translations: propTranslations,
}: ReadOnlyTranslateByTextProps) {
  // Use provided translations or default mock data
  const translations: Array<TranslationItem> = propTranslations || [
    { id: '1', text: 'VIP-06-VIP' },
    { id: '2', text: 'VIP-06-VIP' },
    { id: '3', text: 'VIP-06-VIP' },
    { id: '4', text: 'VIP-06-VIP' },
    { id: '5', text: 'VIP-06-VIP' },
    { id: '6', text: 'VIP-06-VIP' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Translation List */}
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {translations.map(item => (
          <div
            key={item.id}
            className="bg-white border border-gray-12 rounded-xl p-4 flex items-center justify-between gap-3"
          >
            <span className="text-text-dark text-base font-archivo">
              {item.text}
            </span>
            <button
              onClick={() => handleCopy(item.text)}
              className="text-blue-4 hover:text-blue-5 transition-colors shrink-0"
              aria-label="Copy text"
            >
              <IconCopy className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
