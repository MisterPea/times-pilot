import type { Meta, StoryObj } from "@storybook/react";
import SectionsSelection from "../components/SettingsPanel/SettingsSectionsSelect";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof SectionsSelection> = {
  title: 'Settings/Sections Selection',
  component: SectionsSelection,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof SectionsSelection>;

export const Primary: Story = {
  args: {
    sectionsSelected: ['Food', 'Opinion'],
  }
}

