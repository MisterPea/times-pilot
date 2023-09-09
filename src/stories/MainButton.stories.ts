import type { Meta, StoryObj } from "@storybook/react";
import MainButton from "../components/MainButton/MainButton";
import '../style/global.scss'

const meta: Meta<typeof MainButton> = {
  title: 'Button/Main Button',
  component: MainButton,
};

export default meta;
type Story = StoryObj<typeof MainButton>;

export const Primary: Story = {
  args: {
    label:"Let's Go!",
    link:"#",
    fullWidth: false,
    destructive: false,
    danger: false,
    disabled: false,
  }
}

export const Destructive: Story = {
  args: {
    label:"Confirm",
    link:"#",
    fullWidth: false,
    destructive: true,
    danger: false,
    disabled: false,
  }
}

export const DestructiveDisabled: Story = {
  args: {
    label:"Confirm",
    link:"#",
    fullWidth: false,
    destructive: true,
    danger: false,
    disabled: true,
  }
}

export const Danger: Story = {
  args: {
    label:"Delete List",
    link:"#",
    fullWidth: false,
    destructive: false,
    danger: true,
    disabled: false,
  }
}

export const FullWidth: Story = {
  args: {
    label:"Let's Go!",
    link:"#",
    fullWidth: true,
    destructive: false,
    danger: false,
    disabled: false,
  }
}

export const Disabled: Story = {
  args: {
    label:"Delete List",
    link:"#",
    fullWidth: false,
    destructive: false,
    danger: false,
    disabled: true,
  }
}