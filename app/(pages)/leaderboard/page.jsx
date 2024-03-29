"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import img from "../../assets/profile.PNG";
import { useSearch } from "../../components/contexts/SearchContext";//search
import { formatDistanceToNow } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import axiosInstance from "../../apiInstances/axiosInstance";
import Pagination from "../Pagination/Pagination";

const truncateEmail = (email) => {
  if (email.length < 20) {
    // Show full email if length is greater than 50
    return email;
  } else {
    // Show truncated email if length is 50 or less
    const truncatedEmail = `${email.slice(0, 10)}...${email.slice(-10)}`;
    return truncatedEmail;
  }
};

const LeaderBoard = () => {
  const students = [
    {
      Rank: "1",
      name: "rahul",
      email: "rahul@gmail.com",
      points: "254,466,796",
    },
    {
      Rank: "2",
      name: "nikhil",
      email: "nikhil@gmail.com",
      points: "724,466,796",
    },
    {
      Rank: "3",
      name: "pari",
      email: "pari@gmail.com",
      points: "824,466,796",
    },
    {
      Rank: "4",
      name: "parth",
      email: "parth@gmail.com",
      points: "324,466,796",
    },
    {
      Rank: "5",
      name: "pintu",
      email: "pintu@gmail.com",
      points: "924,466,796",
    },
    {
      Rank: "6",
      name: "sanket",
      email: "sanket@gmail.com",
      points: "224,466,796",
    },
    // Add more student data as needed
  ];

  const [allRecentUser, setAllRecentUser] = useState([]);
  console.log("🚀 ~ LeaderBoard ~ allRecentUser:", allRecentUser);

  // Get All Admin Show
  const getAdmindata = async () => {
    await axiosInstanceAuth
      .get("recentUsers")
      .then((res) => {
        const myData = res?.data;
        setAllRecentUser(myData?.data || []);
        console.log("recentUsers---->", myData);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  useEffect(() => {
    getAdmindata();
  }, []);

  //pagination
  const { searchQuery } = useSearch();//search
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = students.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.points.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleData = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery]);

  return (
    <div className="2xl:pl-52 xl:pl-60 md:pl-4 sm:pl-4 xsm:pl-12 mx-auto ">
      <div className="xl:flex my-10 xl:ml-16  xl:mr-11 gap-6 lg:ml-3 lg:mr-6 md:ml-0 md:mr-6 ml-5 xl:space-y-0 space-y-4 mr-5">
        <div className="w-full">
          <p className="text-blue-400 text-3xl md:text-4xl font-medium w-auto  ">
            Leader Board
          </p>

          <div className="">
            <div className="mt-6 rounded-lg overflow-auto">
              <div className="bg-[#1C1C1C]  text-white  overflow-auto rounded-lg ">
                <table className="w-full">
                  <thead className="sticky top-0 bg-[#1788FB] shadow-2xl">
                    <tr className=" text-[#FFFFFF]  ">
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-base font-medium "
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                      >
                        Invited by
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                      >
                        Points
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleData?.length > 0 &&
                      visibleData?.map((student, index) => (
                        <>
                          <tr key={index}>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                              {student?.Rank}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                              {student?.name}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                              {student?.email}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                              {student?.points}
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Pagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>

        <div className="">
          <p className="text-blue-400 text-3xl md:text-4xl font-medium max-w-screen-lg ">
            Recent Joins
          </p>
          <div className="md:container">
            <div className="mt-6 rounded-lg overflow-hidden w-full">
              <div className="bg-[#1C1C1C] text-white xl:block md:grid md:grid-cols-2 ">
                {/* Mapping over students data */}
                {allRecentUser?.length > 0 &&
                  allRecentUser.map((d, index) => (
                    <>
                      <div key={index} className="">
                        <div className="md:p-4 p-3">
                          <div className="flex gap-2">
                            <div className="w-[2.5rem] sm:[1.5rem]">
                              <Image
                                src={img}
                                alt="Picture of the author"
                                className="rounded-full"
                              />
                            </div>

                            <div className="lg:text-base text-sm">
                              <div className="flex gap-2">
                                <p>{d?.name}</p>
                                <p className="text-[#6B6B6B]">
                                  {formatDistanceToNow(new Date(d?.createdAt), {
                                    addSuffix: true,
                                  })}
                                </p>
                              </div>

                              {/* <p
                                className="text-nowrap "
                                title={
                                  hoveredEmail === d.email
                                    ? d.email
                                    : truncateEmail(d.email)
                                }
                              >
                                Invited by {truncateEmail(d.email)}
                              </p> */}

                              {/* <h1 data-tooltip-id="my-tooltip-1">
                                Invited by {truncateEmail(d.email)}
                              </h1>
                              <ReactTooltip
                                id="my-tooltip-1"
                                place="top"
                                content={d.email}
                              /> */}

                              <div
                                data-tooltip-id={`tooltip-${index}`}
                                className=""
                              >
                                <p className="text-nowrap ">
                                  Invited by {truncateEmail(d?.email)}
                                </p>
                              </div>
                              <ReactTooltip
                                id={`tooltip-${index}`}
                                place="bottom-end"
                                effect="solid"
                                variant="info"
                              >
                                {/* Display full email in the tooltip */}
                                <span>{d?.email}</span>
                              </ReactTooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;