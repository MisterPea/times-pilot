import type { Meta, StoryObj } from "@storybook/react";
import AddTopicsModal from "../components/AddTopics/AddTopicsModal";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof AddTopicsModal> = {
  title: 'Modals/Add Topics',
  component: AddTopicsModal,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'ipad'
    },
    layout: 'fullscreen'
  }
};
const deleteCall = () => console.log("ready to delete");

export default meta;
type Story = StoryObj<typeof AddTopicsModal>;

export const Primary: Story = {
  args: {
    title: "In California and Mexico, a Rare Hurricane Sends Disaster Prep Into High Gear",
    currentTopics: ["Hawaii", "California", "Climate Change", "Pacific Ocean", "Natural Disasters", "Disaster Preparedness", "Mexico"],
    savedTopics: ["Pacific Ocean"],
    emailActive: false,
  }
}

