import {
  SET_FAVORITES,
  APPEND_FAVORITE,
  UPDATE_FAVORITE,
  DELETE_FAVORITE
} from '../constants'
import { append, merge, map, reject } from 'ramda'

const updateRank = (id, rank, favorites) =>
  map(fav => (fav.id === id ? merge(fav, { rank: rank }) : fav), favorites)

export default (state = [], action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload
    case APPEND_FAVORITE:
      return append(action.payload, state)
    case UPDATE_FAVORITE:
      return updateRank(action.payload.id, action.payload.rank, state)
    case DELETE_FAVORITE:
      return reject(fav => fav.id === action.payload.id, state)
    default:
      return state
  }
}
