import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducer = (state = [], action) => {
  switch(action.type) {
    case 'addInventory':
      action.record.key = state.length + 1;
      state.push(action.record)
      return state;
    case 'removeInventory':
      return state.filter((rec)=>{
        return rec.id !== action.id
      })
  }
};
const store = createStore(reducer, composeWithDevTools());
export default store;