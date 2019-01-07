const fs = require("fs");
const Registry = require('./registry');
const exposeAPI = require('./actions_api');
const createRemoteAction = require('./create_remote_action');

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

function addRemoteActions(mainFolder, actionsMap) {
	const remoteActionsConfig = require(mainFolder+"/config/remote_actions.json");
	remoteActionsConfig.actions.map(actionConfig => {
		actionsMap[actionConfig.name] = createRemoteAction(actionConfig);
	});
}

module.exports = function start(mainFolder) {
	const actionsMap = loadActions(mainFolder);
	addRemoteActions(mainFolder, actionsMap);
	const registry = new Registry(actionsMap);
	exposeAPI(registry, process.env.PORT);
	return registry;
};
