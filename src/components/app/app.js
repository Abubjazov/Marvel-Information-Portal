import { Component } from 'react'
import { AppHeader } from '../appHeader/appHeader'
import { RandomChar } from '../randomChar/randomChar'
import { CharList } from '../charList/charList'
import { CharInfo } from '../charInfo/charInfo'

import decoration from '../../resources/img/vision.png'


export class App extends Component {
    state = {
        selectedCharacter: null
    }

    onCharacterSelected = (id) => {
        this.setState({
            selectedCharacter: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onCharacterSelected={this.onCharacterSelected}/>
                        <CharInfo characterId={this.state.selectedCharacter}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="Vision a comic hero"/>
                </main>
            </div>
        )
    }
}
