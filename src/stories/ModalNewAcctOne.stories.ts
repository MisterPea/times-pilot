import type { Meta, StoryObj } from "@storybook/react";
import ModalNewAcctOne from "../components/Modals/ModalNewAcct_One";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ModalNewAcctOne> = {
  title: 'Modals/New Account 1',
  component: ModalNewAcctOne,
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
type Story = StoryObj<typeof ModalNewAcctOne>;

export const Primary: Story = {
  args: {
    // date: "Jan 22, 2222",
    // headline: "Lorem ipsum dolor sit amet consectetur. Quis ut enim pharetra quisque id.",
    // summary: "Lorem ipsum dolor sit amet consectetur. Tincidunt ac pharetra quisque id. Id sem faucibus nec imperdiet convallis.",
    // deleteCallback: deleteCall,
    // linkToArticle: "#",
  }
}

