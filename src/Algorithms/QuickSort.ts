function partition(
  arr: number[],
  low: number,
  high: number,
  steps: { type: string; indexes: number[] }[]
): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    steps.push({ type: "COMPARE", indexes: [j, high] });

    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push({ type: "SWAP", indexes: [i, j] });
      steps.push({ type: "DONE", indexes: [i, j] });
    }

    steps.push({ type: "DONE", indexes: [j, high] });
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  steps.push({ type: "SWAP", indexes: [i + 1, high] });
  steps.push({ type: "DONE", indexes: [i + 1, high] });

  return i + 1;
}

export function quickSortSteps(
  arr: number[],
  low: number,
  high: number,
  steps: { type: string; indexes: number[] }[] = []
) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, steps);
    quickSortSteps(arr, low, pivotIndex - 1, steps);
    quickSortSteps(arr, pivotIndex + 1, high, steps);
  }
  return steps;
}
