const { CuttingPlanController } = require("../controllers/cuttingPlan");

const router = require("express").Router();

router.post("/generate-cutting-plan", CuttingPlanController);
router.get("/", (req, res) => res.send("Please provide valid url"));
module.exports = { router };
