const allReportsState = {
    all_reports: [],
    searched_reports:[]
  };
  
  /**
   * Reducer that listens and handles all Redux state operations
   * for the Timeline
   */
  export default (state = allReportsState, action = {}) => {
    switch (action.type) {
      case 'SET_ALL_REPORTS':
        return Object.assign({}, state, { all_reports: action.all_reports });
      case 'SET_SEARCHED_REPORTS':
        return Object.assign({}, state, { searched_reports: action.searched_reports });
      default: return state;
    }
  };
  