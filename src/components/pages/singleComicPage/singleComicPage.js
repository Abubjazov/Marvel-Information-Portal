import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from '../../spinner/spinner'
import { ErrorMsg } from '../../errorMsg/errorMsg'
import useMarvelService from '../../../services/MarvelService'
import './SingleComicPage.scss'

const SingleComicPage = () => {
    const { comicId } = useParams()
    const [comic, setComic] = useState(null)

    const { loading, error, getComic, clearError } = useMarvelService()

    useEffect(() => {
        loadComic()
    }, [comicId])


    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const loadComic = () => {
        clearError()

        if (!comicId) { return }

        getComic(comicId)
            .then(onComicLoaded)
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading && !error ? <Spinner /> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { name, description, thumbnail, language, pages, price } = comic
    console.log(comic)

    return (
        <div className="comic">
            <img src={thumbnail} alt="Comic book cover" className="comic__img" />
            <div className="comic__info">
                <h2 className="comic__name">{name}</h2>
                <p className="comic__descr">{description}</p>
                <p className="comic__descr">{pages} pages</p>
                <p className="comic__descr">{language}</p>
                <div className="comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage
