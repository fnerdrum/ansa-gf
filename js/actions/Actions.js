import AppDispatcher from './../AppDispatcher.js';
import Constants from './../Constants.js';
import agent from 'superagent';

let Actions = {
    getAll: () => {
        agent
            .get('/services/talere')
            .end((err, res) => {
                if (err) {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_FEILET,
                        data: null
                    });
                } else {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_OK,
                        data: res.body
                    });
                }
            })
    },

    add: (input) => {
        const split = input.split(" ");
        const taler = {
            type: split[0],
            number: parseInt(split[1]),

        };
        if (taler.type && taler.number) {
            agent
            .post('/services/talere')
            .send(taler)
            .end((err) => {
                    if (err) {
                        AppDispatcher.dispatch({
                            actionType: Constants.OPPDATERING_FEILET,
                            data: null
                        });
                    } else {
                        AppDispatcher.dispatch({
                            actionType: Constants.OPPDATERING_OK,
                            data: null
                        });
                    }
                });
        } else {
            AppDispatcher.dispatch({
                actionType: Constants.UGYLDIG_INPUT,
                data: null
            });
        }
    }

};

export default Actions;