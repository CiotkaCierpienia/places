import * as React from 'react';
import { graphql } from 'gatsby';
import Map from '../components/Map/Map';

const IndexPage = ({ data }) => {
  return (
    <main>
      <h1 className="text-blue-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center p-4">
        Miejsca do zobaczenia
      </h1>
      <Map markersData={data.allAttraction.nodes} gmapKey={data.site.siteMetadata.gmapKey} />
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
    }
  }
  site {
    siteMetadata {
      gmapKey
    }
  }
}
`
