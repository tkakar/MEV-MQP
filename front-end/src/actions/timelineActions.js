import { getData, getTimelineData } from './visualizationActions';

export const setSelectedTime = selectedDates => (dispatch) => {
  const postBody = {
    table: 'demo',
    query: 'sex',
    ...selectedDates,
  };

  dispatch(getData(postBody));
};

export const setSelectedTimeline = () => (dispatch) => {
  dispatch(getTimelineData());
};
