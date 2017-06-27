import React from 'react'
import MovieCard from '../components/movie-card'
import Header from '../containers/header'
import BigButton from '../components/big-button'
import { Link } from 'react-router-dom'

const Show = props =>
  <div>
    <Header />
    <main>
      <div className="mw6 center mt2 tc">
        <MovieCard
          image="https://images-na.ssl-images-amazon.com/images/M/MV5BMTQxMjU2ODk4N15BMl5BanBnXkFtZTgwODQzNTcxMTE@._V1_SX300.jpg"
          title="What about Bob?"
          year="1991"
        />
      </div>
      <div className="mw6 tc center">
        <Link to="/"><BigButton>Return</BigButton></Link>
      </div>
    </main>
  </div>

export default Show
