import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '../appHeader/appHeader'
import { MainPage } from '../pages/mainPage'
import { ComicsPage } from '../pages/comicsPage'

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
