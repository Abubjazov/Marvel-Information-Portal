import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { AppBanner } from '../appBanner/appBanner'
import { setContent } from '../../utils/setContent'

import useMarvelService from '../../services/MarvelService'

export const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const { status, setStatus, getComic, getCharacter, error, clearError } = useMarvelService()

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError()

        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setStatus('confirmed'))
                break
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setStatus('confirmed'))
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    return (
        <>
            <AppBanner />
            {setContent(status, Component, data)}
        </>
    )
}
