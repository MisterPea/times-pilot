import type { Meta, StoryObj } from "@storybook/react";
import TextButtonHTML from "../components/TextButtonHTML/TextButtonHTML";
import '../style/global.scss'

const meta: Meta<typeof TextButtonHTML> = {
  title: 'Button/Text Button HTML',
  component: TextButtonHTML,
};

export default meta;
type Story = StoryObj<typeof TextButtonHTML>;

export const Primary: Story = {
  args: {
    label:"Cancel",
    link:"#",
  }
}

