import React, { createContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export const DataJobContext = createContext();

export const DataJobProvider = (props) => {
  let history = useHistory();
  const [dataJob, setDataJob] = useState([]);
  const [input, setInput] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "",
    job_status_0: "",
    job_status_1: "",
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: "",
    salary_max: "",
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

    let {
      id,
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = input;

    if (currentIndex === -1) {
      axios
        .post(
          `https://dev-example.sanbercloud.com/api/job-vacancy`,
          {
            id,
            title,
            job_description,
            job_qualification,
            job_type,
            job_tenure,
            job_status,
            company_name,
            company_image_url,
            company_city,
            salary_min,
            salary_max,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          history.push("/");
          setFetchStatus(true);
        });
    } else {
      axios
        .put(
          `https://dev-example.sanbercloud.com/api/job-vacancy/${currentIndex}`,
          {
            title,
            job_description,
            job_qualification,
            job_type,
            job_tenure,
            job_status,
            company_name,
            company_image_url,
            company_city,
            salary_min,
            salary_max,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          history.push("/");

          setFetchStatus(true);
        });
    }

    setInput({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: "",
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: "",
      salary_max: "",
    });
    setCurrentIndex(-1);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let status = ["job_status_1", "job_status_0"];

    if (name === "job_status_1") {
      setInput({
        ...input,
        job_status_1: value,
        job_status_0: "",
        job_status: value,
      });
    } else if (name === "job_status_0") {
      setInput({
        ...input,
        job_status_0: value,
        job_status_1: "",
        job_status: value,
      });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleEdit = (event) => {
    let idJob = parseInt(event.target.value);
    history.push(`/dashboard/list-job-vacancy/edit/${idJob}`);
    console.log(idJob);
  };
  const handleShow = (event) => {
    let idJob = parseInt(event.target.getAttribute("value"));
    history.push(`/job-vacancy/${idJob}`);
    // console.log(idJob);
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);
    // console.log(idData)
    axios
      .delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
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
    handleShow,
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
