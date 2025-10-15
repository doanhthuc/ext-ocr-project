import type { Meta, StoryObj } from '@storybook/react-vite';

import { ImagePreview } from './ImagePreview';

const meta = {
  title: 'Components/ImagePreview',
  component: ImagePreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An image preview component with zoom, pan, and pinch functionality in a 16:9 aspect ratio.',
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
} satisfies Meta<typeof ImagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample images for demonstration
const sampleImages = {
  landscape:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
  document:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
  portrait:
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=450&fit=crop',
  technical:
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=450&fit=crop',
};

export const Default: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Landscape image preview',
    showControls: true,
    minScale: 0.5,
    maxScale: 3,
    initialScale: 1,
  },
};

export const WithoutControls: Story = {
  args: {
    src: sampleImages.document,
    alt: 'Document preview without controls',
    showControls: false,
  },
};

export const CustomZoomLimits: Story = {
  args: {
    src: sampleImages.portrait,
    alt: 'Custom zoom limits example',
    minScale: 0.2,
    maxScale: 5,
    initialScale: 0.8,
  },
};

export const CustomSize: Story = {
  args: {
    src: sampleImages.technical,
    alt: 'Custom sized preview',
    className: 'w-96',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom width while maintaining 16:9 aspect ratio.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    alt: 'Image that will fail to load',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error state when image fails to load.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    src: sampleImages.landscape,
    alt: 'Interactive playground',
    showControls: true,
    minScale: 0.5,
    maxScale: 3,
    initialScale: 1,
    className: 'w-full max-w-2xl',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all features. Try zooming with mouse wheel, double-clicking, or using the control buttons.',
      },
    },
  },
};
