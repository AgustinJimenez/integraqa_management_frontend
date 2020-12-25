import './index.scss'
import Document from 'next/document'
import Button from 'react-bootstrap/Button'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class GoTop extends Document {
    state = {
        intervalId: 0,
        thePosition: false,
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 170) {
                this.setState({ thePosition: true })
            } else {
                this.setState({ thePosition: false })
            }
        })
        window.scrollTo(0, 0)
    }

    onScrollStep = _ => {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId)
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
    }

    scrollToTop = _ => {
        let intervalId = setInterval(this.onScrollStep, this.props.delayInMs)
        this.setState({ intervalId: intervalId })
    }

    renderGoTopIcon = _ => {
        if (this.state.thePosition) {
            return (
                <Button className='go-top' onClick={this.scrollToTop}>
                    <FontAwesomeIcon icon={faChevronUp} className='about-icon' />
                </Button>
            )
        }
    }

    render() {
        return <React.Fragment>{this.renderGoTopIcon()}</React.Fragment>
    }
}

export default GoTop
