import React, { createContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const DataJobContext = createContext();

export const DataJobProvider = (props) => {
  let history = useHistory();
  const [dataJob, setDataJob] = useState([]);
  const [input, setInput] = useState({
    name: "",
    course: "",
    score: 0,
  });
  let [currentIndex, setCurrentIndex] = useState(-1);
  let [fetchStatus, setFetchStatus] = useState(true);

  const handleText = (param) => {
    let nilai = param;

    if (nilai >= 80) {
      return "A";
    } else if (nilai >= 70 && nilai < 80) {
      return "B";
    } else if (nilai >= 60 && nilai < 70) {
      return "C";
    } else if (nilai >= 50 && nilai < 60) {
      return "D";
    } else {
      return "E";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let { name, course, score } = input;

    if (currentIndex === -1) {
      axios
        .post(`https://backendexample.sanbercloud.com/api/student-scores`, {
          name,
          course,
          score,
        })
        .then((res) => {
          history.push("/Tugas14");
          setFetchStatus(true);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbercloud.com/api/student-scores/${currentIndex}`,
          { name, course, score }
        )
        .then((res) => {
          history.push("/Tugas14");

          setFetchStatus(true);
        });
    }

    setInput({
      name: "",
      course: "",
      score: 0,
    });
    setCurrentIndex(-1);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleEdit = (event) => {
    let idMahasiswa = parseInt(event.target.value);
    history.push(`/Tugas14/edit/${idMahasiswa}`);
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);
    // console.log(idData)
    axios
      .delete(
        `https://backendexample.sanbercloud.com/api/student-scores/${idData}`
      )
      .then(() => {
        setFetchStatus(true);
      });
  };
  const handleStatus = (params) => {
    let status = params;
    if (status === 1) {
      return "Dibuka";
    } else {
      return "Ditutup";
    }
  };

  let handleFunctions = {
    handleText,
    handleSubmit,
    handleChange,
    handleEdit,
    handleDelete,
    handleStatus,
  };

  let state = {
    dataJob,
    setDataJob,
    input,
    setInput,
    currentIndex,
    setCurrentIndex,
    fetchStatus,
    setFetchStatus,
  };

  return (
    <>
      <DataJobContext.Provider value={{ handleFunctions, state }}>
        {props.children}
      </DataJobContext.Provider>
    </>
  );
};
