import demographic from './demographicReducer';
import filters from './filterReducer';
import multiSelectFilters from './multiSelectFilterReducer';
import user from './userReducer';
import mainVisualization from './visualizationReducer';
import timeline from './timelineReducer';
import all_reports from './reportsReducer';

/**
 * Redux Reducer that combines all of the other reducers to build the Redux State
 */
export default {
  demographic,
  filters,
  multiSelectFilters,
  mainVisualization,
  timeline,
  user,
  all_reports,
};
