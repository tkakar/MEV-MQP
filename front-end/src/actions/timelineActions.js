import { getData } from './visualizationActions';

export const setSelectedTime = selectedDates => (dispatch) => {
  const postBody = {
    table: 'demo',
    query: 'sex',
    ...selectedDates,
  };

  dispatch(getData(postBody));
};

export const getConfig = id => (dispatch) => {
};
