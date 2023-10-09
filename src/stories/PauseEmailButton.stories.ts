import type { Meta, StoryObj } from "@storybook/react";
import PauseEmailButton from "../components/PauseEmailButton/PauseEmailButton";
import '../style/global.scss';

const meta: Meta<typeof PauseEmailButton> = {
  title: 'Button/Pause Email',
  component: PauseEmailButton,
};

export default meta;
type Story = StoryObj<typeof PauseEmailButton>;

export const Primary: Story = {
  args: {
    isActive: false,
    toggleState: () => { }
  }
}

