"use client";
import { useParams } from "react-router-dom";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import { BiBookmark } from "react-icons/bi";
import axiosInstanceAuth from "@/app/apiInstances/axiosInstanceAuth";
import Link from "next/link";
import axios from "axios";
import "./Market.css";
import Pagination from "../Pagination/Pagination";
const Market = () => {
  const { id } = useParams();
  const [allCoinData, setAllCoinData] = useState([]);
  const [savedCoins, setSavedCoins] = useState([]);
  console.log("save", allCoinData);
  console.log("savedcoins-----------------", savedCoins);
  const getUserdata = async () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en"
      )
      .then((res) => {
        setAllCoinData(res?.data);
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  useEffect(() => {
    getUserdata();
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = allCoinData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   const savedCoinsFromStorage = JSON.parse(localStorage.getItem('savedCoins')) || [];
  //   setSavedCoins(savedCoinsFromStorage);
  // }, []);

  // const saveCoin = async (id) => {
  //   try {
  //     const res = await axiosInstanceAuth.post("watchlist", { coinId: id });
  //     setSavedCoins((prevSavedCoins) => [...prevSavedCoins, id]);

  //     // Save updated coins to local storage
  //     localStorage.setItem('savedCoins', JSON.stringify([...savedCoins, id]));
  //   } catch (err) {
  //     console.log("err--->", err);
  //   }
  // };

  useEffect(() => {
    const savedCoinsFromStorage =
      JSON.parse(localStorage.getItem("savedCoins")) || [];
    setSavedCoins(savedCoinsFromStorage);
  }, []);

  const saveCoin = async (id) => {
    try {
      // Check if the user is logged in (you need to replace this condition with your authentication logic)
      const userIsLoggedIn = true; // Replace with your logic to check if the user is logged in

      if (userIsLoggedIn) {
        // Save the coin to the server for the logged-in user
        await axiosInstanceAuth.post("watchlist", { coinId: id });
      }

      // Save the coin locally for both logged-in and logged-out users
      setSavedCoins((prevSavedCoins) => [...prevSavedCoins, id]);
      localStorage.setItem("savedCoins", JSON.stringify([...savedCoins, id]));
    } catch (err) {
      console.log("err--->", err);
    }
  };

  return (
    <div className=" ">
      <div className="container bg-[#1C1C1C] rounded-2xl ">
        {/* <div className="border-b border-stone-500 mt-7" /> */}
        <div className="items-center container">
          <div className="flex pb-3">
            <h1 className="font-bold text-2xl">Liquidity Intents</h1>
            <span className="text-[#828282] text-xl pl-4 pt-1   ">
              <LiaEyeSolid />
            </span>
          </div>
          {/* {allCoinData?.length > 0 &&
                   allCoinData?.map((d, index) => (
                      <>
                        <div key={index}> */}
          <div className="flex pb-4 ">
            <h1 className="text-[#1788FB] font-bold md:text-3xl text-lg  md:pr-3 pr-0">
              {/* {d.current_price} */} 0.01899934
            </h1>{" "}
            {/* <span>{d.symbol}</span> */}
            <select
              name="select Row"
              className="bg-[#1C1C1C] text-white rounded-lg p-1 !outline-none  "
              defaultValue=" BTC"
            >
              <option value="BTC">BTC</option>
              <option value="BTC1">BTC2</option>
              <option value="BTC3">BTC3</option>
              <option value="BTC4">BTC4</option>
              <option value="BTC5">BTC5</option>
            </select>
          </div>
          <div className="text-sm pb-4">{/* =${d.price} */} =$42,693.8</div>
          <div className="text-sm pb-5">
            {/* {d.pnl} */} Todays PnL -$.550()
          </div>
          {/* </div>
                        </>
                   ))} */}
        </div>

        {/* Border */}
        <div className="border-t border-white mt-2 pb-2"></div>

        <div className="container hidden lg:block">
          <div className="rounded-lg">
            <h1 className="font-medium pt-5 text-3xl tracking-wide">Markets</h1>
            <div className="flex justify-end  mb-7 ">
              {/* <div>
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
          
          </div> */}
            </div>
            <div className="bg-[#1C1C1C]  text-white h-auto overflow-auto rounded-lg">
              <table className="w-full  ">
                <thead className="sticky top-0 bg-[#1C1C1C] shadow-2xl">
                  <tr className=" text-[#CECECE]  ">
                    <th
                      scope="col"
                      className="px-6 py-3  text-base font-medium text-start "
                    >
                      Coin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                    >
                      Coin Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium   whitespace-nowrap"
                    >
                      Today’s PnL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-base font-medium  whitespace-nowrap"
                    >
                      Trade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-base font-medium  whitespace-nowrap"
                    >
                      Save
                    </th>
                  </tr>
                </thead>
                <tbody>
                {visibleData?.length > 0 &&
                    visibleData?.map((market, index) => (
                      <>
                        <tr key={index}>
                          <td className="px-6 py-4 text-center whitespace-nowrap text-md font-medium text-white ">
                            <div className="flex items-center  gap-2">
                              <div>
                                <Image
                                  src={market?.image}
                                  alt={market?.name}
                                  className="rounded-full"
                                  width={30}
                                  height={30}
                                />
                              </div>
                              <div> {market?.name}</div>
                            </div>
                          </td>
                          <td className="px-6  text-center whitespace-nowrap text-md text-white "></td>

                          <td className="px-6 text-center whitespace-nowrap text-md text-white ">
                            <div className="flex flex-col items-center justify-center ">
                              <div>${market?.current_price} </div>
                              <div className="text-[#FF0000]">
                                ({market?.price_change_percentage_24h})
                              </div>
                            </div>
                          </td>
                          <td className="px-6  text-center whitespace-nowrap text-md text-white "></td>
                          <td className="px-6 text-center whitespace-nowrap text-md text-white ">
                            {/* {d.ChangesD} */}
                            <div className="flex justify-center items-center ">
                              <Link href="/">Trade</Link>
                            </div>
                          </td>
                          <td className="px-6   py-7   flex justify-end whitespace-nowrap text-md text-white  ">
                            {savedCoins.includes(market.id) ? (
                              // Render a filled bookmark if the coin is saved
                              <button className="">
                                <BiBookmark
                                  style={{ backgroundColor: "#1788FB" }}
                                />
                              </button>
                            ) : (
                              // Render a button to save the coin
                              <button
                                className=""
                                onClick={() => saveCoin(market?.id)}
                              >
                                <BiBookmark />
                              </button>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              totalItems={allCoinData.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      {allCoinData?.length > 0 &&
        allCoinData?.map((market, index) => (
          <div
            key={index}
            className="lg:hidden mt-4 space-y-2 flex justify-between"
          >
            <div className="w-full  mx-auto bg-[#1C1C1C] shadow-md rounded-md ">
              <div className="w-full  ">
                <>
                  <div className="border-b border-[#494949] flex justify-between">
                    <div className="py-2  pl-4 font-semibold">Coin</div>
                    <div className="flex justify-end items-center py-2 pr-4 pl-4 gap-1.5">
                      <span>
                        <Image
                          src={market?.image}
                          alt={market?.name}
                          className="rounded-full "
                          width={30}
                          height={30}
                        />
                      </span>
                      {market?.name}
                    </div>
                  </div>
                  <div className="border-b border-[#494949] flex justify-between">
                    <div className="py-2  pl-4 font-semibold">Amount</div>
                    <div className=" py-2 px-4 "></div>
                  </div>
                  <div className="border-b border-[#494949] flex justify-between">
                    <div className="py-2  pl-4 font-semibold">Coin Price</div>
                    <div className="flex justify-end items-center   px-4">
                      <div> ${market?.current_price} </div>
                      <div className="text-[#FF0000]">
                        ({market?.price_change_percentage_24h})
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-[#494949] flex justify-between">
                    <div className="py-2  pl-4 font-semibold">Today’s PnL</div>
                    <div className="flex justify-end items-center py-2 px-4 "></div>
                  </div>
                  <div className="border-b border-[#494949] flex justify-between">
                    <div className="py-2  pl-4 font-semibold">Trade</div>
                    <div className="flex justify-end items-center py-2 px-4  gap-1.5">
                      <Link href="/">Trade</Link>
                      {/* <span className="flex items-center text-red-500 text-[11px]">
                          <FaCaretDown size={12} />
                          (-0.73%)
                        </span> */}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="py-2  pl-4 font-semibold">Save</div>

                    <div className="flex justify-end py-2 px-4">
                      <div className="flex justify-end ml-16">
                        {savedCoins.includes(market?.id) ? (
                          // Render a filled bookmark if the coin is saved
                          <BiBookmark style={{ backgroundColor: "#1788FB" }} />
                        ) : (
                          // Render a button to save the coin
                          <button onClick={() => saveCoin(market?.id)}>
                            <BiBookmark />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div></div>{" "}
          </div>
        ))}
    </div>
  );
};

export default Market;
