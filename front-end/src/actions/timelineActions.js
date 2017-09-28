import { getData } from './visualizationActions';

export const setSelectedTime = selectedDates => (dispatch) => {
  const postBody = {
    table: 'demo',
    query: 'sex',
    ...selectedDates,
  };
  // console.log(postBody);

  getData(postBody);

  // fetch('http://localhost:3001/getdata', fetchData)
  //   .then(response => response.json())
  //   .then((things) => {
  //     console.log(things.rows);
  //     dispatch({ type: 'UPDATE_DATA', things: JSON.stringify(things.rows, null, 2) });
  //   })
  //   .catch((err) => {
  //     console.error.bind(err);
  //   });
};

export const getConfig = id => (dispatch) => {
};
