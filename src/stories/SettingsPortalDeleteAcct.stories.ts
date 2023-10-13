import type { Meta, StoryObj } from "@storybook/react";
import DeleteAcct from "../components/SettingsPanel/SettingsPortalDeleteAcct";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof DeleteAcct> = {
  title: 'Settings/Delete Acct Portal',
  component: DeleteAcct,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof DeleteAcct>;

export const Primary: Story = {
  args: {
    username:'Mr. Finchley' 
  }
}

