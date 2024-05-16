import {Component} from 'react'
import PropTypes from 'prop-types';
import './SmileCard.css'

export default class SmileCard extends Component {
    state = {
        btnValue: 'Vote'
    }
    handleVote = () => {
        this.props.votingAction(this.props.id);
        this.setState({btnValue: 'Voted'})
        setTimeout(() => {
            this.setState({btnValue: 'Vote'})
        }, 3000)
    }

    back = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className={'smileCard'}>
                {!this.props.winner && (
                    <p className={'results-data'}>
                        There is NO Winner Yet! Please vote and come back!
                        <p><input className={'back-btn'} type={"button"} value={'Back to Voting'} onClick={this.back}/></p>
                    </p>
                )}
                {!this.props.show && this.props.winner && (
                    <p className={'results-data'}>
                        The Winner is {this.props.winner} with Number of Voices : {this.props.counter}!
                    </p>
                )}
                {this.props.winner && (<img src={this.props.url} alt={this.props.winner}/>)}
                {this.props.show && (
                    <p className={'description'}>{this.props.description} <br/><br/><br/>
                        <input className={'vote-button'} type="button" value={this.state.btnValue}
                               onClick={this.handleVote}/></p>)}

            </div>)
    }
}

SmileCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    counter: PropTypes.number.isRequired,
    votingAction: PropTypes.func,
    show: PropTypes.bool.isRequired
}