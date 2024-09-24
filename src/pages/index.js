import * as React from 'react';
import { graphql } from 'gatsby';
import Map from '../components/Map/Map';
import { useMemo, useState } from 'react';
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
            <p className="text-2xl font-bold text-blue-900 bg-slate-50 border-b border-b-gray-300 p-3 px-10 text-center shadow-sm">
              {name}
            </p>
            <div className="flex p-5 flex-row md:space-x-4 md:flex-nowrap flex-wrap overflow-auto h-[calc(90vh-55px)] box-border">
              {cover_image?.[0]?.extension && <div className="md:basis-1/2 basis-full">
                {cover_image?.[0]?.extension !== 'svg' ?
                  (<GatsbyImage image={image} alt={name} className="rounded-2xl shadow-md" />) :
                  (<img src={`https://api.flotiq.com${cover_image?.[0]?.url}`} alt={name}/>)
                }
              </div>}
              <div className={`${cover_image?.[0]?.extension ? 'md:basis-1/2' : ''} basis-full overflow-hidden box-border pb-2`}>
                <div className="overflow-auto md:h-[calc(90vh-100px)] h-fit box-border p-4 bg-white rounded-2xl md:mt-0 mt-4 shadow-md">
                  <p>
                    <strong>Adres: </strong>
                    <span className={visited ? 'text-green-500' : 'text-red-500'}>{address}</span>
                  </p>
                  {url && <a href={url} target="_blank" className="underline text-blue-900" rel="noreferrer">Strona</a>}
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
  const [showFilters, setShowFilters] = useState(false);
  const [checkedTypes, setCheckedTypes] = useState({
    Muzeum: true,
    Galeria: true,
    Budynek: true,
    'Kościół': true,
    'Punkt widokowy': true,
    Pomnik: true,
    Performance: true,
    'Ogród': true,
  });
  const markersData = useMemo(() => {
    return data.allAttraction.nodes.filter((node) => checkedTypes[node.type]);
  }, [data.allAttraction, checkedTypes])
  return (
    <main className="relative h-screen">
      <h1 className="text-blue-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center p-4">
        Miejsca do zobaczenia
      </h1>
      <Modal {...shownMarkerData} show={showModal} setShow={setShowModal} />
      <div className="px-2">
        <button onClick={() => setShowFilters(!showFilters)} className="pb-2">Pokaż filtry</button>
        <div
          className={
            `${showFilters ? 'h-fit pb-2' : 'h-0 pb-0'} flex space-x-4 box-border px-2 transition-all duration-300 flex-wrap`
          }
        >
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Muzeum"
              checked={checkedTypes.Muzeum}
              onClick={() => setCheckedTypes((prev) => ({...prev, Muzeum: !prev.Muzeum}))}
            /> Muzea
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Galeria"
              checked={checkedTypes.Galeria}
              onClick={() => setCheckedTypes((prev) => ({...prev, Galeria: !prev.Galeria}))}
            /> Galerie
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Budynek"
              checked={checkedTypes.Budynek}
              onClick={() => setCheckedTypes((prev) => ({...prev, Budynek: !prev.Budynek}))}
            /> Budynki (można zobaczyć tylko z zewnątrz)
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Kościół"
              checked={checkedTypes['Kościół']}
              onClick={() => setCheckedTypes((prev) => ({...prev, 'Kościół': !prev['Kościół']}))}
            /> Kościoły
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Punkt widokowy"
              checked={checkedTypes['Punkt widokowy']}
              onClick={() => setCheckedTypes((prev) => ({...prev, 'Punkt widokowy': !prev['Punkt widokowy']}))}
            /> Punkty widokowe
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Pomnik"
              checked={checkedTypes.Pomnik}
              onClick={() => setCheckedTypes((prev) => ({...prev, Pomnik: !prev.Pomnik}))}
            /> Pomniki
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Performance"
              checked={checkedTypes.Performance}
              onClick={() => setCheckedTypes((prev) => ({...prev, Performance: !prev.Performance}))}
            /> Performance (fontanny, itp.)
          </div>
          <div>
            <input
              className="mr-1"
              type="checkbox"
              value="Ogród"
              checked={checkedTypes['Ogród']}
              onClick={() => setCheckedTypes((prev) => ({...prev, 'Ogród': !prev['Ogród']}))}
            /> Ogrody
          </div>
        </div>
      </div>
      <Map
        markersData={markersData}
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
