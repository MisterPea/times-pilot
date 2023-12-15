import type { Meta, StoryObj } from "@storybook/react";
import ArticleButtonPlaceholder from "../components/ArticleButtonPlaceholder/ArticleButtonPlaceholder";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ArticleButtonPlaceholder> = {
  title: 'Article/Article Placeholder',
  component: ArticleButtonPlaceholder,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ArticleButtonPlaceholder>;

export const Primary: Story = {
  args: {
   formFactor: undefined
  }
}

