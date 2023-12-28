import React, { FC, useState, useRef } from "react";
import classes from "./SortingVisualizer.module.css";
import { bubbleSortSteps } from "../Algorithms/BubbleSort";

export interface VisualizerProps {}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateArray = () => {
  const arr = Array.from({ length: 40 }, () => randomNumber(10, 700));
  return arr;
};

export const Visualizer: FC<VisualizerProps> = () => {
  const [array, setArray] = useState(generateArray());
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const columnsRef = useRef<HTMLDivElement>(null);

  const newArray = () => {
    setArray(generateArray());
  };

  const generateColumns = () => {
    return array.map((el, i) => (
      <div
        key={i}
        className="column"
        style={{
          height: `${el}px`,
          backgroundColor: "#70587c",
          width: "28px",
          marginRight: "1px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          transition: "height 0.3s",
        }}
      >
        {el}
        <div style={{ fontSize: "10px", color: "white" }} />
      </div>
    ));
  };

  const visualizer = async (steps: any) => {
    setIsSorting(true);
    for (let i = 0; i < steps.length; i++) {
      const { type, indexes } = steps[i];
      const columns = columnsRef.current?.children as any;
      const [index1, index2] = indexes;

      if (type === "COMPARE") {
        columns[index1].style.backgroundColor = "#f783ac";
        columns[index2].style.backgroundColor = "#f783ac";
        await sleep(speed);
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
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    setArray([...array]);
  };

  const BubbleSort = async () => {
    let newArr: number[] = [...array];
    const newSteps = bubbleSortSteps(newArr);
    await visualizer(newSteps);
    setArray(newArr);
  };

  const sleep = (duration: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, duration));
  };

  const speedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(+e.target.value < 1 ? 1 : +e.target.value);
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
          <button className={classes.btn} disabled={isSorting}>
            Merge Sort
          </button>
          <button className={classes.btn} disabled={isSorting}>
            Quick Sort
          </button>
        </div>
      </div>
      <div className={classes.border} />
      <div
        ref={columnsRef}
        style={{
          display: "flex",
          paddingLeft: "20px",
          justifyContent: "center",
        }}
      >
        {generateColumns()}
      </div>
    </>
  );
};
