import React, { useState, useCallback, useMemo } from "react"
import GalleryComp from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"
import { GalleryImage } from '../components/GalleryImage'

const Home = ({ photos, currImage = 0 }) => {
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


  const processedPhotos = photos
    .map(e => ({ ...e, fluid: e }))
    .map(e => ({
      ...e,
      srcSet: e.srcSet.split(", "),
      sizes: [e.sizes],
    }))
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
    <>
      <GalleryComp
        photos={processedPhotos}
        onClick={openLightbox}
        margin={10}
        {...galleryConfig}
        renderImage={(e) => {
          const data = {
            ...e.photo.fluid,
            width: e.photo.width,
            height: e.photo.height
          }

          return (
            <GalleryImage
              width={data.width}
              height={data.height}
              fluid={data}
              margin={e.margin}
              onClick={(x) => e.onClick(x, e)}
            />
          )
        }}
      />
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              trackProps={{ contain: true }}
              views={photos.map(x => {

                return ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                })
              })}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}

export { Home }
