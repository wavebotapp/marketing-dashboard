"use client";
import React, { useState,useEffect } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Pagination from "../Pagination/Pagination";
import { useSearch } from "../../components/contexts/SearchContext";
const Holder = () => {
  const [allCoinData, setAllCoinData] = useState([
    {
      snapblock: "33",
      time: "2:00:66",
      reward: "$87",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "27",
      time: "2:00:66",
      reward: "$30",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "20",
      time: "2:00:66",
      reward: "$60",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "03",
      time: "2:00:66",
      reward: "$20",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "43",
      time: "2:00:66",
      reward: "$85",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "66",
      time: "2:00:66",
      reward: "$26",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "277676732673627",
      time: "2:00:66",
      reward: "$505",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "2757573",
      time: "2:00:66",
      reward: "$905",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "25353533",
      time: "2:00:66",
      reward: "$55",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "25353",
      time: "2:00:66",
      reward: "$585",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "273263",
      time: "2:00:66",
      reward: "$75",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "4223",
      time: "2:00:66",
      reward: "$55",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "423",
      time: "2:00:66",
      reward: "$45",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "3",
      time: "2:00:66",
      reward: "$35",
      unlock: "566",
      status: "true",
    },
    {
      snapblock: "10",
      time: "2:00:66",
      reward: "$52",
      unlock: "566",
      status: "true",
    },

    // Add more data as needed
  ]);

  //pagination
  const { searchQuery } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //search
  const filteredData = allCoinData.filter((coin) =>
  coin.snapblock.toLowerCase().includes(searchQuery.toLowerCase()) ||
  coin.reward.toLowerCase().includes(searchQuery.toLowerCase())
 
);
  const visibleData =  filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery]);

  return (
    <div className="2xl:pl-52 xl:pl-60 md:pl-4 sm:pl-4 xsm:pl-12 mx-auto ">
      <div className="flex flex-col xl:justify-center xl:ml-16 xl:mr-12 lg:ml-2 lg:mr-5 md:ml-0 xsm:ml-5 mr-5 mt-10">
        <p className="text-[#1788FB]   text-2xl  md:text-3xl text-center md:text-left font-medium max-w-screen-lg ">
          Holder Rewards
        </p>
        <div className="flex flex-col md:flex-row gap-6 mt-5">
          <div className="rounded-lg p-4 bg-[#1C1C1C] flex items-center gap-2">
            <IoIosInformationCircleOutline size={20} className="mt-[2px]" />
            <p>Paginated Results</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-5 md:w-full ">
          <div className="rounded-lg px-4 py-2 md:py-4  bg-[#1C1C1C] ">
            <p>Total Rewards</p>
            <p className="text-blue-400 text-2xl mt-1  ">0ETH</p>
          </div>
          <div className="rounded-lg px-4 py-2 md:py-4  bg-[#1C1C1C] ">
            <p>Unclaimed Rewards</p>
            <p className="text-blue-400 text-2xl mt-1">0ETH</p>
          </div>
          <div className="rounded-lg px-4 py-2 md:py-4  bg-[#1C1C1C] ">
            <p>Claimable Rewards</p>
            <p className="text-blue-400 text-2xl mt-1">0ETH</p>
          </div>
        </div>
        <div className="mt-7 font-medium text-2xl mb-4 mb:mb-0">
          <h1 className="  ">Holder Rewards</h1>
        </div>
        {/*  <div className="flex justify-end  ">
          <div>
            <label className=" text-sm md:text-lg">Rows per page </label>
            <select
              name="select Row"
              className="bg-blue-500 rounded-lg p-1 !outline-none "
              defaultValue="Show 5"
            >
              <option value="Show 1">Show 1</option>
              <option value="Show 2">Show 2</option>
              <option value="Show 3">Show 3</option>
              <option value="Show 4">Show 4</option>
              <option value="Show 5">Show 5</option>
            </select>
          </div>
        </div> */}

        <div className="mt-4 hidden lg:block ">
          <div className="rounded-lg">
            <div className="bg-[#1C1C1C]  text-white h-auto  overflow-auto rounded-lg">
              <table className="w-full  ">
                <thead className="sticky top-0 bg-[#1C1C1C] shadow-2xl ">
                  <tr className=" text-[#CECECE]  ">
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium  "
                    >
                      Snapshot Block
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                    >
                      Time{" "}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                    >
                      Rewards
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                    >
                      Unlock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium  whitespace-nowrap"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                {/* {visibleData?.map((d, index) => ( */}
                <tbody>
                  {visibleData?.length > 0 &&
                    visibleData?.map((d, index) => (
                      <>
                        <tr key={index}>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-md font-medium text-white ">
                            <div> {d?.snapblock}</div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                            {d?.time}
                          </td>

                          <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                            <div className="flex items-center justify-center gap-5">
                              <div>${d?.reward} </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                            {d?.unlock}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-md text-white ">
                            <div className="flex justify-center items-center ">
                              {d?.status}
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
                {/* ))} */}
              </table>
            </div>
          </div>
        </div>
        {/* <div className="xsm:hidden md:hidden lg:block"> */}
          <Pagination
             totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        {/* </div> */}
        {visibleData?.length > 0 &&
         visibleData?.map((d, index) => (
            <div key={index} className="lg:hidden mt-4 ">
              <div className="w-full  mx-auto bg-[#1C1C1C] shadow-md rounded-md ">
                <div className="w-full  ">
                  <div className="">
                    <>
                      <div className="border-b border-[#494949] flex justify-between">
                        <div className="py-2  pl-4 font-semibold">
                          {" "}
                          Snapshot Block
                        </div>
                        <div className="flex justify-end items-center py-2 pr-4 pl-4 gap-1.5">
                          {d?.snapblock}
                        </div>
                      </div>
                      <div className="border-b border-[#494949] flex justify-between">
                        <div className="py-2  pl-4 font-semibold">Time</div>
                        <div className=" py-2 pr-4 pl-4"> {d?.time}</div>
                      </div>
                      <div className="border-b border-[#494949] flex justify-between">
                        <div className="py-2  pl-4 font-semibold">Rewards</div>
                        <div className=" py-2 pr-4 pl-4"> ${d?.reward}</div>
                      </div>
                      <div className="border-b border-[#494949] flex justify-between">
                        <div className="py-2  pl-4 font-semibold"> Unlock</div>
                        <div className="flex justify-end items-center py-2 pr-4 pl-4">
                          {d?.unlock}
                        </div>
                      </div>
                      <div className=" flex justify-between">
                        <div className="py-2  pl-4 font-semibold">Status</div>
                        <div className="flex justify-end items-center py-2 pr-4 pl-4 gap-1.5">
                          {d?.status}
                        </div>
                      </div>
                      <div></div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Holder;
