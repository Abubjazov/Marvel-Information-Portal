import { Helmet } from 'react-helmet'

import { AppBanner } from '../appBanner/appBanner'
import { ComicsList } from '../comicsList/comicsList'
import { ErrorBoundary } from '../errorBoundary/errorBoundary'

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage
