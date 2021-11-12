import { useState, useEffect } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import './CharList.scss'

export const CharList = (props) => {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingNewItems, setLoadingNewItems] = useState(false)
    const [error, setError] = useState(false)
    const [offset, setOffset] = useState(1540)
    const [endOfCharacters, setEndOfCharacters] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateCharacterList()
    }, [])

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onCharacterLoading = () => {
        setLoadingNewItems(true)
        setError(false)
    }

    const onCharacterListLoaded = (newCharacters) => {
        setCharacters([...characters, ...newCharacters])
        setLoading(false)
        setLoadingNewItems(false)
        setOffset(offset + 9)
        setEndOfCharacters(newCharacters.length < 9 ? true : false)
    }

    const updateCharacterList = () => {
        onCharacterLoading()

        marvelService
            .getAllCharacters(offset)
            .then(onCharacterListLoaded)
            .catch(onError)
    }

    const itemRefs = []

    const setRef = (ref) => {
        itemRefs.push(ref)
    }

    const focusOnItem = (id) => {
        itemRefs.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs[id].classList.add('char__item_selected')
        itemRefs[id].focus()
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? <View
        characters={characters}
        onCharacterSelected={props.onCharacterSelected}
        updateCharacterList={updateCharacterList}
        loadingNewItems={loadingNewItems}
        endOfCharacters={endOfCharacters}
        setRef={setRef}
        focusOnItem={focusOnItem} /> : null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = (props) => {
    const { characters, onCharacterSelected, updateCharacterList, loadingNewItems, endOfCharacters, setRef, focusOnItem } = props
    const content = characters.map((character, i) => {
        const { id, name, thumbnail } = character
        let imgStyle = { 'objectFit': 'cover' }

        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { imgStyle = { 'objectFit': 'unset' } }

        return (
            <li
                key={id}
                className="char__item"
                tabIndex={0}
                ref={setRef}
                onClick={() => {
                    onCharacterSelected(id)
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        onCharacterSelected(id)
                        focusOnItem(i)
                    }
                }}>
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div className="char__name">{name}</div>
            </li>
        )
    })

    return (
        <>
            <ul className="char__grid">
                {content}
            </ul>

            <button
                className="button button__main button__long"
                disabled={loadingNewItems}
                style={{ "display": endOfCharacters ? 'none' : 'block' }}
                onClick={updateCharacterList}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}
