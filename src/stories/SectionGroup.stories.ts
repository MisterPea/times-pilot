import type { Meta, StoryObj } from "@storybook/react";
import SectionGroup from "../components/SectionGroup/SectionGroup";
import '../style/global.scss';

const meta: Meta<typeof SectionGroup> = {
  title: 'Button/Section Group',
  component: SectionGroup,
  argTypes: {

  }
};

const sections = ["Arts", "Automobiles", "Books", "Business", "Climate", "Cooking", "Education", "Fashion", "Food", "Health", "Home", "Jobs", "Magazine", "Movies", "National", "NY Region", "Obituaries", "Opinion", "Politics", "Real Estate", "Science", "Sports", "Sunday Review", "Technology", "Theater", "Magazine", "Travel", "Upshot", "US", "World"]

export default meta;
type Story = StoryObj<typeof SectionGroup>;

const handleClick = () => {
  console.log("hello");
};

export const Primary: Story = {
  args: {
    sections,
  }
}

