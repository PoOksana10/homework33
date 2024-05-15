import {Component, useState} from 'react'
import SmileCard from '../SmileCard/SmileCard';
import './Voting.css';

export default class Voting extends Component {
    state = {
        candidates: [],
        isHidden: false,
        show: true,
    };

    componentDidMount() {
        fetch('http://localhost:3000/data.json')
            .then(result => result.json())
            .then(result => {
                const myCandidates = result.map(candidate => {
                    return {
                        ...candidate,
                        counter: 0,
                    };
                });
                this.setState({candidates: myCandidates})
            });
    }

    changeCounter = (id) => {
        this.setState(state => {
            const candidateIndex = state.candidates.findIndex(candidate => candidate.id == id);
            state.candidates[candidateIndex].counter++;
            return state;
        });
    }


    showResults = () => {
        this.setState({show: false, isHidden: true})
    }

    render() {
        return (
            <div className={'main'}>
                {!this.state.isHidden && (
                    <div className={'top-title'}>
                        <p>Do not pass by .... Give your vote... Get chance to win various
                           prizes!</p>
                        {!this.state.candidates.length && (<p>No candidates available</p>)}
                    </div>
                )}
                {!!this.state.candidates.length && (
                    <div className={'container card'}>
                        {this.state.candidates.map(candidate => (
                            <SmileCard
                                id={candidate.id}
                                name={candidate.name}
                                key={candidate.id}
                                counter={candidate.counter}
                                votingAction={this.changeCounter}
                                show={this.state.show}
                                description={candidate.description}
                            />
                        ))}
                    </div>
                )}
                {!this.state.isHidden && (
                    <p><input className={'results container'} type={'button'} value={'Results'}
                              onClick={this.showResults}/></p>
                )}
            </div>
        )
    }
}

