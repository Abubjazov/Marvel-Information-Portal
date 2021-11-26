import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '../appHeader/appHeader'
import { SinglePage } from '../pages/singlePage'
import { Spinner } from '../spinner/spinner'

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
                            <Route path="/comics/:id" element={<SinglePage dataType='comic' />} />
                            <Route path="/characters/:id" element={<SinglePage dataType='character' />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}
