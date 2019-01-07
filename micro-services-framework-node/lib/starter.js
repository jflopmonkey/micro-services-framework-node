const fs = require("fs");
const Registry = require('./registry');

module.exports = function (mainFolder) {
    const actions = fs.readdirSync(mainFolder+"/actions");
    const actionsMap = actions.map(action => {
        const actionName = action.split('.').slice(0, -1).join('.'); //remove the .js
        const actionObject = require(mainFolder+"/actions/"+action);
        return {name: actionName, action: actionObject}
    }).reduce((map, obj) => {
        map[obj.name] = {action: obj.action};
        return map;
    }, {});
    return new Registry(actionsMap);
}