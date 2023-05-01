function fabricCuttingPlan({
  fabricWidth,
  fabricHeight,
  pieces,
  populationSize = 10,
  maxIterations = 100,
  mutationProbability = 0.1,
  tournamentSize = 3,
}) {
    
  // Create the initial population
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    let pattern = [];
    let remainingFabric = { width: fabricWidth, height: fabricHeight };
    let availablePieces = [...pieces]; // make a copy of the original pieces array
    while (availablePieces.length > 0) {
      let pieceIndex = Math.floor(Math.random() * availablePieces.length);
      let piece = availablePieces[pieceIndex];
      if (
        piece.width <= remainingFabric.width &&
        piece.height <= remainingFabric.height
      ) {
        pattern.push(piece);
        remainingFabric.width -= piece.width;
        remainingFabric.height -= piece.height;
      }
      availablePieces.splice(pieceIndex, 1); // remove the selected piece from the available pieces
    }
    population.push(pattern);
  }

  // Evaluate the fitness
  function evaluateFitness(pattern) {
    let totalArea = fabricWidth * fabricHeight;
    let usedArea = pattern.reduce(
      (acc, piece) => acc + piece.width * piece.height,
      0
    );
    let wastedArea = totalArea - usedArea;
    return wastedArea;
  }
  population = population.map((pattern) => ({
    pattern,
    fitness: evaluateFitness(pattern),
  }));

  // Genetic algorithm loop
  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    // Select parents
    function tournamentSelection(population, tournamentSize) {
      let candidates = [];
      for (let i = 0; i < tournamentSize; i++) {
        let index = Math.floor(Math.random() * population.length);
        candidates.push(population[index]);
      }
      candidates.sort((a, b) => a.fitness - b.fitness);
      return candidates[0].pattern;
    }
    const parent1 = tournamentSelection(population, tournamentSize);
    const parent2 = tournamentSelection(population, tournamentSize);

    // Crossover
    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    let child = [
      ...parent1.slice(0, crossoverPoint),
      ...parent2.slice(crossoverPoint),
    ];

    // Mutation
    function randomMutation(pattern) {
      let mutatedPattern = [...pattern];
      let index1 = Math.floor(Math.random() * mutatedPattern.length);
      let index2 = Math.floor(Math.random() * mutatedPattern.length);
      [mutatedPattern[index1], mutatedPattern[index2]] = [
        mutatedPattern[index2],
        mutatedPattern[index1],
      ];
      return mutatedPattern;
    }
    if (Math.random() < mutationProbability) {
      child = randomMutation(child);
    }
    // Evaluate fitness
    const childFitness = evaluateFitness(child);

    // Replace the least fit individual
    population.sort((a, b) => b.fitness - a.fitness);
    if (childFitness < population[populationSize - 1].fitness) {
      population[populationSize - 1] = {
        pattern: child,
        fitness: childFitness,
      };
    }
  }

  // Return the best cutting pattern found
  population.sort((a, b) => a.fitness - b.fitness);
  return {
    pattern: population[0].pattern,
    waste: population[0].fitness,
  };
}

module.exports = { fabricCuttingPlan };
