export const columns = [{
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

export const paginationOptions = {
   sizePerPage: 25,
    hideSizePerPage: true,
  };