import { getData } from './visualizationActions';

export const setSelectedTime = selectedDates => (dispatch) => {
  const postBody = {
    table: 'demo',
    query: 'sex',
    ...selectedDates,
  };

  dispatch(getData(postBody));
};

export const setSelectedTimeline = () => (dispatch) => {
  const fetchData = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log('grabbing timeline data');

  fetch('http://localhost:3001/gettimelinedata', fetchData)
    .then(response => response.json())
    .then((allReports) => {
      console.log(allReports.rows);
      // dispatch({ type: 'UPDATE_DATA', things: JSON.stringify(allReports.rows, null, 2) });
      dispatch({ type: 'SET_ENTIRE_TIMELINE', entireTimelineData: allReports.rows });
    })
    .catch((err) => {
      console.error.bind(err);
    });
};
