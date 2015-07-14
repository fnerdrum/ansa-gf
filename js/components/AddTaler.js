import React from "react";

class AddTaler extends React.Component {
    render() {
        return (
            <form className="legg-til">
                <label htmlFor="legg-til" className="sr-only">Legg til ny</label>
                <input id="legg-til" type="text" className="form-control" placeholder="Legg til ny..."/>
            </form>
        )

    }
}

export default AddTaler;