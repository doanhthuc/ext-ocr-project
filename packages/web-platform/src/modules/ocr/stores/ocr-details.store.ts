import { create } from 'zustand';

import type { OcrPageResult } from '~/ocr/types/ocr-result.type';

type OcrDetailsState = {
  activeTab: string;
  hoveredCellIndex: number | null;
  ocrResults: Array<OcrPageResult>;
  selectedImageIndex: number;
  setActiveTab: (tab: string) => void;
  setHoveredCellIndex: (index: number | null) => void;
  setOcrResults: (results: Array<OcrPageResult>) => void;
  setSelectedImageIndex: (index: number) => void;
};

export const useOcrDetailsStore = create<OcrDetailsState>(set => ({
  activeTab: 'key-value-pairs',
  hoveredCellIndex: null,
  ocrResults: [],
  selectedImageIndex: 0,
  setActiveTab: tab => set({ activeTab: tab }),
  setHoveredCellIndex: index => set({ hoveredCellIndex: index }),
  setOcrResults: results => set({ ocrResults: results }),
  setSelectedImageIndex: index => set({ selectedImageIndex: index }),
}));
