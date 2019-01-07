const ExecutionContext = require('./execution_context');
module.exports = class Registry {
    constructor(actionsMap) {
        this.actionsMap = actionsMap;
    }

    getAction(actionName) {
        return this.actionsMap[actionName].action;
    }

    requireAction(actionName) {
        return new ExecutionContext(this).requireAction(actionName);
    }
}
