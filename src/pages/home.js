import React from 'react'
import Header from '../containers/header'
import {
  Button,
  List,
  ImageListItem,
  SimpleListItem
} from 'jrs-react-components'
import LinkButton from '../components/link-button'

const Home = function() {
  return (
    <div>
      <Header />
      <main>
        <div className="mw6 center mt2 tc">
          <List>
            <SimpleListItem
              title="Add New Favorite"
              link={<LinkButton to="/new">Add</LinkButton>}
            />
            <ImageListItem
              id={1}
              title="What about Bob?"
              image="https://images-na.ssl-images-amazon.com/images/M/MV5BMTQxMjU2ODk4N15BMl5BanBnXkFtZTgwODQzNTcxMTE@._V1_SX300.jpg"
              link={<LinkButton to="/show/1">Details</LinkButton>}
            />
          </List>
        </div>
      </main>
    </div>
  )
}

export default Home

function openDocs(e) {
  if (/localhost/.test(window.location.href)) {
    window.location = 'http://localhost:5000'
  } else {
    window.location =
      'https://github.com/jrs-innovation-center/jrscode-react-starter#jrs-react-starter-kit'
  }
}
