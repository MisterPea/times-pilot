import type { Meta, StoryObj } from "@storybook/react";
import ModalNewAcctLast from "../components/Modals/ModalNewAcct_Last";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ModalNewAcctLast> = {
  title: 'Modals/New Account Last',
  component: ModalNewAcctLast,
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
type Story = StoryObj<typeof ModalNewAcctLast>;

export const Primary: Story = {
  args: {
    userName:"Mr. Finchley"
  }
}

