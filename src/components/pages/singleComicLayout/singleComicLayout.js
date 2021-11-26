import { Link } from 'react-router-dom'

import './SingleComicLayout.scss'

export const SingleComicLayout = ({ data }) => {
    const { name, description, thumbnail, language, pages, price } = data

    return (
        <div className="comic">
            <img src={thumbnail} alt="Comic book cover" className="comic__img" />
            <div className="comic__info">
                <h2 className="comic__name">{name}</h2>
                <p className="comic__descr">{description}</p>
                <p className="comic__descr">{pages}</p>
                <p className="comic__descr">{language}</p>
                <div className="comic__price">{price}</div>
            </div>
            <Link to='/comics' className="comic__back">To all comics</Link>
        </div>
    )
}
