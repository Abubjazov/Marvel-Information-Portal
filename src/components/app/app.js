import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '../appHeader/appHeader'
import { MainPage, ComicsPage, Page404 } from '../pages'

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
