const { createExifFields } = require('./gatsby/createExifFields');

exports.onCreateNode = function({ node, actions }) {
  const { createNodeField } = actions;

  // Image files
  if (node.internal.mediaType === 'image/jpeg') {
    return createExifFields(node, createNodeField);
  }

  return null;
};
