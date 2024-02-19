import type { Meta, StoryObj } from "@storybook/react";
import SectionGroup from "../components/SectionGroup/SectionGroup";
import '../style/global.scss';
import useState from "storybook-addon-state";



const meta: Meta<typeof SectionGroup> = {
  title: 'Button/Section Group',
  component: SectionGroup,
  argTypes: {

  }
};

const sections = ["Arts", "Automobiles", "Books", "Business", "Climate", "Cooking", "Education", "Fashion", "Food", "Health", "Home", "Jobs", "Magazine", "Movies", "National", "NY Region", "Obituaries", "Opinion", "Politics", "Real Estate", "Science", "Sunday Review", "Technology", "Theater", "Travel", "Upshot", "US", "World"];

export default meta;
type Story = StoryObj<typeof SectionGroup>;

const handleClick = (bool: any) => {
  console.log(bool);
};

export const Primary: Story = {
  args: {
    sections,
    setIsNav: handleClick,
    startingSection:'home'
  }
}

