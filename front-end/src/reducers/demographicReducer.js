const initialDemographicState = {
  gender: {
    male: 0,
    female: 0,
    unknown: 0,
  },
};

export default (state = initialDemographicState, action = {}) => {
  switch (action.type) {
    case 'SET_GENDER':
      return Object.assign({}, state, { gender: action.gender });
    default: return state;
  }
};
