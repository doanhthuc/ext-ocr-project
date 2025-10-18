# OCR Module - Usage Guide

This module provides components and utilities for displaying OCR results with bounding box visualization and data extraction.

## Components

### 1. ImageCarousel

Displays images with navigation and optional OCR bounding box overlays.

```tsx
import { ImageCarousel } from '~/ocr/components/ImageCarousel';

<ImageCarousel
  images={['/path/to/image1.png', '/path/to/image2.png']}
  currentIndex={0}
  onNext={handleNext}
  onPrevious={handlePrevious}
  alt="Document"
  ocrData={[
    {
      cells: ocrCells,
      imageWidth: 1036,
      imageHeight: 980,
    },
  ]}
  showBoundingBoxes={true}
  showNavigation={true}
/>;
```

**Props:**

- `images`: Array of image URLs
- `currentIndex`: Currently displayed image index
- `onNext/onPrevious`: Navigation callbacks
- `alt`: Alt text for images
- `ocrData?`: Optional OCR data with cells and dimensions
- `showBoundingBoxes?`: Toggle bounding box display (default: true)
- `showNavigation?`: Toggle navigation arrows (default: true)

### 2. BoundingBoxOverlay

Automatically calculates proper coordinate scaling based on:

- Original image dimensions (`imageWidth`, `imageHeight` from OCR JSON)
- Actual displayed image size (considering CSS `object-contain`)
- Container size and aspect ratio

The overlay:

- Uses SVG with proper viewBox matching original dimensions
- Positions itself perfectly over the displayed image
- Handles responsive resizing
- Accounts for letterboxing/pillarboxing from `object-contain`

**Color Coding:**

- **Blue**: Table
- **Emerald**: Footnote
- **Amber**: Text
- **Pink**: Section-header
- **Orange**: Picture
- **Violet**: List-item
- **Red**: Title

### 3. ThumbnailList

Displays thumbnail navigation for multiple images.

```tsx
import { ThumbnailList } from '~/ocr/components/ThumbnailList';

<ThumbnailList
  images={images}
  selectedIndex={currentIndex}
  onSelectImage={handleSelectImage}
  alt="Document"
/>;
```

### 4. OcrSelectableDisplay (Recommended)

**HTML-based OCR data display** with text selection support. Best balance of features and usability.

```tsx
import { OcrSelectableDisplay } from '~/ocr/components/OcrSelectableDisplay';

<OcrSelectableDisplay
  cells={ocrResult.cells}
  imageHeight={ocrResult.input_height}
  imageWidth={ocrResult.input_width}
  scale={0.8} // Optional: scale factor for display
/>;
```

**Props:**

- `cells`: Array of OCR cells to display
- `imageHeight`: Original image height from OCR result
- `imageWidth`: Original image width from OCR result
- `scale?`: Optional scale factor (default: 1)

**Features:**

- ✅ **Text Selection**: Full native text selection support (copy, select, search)
- ✅ **Table Support**: Renders HTML tables with proper borders and structure
- ✅ **Precise Positioning**: Absolute positioning based on bounding box coordinates
- ✅ **Responsive Font Sizing**: Scales appropriately with cell height and scale factor
- ✅ **Category-based Styling**: Different text sizes/weights for different content types
- ✅ **Automatic Text Wrapping**: Smart text wrapping within bounding box width
- ✅ **Transparent Background**: Clean overlay on any background

**Why This Component?**

- Native browser text selection (Ctrl+C, right-click, etc.)
- Better accessibility and user experience
- Familiar text interaction patterns

### 5. OcrCanvasDisplay

**Canvas-based OCR data display** using react-konva. Use when text selection is not needed and performance is critical.

```tsx
import { OcrCanvasDisplay } from '~/ocr/components/OcrCanvasDisplay';

<OcrCanvasDisplay
  cells={ocrResult.cells}
  imageHeight={ocrResult.input_height}
  imageWidth={ocrResult.input_width}
  scale={0.8} // Optional: scale factor for display
/>;
```

**Note:** Canvas text is not selectable. Use `OcrSelectableDisplay` for better user experience.

### 6. OcrViewerWithData

Complete OCR viewer combining image display and data extraction.

```tsx
import { OcrViewerWithData } from '~/ocr/components/OcrViewerWithData';

<OcrViewerWithData showBoundingBoxes={true} />;
```

## Utilities

### OCR Parser (`ocr-parser.util.ts`)

