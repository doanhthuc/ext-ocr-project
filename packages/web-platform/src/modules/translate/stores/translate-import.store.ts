import { create } from 'zustand';

type TranslateImportState = {
  selectedImageIndex: number;
  sourceLanguage: string;
  targetLanguage: string;
  uploadedImages: Array<string>;
  setSelectedImageIndex: (index: number) => void;
  setSourceLanguage: (language: string) => void;
  setTargetLanguage: (language: string) => void;
  setUploadedImages: (images: Array<string>) => void;
};

export const useTranslateImportStore = create<TranslateImportState>(set => ({
  selectedImageIndex: 0,
  sourceLanguage: 'vi',
  targetLanguage: 'en',
  uploadedImages: [],
  setSelectedImageIndex: index => set({ selectedImageIndex: index }),
  setSourceLanguage: language => set({ sourceLanguage: language }),
  setTargetLanguage: language => set({ targetLanguage: language }),
  setUploadedImages: images => set({ uploadedImages: images }),
}));
