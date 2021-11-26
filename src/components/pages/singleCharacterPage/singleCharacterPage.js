import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from '../../spinner/spinner'
import { ErrorMsg } from '../../errorMsg/errorMsg'
import useMarvelService from '../../../services/MarvelService'
import './SingleCharacterPage.scss'

const SingleCharacterPage = () => {
    const { charId } = useParams()
    const [character, setCharacter] = useState(null)

    const { loading, error, getCharacter, clearError } = useMarvelService()

    useEffect(() => {
        loadCharacter()
    }, [charId])


    const onCharacterLoaded = (character) => {
        setCharacter(character)
    }

    const loadCharacter = () => {
        clearError()

        if (!charId) { return }

        getCharacter(charId)
            .then(onCharacterLoaded)
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading && !error ? <Spinner /> : null
    const content = !(loading || error || !character) ? <View character={character} /> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ character }) => {
    const { name, description, thumbnail } = character

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacterPage
