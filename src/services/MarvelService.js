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

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)

        return this._transformCharacter(res.data.results[0])
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=400&${this._apiKey}`)

        return res.data.results.map(this._transformCharacter)
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description.length < 1 ? 'character description not found' : char.description.length > 228 ? char.description.slice(0, 228) + '...' : char.description ,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService

console.log(`As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate`.length)
