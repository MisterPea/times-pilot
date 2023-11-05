import type { Meta, StoryObj } from '@storybook/react';
import MaterialSpinner from '../components/MaterialSpinner/MaterialSpinner'


const meta: Meta<typeof MaterialSpinner> = {
  title: 'Dialog/Spinner',
  component: MaterialSpinner,
  parameters: {
    controls: {
      exclude: ['spinner', 'args']
    }
  }
};

export default meta;
type Story = StoryObj<typeof MaterialSpinner>;

export const MaterialSpinnerVariable: Story = {
  args: {
    radius: 18 ,
    strokeWidth: 4,
    rotationDuration: 900,
    pathAnimationDuration: 2400,
    pathLimits: { min: 0.01, max: 0.99 },
    staticPathLength: 0.10,
    showTrack: true,
    trackColor: '#edf3de',
    pathColor: '#3e884c',
  }
};

export const MaterialSpinnerStatic: Story = {
  args: {
    radius: 30,
    strokeWidth: 3,
    rotationDuration: 600,
    pathLimits: { min: 0.02, max: 0.98 },
    staticPath: true,
    staticPathLength: 0.33,
    showTrack: true,
    trackColor: '#e1eef7',
    pathColor: '#5792c0',
  }
};
