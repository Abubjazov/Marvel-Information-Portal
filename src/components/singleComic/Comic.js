import './Comic.scss'

import xMen from '../../resources/img/x-men.png'

export const Comic = () => {
    return (
        <div className="comic">
            <img src={xMen} alt="Comic book cover" className="comic__img"/>
            <div className="comic__info">
                <h2 className="comic__name">X-Men: Days of Future Past</h2>
                <p className="comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="comic__descr">144 pages</p>
                <p className="comic__descr">Language: en-us</p>
                <div className="comic__price">9.99$</div>
            </div>
            <a href="#" className="comic__back">Back to all</a>
        </div>
    )
}
