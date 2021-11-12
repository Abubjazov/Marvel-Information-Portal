import { useState } from 'react'
import { AppHeader } from '../appHeader/appHeader'
import { RandomChar } from '../randomChar/randomChar'
import { CharList } from '../charList/charList'
import { CharInfo } from '../charInfo/charInfo'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

import decoration from '../../resources/img/vision.png'


export const App = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(null)

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id)
    }


    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="Vision a comic hero" />
            </main>
        </div>
    )
}
