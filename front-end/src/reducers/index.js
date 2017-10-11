import { combineReducers } from 'redux';
import demographic from './demographicReducer';
import data from './visualizationReducer';
import timeline from './timelineReducer';

export default combineReducers({ demographic, data, timeline });