```tsx
import {
  parseTableHtml,
  extractCellText,
  groupCellsByHorizontalLine,
} from '~/ocr/utils/ocr-parser.util';

// Parse HTML table from OCR cell
const table = parseTableHtml(cell.text);

// Extract plain text from any cell type
const text = extractCellText(cell);

// Group cells that appear on the same horizontal line
const groupedCells = groupCellsByHorizontalLine(cells, 20); // tolerance in pixels
// Returns: Array<Array<OcrCell>>
// Each inner array contains cells from the same horizontal line, sorted left to right
```

## Mock Data

Located in `packages/web-platform/src/shared/mock/`:

```tsx
import { mockImages, mockOcrResults, mockOcrDocuments } from '~shared/mock';

// mockImages: Array of image paths
// mockOcrResults: Array of parsed OCR results
// mockOcrDocuments: Array of { id, image, ocrData }
```

## Types

```tsx
import type {
  OcrCell,
  OcrCellCategory,
  OcrPageResult,
  OcrResult,
} from '~/ocr/types/ocr-result.type';

// OcrCell structure:
type OcrCell = {
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  category: OcrCellCategory;
  text?: string; // Optional: HTML for tables, plain text otherwise
};

// OcrPageResult structure:
type OcrPageResult = {
  cells: Array<OcrCell>;
  input_width: number; // Original image width
  input_height: number; // Original image height
  page_no: number;
  md_content: string;
  // ... other fields
};
```

## Integration Examples

### Example 1: Using in DetailsLeftPanel

```tsx
<DetailsLeftPanel
  fileName="document.png"
  useMockData={true}
  showBoundingBoxes={true}
/>
```

### Example 2: Custom Implementation

```tsx
function MyOcrPage() {
  const [index, setIndex] = useState(0);

  const ocrData = myOcrResults.map(result => ({
    cells: result.cells,
    imageWidth: result.input_width,
    imageHeight: result.input_height,
  }));

  return (
    <div>
      <ImageCarousel
        images={myImages}
        currentIndex={index}
        ocrData={ocrData}
        showBoundingBoxes={true}
        onNext={() => setIndex(i => i + 1)}
        onPrevious={() => setIndex(i => i - 1)}
        alt="My Document"
      />

      <OcrSelectableDisplay
        cells={myOcrResults[index].cells}
        imageHeight={myOcrResults[index].input_height}
        imageWidth={myOcrResults[index].input_width}
        scale={0.8}
      />
    </div>
  );
}
```

### Example 3: Processing OCR Data

```tsx
import { parseTableHtml, extractCellText } from '~/ocr/utils/ocr-parser.util';

function processOcrResults(cells: Array<OcrCell>) {
  // Parse tables
  const tableCells = cells.filter(c => c.category === 'Table');
  tableCells.forEach(cell => {
    if (cell.text) {
      const parsedTable = parseTableHtml(cell.text);
      if (parsedTable) {
        console.log('Table rows:', parsedTable.rows.length);
      }
    }
  });

  // Extract text from cells
  const textCells = cells.filter(c => c.category === 'Text');
  textCells.forEach(cell => {
    const text = extractCellText(cell);
    console.log('Text:', text);
  });
}
```

## Coordinate Scaling

The `BoundingBoxOverlay` component automatically handles coordinate transformation:

1. **Input**: Bounding boxes in original image coordinates (from OCR JSON)
2. **Processing**:
   - Calculates actual displayed image size considering `object-contain`
   - Accounts for container aspect ratio
   - Handles letterboxing/pillarboxing offsets
3. **Output**: Perfectly positioned SVG overlay matching the displayed image

**Important**: Always provide `imageWidth` and `imageHeight` from the OCR JSON's `input_width` and `input_height` fields. These are the original dimensions used when the OCR was performed.

## Best Practices

1. **Always use original dimensions**: Pass `input_width` and `input_height` from OCR results as `imageWidth` and `imageHeight` props
2. **Type safety**: Use provided types for OCR data structures
3. **Error handling**: Components handle missing or invalid data gracefully
4. **Performance**: Large tables are limited in height with scrolling
5. **Accessibility**: All interactive elements have proper ARIA labels

## Troubleshooting

### Bounding boxes are misaligned

- Ensure `imageWidth` and `imageHeight` match the OCR's `input_width` and `input_height`
- The component automatically handles CSS `object-contain` scaling

### Tables not parsing

- Check that cell.text contains valid HTML table markup
- Use `parseTableHtml()` utility to debug table structure

### Images not loading

- Verify image paths are correct and accessible
- Check browser console for 404 errors
