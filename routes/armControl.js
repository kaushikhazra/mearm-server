const express = require("express");
const router = express.Router();

router.get("/register", (req, res, next) => {
    var armId = req.query.armId;

    sqlSelect = "SELECT arm_id as existingArmId FROM Arm WHERE arm_id = ?";
    sqlInsert = "INSERT INTO Arm (arm_id) VALUES (?)";

    global.db.all(sqlSelect, [armId], function(err, rows){
        if (!err) {
            if (rows.length == 0) {
                global.db.run(sqlInsert, [armId], function(err){
                    if (!err){
                        res.sendStatus(200);
                    } else {
                        console.log(err);
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(200);
            }
        } else {
            console.log(err);
            res.send(err);
        }
    });

});

router.get("/heartbeat", (req, res, next) => {
    var armId = req.query.armId;
    var currentTime = new Date().toString();

    sqlSelect = "SELECT arm_id as existingArmId FROM Arm WHERE arm_id = ?";
    sqlUpdate = "UPDATE Arm SET last_seen = ? WHERE arm_id = ?";

    global.db.all(sqlSelect, [armId], function(err, rows){
        if (!err) {
            if (rows.length > 0) {
                global.db.run(sqlUpdate, [currentTime, armId], function(err) {
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(400);
            }
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

module.exports = router;