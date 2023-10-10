import type { Meta, StoryObj } from "@storybook/react";
import ChangeUsername from "../components/SettingsPanel/SettingsPortalUsername";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ChangeUsername> = {
  title: 'Settings/Change Username Portal',
  component: ChangeUsername,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ChangeUsername>;

export const Primary: Story = {
  args: {
    currentUsername:'Mr. Finchley'
  }
}

