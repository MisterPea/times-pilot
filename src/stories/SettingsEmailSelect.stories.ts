import type { Meta, StoryObj } from "@storybook/react";
import EmailSelection from "../components/SettingsPanel/SettingsEmailSelect";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof EmailSelection> = {
  title: 'Settings/Email Selection',
  component: EmailSelection,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof EmailSelection>;

export const Primary: Story = {
  args: {
    potentialSelections: ['Farhad Manjoo','Exercise','President Xi', 'TSMC (Company)', 'Intel (Company)', 'Venture Capital','OpenAI (Company)','China' ],
    sectionsSelected: ['Farhad Manjoo','Exercise','President Xi', 'TSMC (Company)', 'Intel (Company)', 'Venture Capital','OpenAI (Company)','China' ],
  }
}

