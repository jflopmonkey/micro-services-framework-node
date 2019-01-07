module.exports = {
	action: async function(context, params) {
		console.log("Called action make coffie: "+JSON.stringify(params));
		const boilWater = context.requireAction("BoilWater");
		await boilWater({a:22});
		return {stat: "ok"};
	}
};



