// @ts-nocheck
import "./AddJob.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createJob } from "../../../redux/actions/recruiterAction"; // Assuming you have a jobActions file for API calls

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [level, setLevel] = useState("");
  const [jobType, setJobType] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyDetail, setCompanyDetail] = useState("");

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employerId = user.id;
    const companyName = user.companyName;
    const data = {
      jobTitle,
      level,
      jobType,
      address,
      description,
      minSalary,
      maxSalary,
      skills,
      jobRequirements,
      employerId,
      companyLogo,
      companyName,
      companyDetail,
    };

    try {
      dispatch(createJob(data, token))
        .then((res) => {
          if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/jobs");
          } else {
            toast.error(res.EM);
          }
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <section className="  pt-44 bg-gray-50 dark:bg-gray-900">
      <div className="  pt-96 pb-80 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" ml-64 mr-72   w-full max-w-2xl bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add Job
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="jobTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <input
                    type="text"
                    name="level"
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="jobType"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Job Type
                  </label>
                  <input
                    type="text"
                    name="jobType"
                    id="jobType"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full-time, Part-time, etc."
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Job location"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="minSalary"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Minimum Salary
                  </label>
                  <input
                    type="number"
                    name="minSalary"
                    id="minSalary"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Min Salary"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="maxSalary"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Maximum Salary
                  </label>
                  <input
                    type="number"
                    name="maxSalary"
                    id="maxSalary"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Max Salary"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Describe the job..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="skills"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Required Skills
                </label>
                <textarea
                  name="skills"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="List the required skills..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="jobRequirements"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Job Requirements
                </label>
                <textarea
                  name="jobRequirements"
                  id="jobRequirements"
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="List the job requirements..."
                  required
                />
                <div>
                  <label
                    htmlFor="companyDetail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Detail
                  </label>
                  <textarea
                    name="companyDetail"
                    id="companyDetail"
                    value={companyDetail}
                    onChange={(e) => setCompanyDetail(e.target.value)}
                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="companyDetail"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="companyLogo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Logo URL
                  </label>
                  <input
                    type="text"
                    name="companyLogo"
                    id="companyLogo"
                    value={companyLogo}
                    onChange={(e) => setCompanyLogo(e.target.value)}
                    className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter company logo URL"
                    required
                  />
                  {companyLogo && (
                    <div className="mt-4">
                      <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#df4710] hover:bg-[#b83b0d] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddJob;
