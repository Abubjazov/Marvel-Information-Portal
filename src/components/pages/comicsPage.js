import { useState } from 'react'
import { AppBanner } from '../appBanner/appBanner'
import { ComicsList } from '../comicsList/comicsList'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

export const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}
