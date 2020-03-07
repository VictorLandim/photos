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
              sizes(maxWidth: 3000) {
                ...GatsbyImageSharpSizes
              }
            }
          }
          date
          slug
          title
          caption
        }
      }
    }
  }
`

const IndexPage = props => {
  const photos = props.data.allWordpressWpMedia.edges.map(
    e => e.node.localFile.childImageSharp.sizes
  )

  console.log(photos)

  return (
    <Layout title="Victor's Pics | Home">
      <Gallery photos={photos} />
    </Layout>
  )
}

export default IndexPage
