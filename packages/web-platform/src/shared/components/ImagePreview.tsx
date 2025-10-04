import { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { cn } from '~shared/utils/cn.util';

export type ImagePreviewProps = {
  src: string;
  alt?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  showControls?: boolean;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}

export function ImagePreview({
  src,
  alt = 'Preview image',
  className,
  onLoad,
  onError,
  showControls = true,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1,
}: ImagePreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoaded(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div
      className={cn(
        // 16:9 aspect ratio container
        'relative w-full bg-bg-secondary rounded-lg overflow-hidden',
        'aspect-[16/9]',
        className
      )}
    >
      {hasError ? (
        <div className="flex items-center justify-center h-full text-text-muted">
          <div className="text-center">
            <div className="text-lg mb-2">⚠️</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      ) : (
        <TransformWrapper
          initialScale={initialScale}
          minScale={minScale}
          maxScale={maxScale}
          wheel={{ step: 0.1 }}
          pinch={{ step: 0.1 }}
          doubleClick={{ step: 0.5, mode: 'toggle' }}
          limitToBounds={false}
          centerOnInit
          smooth
        >
          {({ zoomIn, zoomOut, resetTransform, centerView }) => (
            <>
              <TransformComponent
                wrapperClass="w-full h-full"
                contentClass="w-full h-full flex items-center justify-center"
              >
                <img
                  src={src}
                  alt={alt}
                  className={cn(
                    'max-w-full max-h-full object-contain transition-opacity duration-200',
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  draggable={false}
                />
              </TransformComponent>

              {/* Loading indicator */}
              {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light"></div>
                </div>
              )}

              {/* Zoom controls */}
              {showControls && isLoaded && (
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <button
                    onClick={() => zoomIn()}
                    className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                    title="Zoom in"
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>

                  <button
                    onClick={() => zoomOut()}
                    className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                    title="Zoom out"
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>

                  <button
                    onClick={() => resetTransform()}
                    className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                    title="Reset zoom"
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                      <path d="M21 3v5h-5" />
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                      <path d="M3 21v-5h5" />
                    </svg>
                  </button>

                  <button
                    onClick={() => centerView()}
                    className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                    title="Center image"
                    type="button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </TransformWrapper>
      )}
    </div>
  );
}