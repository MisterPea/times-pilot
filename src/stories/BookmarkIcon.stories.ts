import type { Meta, StoryObj } from "@storybook/react";
import BookmarkIcon from "../components/Icons/BookmarkIcon";
import '../style/global.scss';

const meta: Meta<typeof BookmarkIcon> = {
  title: 'Button/Bookmark Icon',
  component: BookmarkIcon,
  argTypes: {
    callback: { type: 'function' }
  }

};

export default meta;
type Story = StoryObj<typeof BookmarkIcon>;


export const Primary: Story = {
  args: {
    selected: false,
    callback: () => console.log('Callback Called')
  }
}

