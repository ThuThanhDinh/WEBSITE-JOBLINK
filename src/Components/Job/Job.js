// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllJob } from "../../redux/actions/recruiterAction";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaRegHeart,
  FaHeart,
  FaBriefcase,
  FaLevelUpAlt,
} from "react-icons/fa";
import Search from "../Search/Search";
import { getAllBySearch } from "../../Services/userService";
import { useLocation } from "react-router-dom";

const Job = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listJob = useSelector((state) => state.recruiter.listJob);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(fetchAllJob(token)); // Fetch the listJob from the database
  }, [dispatch, token]);

  const [favoriteJobs, setFavoriteJobs] = useState({});
  const [filteredJobs, setFilteredJobs] = useState([]); // Lưu kết quả lọc tìm kiếm
  console.log("setFilteredJobs", setFilteredJobs);
  // Hàm lọc công việc dựa trên từ khóa và thành phố
  const handleSearch = async ({ city, keyword }) => {
    try {
      const res = await getAllBySearch({ city, keyword });
      console.log("res", res);
      if (res && res.EC === 0) {
        setFilteredJobs(res.DT); // Cập nhật danh sách công việc từ kết quả tìm kiếm
      } else {
        console.error("No results found or an error occurred:", res.EM);
        // Bạn có thể thêm thông báo cho người dùng tại đây
      }
    } catch (error) {
      console.error("Error during search:", error);
      // Bạn có thể thêm thông báo lỗi cho người dùng tại đây
    }
  };
  const handleJobDetailClick = (jobId) => {
    navigate(`/job-detail/${jobId}`);
  };

  const toggleFavorite = (jobId) => {
    setFavoriteJobs((prevFavorites) => ({
      ...prevFavorites,
      [jobId]: !prevFavorites[jobId],
    }));
  };

  const jobsToDisplay = filteredJobs.length > 0 ? filteredJobs : listJob; // Dùng danh sách đã lọc nếu có
  console.log("filteredJobs", jobsToDisplay);
  const location = useLocation();

  // Kiểm tra đường dẫn hiện tại
  const pageTitle = location.pathname === "/job" ? "" : "Tất cả việc làm";
  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="job-list container">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white pb-[30px] pt-[30px] font-lexend">
          {pageTitle}
        </h1>
        {jobsToDisplay && jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job) => (
            <div
              key={job.JobId}
              className="job-item bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-4 mb-4 rounded-lg shadow-md flex font-lexend"
            >
              <div className="flex-none w-24 h-24">
                <img
                  src={job.companyLogo}
                  alt={`${job.companyName} logo`}
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="text-base font-bold text-center text-gray-600 dark:text-gray-400 mt-1">
                  {job.companyName}
                </p>
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-lexend">
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="h-5 w-5 text-[#df4710] mr-2" />{" "}
                    {job.address}
                  </span>
                </p>
                <p className="text-lg text-[#0ab305] font-bold dark:text-gray-400 mt-2">
                  <span className="flex items-center">
                    <FaDollarSign className="h-5 w-5 text-[#0ab305] mr-2" />{" "}
                    <span className="font-bold">
                      {job.minSalary} - {job.maxSalary}
                    </span>
                  </span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-lexend mt-2">
                  <span className="flex items-center">
                    <FaBriefcase className="h-5 w-5 text-[#df4710] mr-2" />{" "}
                    {job.jobType}
                  </span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-lexend mt-2">
                  <span className="flex items-center">
                    <FaLevelUpAlt className="h-5 w-5 text-[#df4710] mr-2" />{" "}
                    {job.level}
                  </span>
                </p>
              </div>
              <div className="flex items-center ml-4">
                <button
                  onClick={() => handleJobDetailClick(job.id)}
                  className="px-4 py-2 text-white rounded hover:bg-[#df4710] bg-[#df4710] text-lg"
                >
                  Job Detail
                </button>
                <button
                  onClick={() => toggleFavorite(job.JobId)}
                  className="ml-4 text-2xl text-[#df4710] flex items-center justify-center"
                >
                  {favoriteJobs[job.JobId] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No Job found</p>
        )}
      </div>
    </>
  );
};

export default Job;
