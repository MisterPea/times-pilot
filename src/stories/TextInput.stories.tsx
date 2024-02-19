import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "../components/TextInput/TextInput";
import '../style/global.scss'

const meta: Meta<typeof TextInput> = {
  title: 'Text/Text Input',
  component: TextInput,
  decorators: [
    (Story) => (
      <div style={{width:'520px'}}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Email: Story = {
  args: {
    type:'email',
    label:'Email',
    regexTest:'email',
  }
}

export const Text: Story = {
  args: {
    type:'text',
    label:'Username',
  }
}

export const Password: Story = {
  args: {
    type:'password',
    label:'Password',
    regexTest:'password',
  }
}

