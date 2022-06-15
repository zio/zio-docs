import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Simple = ({ data }) => {

  const page = data.mdx

  return(
    <>
      <h1>{page.frontmatter.title}</h1>
      <MDXRenderer>{page.body}</MDXRenderer>
    </>
  ) 
}

export const query = graphql`
  query($mdxId: String!) {
    mdx(id: {eq: $mdxId}) {
      id
      slug
      frontmatter {
        id
        sidebar_label
        title
      }
      body
    }
  }
`

export default Simple;