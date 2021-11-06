import { Component } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import MarvelService from '../../services/MarvelService'
import './CharList.scss'

export class  CharList  extends Component {
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateCharList()
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharListLoaded = (characters) => {
        this.setState({characters, loading: false})
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    render() {
        const {characters, loading, error} = this.state
        const errorMessage = error ? <ErrorMsg /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? <View characters={characters} /> : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({characters}) => {
    const content = characters.map(character => {
        const {id, name, thumbnail} = character
        
        return (
            <li 
            key={id}
            className="char__item">
                <img src={thumbnail} alt={name}/>
                <div className="char__name">{name}</div>
            </li>
        )
    })

    return (
        <>
            <ul className="char__grid">
                {content}
            </ul>

            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    )
}
