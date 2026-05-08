// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [...nextVitals, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
