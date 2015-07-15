import React from 'react';
import TalereStore from './../stores/TalereStore'

class Talkers extends React.Component {
    render() {
        var talker = this.props.talker;
        var className = 'list-group-item talker ' + getTypeNavn(talker.type);
        return (
            <li className={className}>
                <p className='number'>{talker.number}</p>

                <p className='name'>{TalereStore.getParticipant(talker.number)}</p>
            </li>
        );
    }
}

const getTypeNavn = (type) => {
    switch (type) {
        case 'I':
            return 'innlegg';
        case 'R':
            return 'replikk';
        default :
            return 'ukjent';
    }
};

export default Talkers;