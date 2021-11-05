import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/app/app'
import MarvelService from './services/MarvelService'
import './style/index.scss'

const marvelService = new MarvelService()

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
