export type OcrCellCategory =
  | 'Footnote'
  | 'List-item'
  | 'Picture'
  | 'Section-header'
  | 'Table'
  | 'Text'
  | 'Title';

export type OcrCell = {
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  category: OcrCellCategory;
  text?: string; // Optional: contains text content or HTML (for tables)
};

export type OcrPageResult = {
  cells: Array<OcrCell>;
  file_path: string;
  image_with_layout: string | null;
  input_height: number;
  input_width: number;
  md_content: string;
  md_content_no_hf: string;
  page_no: number;
};

export type OcrResult = Array<OcrPageResult>;
