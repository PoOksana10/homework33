import {Component, useState} from 'react'
import SmileCard from '../SmileCard/SmileCard';
import './Voting.css';
import {number} from "prop-types";

export default class Voting extends Component {
    state = {
        candidates: [],
        isHidden: false,
        show: true,
        winnerEmoji: {},
    };

    componentDidMount() {
        fetch('http://localhost:3000/data.json')
            .then(result => result.json())
            .then(result => {
                const myCandidates = result.map(candidate => {
                    return {
                        ...candidate, counter: 0,
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
        let maxVoices = 0
        let winnerEmojiFound = {}
        this.state.candidates.forEach(candidate => {
            if (candidate.counter > maxVoices) {
                maxVoices = candidate.counter;
                winnerEmojiFound = {
                    'name': candidate.name,
                    'id': candidate.id,
                    'url': candidate.url,
                    'counter': candidate.counter,
                    'description': candidate.description,
                };
            }
        })
        this.setState({show: false, isHidden: true, winnerEmoji: winnerEmojiFound})
    }

    render() {
        return (<div className={'main'}>
                {!this.state.candidates.length && (<p>No candidates available</p>)}

                {!this.state.isHidden && !!this.state.candidates.length && (<div className={'top-title'}>
                    <p>Do not pass by .... Give your vote... Get chance to win various
                       prizes!</p>
                </div>) && (<div className={'container card'}>
                    {this.state.candidates.map(candidate => (<SmileCard
                        id={candidate.id}
                        url={candidate.url}
                        key={candidate.id}
                        counter={candidate.counter}
                        votingAction={this.changeCounter}
                        show={this.state.show}
                        description={candidate.description}
                        winner={this.state.winnerEmoji}
                    />))}
                </div>)}
                {!this.state.isHidden && (<p><input className={'results container'} type={'button'} value={'Results'}
                                                    onClick={this.showResults}/></p>
                )}
                {this.state.isHidden && (
                    <SmileCard
                        id={this.state.winnerEmoji.id}
                        url={this.state.winnerEmoji.url}
                        key={this.state.winnerEmoji.id}
                        counter={this.state.winnerEmoji.counter}
                        show={this.state.show}
                        description={this.state.winnerEmoji.description}
                        winner={this.state.winnerEmoji.name}
                    />
                )}
            </div>

        )
    }
}

