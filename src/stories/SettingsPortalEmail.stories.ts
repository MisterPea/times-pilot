import type { Meta, StoryObj } from "@storybook/react";
import ChangeEmail from "../components/SettingsPanel/SettingsPortalEmail";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ChangeEmail> = {
  title: 'Settings/Change Email Portal',
  component: ChangeEmail,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ChangeEmail>;

export const Primary: Story = {
  args: {
    currentEmail:'i.am.finchley@gmail.com'
  }
}

