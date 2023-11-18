import type { Meta, StoryObj } from "@storybook/react";
import SettingsPanel from "../components/SettingsPanel/SettingsPanel";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof SettingsPanel> = {
  title: 'Settings/Settings Panel',
  component: SettingsPanel,
  parameters: {
    backgrounds: {
      default: 'neutral',
      values: [
        {
          name: 'neutral',
          value: '#8b8977',
        },
      ],
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'ipad'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof SettingsPanel>;

export const Primary: Story = {
  args: {
    accountInfo: {
      userName: "Mr. Finchley",
      email: "mister.finchley@gmail.com",
      uid:"abc123",
    },
    emailSubscriptions: ['Farhad Manjoo','Exercise','President Xi', 'TSMC (Company)', 'Intel (Company)', 'Venture Capital','OpenAI (Company)','China' ],
    emailActive: true,
  }
}

