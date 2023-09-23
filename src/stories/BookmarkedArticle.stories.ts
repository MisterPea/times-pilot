import type { Meta, StoryObj } from "@storybook/react";
import BookmarkedArticle from "../components/BookmarkedArticle/BookmarkedArticle";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof BookmarkedArticle> = {
  title: 'Article/Bookmarked Article',
  component: BookmarkedArticle,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof BookmarkedArticle>;

export const Primary: Story = {
  args: {
    date: "Jan 22, 2222",
    headline: "Lorem ipsum dolor sit amet consectetur. Quis ut enim pharetra quisque id.",
    summary: "Lorem ipsum dolor sit amet consectetur. Tincidunt ac pharetra quisque id. Id sem faucibus nec imperdiet convallis.",
    deleteCallback: () => { },
    linkToArticle: "#",
  }
}

