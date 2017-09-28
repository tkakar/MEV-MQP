const initialDemographicState = {
  sex: {
    M: 0,
    F: 0,
    UNK: 0,
  },
  age: {},
  location: {},
  selectedDates: {
    startDate: 20170101,
    endDate: 20170701,
    // startDate: new Date(2017, 0, 1, 0, 0, 0, 0),
    // endDate: new Date(),
  },
};

export default (state = initialDemographicState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_DEMOGRAPHICS':
      console.log(...action.demographics);
      return Object.assign({}, state, { ...action.demographics });
    default: return state;
  }
};
