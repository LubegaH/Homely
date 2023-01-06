import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer.jsx';
import purchaseListReducer from './purchaseListReducer.jsx';

export default combineReducers({
  auth: authReducer,
  purchaseList: purchaseListReducer,
});
