import type { Meta, StoryObj } from "@storybook/react";
import ModalLogin from "../components/Modals/ModalLogin";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ModalLogin> = {
  title: 'Modals/Login',
  component: ModalLogin,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'ipad'
    },
    layout: 'fullscreen'
  }
};
const deleteCall = () => console.log("ready to delete")

export default meta;
type Story = StoryObj<typeof ModalLogin>;

export const Primary: Story = {
  args: {
    hasLoginError: false,
  }
}

