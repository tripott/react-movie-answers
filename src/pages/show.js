import React from 'react'
import MovieCard from '../components/movie-card'
import Header from '../containers/header'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { filter, head } from 'ramda'
import { SET_FAVORITE, DELETE_FAVORITE, CLEAR_FAVORITE } from '../constants'
//import { Button } from 'jrs-react-components'
// function propEquals(property, value) {
//   return function(fav) {
//     console.log('id', value)
//     console.log('fav.id', fav[property])
//     return fav[property] === Number(value)
//   }
// }

function propEquals(id) {
  return function(fav) {
    return fav['id'] === Number(id)
  }
}

class Show extends React.Component {
  componentDidMount() {
    console.log('params: ', this.props.match.params.id)
    console.log('favorites: ', this.props.favorites)
    const favorite = head(
      filter(propEquals(this.props.match.params.id), this.props.favorites)
    )

    this.props.dispatch({ type: SET_FAVORITE, payload: favorite })
  }
  render() {
    const props = this.props
    console.log('favorites: ', JSON.stringify(props.favorites))
    return (
      <div>
        <Header />
        <main>
          <div className="mw6 center mt2 tc">
            <MovieCard
              image={props.favorite.poster}
              title={props.favorite.title}
              year={props.favorite.year}
            />
          </div>
          <div className="mw6 tc center">
            <Link to="/"><BigButton>Return</BigButton></Link>
          </div>
          <div className="mw6 tc center">
            <Link to={`/edit/${props.favorite.id}`}>
              <BigButton>Edit</BigButton>
            </Link>
          </div>
          <div className="mw6 tc center">
            <BigButton onClick={props.handleDelete(props.history)}>
              Delete
            </BigButton>
          </div>
        </main>
      </div>
    )
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

const deleteFavorite = history => (dispatch, getState) => {
  const favorite = getState().favorite
  const url = `${process.env.REACT_APP_API}/favorites/${favorite.id}`
  fetch(url, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(fav => dispatch({ type: DELETE_FAVORITE, payload: favorite }))

  dispatch({
    type: CLEAR_FAVORITE
  })
  history.push('/')
}

function mapActionsToProps(dispatch) {
  return {
    dispatch,
    handleDelete: history => event => {
      window.confirm('R U Sure?')
        ? dispatch(deleteFavorite(history))
        : console.log('Not Handling Delete.')
    }
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    favorite: state.favorite
  }
}

export default connector(Show)
