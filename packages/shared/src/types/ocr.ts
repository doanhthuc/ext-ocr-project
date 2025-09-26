export type OcrResult = {
  id: string;
  text: string;
  confidence: number;
  boundingBoxes: Array<BoundingBox>;
  processingTime: number;
  createdAt: string;
};

export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  confidence: number;
};
