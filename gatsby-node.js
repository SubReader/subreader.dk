// const path = require("path");
// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === `Mdx`) {
//     const parentNode = getNode(node.parent);
//     const lang = parentNode.relativeDirectory.split(/([^\/]*)\/*$/)[1];
//     const value = `/blog/${
//       lang + "/" + node.frontmatter.title + "-" + node.frontmatter.date
//     }`
//       .toLowerCase()
//       .trim()
//       .replace(/ /g, "");

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     });

//     createNodeField({
//       name: `lang`,
//       node,
//       value: lang,
//     });
//   }
// };

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions;
//   const result = await graphql(`
//     query {
//       allMdx {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `);

//   if (result.errors) {
//     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
//   }

//   // Create blog post pages.
//   const posts = result.data.allMdx.edges;

//   posts.forEach(({ node }) => {
//     createPage({
//       path: node.fields.slug,
//       component: path.resolve(`./src/templates/blog-template.tsx`),
//       context: { id: node.id },
//     });
//   });
// };
