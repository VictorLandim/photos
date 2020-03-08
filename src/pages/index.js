import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Gallery from "../containers/Gallery"

export const pageQuery = graphql`
  query IndexQuery {
    allWordpressWpMedia {
      edges {
        node {
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
  const photos = props.data.allWordpressWpMedia.edges
    .map(e => ({
      ...e.node.localFile.childImageSharp.fluid,
    }))
    .map(({ presentationWidth, presentationHeight, ...e }) => ({
      ...e,
      width: presentationWidth,
      height: presentationHeight,
    }))

  return (
    <Layout title="Home">
      <Gallery photos={photos} />
    </Layout>
  )
}

export default IndexPage
