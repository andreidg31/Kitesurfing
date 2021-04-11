import React, {useState, useEffect} from 'react';
import GoogleMap  from 'google-map-react';

import { Row, Table, Container } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
import BootstrapTable from 'react-bootstrap-table-next';

const Dashboard = () => {

  const [user, setUser] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [spots, setSpots] = useState([]);


  const columns = [{
    dataField: 'id',
    text: '#',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === 'asc') {
        return b - a;
        }
        return a - b;
    }
  }, {
    dataField: 'name',
    text: 'Name',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === 'asc') {
            const aux = a;
            a = b;
            b = aux;
        }
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    }
  }, {
    dataField: 'lat',
    text: 'Lat',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === 'asc') {
        return b - a;
        }
        return a - b;
    }
  }, {
    dataField: 'long',
    text: 'Long',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === 'asc') {
        return b - a;
        }
        return a - b;
    }
  }, {
    dataField: 'country',
    text: 'Country',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === 'asc') {
            const aux = a;
            a = b;
            b = aux;
        }
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    }
  }, {
    dataField: 'month',
    text: 'Month',
    sort: true,
    sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === 'asc') {
            const aux = a;
            a = b;
            b = aux;
        }
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    }
  }];

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
    setSpots(data);
    console.log(data);
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
  const greatPlaces = [
    {id: 'A', lat: 59.955413, lng: 30.337844},
    {id: 'B', lat: 59.724, lng: 30.080}
  ]

  const places = greatPlaces
  .map(place => {
    const {id, lat, lng} = place;

    return (
      <Container>
          {id} {lat} {lng}
      </Container>
    );
  });

  return (      
    <Container>
        <GoogleMap 
          apiKey={config.MAPS_KEY }
          style={{width: "100%", height: "500"}}
          defaultCenter={{lat: 59.838043, lng: 30.337157}}
          defaultZoom={11}
        >
          {places}
        </GoogleMap>
        <BootstrapTable keyField='id' data={ spots } columns={ columns } />
    </Container>
  );
}

export default Dashboard;