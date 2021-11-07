class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = `apikey=${process.env.REACT_APP_CLIENT_API_KEY}`
    
    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getCharacter = async (id, mode = 'min') => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)

        if (mode === 'min') return this._transformCharacter(res.data.results[0])
        if (mode === 'max') return this._transformCharacterFull(res.data.results[0]) 
    }

    getAllCharacters = async (offset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=6&offset=${offset}&${this._apiKey}`)

        return res.data.results.map(this._transformCharacter)
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description.length < 1 ? 'character description not found' : char.description.length > 225 ? char.description.slice(0, 220) + '...' : char.description ,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

    _transformCharacterFull = (char) => {
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
}

export default MarvelService
