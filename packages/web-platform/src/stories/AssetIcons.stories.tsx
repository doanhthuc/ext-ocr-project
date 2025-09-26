import { Meta, StoryObj } from '@storybook/react';
import { App, Tooltip } from 'antd';

import * as icons from '~icons';

type Story = StoryObj<typeof AssetIcons>;

function AssetIcons() {
  const { message } = App.useApp();

  const handleClickIcon = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(`${text} copied!`);
  };

  return (
    <>
      <h2 className="mb-2 font-semibold">Click to copy!</h2>
      <div className="flex flex-wrap items-center justify-center">
        {Object.entries(icons).map(([key, Icon]) => (
          <Tooltip
            key={key}
            title={`<${key} />`}
            overlayClassName="text-sm text-mono"
          >
            <div
              className="cursor-pointer border-[0.5px] p-2"
              onClick={() => handleClickIcon(`<${key} />`)}
            >
              <Icon className="text-lg" />
            </div>
          </Tooltip>
        ))}
      </div>
    </>
  );
}

export default {
  title: 'AssetIcons',
  component: AssetIcons,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AssetIcons>;

export const Primary: Story = {};
