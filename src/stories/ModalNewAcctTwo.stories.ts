import type { Meta, StoryObj } from "@storybook/react";
import ModalNewAcctTwo from "../components/Modals/ModalNewAcct_Two";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ModalNewAcctTwo> = {
  title: 'Modals/New Account 2',
  component: ModalNewAcctTwo,
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
type Story = StoryObj<typeof ModalNewAcctTwo>;

export const Primary: Story = {
  args: {
    userName:"Mr. Finchley"
  }
}

