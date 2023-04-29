const { generatePlan } = require("../models/cuttingPlan");

const CuttingPlanController = (req, res) => {
  try {
    const { rollLength, rollWidth, patterns } = req.body;
    const { cuttingPlan } = generatePlan({
      rollLength,
      rollWidth,
      patterns,
    });
    res.status(201).json({ cuttingPlan });
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = { CuttingPlanController };
