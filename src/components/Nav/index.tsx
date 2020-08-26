import React from 'react'
import { Footer } from '../Footer'
import './styles.scss'
import { chapters } from '../../data/chapters'
import { Link } from 'gatsby'

type NavProps = {
  chapter?: string;
}

const Nav: React.FC<NavProps> = ({ chapter }) => {
  return (
    <>
      <input type="checkbox" id="nav-check" className="nav__check" hidden />

      <div className="nav__mobile">
        <h1 className="nav__title">
          <a className="nav__title--link" href="/">
            <span className="nav__title--second">p</span>
            <span className="nav__title--first">∇</span>
          </a>
        </h1>

        <label htmlFor="nav-check" className="nav__mobile-button">
          ∇
        </label>
      </div>

      <aside className="nav">
        <h1 className="nav__title">
          <a className="nav__title--link" href="/">
            <span className="nav__title--second">photos</span>
            <span className="nav__title--first">∇ictor</span>
          </a>
        </h1>

        <h2 className="nav__subtitle">|> chapters</h2>
        <ul className="nav__list">
          {
            chapters.map(currentChapter => {

              const selectedClass = chapter === currentChapter.name ?
                "nav__list-item--selected" :
                ""

              return (
                <Link key={currentChapter.name} to={`/chapters/${currentChapter.name}`}>
                  <li className={`nav__list-item ${selectedClass}`}>{currentChapter.name}</li>
                </Link>
              )
            })
          }
        </ul>

        <h2 className="nav__subtitle nav__subtitle--experiment u-mt-l">?? experiments</h2>

        <Footer />
      </aside>
    </>
  )
}

export { Nav }

