import React from 'react'
import './styles.scss'
import { Link } from 'gatsby'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__contact">
        <a href="mailto:hi@victorlandim.com"
          className="footer__contact-item"
        >
        // email
        </a>
        <a href="https://instagram.com/_victorlandim"
          className="footer__contact-item"
          target="_blank"
          rel="noopener noreferrer"
        >
        // instagram
        </a>
        <Link to='/about' className="footer__contact-item">
        // about
        </Link>
      </div>

      <div className="footer__copy u-mt-s">
        💻/📷 with ❤ by
       <br />
        <a style={{ marginLeft: "5px", marginRight: "5px" }} href="https://victorlandim.com">
          ∇ictor Landim
        </a>
        {`© ${new Date().getFullYear()}.`}
      </div>
    </footer >
  )
}

export { Footer }
