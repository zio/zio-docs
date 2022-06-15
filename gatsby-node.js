const path = require("path");

const slugify = (str) => { 
  const basePath = "/";
  
  const slug = `${str}`
    .toLowerCase()
    .replace(/[^a-z0-9\/]+/g, '-')
    .replace(/(^-\-$)+/g, '')

  return `/${basePath}/${slug}`.replace(/\/\/+/g, '/')
}

exports.onCreateNode = ({ node, _, actions}) => { 

  const { createNodeField } = actions

  if (node.internal.type && node.internal.type === `File`) { 
    if (node.sourceInstanceName && node.sourceInstanceName === `zmx`) { 
      createNodeField({
        node,
        name: 'slug',
        value: slugify(`zio-metrics-connectors/2.0.0/${node.relativeDirectory}/${node.name}`)
      })
    } else { 
      createNodeField({
        node,
        name: 'slug',
        value: slugify(`${node.relativeDirectory}/${node.name}`)
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "zmx"}}) {
        nodes {
          fields {
            slug
          }
          children {
            ... on Mdx {
              id
              slug
            }
          }
        }
      }
    }
  `)

  const templatePath = path.resolve(`./src/components/simple.jsx`)
  
  result.data.allFile.nodes.forEach((node) => {
    createPage({
      path: node.fields.slug,
      component: templatePath,
      context: {
        mdxId: node.children[0].id,
        slug: node.fields.slug,
      },
    })
  })
}
