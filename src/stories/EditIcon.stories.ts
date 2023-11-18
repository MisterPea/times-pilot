import type { Meta, StoryObj } from "@storybook/react";
import EditClipboardIcon from "../components/Icons/EditClipboardIcon";
import '../style/global.scss';

const meta: Meta<typeof EditClipboardIcon> = {
  title: 'Button/Edit Clipboard Icon',
  component: EditClipboardIcon,
  argTypes: {
    callback: { type: 'function' }
  }

};

export default meta;
type Story = StoryObj<typeof EditClipboardIcon>;


export const Primary: Story = {
  args: {
    callback: () => console.log('Callback Called')
  }
}

