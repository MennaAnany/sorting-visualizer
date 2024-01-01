import React, { FC, useState, useRef } from "react";
import classes from "./SortingVisualizer.module.css";
import { bubbleSortSteps } from "../Algorithms/BubbleSort";
import { mergeSortSteps } from "../Algorithms/MergeSort";
import { quickSortSteps } from "../Algorithms/QuickSort";

interface VisualizerProps {}

const Visualizer: FC<VisualizerProps> = () => {
  const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateArray = () =>
    Array.from({ length: 50 }, () => randomNumber(10, 700));

  const [array, setArray] = useState(generateArray);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(25);
  const columnsRef = useRef<HTMLDivElement>(null);

  const newArray = () => setArray(generateArray());

  const generateColumns = () =>
    array.map((el: any, i) => (
      <div key={i} className={classes.column} style={{ height: `${el}px` }}>
        <div className={classes.columnContent}>{el}</div>
      </div>
    ));

  const visualizer = async (steps: any) => {
    setIsSorting(true);
    const columns = columnsRef.current!.children as any;

    for (let i = 0; i < steps.length; i++) {
      const { type, indexes } = steps[i];
      const [index1, index2] = indexes;

      if (type === "COMPARE") {
        columns[index1].style.backgroundColor = "#f783ac";
        columns[index2].style.backgroundColor = "#f783ac";
        await sleep(speed);
        columns[index1].style.backgroundColor = "#70587c";
        columns[index2].style.backgroundColor = "#70587c";
      } else if (type === "DONE") {
        columns[index1].style.backgroundColor = "#70587c";
        columns[index2].style.backgroundColor = "#70587c";
      } else if (type === "SWAP") {
        columns[index1].style.backgroundColor = "#ffd43b";
        columns[index2].style.backgroundColor = "#ffd43b";
        await sleep(speed);
        columns[index1].style.backgroundColor = "#70587c";
        columns[index2].style.backgroundColor = "#70587c";
        swap(index1, index2);
      }
    }

    setIsSorting(false);
  };

  const swap = (index1: number, index2: number) => {
    [array[index1], array[index2]] = [array[index2], array[index1]];
    setArray([...array]);
  };

  const BubbleSort = async () => {
    const newArr = [...array];
    const steps = bubbleSortSteps(newArr);
    await visualizer(steps);
  };

  const QuickSortHandler = async () => {
    const newArr = [...array];
    const steps = quickSortSteps(newArr, 0, newArr.length - 1);
    await visualizer(steps);
  };

  const MergeSort = async () => {
    const newSteps = mergeSortSteps([...array]);

    for (let i = 0; i < newSteps!.length; i++) {
      const { type, indexes } = newSteps![i];
      const columns = columnsRef.current!.children as any;
      const [index1, index2] = indexes;

      if (type === "SWAP") {
        columns[index1].style.backgroundColor = "#ffd43b";
        // columns[index2].style.backgroundColor = "#ffd43b";
        columns[index1].style.height = `${index2}px`;
        columns[index1].children[0].textContent = index2;
      } else if (type === "COMPARE") {
        columns[index1].style.backgroundColor = "#f783ac";
        columns[index2].style.backgroundColor = "#f783ac";
      } else if (type === "DONE") {
        columns[index1].style.backgroundColor = "#70587c";
        columns[index2].style.backgroundColor = "#70587c";
      }

      await sleep(speed);
    }

    setIsSorting(false);
  };

  const sleep = (duration: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, duration));

  const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Math.max(1, +e.target.value));
  };

  return (
    <>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttons}>
          <div className={classes.slider}>
            <label>Sorting Speed</label>
            <input
              className={classes.input}
              id="speed"
              name="speed"
              type="number"
              onChange={speedHandler}
              value={speed}
              disabled={isSorting}
            />
          </div>
          <button
            onClick={newArray}
            className={classes.btn}
            disabled={isSorting}
          >
            Generate New Array
          </button>
          <button
            className={classes.btn}
            onClick={BubbleSort}
            disabled={isSorting}
          >
            Bubble Sort
          </button>
          <button
            className={classes.btn}
            onClick={MergeSort}
            disabled={isSorting}
          >
            Merge Sort
          </button>
          <button
            className={classes.btn}
            onClick={QuickSortHandler}
            disabled={isSorting}
          >
            Quick Sort
          </button>
        </div>
      </div>
      <div className={classes.border} />
      <div ref={columnsRef} className={classes.columnsContainer}>
        {generateColumns()}
      </div>
    </>
  );
};

export default Visualizer;
