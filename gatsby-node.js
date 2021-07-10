const path = require("path");

exports.createPages = async ({ reporter, graphql, actions }) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/tag-contents.js");
  const postTemplate = path.resolve("src/templates/post-detail.js");
  const result = await graphql(`
    query MyQueryTags {
      allContentfulArticles {
        edges {
          node {
            slug
            title
            description
            tags
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const tagsList = [];
  const postsList = result.data.allContentfulArticles.edges;
  console.log({ postsList });
  // Double check that the post has a category assigned
  postsList.forEach((edge) => {
    console.log({ edge });
    if (edge.node.tags && edge.node.tags.length > 0) {
      edge.node.tags.forEach((tag) => {
        if (!tagsList.find((x) => x === tag)) {
          tagsList.push(tag);
        }
      });
    }
    createPage({
      path: `/${edge.node.slug}`,
      component: postTemplate,
      context: {
        slug: edge.node.slug,
        title: edge.node.title,
      },
    });
  });
  console.log({ tagsList });
  tagsList.forEach((tag) => {
    createPage({
      path: `/tag/${tag}`,
      component: tagTemplate,
      context: {
        tag,
      },
    });
  });
};
