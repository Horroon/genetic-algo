function generatePlan({ rollWidth, rollLength, patterns = [] }) {

  // Sort the patterns by size, with the largest patterns first
  patterns.sort((a, b) => b.width * b.length - a.width * a.length);

  // Create an empty cutting plan
  const cuttingPlan = [];

  // Loop through each pattern
  for (const pattern of patterns) {
    // Calculate the number of times the pattern can be cut from the roll of fabric
    const widthCount = Math.floor(rollWidth / pattern.width);
    const lengthCount = Math.floor(rollLength / pattern.length);
    const totalCount = widthCount * lengthCount * pattern.quantity;

    // If the pattern cannot be cut from the roll of fabric, skip it
    if (totalCount === 0) {
      continue;
    }

    // Add the pattern to the cutting plan
    cuttingPlan.push({
      name: pattern.name,
      width: pattern.width,
      length: pattern.length,
      quantity: totalCount,
    });

    // Reduce the size of the roll of fabric based on the number of times the pattern was cut
    rollWidth -= widthCount * pattern.width;
    rollLength -= lengthCount * pattern.length;
  }

  // Print the cutting plan to the console
  return { cuttingPlan };
}

module.exports = { generatePlan };
