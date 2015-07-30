import AppDispatcher from './../AppDispatcher.js';
import Constants from './../Constants.js';
import agent from 'superagent';

let Actions = {
    getDeltagere: (id) => {
        agent
            .get('/services/' + id + '/deltagere')
            .end((err, res) => {
                if (err) {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_DELTAGERE_FEILET,
                        data: null
                    });
                } else {
                    AppDispatcher.dispatch({
                        actionType: Constants.HENTING_DELTAGERE_OK,
                        data: res.body
                    });
                }
            })
    },

    getTalere: (id) => {
        agent
            .get('/services/' + id + '/talere')
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

    addTaler: (id, taler) => {
        agent
            .post('/services/' + id + '/talere')
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
    },

    endreTaler: (id, taler) => {
        agent
            .put('/services/' + id + '/talere')
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
    },

    nyTaler: (taler) => {
        AppDispatcher.dispatch({
            actionType: Constants.NY_TALER,
            data: taler
        });
    },

    fjernTaler: (id, taler) => {
        agent
            .del('/services/' + id + '/talere/' + taler.id)
            .end(function (err) {
                if (err) throw err;
            });
    },

    talerFjernet: (id) => {
        AppDispatcher.dispatch({
            actionType: Constants.FJERN_TALER,
            data: id
        });
    },

    talerEndret: (taler) => {
        AppDispatcher.dispatch({
            actionType: Constants.TALER_ENDRET,
            data: taler
        });
    }

};

const gyldigType = (type) => ['I', 'R'].some((t) => t === type);

export default Actions;