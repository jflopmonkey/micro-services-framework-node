module.exports = {
	action: async function(context, params) {
		console.log("Called action Toto: "+JSON.stringify(params));
		
		return {toto: "done"};
	}
};



