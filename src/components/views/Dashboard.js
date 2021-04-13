import React, {useState, useEffect} from 'react';
import GoogleMap  from 'google-map-react';

import { Row, Table, Container } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import {columns, paginationOptions} from '../Constants';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Marker from '../elements/Marker';

const Dashboard = () => {

  const [user, setUser] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [spots, setSpots] = useState([]);

  useEffect(() =>{
    getUser();
    getSpots();
    getFavourites();
  }, []);
  
  const getSpots = async () => {
    const response = await axios.get(config.BASE_URL + "spot");
    if (response.status !== 200) {
      console.error(response);
      return;
    }
    const {data} = response;
    setSpots(data.map(spot =>{return {...spot, show:false} }));
    console.log(data.map(spot =>{return {...spot, show:false} }));
  }

  const getFavourites = async () => {
    const response = await axios.get(config.BASE_URL + "favourites");
    if (response.status !== 200) {
      console.error(response);
      return;
    }
    const {data} = response;
    console.log(data.map(fav => fav.spot.toString()));
    setFavourites(data.map(fav => fav.spot.toString()));
  }

  const getUser = async () => {
    const userId = localStorage.getItem("user");
    const response = await axios.get(config.BASE_URL + "user/" + userId);
    if (response.status !== 200) {
      console.error(response);
      return;
    }
    const {data} = response;
    setUser(data);
  }

  const displaySpots = () => {
  
    if (spots.length > 0) {
      const values = spots.map((spot, index) => <tr key={spot.id}>
        <td>{(index + 1)}</td>
        <td>{spot.name}</td>
        <td>{spot.lat}</td>
        <td>{spot.long}</td>
        <td>{spot.country}</td>
        <td>{spot.month}</td>
      </tr>);
      return values;
    }
    return null;
  }

  const changeMarkerState = (id) => {
    setSpots(
      spots.map(spot =>{
        if (spot.id === id) {
          spot.show = true;
        }
        else {
          spot.show = false;
        }
        return spot;
      })
    );
  }

  const spotMarkers = spots
  .map(spot => {
    const {id, lat, long} = spot;

    return (
      <Marker key={id} lat={lat} lng={long} favourite={favourites.includes(spot.id.toString())} spot={spot} onMarkerClick={changeMarkerState}/>
    );
  });
 

  return (      
    <Container fluid>
      <Container>
        <GoogleMap 
          bootstrapURLKeys={{key:config.MAPS_KEY }}
          style={{width: "100%", height: "500"}}
          defaultCenter={{ lat: 50, lng: 50 }}
          defaultZoom={1}
          onClick={() => changeMarkerState(-1)}
        >
         {spotMarkers}
        </GoogleMap>
      </Container>
      <BootstrapTable keyField='id' data={ spots } columns={ columns } pagination={paginationFactory(paginationOptions)} />
    </Container>
  );
}

export default Dashboard;