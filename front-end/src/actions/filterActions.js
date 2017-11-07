import { getDemographicData } from './demographicActions';
import { getVisData } from './visualizationActions';

export const filterData = () => (dispatch, getState) => {
  const postBody = {
    ...getState().filters,
  };

  console.log('Updated filter with: ', postBody);

  dispatch(getDemographicData(postBody));

  console.log('Update viz');

  dispatch(getVisData(postBody));
  // TODO: Call to get main visualization data
};

export const asd = () => 123;
