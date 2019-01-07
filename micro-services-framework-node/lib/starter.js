const fs = require("fs");
const Registry = require('./registry');

function loadActions(mainFolder) {
	const actions = fs.readdirSync(mainFolder + "/actions");
	const actionsMap = actions.map(action => {
		const actionName = action.split('.').slice(0, -1).join('.'); //remove the .js
		const actionObject = require(mainFolder + "/actions/" + action);
		return {name: actionName, action: actionObject}
	}).reduce((map, obj) => {
		map[obj.name] = {action: obj.action};
		return map;
	}, {});
	return actionsMap;
}

module.exports = function start(mainFolder) {
	const actionsMap = loadActions(mainFolder);
	return new Registry(actionsMap);
};
