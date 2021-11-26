import { Helmet } from 'react-helmet'

import { ErrorMsg } from "../errorMsg/errorMsg"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Sorry, the page was not found"
                />
                <title>Page 404</title>
            </Helmet>
            <ErrorMsg />
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24' }}>Page doesn't exist</p>
            <Link to='/' style={{ display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24', marginTop: '30', color: '#9f0013' }}>Back to main page</Link>
        </>
    )
}

export default Page404
