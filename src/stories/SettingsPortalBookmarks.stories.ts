import type { Meta, StoryObj } from "@storybook/react";
import ViewBookmarks from "../components/SettingsPanel/SettingsPortalBookmarks";
import '../style/global.scss';
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta: Meta<typeof ViewBookmarks> = {
  title: 'Settings/Bookmarks Portal',
  component: ViewBookmarks,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof ViewBookmarks>;

const bookmarks = [
  {
    id: "x1abcd",
    date: "2023-09-18T15:27:12-04:00",
    title: "The Senate Dress Code Gets a Casual Overhaul",
    summary: "Senator Chuck Schumer, the majority leader, will no longer enforce the informal dress code for the chamber, which for decades has dictated that members wear business attire.",
    link: "https://www.nytimes.com/2023/09/18/us/politics/senate-dress-code.html",
  },
  {
    id: "x2defg",
    date: "2023-09-18T15:00:07-04:00",
    title: "Bear Sighting Forces Closures at Disney World",
    summary: "The black bear, which was spotted in a tree, was captured on Monday after some rides and attractions in the Magic Kingdom were closed.",
    link: "https://www.nytimes.com/2023/09/18/us/disney-world-bear-magic-kingdom.html",
  },
  {
    id: "x3lmnop",
    date: "2023-09-18T15:00:07-04:00",
    title: "I.R.S. Changes Audit Practice That Discriminated Against Black Taxpayers",
    summary: "The agency will overhaul how it scrutinizes returns that claim the earned-income tax credit, which is aimed at alleviating poverty.",
    link: "https://www.nytimes.com/2023/09/18/us/politics/irs-audits-black-taxpayers.html",
  },
  {
    id: "x4klnm",
    date: "2023-09-18T09:08:49-04:00",
    title: "With a New Formula, U.S. News Rankings Boost Some State Universities",
    summary: "Responding to critics, the publication made its biggest changes to its method in four decades. But it's unclear whether that is enough to quiet the naysayers.",
    link: "https://www.nytimes.com/2023/09/18/us/us-news-college-ranking.html",
  }
];

export const Primary: Story = {
  args: {
    bookmarks
  }
}

