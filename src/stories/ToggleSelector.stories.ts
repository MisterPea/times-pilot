import type { Meta, StoryObj } from "@storybook/react";
import ToggleSelector from "../components/ToggleSelector/ToggleSelector";
import '../style/global.scss';

const meta: Meta<typeof ToggleSelector> = {
  title: 'Button/Toggle Selector',
  component: ToggleSelector,
  argTypes: {
    label: { type: 'string' },
    selected: { type: 'boolean' },
    toggleCallback: { type: 'function' }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleSelector>;

const handleClick = () => {
  console.log("hello");
};

export const Primary: Story = {
  args: {
    label: "World News",
    selected: false,
    toggleCallback: () => console.log('Callback Called')
  }
}

