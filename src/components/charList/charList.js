import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'

import useMarvelService from '../../services/MarvelService'
import { ErrorMsg } from '../errorMsg/errorMsg'
import { Spinner } from '../spinner/spinner'

import './CharList.scss'

const setContent = (status, Component, data) => {
    console.log(data.loadingNewItems)
    switch (status) {
        case 'waiting':
            return <Spinner />

        case 'loading':
            return data.loadingNewItems ? <Component data={data} /> : <Spinner />

        case 'confirmed':
            return <Component data={data} />

        case 'error':
            return <ErrorMsg />

        default:
            throw new Error('Unexpected process state!')
    }
}

export const CharList = ({ onCharacterSelected }) => {
    const [characters, setCharacters] = useState([])
    const [loadingNewItems, setLoadingNewItems] = useState(false)
    const [offset, setOffset] = useState(1540)
    const [endOfCharacters, setEndOfCharacters] = useState(false)
    const { status, setStatus, getAllCharacters, clearError } = useMarvelService()

    useEffect(() => {
        updateCharacterList(false)
    }, [])

    const onCharacterListLoaded = (newCharacters) => {
        setCharacters(characters => [...characters, ...newCharacters])
        setLoadingNewItems(false)
        setOffset(offset => offset + 9)
        setEndOfCharacters(newCharacters.length < 9 ? true : false)
    }

    const updateCharacterList = (LoadingNewItems = true) => {
        clearError()
        setLoadingNewItems(LoadingNewItems)

        getAllCharacters(offset)
            .then(onCharacterListLoaded)
            .then(() => setStatus('confirmed'))
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    return (
        <div className="char__list">
            {setContent(status, View, { characters, onCharacterSelected, updateCharacterList, loadingNewItems, endOfCharacters, focusOnItem, itemRefs })}
        </div>
    )
}

const View = ({ data }) => {
    const { characters, onCharacterSelected, updateCharacterList, loadingNewItems, endOfCharacters, focusOnItem, itemRefs } = data

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
