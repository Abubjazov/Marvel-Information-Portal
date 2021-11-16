import { useEffect, useState } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import { CharInfoSkeleton } from '../charInfoSkeleton/charInfoSkeleton'
import useMarvelService from '../../services/MarvelService'

import './CharInfo.scss'
import { Link } from 'react-router-dom'

export const CharInfo = (props) => {
    const [character, setCharacter] = useState(null)
    const { loading, error, getCharacter, clearError } = useMarvelService()

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
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading ? <Spinner /> : null
    const skeleton = !props.characterId ? <CharInfoSkeleton /> : null
    const content = !(loading || error || !character) ? <View character={character} /> : null

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {skeleton}
            {content}
        </div>
    )

}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = character
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
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
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
