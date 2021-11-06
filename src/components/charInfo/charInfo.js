import { Component } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import { CharInfoSkeleton } from '../charInfoSkeleton/charInfoSkeleton'
import MarvelService from '../../services/MarvelService'

import './CharInfo.scss'

export class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.loadCharacter()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.characterId !== this.props.characterId) {
            this.loadCharacter()
        }  
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharacterLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onCharacterLoaded = (character) => {
        this.setState({character, loading: false})
    }

    loadCharacter = () => {
        const {characterId} = this.props

        if (!characterId) {return}

        this.onCharacterLoading();
        this.marvelService
            .getCharacter(characterId, 'max')
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    render() {
        const {character, loading, error} = this.state

        const errorMessage = error ? <ErrorMsg /> : null
        const spinner = loading ? <Spinner /> : null
        const skeleton = !this.props.characterId ? <CharInfoSkeleton /> : null 
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
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = character
    let content = null
    let imgStyle = {'objectFit' : 'cover'}

    if (comics) {
        content = comics.map((comic, index) => {
            if (index < 12) {
                return (
                    <li 
                        className="char__comics-item" 
                        key={index}>
                        <a href={comic.resourceURI}>{comic.name}</a>
                    </li>            
                )
            }
        })
    }    

    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {imgStyle = {'objectFit' : 'unset'}}
    
    return (
        <>
            <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
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
