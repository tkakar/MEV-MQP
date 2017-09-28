const initialDemographicState = {
  sex: {
    M: 0,
    F: 0,
    UNK: 0,
  },
  age: {},
  location: {},
};

export default (state = initialDemographicState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_DEMOGRAPHICS':
      console.log(...action.demographics);
      return Object.assign({}, state, { ...action.demographics });
    default: return state;
  }
};
