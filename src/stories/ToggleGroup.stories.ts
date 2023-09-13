import type { Meta, StoryObj } from "@storybook/react";
import ToggleGroup from "../components/ToggleGroup/ToggleGroup";
import '../style/global.scss';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Button/Toggle Group',
  component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const potentialSelections = [ "accident prevention",  "business growth",  "climate",  "earthquake preparedness",  "educational reform",  "election",  "entertainment news",  "environmental protection",  "fashion trend",  "fire prevention",  "flood control",  "food innovation",  "health",  "immigration reform",  "inflation reduction",  "job creation",  "peace",  "political stability",  "protest",  "recovery",  "safety",  "scientific discovery",  "sports success",  "storm safety",  "strike settlement",  "technology advancement",  "terror prevention",  "trade agreement",  "travel adventure",  "vaccine development",  "wellness"];
const previousSelections = ['health', 'recovery', 'wellness', 'storm safety', 'inflation reduction', 'job creation', 'trade agreement', 'immigration reform', 'technology advancement', 'food innovation', 'fashion trend'];

export const Primary: Story = {
  args: {
    potentialSelections,
    previousSelections
  }
}

