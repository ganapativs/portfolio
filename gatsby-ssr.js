const React = require("react");
const Layout = require("./src/components/layout").default;

exports.wrapPageElement = function wrapPageElement({ element, props }) {
	return <Layout {...props}>{element}</Layout>;
};
