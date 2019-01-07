const s = require('micro-services-framework-node');
const reg = s.start(__dirname);

const makeCoffie = reg.requireAction("MakeCoffie");

async function main() {
    const result = await makeCoffie({a:1});
    console.log(result.result)
    // console.log(JSON.stringify(makeCoffie.getContext().getExecutionTree(), null, 2));
}

main();
