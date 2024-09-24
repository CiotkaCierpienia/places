import React, { useMemo } from 'react';
import GoogleMapReact from 'google-map-react';
import Icon from '../../images/icon.png';

const Marker = ({ name, marker, setShowModal, setShownMarkerData }) => {
  return (
    <>
      <button onClick={() => {setShowModal(true); setShownMarkerData(marker)}}>
        <img src={Icon} title={name} className="w-5 h-8 z-0" alt={name}/>
      </button>
    </>
  );
};

const Map = ({ markersData, gmapKey, setShowModal, setShownMarkerData }) => {
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
        name={marker.name}
        marker={marker}
        setShowModal={setShowModal}
        setShownMarkerData={setShownMarkerData}
      />
    ));
  }, [markersData, setShowModal, setShownMarkerData]);

  return (
    <div style={{ height: '80vh', width: '100%', zIndex: 1 }}>
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
