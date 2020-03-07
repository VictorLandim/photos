import React, { useState, useCallback } from "react"
import GalleryComp from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"
import Img from "gatsby-image"

const Gallery = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const getColumns = containerWidth => {
    let columns = 1
    if (containerWidth >= 500) columns = 2
    if (containerWidth >= 900) columns = 3
    if (containerWidth >= 1500) columns = 4
    return columns
  }

  console.log(photos)

  const shuffleArray = a => {
    let array = [...a]

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const newPhotos = photos
    .map(e => ({ ...e, srcSet: e.srcSet.split(", ") }))
    .map(e => {
      if (Math.random() >= 0.5) {
        // return { ...e, width: 1, height: 1 }
      }
      if (e.aspectRatio > 1) {
        return { ...e, width: 3, height: 2 }
        return { ...e, width: 1 * e.aspectRatio, height: 1 }
      }

      return { ...e, width: 2, height: 3 }
      return { ...e, width: 0.5 * e.aspectRatio, height: 0.5 }
    })
  return (
    <>
      <GalleryComp
        photos={newPhotos}
        onClick={openLightbox}
        // columns={getColumns}
        margin={20}
        // targetRowHeight="1000px"
        direction="row"
        direction="column"
        // renderImage={e => <Img {...e.fluid} />}
      />
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}

export default Gallery
