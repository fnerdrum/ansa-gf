import React from 'react';
import _ from 'lodash';
import Actions from './../actions/Actions'
import TalereStore from './../stores/TalereStore'

class AddTaler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            type: '',
            nummer: '',
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
            const gjeldendeInnlegg = TalereStore.getGjeldendeInnlegg();
            const taler = {
                type: this.state.type,
                number: this.state.nummer,
                parent: this.state.type === 'R' && gjeldendeInnlegg ? gjeldendeInnlegg.id : null,
            };
            Actions.addTaler(this.props.id, taler);
            this.setState({value: '', hasSubmitted: false});
        }
    }

    render() {
        const inputClass = 'form-control ' + (this.state.valid || !this.state.hasSubmitted ? 'valid' : 'error');
        return (
            <form className="legg-til" onSubmit={this.onSubmit}>
                <label htmlFor="legg-til" className="sr-only">Legg til ny</label>
                <input
                    id="legg-til"
                    className={inputClass}
                    type="text"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={this.state.value}
                    placeholder="Legg til ny..."/>
            </form>
        )

    }
}

const matchValue = (value) => value.match(/^\s*([IR])\s+(\d+)\s*$/i);

export default AddTaler;