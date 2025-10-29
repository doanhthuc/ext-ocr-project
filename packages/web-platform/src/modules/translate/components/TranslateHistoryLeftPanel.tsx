import { TranslateDocumentCard } from './TranslateDocumentCard';

type TranslateDocument = {
  fileName: string;
  id: string;
  lastModified: string;
  thumbnail?: string;
};

type TranslateHistoryLeftPanelProps = {
  documents: Array<TranslateDocument>;
  onDocumentClick?: (documentId: string) => void;
};

export function TranslateHistoryLeftPanel({
  documents,
  onDocumentClick,
}: TranslateHistoryLeftPanelProps) {
  return (
    <div className="bg-white rounded-xl flex flex-col h-full overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden min-h-0">
        {/* Recent Documents */}
        <div className="flex flex-col gap-4 h-full overflow-hidden relative">
          <h3 className="text-base font-semibold text-gray-1 leading-6 shrink-0">
            Recent Documents ({documents.length})
          </h3>

          {/* Documents List - Scrollable */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0">
            {documents.length > 0 ? (
              documents.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onDocumentClick?.(doc.id)}
                  className="text-left hover:opacity-80 transition-opacity"
                >
                  <TranslateDocumentCard
                    fileName={doc.fileName}
                    lastModified={doc.lastModified}
                    thumbnail={doc.thumbnail}
                  />
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-text-lighter">
                No documents found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
