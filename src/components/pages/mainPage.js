import { useState } from 'react'
import { Helmet } from 'react-helmet'

import { RandomChar } from '../randomChar/randomChar'
import { CharList } from '../charList/charList'
import { CharInfo } from '../charInfo/charInfo'
import { CharSearchForm } from '../charSearchForm/charSearchForm'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

import decoration from '../../resources/img/vision.png'

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const onCharacterSelected = (id) => setSelectedCharacter(id)

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal main page"
                />
                <title>Marvel iPortal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharacterSelected={onCharacterSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="Vision a comic hero" />
        </>
    )
}

export default MainPage
