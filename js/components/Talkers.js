import React from 'react';
import Talker from './Talker'

class Talkers extends React.Component {
    render() {
        return (
            <ul className='list-group'>
                {this.props.talere.map(talker => <Talker talker={talker}/>)}
            </ul>
        );
    }
}

export default Talkers;