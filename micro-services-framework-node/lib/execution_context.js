const getTrace = require('./stackTraceDiscovery');

module.exports = class ExecutionContext {
	constructor(registry) {
		this.registry = registry;
		this.execTreeNode = {
			actionName: null,
			startTime: null,
			endTime: null,
			duration: null,
			subNodes: []
		}
	}
	
	requireAction(actionName) {
		const action = this.registry.getAction(actionName);
		const actionFunc = async (params) => {
			const trace = getTrace(actionFunc);
			
			const subContext = new ExecutionContext(this.registry);
			this.execTreeNode.subNodes.push(subContext.execTreeNode);
			subContext.execTreeNode.actionName = actionName;
			subContext.execTreeNode.trace = trace;
			subContext.execTreeNode.startTime = new Date().getTime();
			let result;
			try {
				result = await action.action(subContext, params);
				subContext.execTreeNode.success = true;
			} catch (err) {
				subContext.execTreeNode.success = false;
				subContext.execTreeNode.error = err.stack;
			}
			subContext.execTreeNode.endTime = new Date().getTime();
			subContext.execTreeNode.duration = subContext.execTreeNode.endTime - subContext.execTreeNode.startTime;
			if (! subContext.execTreeNode.success ) {
				const err = new Error("Action execution error");
				err.stack = "Error: Action execution error\n\t"+trace;
				err.stack += "\nCaused by: " +  subContext.execTreeNode.error;
				err.executionContext = subContext;
				err.reason = subContext.execTreeNode.error;
				throw err;
			}
			return {result, context: subContext};
		};
		return actionFunc;
	}
	
	getExecutionTree() {
		return this.execTreeNode;
	}
}
