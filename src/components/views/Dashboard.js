import React, {useState, useEffect} from 'react';
import GoogleMap from 'google-map-react';

import { Col, Row, Table, Container, Navbar } from 'react-bootstrap';
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
  }

  const getFavourites = async () => {
    const response = await axios.get(config.BASE_URL + "favourites");
    if (response.status !== 200) {
      console.error(response);
      return;
    }
    const {data} = response;
    setFavourites(data);
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

  const addFavourite = (favourite) => {
    setFavourites([...favourites, favourite]);
  }

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  }
  const spotMarkers = spots
  .map((spot, index) => {
    const {id, lat, long} = spot;

    return (
      <Marker key={index+1} lat={lat} lng={long} 
        favourite={favourites.find(fav => fav.spot.toString() === spot.id.toString())} 
        spot={spot}
        onMarkerClick={changeMarkerState}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
        />
        
    );
  });
  
  // const MyMap = withScriptjs(withGoogleMap((props) =>  
    // <GoogleMap 
    //   bootstrapURLKeys={{key:config.MAPS_KEY }}
    //   style={{width: "100%", height: "500"}}
    //   defaultCenter={{ lat: 50, lng: 50 }}
    //   defaultZoom={1}
    //   onClick={() => changeMarkerState(-1)}
    // >
    //   {spotMarkers}
    // </GoogleMap>
  // ));

  const mapStyles = {
    height: 500,
    width: 500,
    margin: 10
  };

  return (
    <div>
      <Navbar bg="dark">
        <Navbar.Brand>
          <img
            src={user.avatar}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Brand>
          Kitesurfing
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row lg>
          <Col sm="12" md={{ size: 6}} style={{height:500}}>
            <GoogleMap 
              bootstrapURLKeys={{key:config.MAPS_KEY }}
              style={{ padding:30, margin:20}}
              defaultCenter={{ lat: 50, lng: 50 }}
              defaultZoom={1}
              onClick={() => changeMarkerState(-1)}
            >
              {spotMarkers}
            </GoogleMap>
          </Col>
        </Row>
        <Row>
          <Col>
            <BootstrapTable style={{margin:30}} keyField='id' data={ spots } columns={ columns } pagination={paginationFactory(paginationOptions)} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;