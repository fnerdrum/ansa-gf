import AppDispatcher from './../AppDispatcher';
import Store from './Store';
import Constants from './../Constants';

let _talere = [];

class TalereStore extends Store {
    constructor() {
        super('talerechange');
    }

    getAll() {
        return _talere;
    }

}

let _TalereStore = new TalereStore();


const ActionHandlers = {};
ActionHandlers[Constants.HENTING_OK] = (action) => {
    _talere = action.data;
    _TalereStore.emitChange();
};

AppDispatcher.register(function (action) {
    var callback = ActionHandlers[action.actionType];

    if (typeof callback === 'function') {
        callback(action)
    }
});

export default _TalereStore;