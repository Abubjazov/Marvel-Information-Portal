import { useHttp } from '../Hooks/http.hook'

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = `apikey=${process.env.REACT_APP_CLIENT_API_KEY}`



    const getCharacter = async (id, mode = 'min') => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)

        if (mode === 'min') return _transformCharacter(res.data.results[0])
        if (mode === 'max') return _transformCharacterFull(res.data.results[0])
    }

    const getAllCharacters = async (offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)

        return res.data.results.map(_transformCharacter)
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)

        return res.data.results.map(_transformComics)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description.length < 1 ? 'character description not found' : char.description.length > 225 ? char.description.slice(0, 220) + '...' : char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            name: comic.title,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            homepage: comic.urls[0].url,
            price: comic.prices[0].price
        }
    }

    const _transformCharacterFull = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return { loading, error, getCharacter, getAllCharacters, getAllComics, clearError }
}

export default useMarvelService
