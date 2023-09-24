import type { Meta, StoryObj } from "@storybook/react";
import SubmitCancelGroup from "../components/SubmitCancelGroup/SubmitCancelGroup";
import '../style/global.scss';

const meta: Meta<typeof SubmitCancelGroup> = {
  title: 'Button/Submit Cancel Group',
  component: SubmitCancelGroup,
};

export default meta;
type Story = StoryObj<typeof SubmitCancelGroup>;

export const Primary: Story = {
  args: {
    submitLink: "#",
    cancelLink: "#",
    fullWidth:false,
  }
}

export const FullWidthDestructive: Story = {
  args: {
    submitLink: "#",
    cancelLink: "#",
    fullWidth:true,
    submitState:"destructive"
  }
}
