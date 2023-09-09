import type { Meta, StoryObj } from "@storybook/react";
import TextButton from "../components/TextButton/TextButton";
import '../style/global.scss'

const meta: Meta<typeof TextButton> = {
  title: 'Button/Text Button',
  component: TextButton,
};

export default meta;
type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  args: {
    label:"Cancel",
    link:"#",
  }
}

