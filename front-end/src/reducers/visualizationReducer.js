const initialVisualizationState = {
  meType: [],
  stage: [],
  cause: [],
};

export default (state = initialVisualizationState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_VIS':
      return Object.assign({}, state, { ...action.visData });
    default: return state;
  }
};
