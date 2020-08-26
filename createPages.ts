
import { resolve } from 'path'
import { GatsbyCreatePages } from './types'
import { GatsbyNode } from 'gatsby'

const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  boundActionCreators,
}) => {
  const { createPage } = boundActionCreators
  return graphql(`
    query ChaptersQuery {
      allWordpressWpMedia {
        distinct(field: alt_text)
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    (result.data as any).allWordpressWpMedia.distinct.forEach(chapter => {
      createPage({
        path: `/chapters/${chapter}`,
        component: resolve(__dirname, 'src/pages/index.tsx'),
        context: {
          chapter
        }
      })
    })
  })
}

export { createPages }