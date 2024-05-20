"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Profile from "../../../public/assets/profile.PNG";
import add from "../../../public/assets/add.png";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ChangePass from "./ChangePass";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import axiosInstance from "../../apiInstances/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
const About = () => {
  const [showPopup, setShowPopup] = useState(false);
 const [email, setEmail] = useState("")
  const popupRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axiosInstanceAuth.get("/getUserProfile");
        setUserProfile(response?.data?.data || []);
        setEmail(response?.data?.data?.email)
        // console.log("🚀 ~ getUserProfile ~ setEmail:",   response?.data?.data?.email)
      
        console.log("User Profile Data:", response?.data?.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUserProfile();
  }, []);
 
  const handleSubmit = async () => {
     
        await axiosInstance
          .post("forgetPassword",{email:email})
          .then((res) => {
            const myData = res?.data;
            console.log("chnage Password Data --->", myData);
            localStorage.setItem("type", "changepassword");
            localStorage.setItem("userEmail",email);
            if (myData?.status) {
             
             
             
              // router.push("/passwordverify");
               setShowPopup(true);
              // setTimeout(() => {
              // }, 3000);
            } 
          })
          .catch((err) => {
            console.log("err---->", err);
          });
      };
    
  const [imageSrc, setImageSrc] = useState(Profile);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  const formatTransactionID = (txid) => {
    if (!txid || txid.length <= 10) return txid;
    const firstSix = txid.slice(0, 8);
    const lastFour = txid.slice(-6);
    return `${firstSix}...${lastFour}`;
  };

  return (
    <>
      <div className="mt-4 ">
        <div className="flex justify-end">
          <button className="rounded-md bg-blue-500 text-sm p-1 px-4 md:text-[18px] font-medium">
            Edit
          </button>
        </div>
      </div>
      <div className="">
        <div className="pl-16 pt-4 back mt-5 flex">
          <Image
            src={imageSrc}
            alt="Profilelogo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <button
            onClick={openFileInput}
            className="absolute text-black bg-white rounded-full top-[19rem] cursor-pointer"
          >
            <IoIosAddCircleOutline size={30} />
          </button>
          <input
            ref={fileInputRef}
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      {/*   <div className="">
        <div className="pl-16 pt-4 back mt-5">
          {image ? ( // If an image is selected, display it
            <div style={{ position: "relative" }}>
              <Image
                src={image}
                alt="Selected Image"
                width={100}
                height={100}
                className="rounded-full"
              />
              {/* <Image
                src={arrow}
                alt="Add Icon"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                }}
              /> *
            </div>
          ) : (
            // If no image is selected, display an empty area with the option to add an image
            <label htmlFor="imageUpload">
              <div
                className="rounded-full border border-dashed border-gray-400 w-24 h-24 flex items-center justify-center cursor-pointer"
                style={{ position: "relative" }}
              >
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Image
                  src={add}
                  alt="Add Icon"
                  style={{
                    width: 40,
                    height: 40,
                    position: "absolute",
                  }}
                />
              </div>
            </label>
          )}
        </div>
      </div> */}
      <div className=" bg-[#1C1C1C] shadow-2xl rounded-b-lg ">
        <div className="text-[#CECECE]  p-8 pl-16  ">
          <div className="md:flex flex-1 mb-4">
            <div className="mr-4 text-[20px] text-[#CACACA] font-medium">
              <p>Name :</p>
            </div>
            <div className="text-[12px] text-[#FFFFFF] font-normal mt-2 ml-0 md:ml-44">
              <p>{userProfile.name}</p>
            </div>
          </div>

          <div className="md:flex flex-1 mb-4">
            <div className="mr-4 text-[20px] text-[#CACACA] font-medium">
              <p>Email :</p>
            </div>
            <div className="text-[12px] text-[#FFFFFF] font-normal mt-2 ml-0 md:ml-[180px]">
              <p>{userProfile.email}</p>
            </div>
          </div>
          {userProfile && userProfile.referralId && (
            <div className="md:flex flex-1 mb-4">
              <div className="mr-4 text-[20px] text-[#CACACA] font-medium">
                <p>Referral code :</p>
              </div>
              <div className="text-[12px] text-[#FFFFFF] font-normal mt-2 ml-0 md:ml-[102px]">
                <p>{userProfile.referralId}</p>
              </div>
            </div>
          )}
          {userProfile && userProfile.ReferredBy && (
            <div className="md:flex flex-1 mb-4">
              <div className="mr-4 text-[20px] text-[#CACACA] font-medium">
                <p>Referred by :</p>
              </div>
              <div className="text-[12px] text-[#FFFFFF] font-normal mt-2 ml-0 md:ml-[119px]">
                <p>{userProfile.ReferredBy}</p>
              </div>
            </div>
          )}

          <div className="md:flex flex-1 mb-4 ">
            <div className="mr-4 md:text-[19px] text-[20px] text-[#CACACA] font-medium">
              <p>EVM Address :</p>
            </div>
            <div className="text-[12px] text-[#FFFFFF] font-normal mt-[0.50rem] ml-0 md:ml-[111px] flex">
              {/* <p className="truncate">{userProfile.wallet}</p> */}
              <p>{formatTransactionID(userProfile.wallet)}</p>

              <button
                className="text-xl text-[#828282] align-middle pb-1.5"
                onClick={() => copyToClipboard(userProfile.wallet)}
              >
                <MdOutlineContentCopy
                  size={12}
                  className="ml-1.5 items-center"
                />
              </button>
            </div>
          </div>

          <div className="md:flex flex-1 mb-4 ">
            <div className="mr-4 text-[20px] md:text-[19px] text-[#CACACA] font-medium">
              <p>Solana Address :</p>
            </div>
            <div className="text-[12px] text-[#FFFFFF] font-normal mt-[0.50rem]  ml-0 md:ml-[90px] flex">
              {/* <p className="truncate">{userProfile.solanawallet}</p> */}
              <p>{formatTransactionID(userProfile.solanawallet)}</p>

              <button
                className="text-xl text-[#828282] align-middle pb-1.5"
                onClick={() => copyToClipboard(userProfile.solanawallet)}
              >
                <MdOutlineContentCopy
                  size={12}
                  className="ml-1.5 items-center"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <div className="flex justify-end">
          <button className="rounded-md bg-blue-500 text-sm p-1 px-4 md:text-[18px] font-medium"    onClick={() => {
              
              handleSubmit();
            }}>
            Save
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-end mb-3">
          {/* <Link href="/passwordverify"> */}
          <button
            className="rounded-md bg-blue-500 text-sm p-1 px-4 md:text-[18px] font-medium"
            onClick={() => {
           
              handleSubmit();
            }}
          >
            Change Password
           
          </button>
          {/* </Link> */}
        </div>
      </div>
      {showPopup && (
        <div>
          <div ref={popupRef}>
            <ChangePass />
          </div>
        </div>
      )}
    </>
  );
};

export default About;