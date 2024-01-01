const sort = (
  arr: number[],
  newArr: number[],
  high: number,
  low: number,
  steps: { type: string; indexes: number[] }[]
) => {
  if (low <= high) return;
  const mid = Math.floor(high + (low - high) / 2);
  sort(arr, newArr, high, mid, steps);
  sort(arr, newArr, mid + 1, low, steps);
  merge(arr, newArr, high, mid, low, steps);
};

const merge = (
  arr: number[],
  newArr: number[],
  high: number,
  mid: number,
  low: number,
  steps: { type: string; indexes: number[] }[]
) => {
  for (let k = high; k <= low; k++) {
    newArr[k] = arr[k];
  }
  let i = high,
    j = mid + 1;

  steps.push({ type: "COMPARE", indexes: [i, j] });

  for (let k = high; k <= low; k++) {
    if (i > mid || (j <= low && newArr[j] < newArr[i])) {
      steps.push({ type: "SWAP", indexes: [k, newArr[j]] });
      arr[k] = newArr[j++];
    } else {
      steps.push({ type: "SWAP", indexes: [k, newArr[i]] });
      arr[k] = newArr[i++];
    }
    steps.push({ type: "DONE", indexes: [k, k] });
  }
};

export const mergeSortSteps = (arr: number[]) => {
  const newArr = [...arr];
  let steps: { type: string; indexes: number[] }[] = [];
  sort(arr, newArr, 0, arr.length - 1, steps);
  return steps;
};
