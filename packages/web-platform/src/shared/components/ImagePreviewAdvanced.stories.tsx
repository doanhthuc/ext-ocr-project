import type { Meta, StoryObj } from '@storybook/react-vite';

import { ImagePreviewAdvanced } from './ImagePreviewAdvanced';

const meta = {
  title: 'Components/ImagePreviewAdvanced',
  component: ImagePreviewAdvanced,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An advanced image preview component with zoom, pan, pinch, and fullscreen functionality in a 16:9 aspect ratio.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    showControls: {
      control: 'boolean',
      description: 'Show zoom control buttons',
    },
    showFullscreenButton: {
      control: 'boolean',
      description: 'Show fullscreen toggle button',
    },
    enablePinch: {
      control: 'boolean',
      description: 'Enable pinch to zoom on touch devices',
    },
    enableDoubleClick: {
      control: 'boolean',
      description: 'Enable double-click to zoom',
    },
    enableWheel: {
      control: 'boolean',
      description: 'Enable mouse wheel to zoom',
    },
    minScale: {
      control: { type: 'number', min: 0.1, max: 1, step: 0.1 },
      description: 'Minimum zoom scale',
    },
    maxScale: {
      control: { type: 'number', min: 1, max: 10, step: 0.5 },
      description: 'Maximum zoom scale',
    },
    initialScale: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
      description: 'Initial zoom scale',
    },
  },
} satisfies Meta<typeof ImagePreviewAdvanced>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images for demonstration
const sampleImages = {
  landscape: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop',
  document: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=675&fit=crop',
  portrait: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=675&fit=crop',
  technical: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=675&fit=crop',
  diagram: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
};

export const Default: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Advanced image preview',
    showControls: true,
    showFullscreenButton: true,
    enablePinch: true,
    enableDoubleClick: true,
    enableWheel: true,
    minScale: 0.5,
    maxScale: 3,
    initialScale: 1,
  },
};

export const FullFeatured: Story = {
  args: {
    src: sampleImages.technical,
    alt: 'Full-featured preview',
    showControls: true,
    showFullscreenButton: true,
    enablePinch: true,
    enableDoubleClick: true,
    enableWheel: true,
    minScale: 0.2,
    maxScale: 5,
    initialScale: 1,
    className: 'w-full max-w-4xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-featured version with all interaction modes enabled and wider zoom range.',
      },
    },
  },
};

export const TouchOnly: Story = {
  args: {
    src: sampleImages.diagram,
    alt: 'Touch-only interactions',
    showControls: true,
    showFullscreenButton: true,
    enablePinch: true,
    enableDoubleClick: true,
    enableWheel: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Optimized for touch devices - wheel zoom disabled, pinch and double-tap enabled.',
      },
    },
  },
};

export const MouseOnly: Story = {
  args: {
    src: sampleImages.portrait,
    alt: 'Mouse-only interactions',
    showControls: true,
    showFullscreenButton: true,
    enablePinch: false,
    enableDoubleClick: true,
    enableWheel: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Optimized for mouse interactions - pinch disabled, wheel and double-click enabled.',
      },
    },
  },
};

export const MinimalControls: Story = {
  args: {
    src: sampleImages.document,
    alt: 'Minimal controls',
    showControls: false,
    showFullscreenButton: false,
    enablePinch: true,
    enableDoubleClick: true,
    enableWheel: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean interface with no visible controls - interactions through gestures only.',
      },
    },
  },
};

export const CustomSize: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Custom sized preview',
    className: 'w-80',
    showControls: true,
    showFullscreenButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom width while maintaining 16:9 aspect ratio.',
      },
    },
  },
};

export const HighZoomRange: Story = {
  args: {
    src: sampleImages.technical,
    alt: 'High zoom range example',
    minScale: 0.1,
    maxScale: 10,
    initialScale: 0.5,
    showControls: true,
    showFullscreenButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended zoom range from 0.1x to 10x for detailed inspection.',
      },
    },
  },
};