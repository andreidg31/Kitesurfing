import React from 'react';

const Row = ({spot}) => {

  return (
    <tr>
      <td>{spot.name}</td>
      <td>{spot.lat}</td>
      <td>{spot.long}</td>
      <td>{spot.country}</td>
      <td>{spot.month}</td>
    </tr>
  );
}

export default Row;