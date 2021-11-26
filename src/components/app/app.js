import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '../appHeader/appHeader'
import { SinglePage } from '../pages/singlePage'
import { Spinner } from '../spinner/spinner'
import { SingleComicPage } from '../pages/singleComicPage/singleComicPage'
import { SingleCharacterPage } from '../pages/singleCharacterPage/singleCharacterPage'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/mainPage'))
const ComicsPage = lazy(() => import('../pages/comicsPage'))

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataType='comic' />} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterPage} dataType='character' />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}
