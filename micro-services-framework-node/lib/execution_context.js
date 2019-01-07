module.exports = class ExecutionContext {
    constructor(registry) {
        this.registry = registry;
        this.subContexts = [];
    }

    requireAction(actionName) {
        const action = this.registry.getAction(actionName);
        const actionFunc = async (params) => {
            const subContext = new ExecutionContext(this.registry);
            subContext.actionName = actionName;
            actionFunc.getContext = function() {
                return subContext; 
            }
            this.subContexts.push(subContext);
            subContext.startTime = new Date().getTime();
            const result =  await action.action(subContext, params);
            subContext.endTime = new Date().getTime();
            subContext.duration = subContext.endTime - subContext.startTime;
            return result;
        }
        return actionFunc;
    }

    getExecutionTree(node) {
        let firstCall = false;
        if (! node) {
            firstCall = true;
            node = {subActions:[]};
        }
        const actionNode = { actionName: this.actionName, startTime: this.startTime, endTime: this.endTime, duration: this.duration, subActions: []};
        node.subActions.push(actionNode);
        this.subContexts.forEach(subContext => {
            subContext.getExecutionTree(actionNode);
        });

        if (firstCall){
            return node.subActions[0];
        }
    }
}