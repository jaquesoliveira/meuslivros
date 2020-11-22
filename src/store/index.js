import {createStore} from 'redux';
import livrosReducer from './livrosReducer.js';

import {persistReducer, persistStore} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'meuslivros',
    storage
}

const persistedReducer = persistReducer(persistConfig, livrosReducer)  ; 

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};