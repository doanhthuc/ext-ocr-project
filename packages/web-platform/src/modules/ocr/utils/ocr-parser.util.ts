import type { OcrCell } from '~/ocr/types/ocr-result.type';

export type TableCell = {
  colSpan?: number;
  content: string;
  isHeader: boolean;
  rowSpan?: number;
};

export type TableRow = {
  cells: Array<TableCell>;
  isHeader: boolean;
};

export type ParsedTable = {
  rows: Array<TableRow>;
};

/**
 * Extracts table data from HTML string
 */
export function parseTableHtml(html: string): ParsedTable | null {
  if (!html || !html.includes('<table>')) {
    return null;
  }

  try {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const table = doc.querySelector('table');

    if (!table) {
      return null;
    }

    const rows: Array<TableRow> = [];

    // Parse thead rows
    const thead = table.querySelector('thead');
    if (thead) {
      const headerRows = thead.querySelectorAll('tr');
      headerRows.forEach(tr => {
        const cells: Array<TableCell> = [];
        tr.querySelectorAll('th, td').forEach(cell => {
          const element = cell as HTMLTableCellElement;
          cells.push({
            colSpan: element.colSpan > 1 ? element.colSpan : undefined,
            content: element.textContent?.trim() || '',
            isHeader: true,
            rowSpan: element.rowSpan > 1 ? element.rowSpan : undefined,
          });
        });
        rows.push({ cells, isHeader: true });
      });
    }

    // Parse tbody rows
    const tbody = table.querySelector('tbody');
    const bodyRows = tbody
      ? tbody.querySelectorAll('tr')
      : table.querySelectorAll('tr');

    bodyRows.forEach(tr => {
      // Skip if already processed as part of thead
      if (thead && thead.contains(tr)) {
        return;
      }

      const cells: Array<TableCell> = [];
      const hasHeaderCells = tr.querySelector('th') !== null;

      tr.querySelectorAll('th, td').forEach(cell => {
        const element = cell as HTMLTableCellElement;
        const isHeader = element.tagName.toLowerCase() === 'th';

        cells.push({
          colSpan: element.colSpan > 1 ? element.colSpan : undefined,
          content: element.textContent?.trim() || '',
          isHeader,
          rowSpan: element.rowSpan > 1 ? element.rowSpan : undefined,
        });
      });

      rows.push({ cells, isHeader: hasHeaderCells });
    });

    return { rows };
  } catch (error) {
    console.error('Error parsing table HTML:', error);
    return null;
  }
}

/**
 * Extracts text content from a cell, handling HTML if present
 */
export function extractCellText(cell: OcrCell): string {
  if (!cell.text) {
    return '';
  }

  // If it's a table, try to extract readable text
  if (cell.category === 'Table') {
    const parsed = parseTableHtml(cell.text);
    if (parsed) {
      // Convert table to plain text
      return parsed.rows
        .map(row => row.cells.map(c => c.content).join(' | '))
        .join('\n');
    }
  }

  // For other types, remove HTML tags if present
  if (cell.text.includes('<') && cell.text.includes('>')) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(cell.text, 'text/html');
    return doc.body.textContent?.trim() || '';
  }

  return cell.text;
}

/**
 * Groups cells that appear on the same horizontal line in the document
 * based on their Y coordinates with a tolerance threshold
 */
export function groupCellsByHorizontalLine(
  cells: Array<OcrCell>,
  tolerance = 20
): Array<Array<OcrCell>> {
  if (cells.length === 0) {
    return [];
  }

  // Sort cells by Y position first
  const sortedCells = [...cells].sort((a, b) => {
    const aY = a.bbox[1]; // y1
    const bY = b.bbox[1]; // y1
    return aY - bY;
  });

  const groups: Array<Array<OcrCell>> = [];
  let currentGroup: Array<OcrCell> = [sortedCells[0]];
  let currentYCenter = (sortedCells[0].bbox[1] + sortedCells[0].bbox[3]) / 2;

  for (let i = 1; i < sortedCells.length; i++) {
    const cell = sortedCells[i];
    const cellYCenter = (cell.bbox[1] + cell.bbox[3]) / 2;

    // If the cell is within tolerance of current group's Y position, add to group
    if (Math.abs(cellYCenter - currentYCenter) <= tolerance) {
      currentGroup.push(cell);
    } else {
      // Sort current group by X position (left to right) before adding
      currentGroup.sort((a, b) => a.bbox[0] - b.bbox[0]);
      groups.push(currentGroup);

      // Start new group
      currentGroup = [cell];
      currentYCenter = cellYCenter;
    }
  }

  // Don't forget the last group
  if (currentGroup.length > 0) {
    currentGroup.sort((a, b) => a.bbox[0] - b.bbox[0]);
    groups.push(currentGroup);
  }

  return groups;
}
