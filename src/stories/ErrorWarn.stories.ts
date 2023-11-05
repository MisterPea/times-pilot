import type { Meta, StoryObj } from "@storybook/react";
import ErrorWarn from "../components/ErrorWarn/ErrorWarn";
import '../style/global.scss';

const meta: Meta<typeof ErrorWarn> = {
  title: 'Dialog/Error-Warn',
  component: ErrorWarn,
};

export default meta;
type Story = StoryObj<typeof ErrorWarn>;

export const Primary: Story = {
  args: {
    isError: false,
    errorMsg: 'Incorrect Username or Password',
  }
}

