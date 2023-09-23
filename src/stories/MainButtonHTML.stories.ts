import type { Meta, StoryObj } from "@storybook/react";
import MainButtonHTML from "../components/MainButtonHTML/MainButtonHTML";
import '../style/global.scss';

const meta: Meta<typeof MainButtonHTML> = {
  title: 'Button/Main Button HTML',
  component: MainButtonHTML,
};

export default meta;
type Story = StoryObj<typeof MainButtonHTML>;

export const Primary: Story = {
  args: {
    label: "Let's Go!",
    linkCallback: () => { },
    fullWidth: false,
    destructive: false,
    danger: false,
    disabled: false,
    undoIcon: false,
  }
};

export const UndoWithIcon: Story = {
  args: {
    label: "Undo Delete",
    linkCallback: () => { },
    fullWidth: false,
    destructive: false,
    danger: false,
    disabled: false,
    undoIcon: true,
  }
};

export const Destructive: Story = {
  args: {
    label: "Confirm",
    linkCallback: () => { },
    fullWidth: false,
    destructive: true,
    danger: false,
    disabled: false,
    undoIcon: false,
  }
};

export const DestructiveDisabled: Story = {
  args: {
    label: "Confirm",
    linkCallback: () => { },
    fullWidth: false,
    destructive: true,
    danger: false,
    disabled: true,

undoIcon: false,  }
};

export const Danger: Story = {
  args: {
    label: "Delete List",
    linkCallback: () => { },
    fullWidth: false,
    destructive: false,
    danger: true,
    disabled: false,
    undoIcon: false,
  }
};

export const FullWidth: Story = {
  args: {
    label: "Let's Go!",
    linkCallback: () => { },
    fullWidth: true,
    destructive: false,
    danger: false,
    disabled: false,
    undoIcon: false,
  }
};

export const Disabled: Story = {
  args: {
    label: "Delete List",
    linkCallback: () => { },
    fullWidth: false,
    destructive: false,
    danger: false,
    disabled: true,

undoIcon: false,  }
};