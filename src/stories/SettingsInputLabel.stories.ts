import type { Meta, StoryObj } from "@storybook/react";
import SettingsInputLabel from "../components/SettingsPanel/SettingsInputLabel";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof SettingsInputLabel> = {
  title: 'Settings/Input Label Mock',
  component: SettingsInputLabel,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof SettingsInputLabel>;

export const Primary: Story = {
  args: {
    label: "Current Username",
    content: "Mr. Finchley"
  }
}

