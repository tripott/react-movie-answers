import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import app from './reducers/app'
import favorites from './reducers/favorites'
import favorite from './reducers/favorite'
import search from './reducers/search'
import { SET_FAVORITES } from './constants'
import { sortBy, compose, prop } from 'ramda'
const store = createStore(
  combineReducers({
    app,
    favorites,
    favorite,
    search
  }),
  applyMiddleware(thunk)
)

const sortByRank = sortBy(compose(Number, prop('rank')))

function listFavorites(dispatch, getState) {
  fetch(process.env.REACT_APP_API + '/favorites')
    .then(res => res.json())
    .then(favorites => {
      dispatch({ type: SET_FAVORITES, payload: sortByRank(favorites) })
    })
}

store.dispatch(listFavorites)

export default store
