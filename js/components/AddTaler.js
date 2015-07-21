import React from 'react';
import Actions from './../actions/Actions'
import TalereStore from './../stores/TalereStore'

class AddTaler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.setState = this.setState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        Actions.addTaler(this.state.value, TalereStore.getGjeldendeInnlegg());
        this.setState({value: ''});
    }

    render() {
        return (
            <form className="legg-til" onSubmit={this.onSubmit}>
                <label htmlFor="legg-til" className="sr-only">Legg til ny</label>
                <input
                    id="legg-til"
                    className="form-control"
                    type="text"
                    autoComplete="off"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Legg til ny..."/>
            </form>
        )

    }
}

export default AddTaler;