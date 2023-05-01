const { fabricCuttingPlan } = require("../models/cuttingPlan");

const CuttingPlanController = (req, res) => {
  try {
    const resp = fabricCuttingPlan({ ...req.body });
    res.status(201).json(resp);
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = { CuttingPlanController };
