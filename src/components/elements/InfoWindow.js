import React from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';

const InfoWindow = (props) => {
  const { favourite, spot} = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  const onRemoveFavourite = () => {
    //const response = await axios.delete(config.BASE_URL + "")
  }

  const addFavourite = () => {
    
  }
  return (
    <div style={infoWindowStyle}>
      <h3>{spot.name}</h3>
      <span>{"Wind probability " + spot.probability}</span>
      {favourite ? 
        <Button variant="warning">Remove from favourites</Button> : 
        <Button variant="primary">Add to favourites</Button>
      }
    </div>
  );
}

export default InfoWindow;