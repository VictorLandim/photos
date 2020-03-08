import React from "react"

import Seo from "../components/Seo"
import "./app.css"

const Layout = ({ children, title }) => {
  return (
    <main>
      <Seo title={title} />

      <header>∇ictor's Pics</header>

      <section>{children}</section>

      <footer>
        {`© ${new Date().getFullYear()}, 💻 with ❤ by`}
        <a style={{ marginLeft: "7px" }} href="https://victorlandim.com">
          ∇ictor Landim
        </a>
        .
      </footer>
    </main>
  )
}

export default Layout
