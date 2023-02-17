const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  
    var sqlSelect = "SELECT arm_id AS armId, " + 
    "                       last_seen AS lastSeen, " + 
    "                       base_angle AS baseAngle, " + 
    "                       extender_angle AS extenderAngle, " + 
    "                       lift_angle AS liftAngle, " + 
    "                       claw_angle AS classAngle " + 
    "               FROM Arm ";
    
    var arms = [];

    global.db.all(sqlSelect, function(err, rows){
        if (!err) {
            res.render("armData", { 
                arms : rows
            });
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

module.exports = router;