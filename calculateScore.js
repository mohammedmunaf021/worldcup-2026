export function calculateScore(prediction, actual) {
  let score = 0;

  if (!prediction) return 0;

  Object.keys(actual.groups || {}).forEach((group) => {
    const pred = prediction.groups?.[group];
    const real = actual.groups?.[group];

    if (!pred || !real) return;

    if (pred.p1 === real.p1) score += 3;
    if (pred.p2 === real.p2) score += 3;
  });

  actual.r32?.forEach((winner, i) => {
    if (prediction.knockout?.r32?.[i] === winner)
      score += 5;
  });

  actual.r16?.forEach((winner, i) => {
    if (prediction.knockout?.r16?.[i] === winner)
      score += 8;
  });

  actual.qf?.forEach((winner, i) => {
    if (prediction.knockout?.qf?.[i] === winner)
      score += 12;
  });

  actual.sf?.forEach((winner, i) => {
    if (prediction.knockout?.sf?.[i] === winner)
      score += 18;
  });

  if (
    actual.champion &&
    prediction.knockout?.champion === actual.champion
  ) {
    score += 50;
  }

  return score;
}