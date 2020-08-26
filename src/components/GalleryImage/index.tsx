import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import "./styles.scss"

type GalleryImageProps = {
  width: number
  height: number
  margin: string
  fluid: FluidObject
  onClick: any
}

const GalleryImage: React.FC<GalleryImageProps> = (props) => {

  const { width, height, fluid, margin, onClick } = props

  return (
    <div
      className="gallery-image"
      style={{
        width,
        height,
        margin,
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Img fluid={fluid} />
    </div>
  )
}

export { GalleryImage }
