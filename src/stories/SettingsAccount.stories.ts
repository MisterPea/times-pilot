import type { Meta, StoryObj } from "@storybook/react";
import AccountSettings from "../components/SettingsPanel/SettingsAccount";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof AccountSettings> = {
  title: 'Settings/Account Settings',
  component: AccountSettings,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof AccountSettings>;

export const Primary: Story = {
  args: {
    name: 'Mr. Finchley',
    email: 'i.am.finchley@gmail.com',
  }
}

