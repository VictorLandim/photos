import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../components/Layout"
import { Home } from "../screens/Home"

import '../sass/base.scss'

export const pageQuery = graphql`
  query IndexQuery {
    allWordpressWpMedia {
      edges {
        node {
          alt_text  # chapter
          title     # date
          localFile {
            childImageSharp {
              fluid(maxWidth: 2000) {
                originalName
                sizes
                src
                srcSet
                aspectRatio
                presentationWidth
                presentationHeight
                base64
              }
            }
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const { pathContext } = props;
  const chapter = pathContext?.chapter;

  const photos = props.data.allWordpressWpMedia.edges
    .filter(({ node }) => {
      if (chapter) {
        return node["alt_text"] === chapter;
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.node["title"]);
      const dateB = new Date(b.node["title"]);

      return dateA - dateB;
    })
    .map(e => ({
      ...e.node.localFile.childImageSharp.fluid,
    }))
    .map(({ presentationWidth, presentationHeight, ...e }) => ({
      ...e,
      width: presentationWidth,
      height: presentationHeight,
    }))

  return (
    <Layout title={chapter || "home"} chapter={chapter}>
      <Home photos={photos} />
    </Layout>
  )
}

export default IndexPage
