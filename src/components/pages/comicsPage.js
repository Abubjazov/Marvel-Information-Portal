import { useState } from 'react'
import { AppBanner } from '../appBanner/appBanner'
import { ComicsList } from '../comicsList/comicsList'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

export const ComicsPage = () => {
    const [selectedComic, setSelectedComic] = useState(null)
    const onComicSelected = (id) => setSelectedComic(id)

    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList onComicSelected={onComicSelected} />
            </ErrorBoundary>
        </>
    )
}
