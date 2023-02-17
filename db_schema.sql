PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS Arm (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    arm_id TEXT NOT NULL,
    last_seen TEXT,
    base_angle INTEGER,
    extender_angle INTEGER,
    lift_angle INTEGER,
    claw_angle INTEGER
);

COMMIT;

