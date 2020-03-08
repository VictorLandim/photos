import React, { useState, useCallback, useEffect, useMemo } from "react"
import GalleryComp from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"
import Img from "gatsby-image"
import he from "he"

const Gallery = ({ photos, currImage = 0 }) => {
  const [currentImage, setCurrentImage] = useState(currImage)
  const [viewerIsOpen, setViewerIsOpen] = useState(currentImage !== 0)

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

  const shuffleArray = a => {
    let array = [...a]

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const processedPhotos = photos
    .map(e => ({
      ...e,
      srcSet: e.srcSet.split(", "),
      sizes: [e.sizes],
    }))

    // TODO fix this
    // .sort((a, b) => {
    //   const dateA = a.originalName.split(".")[0].replace("t", " ")
    //   const dateB = b.originalName.split(".")[0].replace("t", " ")

    //   return new Date(dateA) > new Date(dateB)
    // })
    .map(e => {
      // remove invalid HTML properties
      const { aspectRatio, originalName, ...rest } = e

      return {
        ...rest,
      }
    })

  // .map(e => {
  // if (Math.random() >= 0.5) {
  //   // return { ...e, width: 1, height: 1 }
  // }
  // if (e.aspectRatio > 1) {
  //   return { ...e, width: 3, height: 2 }
  //   return { ...e, width: 1 * e.aspectRatio, height: 1 }
  // }
  // return { ...e, width: 2, height: 3 }
  // return { ...e, width: 0.5 * e.aspectRatio, height: 0.5 }
  // })

  const galleryConfig = useMemo(() => {
    const isColumn = false

    if (isColumn) {
      return {
        direction: "column",
        column: getColumns,
      }
    }

    return {
      direction: "row",
      targetRowHeight: 450,
    }
  }, [])

  return (
    <div>
      <GalleryComp
        photos={processedPhotos}
        onClick={openLightbox}
        margin={10}
        {...galleryConfig}
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
    </div>
  )
}

export default Gallery
