import React, { useMemo, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Icon from '../../images/icon.png';

const Marker = ({ name, address, url, visited }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      {show && (
        <div className="z-100 absolute w-60 h-40 -top-40 bg-white p-3 border">
          <p className="text-lg font-bold text-blue-900">{name}</p>
          <p className={visited ? 'text-green-500' : 'text-red-500'}>{address}</p>
          <a href={url} target="_blank" className="underline text-blue-900" rel="noreferrer">Strona</a>
        </div>
      )}
      <button onClick={() => setShow(!show)}>
        <img src={Icon} title={name} className="w-5 h-8 z-10" alt={name}/>
      </button>
    </div>
  );
};

const Map = ({ markersData, gmapKey }) => {
  const defaultProps = {
    center: {
      lat: 51.110166,
      lng: 17.031932,
    },
    zoom: 15,
  };

  const markers = useMemo(() => {
    return markersData.map((marker) => (
      <Marker
        lat={marker.geo_position.lat}
        lng={marker.geo_position.lon}
        {...marker}
      />
    ));
  }, [markersData]);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: gmapKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
