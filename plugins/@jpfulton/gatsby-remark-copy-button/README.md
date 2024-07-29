# gatsby-remark-copy-button

> Copied as the npm package included .yarn cache folder of > 100mb

[![ci](https://github.com/jpfulton/gatsby-remark-copy-button/actions/workflows/ci.yml/badge.svg)](https://github.com/jpfulton/gatsby-remark-copy-button/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40jpfulton%2Fgatsby-remark-copy-button.svg)](https://www.npmjs.com/package/@jpfulton/gatsby-remark-copy-button)
![License](https://img.shields.io/badge/License-MIT-blue)
![Visitors](https://visitor-badge.laobi.icu/badge?page_id=jpfulton.gatsby-remark-copy-button)

Add a copy button to **markdown** code snippets in
[Gatsby](https://www.gatsbyjs.com) sites with
compatibility for **MDX** and use of the browser
[Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

This package and implementation is discussed in this
[blog post](https://www.jpatrickfulton.dev/blog/2023-08-02-gatsby-remark-copy-button/).

## Install

```bash
yarn add @jpfulton/gatsby-remark-copy-button
```

## How to Use

Add the configuration entry to your `gatsby-config.js` file. This plugin
**must** be added before other plugins that operate on `code` nodes and
markdown code snippets to operate correctly.

The following listing assumes you are using the `gatsby-plugin-mdx` plugin.
However, this plugin may also be used with the `gatsby-transformer-remark` plugin.

```js
plugins: [
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins: [
        {
          resolve: `@jpfulton/gatsby-remark-copy-button`,
        },
        {
          resolve: `gatsby-remark-code-titles`,
        },
        {
          resolve: `gatsby-remark-prismjs`,
        },
      ],
    },
  },
],
```

### Options

All plugin options are optional. However, it is strongly suggested that
you customize them to override styling to fit your site's look, feel and layout.

```js
{
  resolve: `@jpfulton/gatsby-remark-copy-button`,
  options: {
    // Provide a text label for the copy button.
    // Default: null
    buttonText: null,
    // Provide a complete SVG tag string to replace the default
    // copy icon. Be sure to include a class of "copy-icon" on your custom
    // SVG tag when using this option.
    copySvg: null,
    // Provide a complete SVG tag string to replace the default
    // success icon.  Be sure to include a class of "success-icon" on your custom
    // SVG tag when using this option.
    successSvg: null,
    // Provide a custom container class for the <div> tag that contains
    // the copy button to apply custom styling.
    // Default: "gatsby-remark-copy-button-container"
    customButtonContainerClass: null,
    // Provide a custom button class for the copy button to apply
    // custom styling.
    // Default: "gatsby-remark-copy-button"
    customButtonClass: null,
  },
},
```

### Custom Styling

Custom styling may be applied to the default classes or using the options
above custom classes may be applied to the injected markup.

```css
.gatsby-remark-copy-button-container {
}
.gatsby-remark-copy-button {
}
```

Apply custom styles by adding a style sheet to your `gatsby-browser.js` file.

```js
// gatsby-browser.js
import './src/styles/copy-button.scss';
```

### Structure of the Injected Markup

When enabled on code snippet, the following `HTML` will be injected into
the output of the page after parsing the Markdown AST using the default
plugin options. It will be injected **above** the code snippet in the
generated `HTML`.

```html
<div class="gatsby-remark-copy-button-container">
  <button
    class="gatsby-remark-copy-button"
    onclick="copyToClipboard(`CLEANED CODE CONTENT TO COPY HERE`, this)"
  >
    <svg
      class="copy-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      ...
    </svg>
    <svg
      class="success-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      ...
    </svg>
  </button>
</div>
```

### Usage in Markdown

Once installed, the copy button may _optionally_ be enabled by adding
to the code snippet declaration within markdown files. When this plugin
is used in conjunction with the `gatsby-remark-prismjs` plugin, the
`{clipboardButton: true}` option may be provided in any order with other
prismjs options.

````markdown
```js {clipboardButton: true}
const example = "This content will end up on the user's clipboard";
```
````

## Further Information

For details on contributing to this project, reference both the
[CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
documentation.

To submit a bug or feature request, please open an issue
[here](https://github.com/jpfulton/gatsby-remark-copy-button/issues/new/choose).

To report create a security advisory, please reference the
[SECURITY.md](./SECURITY.md) policy document.
