import type {
  OcrCellCategory,
  OcrPageResult,
} from '~/ocr/types/ocr-result.type';

import mockData1 from './1_1.json';
import image1 from './1_1.png';
import mockData2 from './1_2.json';
import image2 from './1_2.png';

type RawOcrCell = {
  bbox: Array<number>;
  category: string;
  [key: string]: unknown;
};

type RawOcrPage = {
  cells: Array<RawOcrCell>;
  file_path: string;
  image_with_layout: string | null;
  input_height: number;
  input_width: number;
  md_content: string;
  md_content_no_hf: string;
  page_no: number;
};

// Transform raw JSON data to typed OCR results
function transformOcrData(data: Array<RawOcrPage>): Array<OcrPageResult> {
  return data.map(page => ({
    file_path: page.file_path,
    image_with_layout: page.image_with_layout,
    input_height: page.input_height,
    input_width: page.input_width,
    md_content: page.md_content,
    md_content_no_hf: page.md_content_no_hf,
    page_no: page.page_no,
    cells: page.cells.map((cell: RawOcrCell) => ({
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
