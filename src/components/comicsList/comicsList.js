import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'
import { ErrorMsg } from '../errorMsg/errorMsg'
import { Spinner } from '../spinner/spinner'

import './ComicsList.scss'

const setContent = (status, Component, data) => {
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

export const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [loadingNewItems, setLoadingNewItems] = useState(false)
    const [offset, setOffset] = useState(1540)
    const [endOfComics, setEndOfComics] = useState(false)
    const { status, setStatus, getAllComics, clearError } = useMarvelService()

    useEffect(() => {
        updateComicsList(false)
    }, [])

    const onComicsListLoaded = (newComics) => {
        setComics(comics => [...comics, ...newComics])
        setLoadingNewItems(false)
        setOffset(offset => offset + 8)
        setEndOfComics(newComics.length < 8 ? true : false)
    }

    const updateComicsList = (LoadingNewItems = true) => {
        clearError()
        setLoadingNewItems(LoadingNewItems)

        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setStatus('confirmed'))
    }

    const itemRefs = useRef([])

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    return (
        <div className="comics__list">
            {setContent(status, View, { comics, updateComicsList, loadingNewItems, endOfComics, focusOnItem, itemRefs })}
        </div>
    )
}

const View = ({ data }) => {
    const { comics, updateComicsList, loadingNewItems, endOfComics, focusOnItem, itemRefs } = data

    const content = comics.map((comic, i) => {
        const { id, name, thumbnail } = comic
        let imgStyle = { 'objectFit': 'cover' }

        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') { imgStyle = { 'objectFit': 'unset' } }

        return (
            <li
                key={i}
                className="comics__item"
                tabIndex={0}
                ref={element => itemRefs.current[i] = element}
                onClick={() => {
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        focusOnItem(i)
                    }
                }}>
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={name} style={imgStyle} className="comics__item-img" />
                    <div className="comics__item-name">{comic.name}</div>
                    <div className="comics__item-price">{comic.price}</div>
                </Link>
            </li>
        )
    })

    return (
        <>
            <ul className="comics__grid">
                {content}
            </ul>
            <button
                className="button button__main button__long"
                disabled={loadingNewItems}
                style={{ "display": endOfComics ? 'none' : 'block' }}
                onClick={updateComicsList}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}
