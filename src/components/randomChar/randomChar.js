import { Component } from 'react'
import { Spinner } from '../spinner/spinner'
import MarvelService from '../../services/MarvelService'
import './RandomChar.scss'

import mjolnir from '../../resources/img/mjolnir.png'


export class RandomChar extends Component {
    constructor(props) {
        super(props)
        this.updateChar()
    }

    state = {
        character: {},
        loading: true
    }

    marvelService = new MarvelService()

    onCharLoaded = (character) => {
        this.setState({character, loading: false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
    }
    
    render() {
        const {character, loading} = this.state
        
        return (
            <div className="randomchar">
                {loading ? <Spinner /> : <View character={character} />}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki} = character
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
