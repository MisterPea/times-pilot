import type { Meta, StoryObj } from "@storybook/react";
import MakeToast from "../components/MakeToast/MakeToast";
import '../style/global.scss';
import { useState } from "react";

const meta: Meta<typeof MakeToast> = {
  title: 'Dialog/Toaster',
  component: MakeToast,
};




export default meta;
type Story = StoryObj<typeof MakeToast>;

export const Primary: Story = {
  args: {
    data: "3 Topics Have Been Added to Your Subscription",
    deploy: false,
    isError: false,
    viewLength: 5000
  }
}

export const Error: Story = {
  args: {
    data: "3 Topics Have Been Added to Your Subscription",
    deploy: false,
    isError: true,
    viewLength: 5000
  }
}
