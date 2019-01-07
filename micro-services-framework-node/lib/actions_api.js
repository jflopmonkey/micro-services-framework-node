
module.exports = function exposeAPI(registry, port = 3000) {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json()); // for parsing application/json

    app.post('/internal/actions/:action', function (req, res, next) {
        const action = registry.requireAction(req.params.action);
        action(req.body).then(result => {
            res.json(result.result);
        }).catch(err => {
            res.send("Internal server error");
            console.error(err);
        });        
    });
    app.listen(port, function() {
        console.log("listening...");
    });
};