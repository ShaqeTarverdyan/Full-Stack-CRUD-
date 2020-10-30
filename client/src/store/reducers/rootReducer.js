import { combineReducers } from 'redux';

import authReducer  from './authReducer';
import newsReducer from './newsReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    app: appReducer
});

export default rootReducer;