import * as React from 'react';
import { graphql } from 'gatsby';
import Map from '../components/Map/Map';
import { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Modal = ({ name, description, address, url, visited, cover_image, show, setShow }) => {
  const image = getImage(cover_image?.[0])
  return (
    <>
      {show && (
        <div className="z-50 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400/60">
          <div className="w-[90vw] h-[90vh] relative rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <button onClick={() => setShow(false)} className="absolute top-3 right-5 font-bold text-gray-500 text-2xl">
              x
            </button>
            <p className="text-2xl font-bold text-blue-900 bg-slate-50 border-b border-b-gray-300 p-3 text-center shadow-sm">
              {name}
            </p>
            <div className="flex p-5 flex-row md:space-x-4 md:flex-nowrap flex-wrap overflow-auto h-[calc(90vh-55px)] box-border">
              <div className="md:basis-1/2 basis-full">
                {cover_image?.[0].extension !== 'svg' ?
                  (<GatsbyImage image={image} alt={name} className="rounded-2xl shadow-md" />) :
                  (<img src={`https://api.flotiq.com${cover_image?.[0].url}`} alt={name}/>)
                }
              </div>
              <div className="md:basis-1/2 basis-full overflow-hidden box-border pb-2">
                <div className="overflow-auto md:h-[calc(90vh-100px)] h-fit box-border p-4 bg-white rounded-2xl md:mt-0 mt-4 shadow-md">
                  <p>
                    <strong>Adres: </strong>
                    <span className={visited ? 'text-green-500' : 'text-red-500'}>{address}</span>
                  </p>
                  <a href={url} target="_blank" className="underline text-blue-900" rel="noreferrer">Strona</a>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const IndexPage = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [shownMarkerData, setShownMarkerData] = useState({});
  return (
    <main className="relative h-screen">
      <h1 className="text-blue-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center p-4">
        Miejsca do zobaczenia
      </h1>
      <Modal {...shownMarkerData} show={showModal} setShow={setShowModal} />
      <Map
        markersData={data.allAttraction.nodes}
        gmapKey={data.site.siteMetadata.gmapKey}
        setShowModal={setShowModal}
        setShownMarkerData={setShownMarkerData}
      />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Miejsca do zobaczenia</title>

export const query = graphql`
query indexQuery {
  allAttraction {
    nodes {
      address
      description
      name
      url
      visited
      id
      geo_position {
        lat
        lon
      }
      type
      cover_image {
        gatsbyImageData
        url
        extension
      }
    }
  }
  site {
    siteMetadata {
      gmapKey
    }
  }
}
`
