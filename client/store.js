import { createStore, compose,applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
//import { logger } from 'redux-logger';
import axios from 'axios'; //to talk with backend api
import thunk from 'redux-thunk' ; //to allow async actions dispatching

// import the root reducer
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';


var defaultState = {
  posts:[],
  comments:[]
};
/**
 * This is middleware apply something to action here
 */
const fetchInitialPosts = (store) => (next) => (action) => {
  
  next(action);
}
/**
 * Middlewares that will fetch data from API's async
 */
const middleware = applyMiddleware(thunk,fetchInitialPosts);

const store = createStore(rootReducer,defaultState,middleware);
export const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
  console.log('store Changed',store.getState());
});

/**
 * We can dispatch multiple actions here
 */
store.dispatch((dispatch) => { 
//  dispatch({type:'NEW_POSTS',payload:{}});
    axios
        .get("/api/posts/random")
        .then(function(result) {    
            console.log(result.data.data);
            //dispatching action 
            dispatch({type:'NEW_POSTS',payload:{posts:result.data.data}});
        });
});
if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
