import React from 'react';
import Talker from './Talker'

class Talkers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {talkers: []};
    }

    componentDidMount() {
        this.setState({
            talkers: [
                {name: 'Name', number: 1}
                , {name: 'Name', number: 2}
                , {name: 'Name', number: 3}
                , {name: 'Name', number: 4}
                , {name: 'Name', number: 5}
                , {name: 'Name', number: 6}
                , {name: 'Name', number: 7}
                , {name: 'Name', number: 8}
                , {name: 'Name', number: 9}
                , {name: 'Name', number: 10}
                , {name: 'Name', number: 110}
            ]
        });
    }

    render() {
        return (
            <ul className='list-group'>
                {this.state.talkers.map(talker => <Talker talker={talker}/>)}
            </ul>
        );
    }
}

export default Talkers;