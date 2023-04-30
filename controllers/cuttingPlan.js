const { generatePlan } = require("../models/cuttingPlan");

const CuttingPlanController = (req, res) => {
  try {
    const { cuttingPlan } = generatePlan({...req.body});
    res.status(201).json({ cuttingPlan });
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = { CuttingPlanController };
