import type { Meta, StoryObj } from "@storybook/react";
import ArticleButtonPlaceHolderGroup from "../components/ArticleButtonPlaceholderGroup/ArticleButtonPlaceholderGroup";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ArticleButtonPlaceHolderGroup> = {
  title: 'Article/Article Placeholder Group',
  component: ArticleButtonPlaceHolderGroup,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ArticleButtonPlaceHolderGroup>;

export const Primary: Story = {
  args: {
    // articles: articles.results,
  }
}
