const initialTimelineState = {
  entireTimelineData: [{
    congenital_anomalies: 0,
    deaths: 0,
    disablilities: 0,
    hospitalizations: 0,
    init_fda: 0,
    life_threatenings: 0,
    other_serious: 0,
    required_interventions: 0,
  }],
};

export default (state = initialTimelineState, action = {}) => {
  switch (action.type) {
    case 'SET_ENTIRE_TIMELINE':
      return Object.assign({}, state, { entireTimelineData: action.entireTimelineData });
    default: return state;
  }
};
