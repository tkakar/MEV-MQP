const initialVisualizationState = {
  meType: [],
  stage: [],
  cause: [],
};

export default (state = initialVisualizationState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_VIS':
      console.log(action.visData.meType);
      return Object.assign({}, state, { meType: action.visData.meType, stage: action.visData.stage, cause: action.visData.cause });
    default: return state;
  }
};
