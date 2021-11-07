import { Component } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import MarvelService from '../../services/MarvelService'
import './CharList.scss'

export class  CharList  extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        offset: 400
    }    

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateCharacterList()
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

    onCharacterListLoaded = (characters) => {
        this.setState({characters: characters, loading: false, offset: this.state.offset + 6})
    }

    updateCharacterList = () => {
        this.onCharacterLoading();
        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onCharacterListLoaded)
            .catch(this.onError)
    }

    render() {
        const {characters, loading, error} = this.state
        const errorMessage = error ? <ErrorMsg /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? <View characters={characters} onCharacterSelected={this.props.onCharacterSelected} updateCharacterList={this.updateCharacterList}/> : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = (props) => {
    const {characters, onCharacterSelected, updateCharacterList} = props
    const content = characters.map(character => {
        const {id, name, thumbnail} = character
        let imgStyle = {'objectFit' : 'cover'}

        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {imgStyle = {'objectFit' : 'unset'}}
        
        return (
            <li 
            key={id}
            className="char__item"
            onClick={() => onCharacterSelected(id)}>
                <img src={thumbnail} alt={name} style={imgStyle}/>
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
            onClick={updateCharacterList}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}
