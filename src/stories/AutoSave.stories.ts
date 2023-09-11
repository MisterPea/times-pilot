import type { Meta, StoryObj } from "@storybook/react";
import AutoSave from "../components/AutoSave/AutoSave";
import '../style/global.scss';

const meta: Meta<typeof AutoSave> = {
  title: 'Dialog/Auto Save',
  component: AutoSave,
};

export default meta;
type Story = StoryObj<typeof AutoSave>;

export const Primary: Story = {
  args: {
    saving: false,
    error: false,
  }
}

