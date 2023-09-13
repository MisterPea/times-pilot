import type { Meta, StoryObj } from "@storybook/react";
import SectionButton from "../components/SectionButton/SectionButton";
import '../style/global.scss';

const meta: Meta<typeof SectionButton> = {
  title: 'Button/Section Button',
  component: SectionButton,
  argTypes: {
    label: { type: 'string' },
    selected: { type: 'boolean' },
    callback: { type: 'function' }
  }
};

export default meta;
type Story = StoryObj<typeof SectionButton>;

const handleClick = () => {
  console.log("hello");
};

export const Primary: Story = {
  args: {
    label: "Business",
    selected: false,
    callback: () => console.log('Callback Called')
  }
}

