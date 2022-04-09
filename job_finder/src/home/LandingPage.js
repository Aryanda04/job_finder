import React, { useContext, useEffect } from "react";
import axios from "axios";
import { DataJobContext } from "../context/DataJobContext";

const LandingPage = () => {
  const { handleFunctions, state } = useContext(DataJobContext);
  let { handleText, handleChange, handleSubmit, handleEdit, handleDelete } =
    handleFunctions;

  let {
    dataJob,
    setDataJob,
    input,
    setInput,
    currentIndex,
    setCurrentIndex,
    fetchStatus,
    setFetchStatus,
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.get(
        `https://dev-example.sanbercloud.com/api/job-vacancy`
      );
      //   console.log(data["data"]);
      let result = data["data"].map((res) => {
        // console.log(data);
        let {
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
        } = res;

        return {
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
        };
      });
      setDataJob([...result]);
      //   console.log(result);
    };

    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <div className="items-center pt-14 pb-28">
      <h2 className="font-bold p-4 items-center text-dark text-3xl mb-5 max-w-md lg:text-3xl ">
        Find Your Jobs
      </h2>
      <>
        <div class="box pt-6">
          <div class="box-wrapper">
            <div class=" bg-white rounded flex items-center w-1/2 p-3 shadow-sm border border-gray-200">
              <button class="outline-none focus:outline-none">
                <svg
                  class=" w-5 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <input
                type="search"
                name=""
                id=""
                placeholder="search for jobs"
                x-model="q"
                class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
        <h1 style={{ textAlign: "center" }}>Available Jobs</h1>
        {dataJob !== undefined && (
          <>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 relative">
              {dataJob.map((res, index) => {
                return (
                  <>
                    <section id="JobCard">
                      <div class="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
                        <h2 class="mt-4 font-bold text-xl">{res.title}</h2>
                        <h6 class="mt-2 text-sm font-medium">
                          {res.company_name} ({res.company_city})
                        </h6>

                        <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
                          <img
                            src={res.company_image_url}
                            alt=""
                            class="h-full w-full"
                          />
                        </div>
                        <h6 class="mt-2 text-sm font-medium">
                          qualification :
                        </h6>
                        <p class="text-xs text-gray-500 text-center mt-3">
                          {res.job_qualification}
                        </p>

                        <p class="text-xs text-gray-500 text-center mt-3">
                          {res.job_description}
                        </p>
                      </div>
                    </section>
                  </>
                );
              })}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default LandingPage;
