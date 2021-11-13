import { useState } from 'react'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'
import { AppHeader } from '../appHeader/appHeader'
import { AppBanner } from '../appBanner/appBanner'
import { RandomChar } from '../randomChar/randomChar'
import { CharList } from '../charList/charList'
import { CharInfo } from '../charInfo/charInfo'
import { ComicsList } from '../comicsList/comicsList'

import decoration from '../../resources/img/vision.png'

export const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [selectedComic, setSelectedComic] = useState(null)

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id)
    }

    const onComicSelected = (id) => {
        setSelectedComic(id)
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <AppBanner />
                <ErrorBoundary>
                    <ComicsList onComicSelected={onComicSelected} />
                </ErrorBoundary>
                {/* <ErrorBoundary>
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
                <img className="bg-decoration" src={decoration} alt="Vision a comic hero" /> */}
            </main>
        </div>
    )
}
