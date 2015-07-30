import React from 'react';
import _ from 'lodash';
import Actions from './../actions/Actions'
import TalereStore from './../stores/TalereStore'

class EndreTaler extends React.Component {
    constructor(props) {
        super(props);
        var taler = this.props.taler;
        this.state = {
            value: taler.type + ' ' + taler.number,
            type: taler.type,
            nummer: taler.number,
            hasSubmitted: false,
            valid: true
        };
        this.setState = this.setState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        var value = event.target.value;
        this.setState({value: value});
        var match = matchValue(value);
        if (_.isEmpty(value)) {
            this.setState({
                type: '',
                nummer: '',
                valid: true
            });
        } else if (match) {
            this.setState({
                type: match[1].toUpperCase(),
                nummer: match[2],
                valid: true
            })
        } else {
            this.setState({valid: false});
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({hasSubmitted: true});
        if (this.state.valid) {
            let taler = this.props.taler;
            taler.type = this.state.type;
            taler.number = this.state.nummer;
            Actions.endreTaler(this.props.id, taler);
            this.props.onSubmit();
        }
    }

    render() {
        const inputClass = 'form-control ' + (this.state.valid || !this.state.hasSubmitted ? 'valid' : 'error');
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    id="legg-til"
                    className={inputClass}
                    type="text"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={this.state.value}/>
            </form>
        )

    }
}

const matchValue = (value) => value.match(/^\s*([IR])\s+(\d+)\s*$/i);

export default EndreTaler;