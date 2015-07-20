import AppDispatcher from './../AppDispatcher';
import Store from './Store';
import Constants from './../Constants';

let _talere = [];
let _deltagere = {};

class TalereStore extends Store {
    constructor() {
        super('talerechange');
    }

    getTalere() {
        return _talere;
    }

    getDeltager(number) {
        return _deltagere[number];
    }

}

let _TalereStore = new TalereStore();


const ActionHandlers = {};
ActionHandlers[Constants.HENTING_OK] = (action) => {
    _talere = action.data;
    _TalereStore.emitChange();
};
ActionHandlers[Constants.HENTING_DELTAGERE_OK] = (action) => {
    _deltagere = action.data;
    _TalereStore.emitChange();
};
ActionHandlers[Constants.NY_TALER] = (action) => {
    _talere.push(action.data);
    _TalereStore.emitChange();
};

AppDispatcher.register(function (action) {
    var callback = ActionHandlers[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _TalereStore;