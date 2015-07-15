import React from 'react';
import TalereStore from './../stores/TalereStore'

class Talkers extends React.Component {
    render() {
        var talker = this.props.talker;
        return (
            <li className='list-group-item talker'>
                <p className='number'>{talker.number}</p>
                <p className='name'>{TalereStore.getParticipant(talker.number)}</p>
            </li>
        );
    }
}

export default Talkers;