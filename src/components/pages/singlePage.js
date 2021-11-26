import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Spinner } from '../spinner/spinner'
import { ErrorMsg } from '../errorMsg/errorMsg'
import { AppBanner } from '../appBanner/appBanner'

import useMarvelService from '../../services/MarvelService'

export const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService()

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError()

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
                break
            case 'character':
                getCharacter(id).then(onDataLoaded)
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    const errorMessage = error ? <ErrorMsg /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !data) ? <Component data={data} /> : null

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
