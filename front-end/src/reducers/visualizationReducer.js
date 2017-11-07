const initialVisualizationState = {
  meType: [{ name: 'value', size: 1 },
    { name: 'value', size: 1 }],
  stage: [{ name: 'value', size: 1 }],
  cause: [{ name: 'value', size: 1 }],
};

export default (state = initialVisualizationState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_VIS':
      console.log("visData.metype");
      console.log(action.visData.meType);
      return Object.assign({}, state, { meType: action.visData.meType, stage: action.visData.stage, cause: action.visData.cause });
    default: return state;
  }
};
