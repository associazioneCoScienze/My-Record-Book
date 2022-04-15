import { useCallback, useMemo, useState } from "react";
import moment from "moment";

const generateId = () => Math.round(Math.random() * 10000000);
const sumOfKey = (key) => (acc, val) => acc + val[key];

const defaultValue = { name: "", ects: 6, date: null, grade: null };

let a = 1;
let b = 2;
let c = a + b;
//c = 3
b = 4;
// c = 5

function useExam() {
  const [items, setItems] = useState([
    {
      key: "1",
      name: "Matematica 1",
      ects: 6,
      date: moment(),
      grade: 26,
    },
    {
      key: "2",
      name: "Fisica",
      ects: 6,
    },
  ]);

  const arithmeticAverage = useMemo(() => {
    const dataWithGrades = items.filter((e) => e.grade);
    return dataWithGrades.length
      ? dataWithGrades.reduce(sumOfKey("grade"), 0) / dataWithGrades.length
      : "-";
  }, [items]);

  const weightedAverage = useMemo(() => {
    const dataWithGrades = items
      .filter((e) => e.grade)
      .map((e) => ({ v: e.grade * e.ects, w: e.ects }));
    return dataWithGrades.length
      ? dataWithGrades.reduce(sumOfKey("v"), 0) /
          dataWithGrades.reduce(sumOfKey("w"), 0)
      : "-";
  }, [items]);

  const doneECTS = useMemo(() => {
    const dataWithGrades = items.filter((e) => e.grade);
    return dataWithGrades.reduce(sumOfKey("ects"), 0);
  }, [items]);

  const totalECTS = useMemo(() => {
    return items.reduce(sumOfKey("ects"), 0);
  }, [items]);

  const statistics = useMemo(
    () => ({
      arithmeticAverage,
      weightedAverage,
      doneECTS,
      totalECTS,
    }),
    [arithmeticAverage, doneECTS, totalECTS, weightedAverage]
  );

  const add = useCallback((fields) => {
    setItems((d) => [...d, { ...fields, key: generateId() }]);
  }, []);

  const edit = useCallback((fields, key) => {
    setItems((d) => {
      const toRet = [...d];
      toRet.splice(
        toRet.findIndex((e) => e.key === key),
        1,
        { ...fields, key }
      );
      return toRet;
    });
  }, []);

  const remove = useCallback((id) => {
    setItems((d) => d.filter((e) => e.key !== id));
  }, []);

  return {
    defaultValue,
    items,
    statistics,

    add,
    edit,
    remove,
  };
}

export default useExam;
