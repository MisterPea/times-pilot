import type { Meta, StoryObj } from "@storybook/react";
import SubmitCancelGroup from "../components/PrimarySecondaryButtons/PrimarySecondaryButtons";
import '../style/global.scss';

const meta: Meta<typeof SubmitCancelGroup> = {
  title: 'Button/Two Button Group',
  component: SubmitCancelGroup,
};

export default meta;
type Story = StoryObj<typeof SubmitCancelGroup>;

export const Primary: Story = {
  args: {
    primaryLink: "#",
    secondaryLink: "#",
    fullWidth:false,
  }
}

export const FullWidthDestructive: Story = {
  args: {
    primaryLink: "#",
    secondaryLink: "#",
    fullWidth:true,
    primaryState:"destructive"
  }
}
