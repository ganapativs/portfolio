import { CONTINUE, visit } from "unist-util-visit";
import parseOptions from "./parse-options.js";
// Perform conversion from the contents of a "code" node to
// a string that may be passed in a JS function parameter
// for conversion to plain text as placed on the browser
// clipboard. Double quotes, single backticks and dollar signs
// all require conversion for this operation.
function convertContentsToJavaScriptString(code) {
  return code.replace(/"/gm, "&quot;").replace(/`/gm, "\\`").replace(/\$/gm, "\\$");
}
export default (({
  markdownAST
}, {
  buttonText,
  copySvg,
  successSvg,
  customButtonContainerClass,
  customButtonClass
}) => {
  // use plugin options as presented
  const text = buttonText || "";
  const copyIcon = copySvg || `<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#fff" d="M16 1H2v16h2V3h12V1zm-1 4l6 6v12H6V5h9zm-1 7h5.5L14 6.5V12z"/></svg>`;
  const successIcon = successSvg || `<svg class="success-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#fff" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
  const containerClass = customButtonContainerClass || "gatsby-remark-copy-button-container";
  const buttonClass = customButtonClass || "gatsby-remark-copy-button";
  visit(markdownAST, "code", (node, index, parent) => {
    const language = node.meta ? node.lang + node.meta : node.lang;
    if (!language) {
      return markdownAST;
    }
    const {
      clipboardButton
    } = parseOptions(language);
    if (clipboardButton === true) {
      let code = parent.children[index].value;
      code = convertContentsToJavaScriptString(code);
      const buttonNode = {
        type: "html",
        value: `
            <div class="${containerClass}">
              <button
                class="${buttonClass}"
                onClick="copyToClipboard(\`${code}\`, this)"
              >
                ${text}${copyIcon}${successIcon}
              </button>
            </div>
        `.trim()
      };
      // insert the buttonNode above this one in the parent's children array
      parent.children.splice(index, 0, buttonNode);
      // Avoid an infinite loop: we just modified the parent's children array.
      // Continue to traverse the tree **after** the newly inserted button node at (index)
      // and the current node on which we are operating (index + 1  after array modification).
      // The next unparsed node is now located at index + 2. Continue there.
      return [CONTINUE, index + 2];
    }
  });
  return markdownAST;
});