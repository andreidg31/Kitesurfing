import React, {useState} from 'react';
import InfoWindow from './InfoWindow';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Marker = ({ favourite, spot, onMarkerClick}) => {

  const markerStyle = {
    height: 20,
    width: 20,
    fontSize: 'large',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <div style={markerStyle}>
      <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color={favourite ? "yellow" : "red"} onClick={() => onMarkerClick(spot.id)} />
      {spot.show && <InfoWindow spot={spot} favourite={favourite} />}
    </div>
  );
}
export default Marker;