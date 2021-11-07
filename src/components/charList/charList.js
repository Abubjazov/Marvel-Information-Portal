import { Component } from 'react'
import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import MarvelService from '../../services/MarvelService'
import './CharList.scss'

export class  CharList  extends Component {
    state = {
        characters: [],
        loading: true,
        loadingNewItems: false,
        error: false,
        offset: 1545,
        endOfCharacters: false
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
            loadingNewItems: true,
            error: false
        })
    }

    onCharacterListLoaded = (newCharacters) => {
        let s = newCharacters.length < 9 ? true : false
        this.setState(({characters, offset}) => ({
            characters: [...characters, ...newCharacters], 
            loading: false,
            loadingNewItems: false,
            offset: offset + 9,
            endOfCharacters: s
        }))
    }

    updateCharacterList = () => {
        this.onCharacterLoading();
        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onCharacterListLoaded)
            .catch(this.onError)
    }

    render() {
        const {characters, loading, error, loadingNewItems, endOfCharacters} = this.state
        const errorMessage = error ? <ErrorMsg /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? <View characters={characters} onCharacterSelected={this.props.onCharacterSelected} updateCharacterList={this.updateCharacterList} loadingNewItems={loadingNewItems} endOfCharacters={endOfCharacters}/> : null

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
    const {characters, onCharacterSelected, updateCharacterList, loadingNewItems, endOfCharacters} = props
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
            disabled={loadingNewItems}
            style={{"display" : endOfCharacters ? 'none' : 'block'}}
            onClick={updateCharacterList}>
                <div className="inner">load more</div>
            </button>
        </>
    )
}
