import { useEffect, useRef, useState } from 'react';

import type { OcrCell } from '~/ocr/types/ocr-result.type';

import { useOcrDetailsStore } from '~/ocr/stores/ocr-details.store';
import { extractCellText, parseTableHtml } from '~/ocr/utils/ocr-parser.util';

type OcrSelectableDisplayProps = {
  cells: Array<OcrCell>;
  imageHeight: number;
  imageWidth: number;
  scale?: number;
};

type PositionedCellProps = {
  cell: OcrCell;
  index: number;
  scale: number;
};

function PositionedCell({ cell, index, scale }: PositionedCellProps) {
  const setHoveredCellIndex = useOcrDetailsStore(
    state => state.setHoveredCellIndex
  );
  const [x1, y1, x2, y2] = cell.bbox;
  const width = (x2 - x1) * scale;
  const height = (y2 - y1) * scale;

  const handleMouseEnter = () => {
    setHoveredCellIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCellIndex(null);
  };

  // If it's a table with HTML, render the parsed table
  if (cell.category === 'Table' && cell.text) {
    const parsedTable = parseTableHtml(cell.text);
    if (parsedTable) {
      return (
        <div
          className="absolute overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            height: `${height}px`,
            left: `${x1 * scale}px`,
            top: `${y1 * scale}px`,
            width: `${width}px`,
          }}
        >
          <table
            className="border-collapse bg-white select-text"
            style={{
              fontSize: `${Math.max(8 * scale, Math.min((height / parsedTable.rows.length) * 0.5, 16 * scale))}px`,
              height: '100%',
              width: '100%',
            }}
          >
            <tbody>
              {parsedTable.rows.map((row, rowIndex) => (
                <tr key={`ocr-table-row-${rowIndex}`}>
                  {row.cells.map((tableCell, cellIndex) => {
                    const Tag = tableCell.isHeader ? 'th' : 'td';
                    return (
                      <Tag
                        key={`ocr-table-cell-${cellIndex}`}
                        colSpan={tableCell.colSpan}
                        rowSpan={tableCell.rowSpan}
                        className={`px-1 py-0.5 border border-gray-6 text-left select-text ${
                          tableCell.isHeader
                            ? 'font-semibold text-text-dark'
                            : 'text-text-secondary'
                        }`}
                        style={{
                          userSelect: 'text',
                        }}
                      >
                        {tableCell.content}
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  // For other content types, show text
  const text = extractCellText(cell);
  if (!text || cell.category === 'Picture') {
    return null;
  }

  // Determine text size and styling based on category
  const getStyles = () => {
    const baseFontSize = Math.max(
      10 * scale,
      Math.min(height * 0.25, 18 * scale)
    );

    switch (cell.category) {
      case 'Section-header':
        return {
          className: 'font-semibold text-text-dark',
          fontSize: Math.max(12 * scale, Math.min(height * 0.3, 20 * scale)),
        };
      case 'Title':
        return {
          className: 'font-bold text-text-dark',
          fontSize: Math.max(14 * scale, Math.min(height * 0.35, 24 * scale)),
        };
      case 'List-item':
        return {
          className: 'text-text-secondary',
          fontSize: Math.max(9 * scale, Math.min(height * 0.22, 16 * scale)),
        };
      default:
        return {
          className: 'text-text-secondary',
          fontSize: baseFontSize,
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`absolute whitespace-pre-wrap break-words select-text ${styles.className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        fontSize: `${styles.fontSize}px`,
        left: `${x1 * scale}px`,
        lineHeight: '1.2',
        maxWidth: `${width * 1.2}px`,
        top: `${y1 * scale}px`,
        userSelect: 'text',
      }}
    >
      {text}
    </div>
  );
}

export function OcrSelectableDisplay({
  cells,
  imageHeight,
  imageWidth,
  scale: propScale,
}: OcrSelectableDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [calculatedScale, setCalculatedScale] = useState<number>(
    propScale ?? 1
  );

  // Calculate responsive scale based on container size
  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const availableWidth = containerRect.width;
      const availableHeight = containerRect.height;

      // Calculate scale to fit within container with some padding
      const scaleX = (availableWidth - 32) / imageWidth; // 32px padding (16px each side)
      const scaleY = (availableHeight - 32) / imageHeight;

      // Use the smaller scale to ensure it fits both dimensions
      const newScale = Math.min(scaleX, scaleY, propScale ?? 1);

      // Only update if the scale changes significantly (avoid micro-updates)
      setCalculatedScale(prevScale => {
        if (Math.abs(prevScale - newScale) > 0.01) {
          return Math.max(0.1, newScale); // Minimum scale of 0.1
        }
        return prevScale;
      });
    };

    // Initial calculation
    updateScale();

    // Set up ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [imageWidth, imageHeight, propScale]);

  const containerWidth = imageWidth * calculatedScale;
  const containerHeight = imageHeight * calculatedScale;

  return (
    <div ref={containerRef} className="h-full w-full overflow-auto">
      {cells.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-text-tertiary">No OCR data available</p>
        </div>
      ) : (
        <div
          className="relative select-text mx-auto"
          style={{
            height: `${containerHeight}px`,
            minWidth: `${containerWidth}px`,
            width: `${containerWidth}px`,
          }}
        >
          {cells.map((cell, index) => (
            <PositionedCell
              cell={cell}
              index={index}
              key={`ocr-cell-${index}`}
              scale={calculatedScale}
            />
          ))}
        </div>
      )}
    </div>
  );
}
