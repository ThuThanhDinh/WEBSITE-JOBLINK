// JobDetail.js
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createApplication } from "../../../redux/actions/userAction";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa"; // Importing icons from react-icons

const JobDetail = () => {
  const { jobId } = useParams(); // Get the jobId from the URL parameters
  const listJob = useSelector((state) => state.recruiter.listJob); // Get listJob from Redux store
  const jobData = listJob.find((job) => job.id === Number(jobId)); // Find the job by jobId
  const [favorite, setFavorite] = useState(false);
  const user = useSelector((state) => state.user.user);
  const listCV = useSelector((state) => state.user.listCVByUserId); // Get the list of CVs from Redux store
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("listCV", listCV);
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleApply = () => {
    const applicantId = user.id;
    console.log("applicantId", applicantId);

    // Kiểm tra xem applicantId có trong danh sách CV không
    const applicantCV = listCV.find((cv) => cv.userId === applicantId);

    if (!applicantCV) {
      toast.error("No CV found for the applicant. Please create a CV first.");
      return;
    }

    // Tìm cvId trong danh sách CV với isDefault = true
    const defaultCV = listCV.find((cv) => cv.isDefault === true);
    console.log("listCV", listCV);
    console.log("defaultCV", defaultCV);
    const cvId = defaultCV ? defaultCV.cvId : null;

    if (!cvId) {
      toast.error("No default CV found. Please set a default CV first.");
      return;
    }

    const data = { jobId, applicantId, cvId };

    try {
      dispatch(createApplication(data, token))
        .then((res) => {
          if (res && res.EC === 0) {
            toast.success(res.EM);
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
    <div className="container mx-auto flex p-4">
      {/* Company Info Section */}
      <div className="w-1/3 mr-4 bg-white border rounded-lg p-4 shadow-md">
        {jobData && (
          <>
            <img
              src={jobData.companyLogo}
              alt={`${jobData.companyName} logo`}
              className="w-full h-24 object-cover rounded-md"
            />
            <h2 className="text-4xl font-bold mt-2">{jobData.companyName}</h2>
            <h1 className="text-xl font-bold mt-2">Company Detail</h1>
            <p className="text-sm text-gray-600 mt-1">
              {jobData.companyDetail}
            </p>
          </>
        )}
      </div>

      {/* Job Detail Section */}
      <div className="w-2/3 bg-white border rounded-lg p-4 shadow-md">
        {jobData ? (
          <>
            <h1 className="text-4xl font-bold mb-4">{jobData.jobTitle}</h1>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="h-5 w-5 text-[#df4710] mr-2" />
              <span className="text-lg">{jobData.address}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaDollarSign className="h-5 w-5 text-[#0ab305] mr-2" />
              <span className="font-bold text-lg text-[#0ab305]">
                {jobData.minSalary} - {jobData.maxSalary}
              </span>
            </div>
            <p className="text-lg font-semibold">
              <strong>Level:</strong> {jobData.level}
            </p>
            <p className="text-lg font-semibold">
              <strong>Job Type:</strong> {jobData.jobType}
            </p>
            <button
              onClick={handleApply}
              className="mt-4 bg-[#df4710] text-white font-bold py-3 px-6 w-full rounded hover:bg-[#c94f0b]"
            >
              Apply
            </button>
            <p className="mt-4 text-lg">
              <strong>Description:</strong> {jobData.description}
            </p>
            <p className="mt-4 text-lg">
              <strong>Skills Required:</strong> {jobData.skills}
            </p>
            <p className="mt-4 text-lg">
              <strong>Job Requirements:</strong> {jobData.jobRequirements}
            </p>
            <button
              onClick={toggleFavorite}
              className={`mt-4 text-2xl flex items-center justify-center ${
                favorite ? "text-[#df4710]" : "text-gray-400"
              }`}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </>
        ) : (
          <p className="text-gray-500">Job not found</p>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
