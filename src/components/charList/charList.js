import { useState, useEffect, useRef } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'
import './CharList.scss'


export const CharList = (props) => {
    const [characters, setCharacters] = useState([])
    const [loadingNewItems, setLoadingNewItems] = useState(false)
    const [offset, setOffset] = useState(1540)
    const [endOfCharacters, setEndOfCharacters] = useState(false)
    const { loading, error, getAllCharacters, clearError } = useMarvelService()

    useEffect(() => {
        updateCharacterList(false)
    }, [])

    const onCharacterListLoaded = (newCharacters) => {
        setCharacters(characters => [...characters, ...newCharacters])
        setLoadingNewItems(false)
        setOffset(offset => offset + 9)
        setEndOfCharacters(newCharacters.length < 9 ? true : false)
    }

    const updateCharacterList = () => {
        clearError()
        setLoadingNewItems(true)

        getAllCharacters(offset)
            .then(onCharacterListLoaded)
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading && loadingNewItems ? <Spinner /> : null
    const content = <View
        characters={characters}
        onCharacterSelected={props.onCharacterSelected}
        updateCharacterList={updateCharacterList}
        loadingNewItems={loadingNewItems}
        endOfCharacters={endOfCharacters}
        itemRefs={itemRefs}
        focusOnItem={focusOnItem} />

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = (props) => {
    const { characters, onCharacterSelected, updateCharacterList, loadingNewItems, endOfCharacters, focusOnItem, itemRefs } = props

    const content = characters.map((character, i) => {
        const { id, name, thumbnail } = character
        let imgStyle = { 'objectFit': 'cover' }

        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { imgStyle = { 'objectFit': 'unset' } }

        return (
            <li
                key={id}
                className="char__item"
                tabIndex={0}
                ref={element => itemRefs.current[i] = element}
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
