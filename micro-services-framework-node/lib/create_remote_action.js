const rp = require('request-promise');

module.exports = function createRemoteAction(actionConfig) {
    let serviceURL = "http://"+actionConfig.service;
    const envURL = process.env[actionConfig.service+"_url"];
    if (envURL) {
        serviceURL = envURL;
    }
    return {
        action: {
            action: async function(context, params) {
                return await rp({
                    method: 'POST',
                    uri: `${serviceURL}/internal/actions/${actionConfig.actionNameInService}`,
                    body: params,
                    json: true // Automatically stringifies the body to JSON
                });
            }    
        }
	};
}