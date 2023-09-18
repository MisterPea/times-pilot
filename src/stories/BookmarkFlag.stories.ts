import type { Meta, StoryObj } from "@storybook/react";
import BookmarkFlag from "../components/Icons/BookmarkFlag";
import '../style/global.scss';

const meta: Meta<typeof BookmarkFlag> = {
  title: 'Button/Bookmark Flag',
  component: BookmarkFlag,

};

export default meta;
type Story = StoryObj<typeof BookmarkFlag>;


export const Primary: Story = {
  args: {
    selected: false,
  }
}

