import type { Meta, StoryObj } from '@storybook/react';
import Loading from './index';

const meta = {
  title: 'loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    visible: { type: 'boolean', description: 'Show/Hide loading', defaultValue: true },
    overlay: { type: 'boolean', description: 'Displaying a loading overlay' },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { visible: true },
};

export const Overlay: Story = {
  args: {
    visible: true,
    overlay: true,
  },
};
