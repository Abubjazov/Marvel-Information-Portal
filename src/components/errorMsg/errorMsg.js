import gif from './error.gif'

export const ErrorMsg = () => {
    return (
        <img style={{display: "block", width: "250px", height: "250px", objectFit: "contain", margin: "0 auto"}} src={gif} alt="An error has occurred" />
    )
}
