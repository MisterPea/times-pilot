import type { Meta, StoryObj } from "@storybook/react";
import SettingsHeader from "../components/SettingsHeader/SettingsHeader";
import '../style/global.scss'

const meta: Meta<typeof SettingsHeader> = {
  title: 'Settings/Header',
  component: SettingsHeader,
};

export default meta;
type Story = StoryObj<typeof SettingsHeader>;

export const Primary: Story = {
  args: {
    headline:"Let's Update Your Username.",
    backLink:"#",
  }
}

