const initialVisualizationState = {
  data: '',
};

export default (state = initialVisualizationState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return Object.assign({}, state, { data: action.data });
    default: return state;
  }
};
