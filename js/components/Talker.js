import React from 'react';

class Talkers extends React.Component {
    render() {
        var talker = this.props.talker;
        return (
            <li className='list-group-item talker'>
                <p className='number'>{talker.number}</p>
                <p className='name'>{talker.name}</p>
            </li>
        );
    }
}

export default Talkers;