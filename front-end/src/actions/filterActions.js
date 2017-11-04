import { getDemographicData } from './demographicActions';

export const filterData = () => (dispatch, getState) => {
  const postBody = {
    ...getState().filters,
  };

  console.log('Updated filter with: ', postBody);

  dispatch(getDemographicData(postBody));
  // TODO: Call to get main visualization data
};

export const asd = () => 123;
