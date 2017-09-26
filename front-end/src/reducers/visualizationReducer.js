const initialVisualizationState = {
  things: '',
};

export default (state = initialVisualizationState, action = {}) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return Object.assign({}, state, { things: action.things });
    default: return state;
  }
};
