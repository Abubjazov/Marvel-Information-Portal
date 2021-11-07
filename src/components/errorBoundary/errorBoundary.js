import { Component } from 'react'
import { ErrorMsg } from '../errorMsg/errorMsg'

export class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) { //обновляем состояние state
    //     return {error: true}
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error)
        console.log(errorInfo)

        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) return <ErrorMsg />

        return this.props.children
    }
}
