import { create } from 'zustand';

import type { OcrPageResult } from '~/ocr/types/ocr-result.type';

type TranslateDetailsState = {
  hoveredCellIndex: number | null;
  ocrResults: Array<OcrPageResult>;
  selectedImageIndex: number;
  setHoveredCellIndex: (index: number | null) => void;
  setOcrResults: (results: Array<OcrPageResult>) => void;
  setSelectedImageIndex: (index: number) => void;
};

export const useTranslateDetailsStore = create<TranslateDetailsState>(set => ({
  hoveredCellIndex: null,
  ocrResults: [],
  selectedImageIndex: 0,
  setHoveredCellIndex: index => set({ hoveredCellIndex: index }),
  setOcrResults: results => set({ ocrResults: results }),
  setSelectedImageIndex: index => set({ selectedImageIndex: index }),
}));
