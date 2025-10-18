import type { OcrCellCategory, OcrPageResult } from '~/ocr/types/ocr-result.type';

import mockData1 from './1_1.json';
import image1 from './1_1.png';
import mockData2 from './1_2.json';
import image2 from './1_2.png';

// Transform raw JSON data to typed OCR results
function transformOcrData(data: Array<any>): Array<OcrPageResult> {
  return data.map((page) => ({
    ...page,
    cells: page.cells.map((cell: any) => ({
      ...cell,
      bbox: cell.bbox as [number, number, number, number],
      category: cell.category as OcrCellCategory,
    })),
  }));
}

export const mockOcrDocuments = [
  {
    id: '1_1',
    image: image1,
    ocrData: transformOcrData(mockData1),
  },
  {
    id: '1_2',
    image: image2,
    ocrData: transformOcrData(mockData2),
  },
];

export const mockImages = [image1, image2];

export const mockOcrResults = [
  ...transformOcrData(mockData1),
  ...transformOcrData(mockData2),
];
