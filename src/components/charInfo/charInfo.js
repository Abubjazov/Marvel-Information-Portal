import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'
import { setContent } from '../../utils/setContent'

import './CharInfo.scss'

export const CharInfo = (props) => {
    const [character, setCharacter] = useState(null)
    const { status, setStatus, getCharacter, clearError } = useMarvelService()

    useEffect(() => {
        loadCharacter()
    }, [props])

    const onCharacterLoaded = (character) => {
        setCharacter(character)
    }

    const loadCharacter = () => {
        clearError()
        const { characterId } = props

        if (!characterId) { return }

        getCharacter(characterId, 'max')
            .then(onCharacterLoaded)
            .then(() => setStatus('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(status, View, character)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data
    let content = null
    let imgStyle = { 'objectFit': 'cover' }

    if (comics) {
        content = comics.map((comic, index) => {
            const comicId = comics[index].resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', '')

            return (
                <li
                    className="char__comics-item"
                    key={index}>
                    <Link to={`/comics/${comicId}`}>{comic.name}</Link>
                </li>
            )
        })
    }

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { imgStyle = { 'objectFit': 'unset' } }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? content : 'There is no comics with this character'}
            </ul>
        </>
    )
}
