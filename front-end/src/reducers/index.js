import { combineReducers } from 'redux';
import demographic from './demographicReducer';
import data from './visualizationReducer';

export default combineReducers({ demographic, data });
