const s = require('micro-services-framework-node');
const reg = s.start(__dirname);

const makeCoffie = reg.requireAction("MakeCoffie");

async function main() {
    try {
	    const result = await makeCoffie({a:1});
	    console.log(result.context.getExecutionTree());
    } catch (err) {
    	// console.log("finish: "+ JSON.stringify(err.executionContext.getExecutionTree(), null, 2));
    	console.log(err);
    }
    // console.log(JSON.stringify(makeCoffie.getContext().getExecutionTree(), null, 2));
}

main();
