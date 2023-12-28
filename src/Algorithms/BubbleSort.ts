const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const bubbleSort = (
  arr: number[],
  steps: { type: string; indexes: number[] }[]
) => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      steps.push({ type: "COMPARE", indexes: [j, j + 1] });

      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        steps.push({ type: "SWAP", indexes: [j, j + 1] });
      }
    }
  }
};

export const bubbleSortSteps = (arr: number[]) => {
  let steps: { type: string; indexes: number[] }[] = [];
  bubbleSort(arr, steps);
  return steps;
};
