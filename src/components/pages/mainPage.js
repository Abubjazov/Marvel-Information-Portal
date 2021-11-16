import { useState } from 'react'
import { RandomChar } from '../randomChar/randomChar'
import { CharList } from '../charList/charList'
import { CharInfo } from '../charInfo/charInfo'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

import decoration from '../../resources/img/vision.png'

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const onCharacterSelected = (id) => setSelectedCharacter(id)

    return (
        <>
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
        </>
    )
}

export default MainPage
