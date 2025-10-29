import {
  Group,
  Layer,
  Line,
  Rect,
  Stage,
  Text as KonvaText,
} from 'react-konva';

import type { OcrCell } from '~/ocr/types/ocr-result.type';

import { extractCellText, parseTableHtml } from '~/ocr/utils/ocr-parser.util';

type OcrCanvasDisplayProps = {
  cells: Array<OcrCell>;
  imageHeight: number;
  imageWidth: number;
  scale?: number;
};

type CellRendererProps = {
  cell: OcrCell;
  scale: number;
};

function TableCell({ cell, scale }: CellRendererProps) {
  const [x1, y1, x2, y2] = cell.bbox;
  const width = (x2 - x1) * scale;
  const height = (y2 - y1) * scale;

  if (!cell.text) {
    return null;
  }

  const parsedTable = parseTableHtml(cell.text);
  if (!parsedTable) {
    return null;
  }

  const rows = parsedTable.rows;
  const rowCount = rows.length;
  const maxCols = Math.max(...rows.map(row => row.cells.length));

  const cellHeight = height / rowCount;
  const cellWidth = width / maxCols;
  // Font size: 40-50% of cell height, minimum 8px, maximum 16px when scaled
  const fontSize = Math.max(8 * scale, Math.min(cellHeight * 0.5, 16 * scale));
  const padding = 3 * scale;

  return (
    <Group x={x1 * scale} y={y1 * scale}>
      {/* Background */}
      <Rect
        fill="#ffffff"
        height={height}
        stroke="#e5e7eb"
        strokeWidth={0.5}
        width={width}
      />

      {/* Table grid and text */}
      {rows.map((row, rowIndex) => {
        const rowY = rowIndex * cellHeight;

        return row.cells.map((tableCell, colIndex) => {
          const cellX = colIndex * cellWidth;
          const actualWidth = cellWidth * (tableCell.colSpan || 1);
          const actualHeight = cellHeight * (tableCell.rowSpan || 1);

          return (
            <Group key={`table-cell-${rowIndex}-${colIndex}`}>
              {/* Cell border */}
              <Rect
                height={actualHeight}
                stroke="#d1d5db"
                strokeWidth={0.5}
                width={actualWidth}
                x={cellX}
                y={rowY}
              />

              {/* Cell text */}
              <KonvaText
                align="left"
                fill={tableCell.isHeader ? '#1f2937' : '#6b7280'}
                fontSize={fontSize}
                fontStyle={tableCell.isHeader ? 'bold' : 'normal'}
                height={actualHeight}
                padding={padding}
                text={tableCell.content}
                verticalAlign="middle"
                width={actualWidth}
                wrap="word"
                x={cellX}
                y={rowY}
              />
            </Group>
          );
        });
      })}

      {/* Outer border */}
      <Line
        closed
        points={[0, 0, width, 0, width, height, 0, height]}
        stroke="#9ca3af"
        strokeWidth={1}
      />
    </Group>
  );
}

function TextCell({ cell, scale }: CellRendererProps) {
  const [x1, y1, x2, y2] = cell.bbox;
  const width = (x2 - x1) * scale;
  const height = (y2 - y1) * scale;
  const text = extractCellText(cell);

  if (!text || cell.category === 'Picture') {
    return null;
  }

  // Calculate font size based on cell height (20-30% of height)
  // with reasonable min/max bounds
  const baseFontSize = Math.max(
    10 * scale,
    Math.min(height * 0.25, 18 * scale)
  );

  // Determine text styling based on category
  const getTextConfig = () => {
    const baseConfig = {
      fontSize: baseFontSize,
      fontStyle: 'normal',
      fontWeight: 'normal',
      text,
      width,
      wrap: 'word' as const,
      x: x1 * scale,
      y: y1 * scale,
    };

    switch (cell.category) {
      case 'Section-header':
        return {
          ...baseConfig,
          fill: '#1f2937', // text-text-dark
          fontSize: Math.max(12 * scale, Math.min(height * 0.3, 20 * scale)),
          fontStyle: 'bold',
        };
      case 'Title':
        return {
          ...baseConfig,
          fill: '#1f2937', // text-text-dark
          fontSize: Math.max(14 * scale, Math.min(height * 0.35, 24 * scale)),
          fontStyle: 'bold',
        };
      case 'List-item':
        return {
          ...baseConfig,
          fill: '#6b7280', // text-text-secondary
          fontSize: Math.max(9 * scale, Math.min(height * 0.22, 16 * scale)),
        };
      default:
        return {
          ...baseConfig,
          fill: '#6b7280', // text-text-secondary
        };
    }
  };

  return <KonvaText {...getTextConfig()} />;
}

function CellRenderer({ cell, scale }: CellRendererProps) {
  // Check if it's a table
  if (cell.category === 'Table' && cell.text) {
    return <TableCell cell={cell} scale={scale} />;
  }

  // Otherwise render as text
  return <TextCell cell={cell} scale={scale} />;
}

export function OcrCanvasDisplay({
  cells,
  imageHeight,
  imageWidth,
  scale = 1,
}: OcrCanvasDisplayProps) {
  const containerWidth = imageWidth * scale;
  const containerHeight = imageHeight * scale;

  return (
    <div className="h-full w-full overflow-auto">
      {cells.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-text-tertiary">No OCR data available</p>
        </div>
      ) : (
        <Stage height={containerHeight} width={containerWidth}>
          <Layer>
            {cells.map((cell, index) => (
              <CellRenderer
                cell={cell}
                key={`ocr-cell-${index}`}
                scale={scale}
              />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
