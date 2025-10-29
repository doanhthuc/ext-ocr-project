import { useEffect, useRef, useState } from 'react';

import type { OcrCell } from '~/ocr/types/ocr-result.type';

import { useOcrDetailsStore } from '~/ocr/stores/ocr-details.store';

type BoundingBoxOverlayProps = {
  cells: Array<OcrCell>;
  imageHeight: number;
  imageWidth: number;
  showBoxes?: boolean;
};

export function BoundingBoxOverlay({
  cells,
  imageHeight,
  imageWidth,
  showBoxes = true,
}: BoundingBoxOverlayProps) {
  const hoveredCellIndex = useOcrDetailsStore(state => state.hoveredCellIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const container = containerRef.current.parentElement;
      if (!container) return;

      const img = container.querySelector('img');
      if (!img) return;

      // Get container dimensions
      const containerRect = container.getBoundingClientRect();

      // Calculate the displayed image dimensions considering object-contain
      const containerAspect = containerRect.width / containerRect.height;
      const imageAspect = imageWidth / imageHeight;

      let displayedWidth: number;
      let displayedHeight: number;
      let offsetX = 0;
      let offsetY = 0;

      if (containerAspect > imageAspect) {
        // Container is wider - image is constrained by height
        displayedHeight = containerRect.height;
        displayedWidth = displayedHeight * imageAspect;
        offsetX = (containerRect.width - displayedWidth) / 2;
      } else {
        // Container is taller - image is constrained by width
        displayedWidth = containerRect.width;
        displayedHeight = displayedWidth / imageAspect;
        offsetY = (containerRect.height - displayedHeight) / 2;
      }

      setDimensions({
        height: displayedHeight,
        left: offsetX,
        top: offsetY,
        width: displayedWidth,
      });
    };

    updateDimensions();

    // Update on window resize
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [imageHeight, imageWidth]);

  if (!showBoxes) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <svg
          className="absolute"
          style={{
            height: `${dimensions.height}px`,
            left: `${dimensions.left}px`,
            top: `${dimensions.top}px`,
            width: `${dimensions.width}px`,
          }}
          viewBox={`0 0 ${imageWidth} ${imageHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {cells.map((cell, index) => {
            const [x1, y1, x2, y2] = cell.bbox;
            const width = x2 - x1;
            const height = y2 - y1;

            // Calculate label dimensions based on viewport
            const scale = dimensions.width / imageWidth;

            const isHovered = hoveredCellIndex === index;

            return (
              <g key={index}>
                {/* Bounding box rectangle */}
                <rect
                  x={x1}
                  y={y1}
                  width={width}
                  height={height}
                  fill="#2970FF"
                  fillOpacity={0.2}
                  stroke={isHovered ? '#2970FF' : 'none'}
                  strokeWidth={isHovered ? 3 / scale : 0}
                />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
