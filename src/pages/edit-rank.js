import React from 'react'
import Header from '../containers/header'
import { TextField, Button } from 'jrs-react-components'
import BigButton from '../components/big-button'
import { connect } from 'react-redux'
import {
  SET_FAVORITE_RANK,
  UPDATE_FAVORITE,
  CLEAR_FAVORITE
} from '../constants'

const EditRank = props =>
  <div>
    <Header />
    <h2>Edit Rank</h2>
    <form onSubmit={props.handleSubmit(props.history)}>
      <TextField
        value={props.favorite.rank}
        onChange={props.setRank}
        label="Rank"
        optional={false}
        help="Edit Rank"
        width="20"
      />
      <div className="mt4 center tc">
        <BigButton>Save</BigButton>
      </div>
    </form>
  </div>

const connector = connect(mapStateToProps, mapActionsToProps)

const updateFavorite = history => (dispatch, getState) => {
  const favorite = getState().favorite

  //const url = process.env.REACT_APP_API + '/favorites' + '/' + favorite.id
  const url = `${process.env.REACT_APP_API}/favorites/${favorite.id}`
  fetch(url, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(favorite)
  })
    .then(res => res.json())
    .then(favorite => {
      dispatch({
        type: UPDATE_FAVORITE,
        payload: favorite
      })
    })

  dispatch({
    type: CLEAR_FAVORITE
  })
  history.push('/')
}

function mapStateToProps(state) {
  return {
    favorite: state.favorite
  }
}

function mapActionsToProps(dispatch) {
  return {
    handleSubmit: history => e => {
      e.preventDefault()
      dispatch(updateFavorite(history))
    },
    setRank: e => dispatch({ type: SET_FAVORITE_RANK, payload: e.target.value })
  }
}

export default connector(EditRank)
