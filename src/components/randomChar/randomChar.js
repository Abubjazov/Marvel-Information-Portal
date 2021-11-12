import { useEffect, useState } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import MarvelService from '../../services/MarvelService'
import './RandomChar.scss'

import mjolnir from '../../resources/img/mjolnir.png'


export const RandomChar = () => {
    const [character, setCharacter] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateCharacter()
    }, [])

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onCharacterLoading = () => {
        setLoading(true)
        setError(false)
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character)
        setLoading(false)
    }

    const updateCharacter = () => {
        const characterId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        onCharacterLoading();
        marvelService
            .getCharacter(characterId)
            .then(onCharacterLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? <View character={character} /> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki } = character
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
