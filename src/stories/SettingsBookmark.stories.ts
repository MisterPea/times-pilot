import type { Meta, StoryObj } from "@storybook/react";
import SettingsBookmarked from "../components/SettingsPanel/SettingsBookmarked";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof SettingsBookmarked> = {
  title: 'Settings/Bookmark Click',
  component: SettingsBookmarked,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof SettingsBookmarked>;

export const Primary: Story = {
  args: {
  }
}

