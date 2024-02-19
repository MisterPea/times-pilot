import type { Meta, StoryObj } from "@storybook/react";
import ArticleButtonNonMobile from "../components/ArticleButton/ArticleButtonNonMobile";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ArticleButtonNonMobile> = {
  title: 'Article/Non Mobile Article',
  component: ArticleButtonNonMobile,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ArticleButtonNonMobile>;

export const NotBookmarked: Story = {
  args: {
    imageURL: "https://fastly.picsum.photos/id/618/200/300.jpg?hmac=t4SGgbCgeW1bbJFjW8RY4vawWUkBDkj5AVuhzkvFEek",
    headline: "Lorem ipsum dolor sit amet consectetur. Quis ut enim pharetra quisque id.",
    summary: "Lorem ipsum dolor sit amet consectetur. Tincidunt ac pharetra quisque id. Id sem faucibus nec imperdiet convallis.",
    bookmarked: false,
    uid: 'abc123',
    url: "#",
    addTopicsCallback: () => { },
    byline: "Mister Smith and Miss Smith",
    topics: [["Topic One", "Topic Two"], ["Topics One A", "Topics Two A"]],
  }
};

export const Bookmarked: Story = {
  args: {
    imageURL: "https://fastly.picsum.photos/id/618/200/300.jpg?hmac=t4SGgbCgeW1bbJFjW8RY4vawWUkBDkj5AVuhzkvFEek",
    headline: "Lorem ipsum dolor sit amet consectetur. Quis ut enim pharetra quisque id.",
    summary: "Lorem ipsum dolor sit amet consectetur. Tincidunt ac pharetra quisque id. Id sem faucibus nec imperdiet convallis.",
    bookmarked: true,
    uid: 'abc123',
    url: "#",
    addTopicsCallback: () => { },
    byline: "Mister Smith and Miss Smith",
    topics: [["Topic One", "Topic Two"], ["Topics One A", "Topics Two A"]],
  }
}

