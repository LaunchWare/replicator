import { reactRouterDecorator } from "./reactRouterDecorator"
import { Preview } from "@storybook/react"


const preview: Preview = {
  // actions: { argTypesRegex: "^on[A-Z].*" },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
  decorators: [reactRouterDecorator]
}

export default preview
