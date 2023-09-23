import type { Meta, StoryObj } from "@storybook/react";
import Label from "../components/Label/Label";
import '../style/global.scss';

const meta: Meta<typeof Label> = {
  title: 'Labels/Non-Clickable',
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Large: Story = {
  args: {
    label: "Mr. Finchley's Settings",
    size: "lg",
  }
};

export const Medium: Story = {
  args: {
    label: "Email Subscriptions",
    size: "md",
  }
};

export const Small: Story = {
  args: {
    label: "These are the topics that are included in your daily emails",
    size: "sm",
  }
};
