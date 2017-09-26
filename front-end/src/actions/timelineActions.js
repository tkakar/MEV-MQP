export const setSelectedTime = () => (dispatch) => {
  const fetchData = {
    method: 'GET',
    mode: 'cors',
    body: {
      table: 'demo',
      query: 'sex',
    },
  };

  fetch('http://localhost:3001/getdata', fetchData)
    .then(response => response.json())
    .then((things) => {
      console.log(things.rows);
      dispatch({ type: 'UPDATE_DATA', things: JSON.stringify(things.rows, null, 2) });
    })
    .catch((err) => {
      console.error.bind(err);
    });
};

export const getConfig = id => (dispatch) => {
};
