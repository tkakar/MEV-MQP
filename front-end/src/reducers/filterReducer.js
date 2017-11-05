const initialFilterState = {
  REPT_DT: {
    start: 123,
    end: 123,
  },
  sex: [],
  occr_country: [],
  age: {
    start: 123,
    end: 123,
  },
};

export default (state = initialFilterState, action = {}) => {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return Object.assign({}, state, { REPT_DT: action.REPT_DT });
    case 'SET_SEX':
      return Object.assign({}, state, { sex: action.sex });
    case 'SET_LOCATION':
      return Object.assign({}, state, { occr_country: action.occr_country });
    case 'SET_AGE':
      return Object.assign({}, state, { age: action.age });
    default: return state;
  }
};
