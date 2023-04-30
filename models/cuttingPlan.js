function generatePlan({
    maxGarments,
    minGarments,
    maxMarkers,
    minMarkers,
    cutOrder = [
      { size: 38, style: "A", quantity: 54 },
      { size: 40, style: "A", quantity: 84 },
      { size: 42, style: "A", quantity: 91 },
      { size: 44, style: "B", quantity: 60 },
      { size: 46, style: "B", quantity: 29 },
    ],
  }) {
    // Define the fabric width and length in inches
    // const fabricWidth = 60;
    // const fabricLength = 120;
  
    // Define the maximum and minimum number of garments and sizes that can be allocated for a marker
    const gmx = maxGarments;
    const gmin = minGarments;
    const dmax = maxMarkers;
    // const dmin = minMarkers;
  
    // Initialize the cut plan as an empty array of markers
    const cutPlan = [];
  
    // Initialize the remaining demand for each size and style to the quantities in the cut order
    const demands = {};
    for (const { size, style, quantity } of cutOrder) {
      demands[`${size}${style}`] = quantity;
    }
  
    for (const { size } of cutOrder) {
      let sizeDemand = cutOrder.reduce(
        (acc, { size: s, quantity }) => (s === size ? acc + quantity : acc),
        0
      );
  
      for (const { style } of cutOrder) {
        const sizeDemandKey = `${size}${style}`;
        let sizePieces = demands[sizeDemandKey];
  
        while (sizePieces > 0) {
          const marker = { size, style, pieces: [] };
  
          let garments = Math.min(gmx, sizePieces);
  
          if (sizePieces <= gmx * dmax && garments < gmin) {
            garments = gmin;
          }
  
          for (const { size: s, style: d } of cutOrder) {
            if (s === size && d === style) {
              continue;
            }
  
            const remainingDemandKey = `${s}${d}`;
            const remainingDemand = demands[remainingDemandKey];
            if (remainingDemand === 0) {
              continue;
            }
  
            let maxGarments = Math.min(gmx, garments, remainingDemand);
  
            let maxSizes = Math.min(
              dmax,
              Math.ceil((maxGarments * dmax) / garments),
              Math.ceil(remainingDemand / dmax)
            );
  
            if (sizePieces <= gmx * dmax && maxGarments < gmin) {
              maxGarments = gmin;
              maxSizes = 1;
            }
  
            const pieces = Math.min(maxGarments * maxSizes, remainingDemand);
  
            for (let i = 0; i < pieces; i++) {
              marker.pieces.push({ size: s, style: d });
            }
  
            demands[remainingDemandKey] -= pieces;
  
            sizePieces -= pieces;
            garments -= Math.floor((pieces - 1) / maxSizes) + 1;
          }
  
          cutPlan.push(marker);
        }
      }
    }
  
    return { cuttingPlan: cutPlan };
  }
  
  module.exports = { generatePlan };  