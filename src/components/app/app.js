import { Component } from 'react'
import { AppHeader } from '../appHeader/appHeader'
import { RandomChar } from '../randomChar/randomChar'
import { CharList } from '../charList/charList'
import { CharInfo } from '../charInfo/charInfo'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

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
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        {/* <ErrorBoundary> */}
                            <CharList onCharacterSelected={this.onCharacterSelected}/>
                        {/* </ErrorBoundary> */}
                        <ErrorBoundary>
                            <CharInfo characterId={this.state.selectedCharacter}/>
                        </ErrorBoundary>                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="Vision a comic hero"/>
                </main>
            </div>
        )
    }
}
