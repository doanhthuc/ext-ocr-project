import { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { cn } from '~shared/utils/cn.util';

export type ImagePreviewAdvancedProps = {
  src: string;
  alt?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  showControls?: boolean;
  showFullscreenButton?: boolean;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  enablePinch?: boolean;
  enableDoubleClick?: boolean;
  enableWheel?: boolean;
};

export function ImagePreviewAdvanced({
  src,
  alt = 'Preview image',
  className,
  onLoad,
  onError,
  showControls = true,
  showFullscreenButton = true,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1,
  enablePinch = true,
  enableDoubleClick = true,
  enableWheel = true,
}: ImagePreviewAdvancedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false);
    }
  };

  const containerClasses = cn(
    // 16:9 aspect ratio container
    'relative w-full bg-bg-secondary rounded-lg overflow-hidden',
    'aspect-[16/9]',
    isFullscreen && 'fixed inset-0 z-50 aspect-auto rounded-none bg-black',
    className
  );

  return (
    <>
      <div
        className={containerClasses}
        onKeyDown={handleFullscreenEscape}
        tabIndex={-1}
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
            wheel={{ disabled: !enableWheel, step: 0.1 }}
            pinch={{ disabled: !enablePinch, step: 0.1 }}
            doubleClick={{
              disabled: !enableDoubleClick,
              step: 0.5,
              mode: 'toggle',
            }}
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
                  <div className="absolute inset-0 flex items-center justify-center">
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

                    {showFullscreenButton && (
                      <button
                        onClick={toggleFullscreen}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                        title={
                          isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
                        }
                        type="button"
                      >
                        {isFullscreen ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M3 7V4a1 1 0 0 1 1-1h3" />
                            <path d="M17 3h3a1 1 0 0 1 1 1v3" />
                            <path d="M21 17v3a1 1 0 0 1-1 1h-3" />
                            <path d="M7 21H4a1 1 0 0 1-1-1v-3" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Fullscreen close button */}
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors z-10"
                    title="Close fullscreen"
                    type="button"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}

                {/* Interaction hints */}
                {isLoaded && (
                  <div className="absolute bottom-4 left-4 text-xs text-white/70 bg-black/30 rounded px-2 py-1 backdrop-blur-sm">
                    {enableWheel && 'Scroll to zoom'}
                    {enableWheel && enableDoubleClick && ' • '}
                    {enableDoubleClick && 'Double-click to toggle zoom'}
                  </div>
                )}
              </>
            )}
          </TransformWrapper>
        )}
      </div>

      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/80 z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </>
  );
}
