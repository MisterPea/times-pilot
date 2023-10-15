import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "../components/NavBar/NavBar";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof NavBar> = {
  title: 'Navigation/Main',
  component: NavBar,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'ipad'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof NavBar>;


export const Primary: Story = {
  args: {

  }
}

