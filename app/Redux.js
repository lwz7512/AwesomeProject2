import { applyMiddleware, combineReducers, createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native


const persistConfig = {
    key: 'todos',
    storage,
}

// Initial state of the store
const initialState = {
    todos: ['Click to remove', 'Learn React Native', 'Write Code', 'Ship App'],
}
  
// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
    add: (item) => {
      return {type: 'ADD', payload: item}
    },
    remove: (index) => {
      return {type: 'REMOVE', payload: index}
    }
}
  
// reducers.js, produce new state based on action
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
const _reducer = (state = initialState, action) => {
    // console.log(state);

    const {todos} = state;
    const {type, payload} = action;

    switch (action.type) {
        case 'ADD':
        return {
            todos: [payload, ...todos],
        }

        case 'REMOVE':
        return {
            todos: todos.filter((todo, i) => i !== payload),
        }

        default:
        // return default value while app start
        return state;
    }
};


// store.js
// with persistence support
export default function configureStore() {

    const persistedReducer = persistReducer(persistConfig, _reducer)
    
    const store = createStore(persistedReducer);
    let persistor = persistStore(store)
    
    return { store, persistor }
}
