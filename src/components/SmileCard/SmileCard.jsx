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

    render() {
        return (
            <div className={'smileCard'}>
                <img src={this.props.name} alt={'smile'}/>
                {this.props.show && (
                    <p className={'description'}>{this.props.description} <br/><br/><br/>
                        <input className={'vote-button'} type="button" value={this.state.btnValue}
                               onClick={this.handleVote}/></p>
                )}
                {!this.props.show && (
                    <p className={'results-data'}>
                        Number of Voices : {this.props.counter}
                    </p>
                )}
            </div>
        )
    }
}

SmileCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    counter: PropTypes.number,
    votingAction: PropTypes.func,
    show: PropTypes.bool
}