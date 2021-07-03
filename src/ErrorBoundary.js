import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({
            hasError: true
        })
    }
    render() {
        if (this.state.hasError) {
            return (
                <section className="errorBoundarySection">
                    <div className="errorBoundary flexCentered">
                        <div className="contentWrapper textCenter">
                            {/* <img src={imageBasePath + 'oops.jpg'} /> */}
                            <h3 className="heading3">Oops..! Something went wrong.</h3>
                            <p className="paragraph">An error occurred. Please try again later.</p>
                            <a href="/" onClick={() => this.setState({ hasError: false })} className="primaryBtn">Return to Home</a>
                        </div>
                    </div>
                </section>
            )
        } else {
            return this.props.children;
        }
    }
}
export default ErrorBoundary