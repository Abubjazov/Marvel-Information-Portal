import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '../appHeader/appHeader'
import { MainPage, ComicsPage } from '../pages'

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
