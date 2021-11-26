import { CharInfoSkeleton } from "../components/charInfoSkeleton/charInfoSkeleton"
import { ErrorMsg } from "../components/errorMsg/errorMsg"
import { Spinner } from "../components/spinner/spinner"

export const setContent = (status, Component, data) => {
    switch (status) {
        case 'waiting':
            return <CharInfoSkeleton />

        case 'loading':
            return <Spinner />

        case 'confirmed':
            return <Component data={data} />

        case 'error':
            return <ErrorMsg />

        default:
            throw new Error('Unexpected process state!')
    }
}
