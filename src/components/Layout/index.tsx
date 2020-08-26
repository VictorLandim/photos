import React from "react"

import { Seo } from "../Seo"
import { Nav } from '../Nav'
import "./styles.scss"
import { chapters } from '../../data/chapters'

type LayoutProps = {
  title?: string;
  chapter?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, chapter }) => {

  const date = chapters.find(c => c.name === chapter)?.date;
  const layoutTitle = `${chapter} aka ${date}`;

  return (
    <>
      <Seo title={title} />

      <main className="layout">
        <Nav chapter={chapter} />

        <section className="layout__content">
          <h2 className="layout__title">
            {
              chapter && date &&
              layoutTitle
            }
          </h2>
          {children}
        </section>
      </main>
    </>
  )
}

export { Layout }
