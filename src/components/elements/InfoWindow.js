import React from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';

const InfoWindow = (props) => {
  const { favourite, spot, addFavourite, removeFavourite, setFav} = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 250,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  const onRemoveFavourite = async () => {
    console.log("Removing " + spot.name + " with id: " + favourite.id);
    const response = await axios.delete(config.BASE_URL + "favourites/" + favourite.id);
    if (response.status !== 201 && response.status !== 200) {
      console.error(response);
      return;
    }
    
    removeFavourite(favourite.id);
    setFav(undefined);
  }

  const onAddFavourite = async () => {
    console.log("Adding to favourites " + spot.name );
    const response = await axios.post(config.BASE_URL + "favourites");
    if (response.status !== 201 && response.status !== 200) {
      console.error(response);
      return;
    }
    const {data} = response;
    addFavourite(data);
    setFav(data);
  }

  return (
    <div style={infoWindowStyle}>
      <h4>{spot.name}</h4>
      <h4>Country: {spot.country} </h4>
      <span>{"Wind probability " + spot.probability}</span>
      {favourite ? 
        <Button variant="warning" onClick={() => onRemoveFavourite()}>Remove from favourites</Button> : 
        <Button variant="primary" onClick={() => onAddFavourite()}>Add to favourites</Button>
      }
    </div>
  );
}

export default InfoWindow;