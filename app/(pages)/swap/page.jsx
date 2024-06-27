"use client";
import TokenList from "../../components/ShowTokenSwap/TokensList";
import React, { useEffect, useState, useRef } from "react";
import { IoMdClose, IoMdSettings } from "react-icons/io";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { TbArrowBarLeft, TbArrowBarRight } from "react-icons/tb";
import closearrow from "../../../public/assets/sidebar/closearrow.svg";
import openarrow from "../../../public/assets/sidebar/openarrow.svg";
import eth from "../../../public/assets/tokenimg/eth.png";
import arbitrum from "../../../public/assets/tokenimg/arbitrum.png";
import optimism from "../../../public/assets/tokenimg/optimism.png";
import poly from "../../../public/assets/tokenimg/poly.png";
import SOL from "../../../public/assets/tokenimg/SOL.png";
import BNB from "../../../public/assets/tokenimg/BNB.png";
import BURST from "../../../public/assets/tokenimg/BURST.png";
import base from "../../../public/assets/tokenimg/base.webp";

import avalanche from "../../../public/assets/tokenimg/avalanche.png";
import cronos from "../../../public/assets/tokenimg/cronos.jpg";
import fantom from "../../../public/assets/tokenimg/fantom.png";
import Linea from "../../../public/assets/tokenimg/linea.png";

import { useWallet } from "../../components/contexts/WalletContext";
import { useRouter } from "next/navigation";
import { IoSwapVerticalOutline } from "react-icons/io5";
import axiosInstance from "../../apiInstances/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import qs from "qs";
import axios from "axios";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import BalancePopUp from "../../components/balancePopup/BalancePopUp";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";

const Swap = () => {
  const { walletAddress, email, solanaAddress, isNavbar, setIsNavbar } =
    useWallet();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("Swap");
  // const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum");
  const [fetchtokendata, setFetchtokendata] = useState(null);
  const [balancePopup, setBalancePopup] = useState(false);
  const [selectedChainId, setSelectedChainId] = useState("");
  const [SelectedDescode, setSelectedDescode] = useState("");
  const [walletAddressbuysell, setwalletAddressbuysell] = useState("");
  const [clickedTokens, setClickedTokens] = useState("");
  const [showPopup1, setShowPopup1] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedtofrom, setSelectedtofrom] = useState(0);
  const [showBalance, setShowBalance] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectChain, setSelectChain] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorMessage =
    "Note : Do not select  native token of selected Network.";
  const [selectedTokenDatato, setSelectedTokenDatato] = useState({
    name_to: "",
    image_to: "",
    price_to: "",
    address_to: "",
    decimals_to: "",
    input_to: "",
    name_from: "",
    image_from: "",
    input_from: "",
    price_from: "",
    address_from: "",
    decimals_from: "",
    chainid: "",
    descode: "",
    chainname: "",
  });
  // console.log("selectedTokenDatato---",selectedTokenDatato)

  // Function to reset all fields
  const resetFields = () => {
    setSelectedTokenDatato({
      name_to: "",
      image_to: "",
      price_to: "",
      address_to: "",
      decimals_to: "",
      input_to: "",
      name_from: "",
      image_from: "",
      input_from: "",
      price_from: "",
      address_from: "",
      decimals_from: "",
      chainid: "",
      descode: "",
      chainname: "",
    });
  };

  const NetworkData = [
    {
      name: "Ethereum",
      chainid: "1",
      img: eth,
      descode: "0x1",
      walletAddressbuysell: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
    {
      name: "Arbitrum",
      chainid: "42161",
      img: arbitrum,
      descode: "0xa4b1",
      walletAddressbuysell: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    },
    {
      name: "Optimism",
      chainid: "10",
      img: optimism,
      descode: "0xa",
      walletAddressbuysell: "0x4200000000000000000000000000000000000042",
    },
    {
      name: "Polygon",
      chainid: "137",
      img: poly,
      descode: "0x89",
      walletAddressbuysell: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
    {
      name: "Solana",
      chainid: "19999",
      img: SOL,
      descode: "",
      walletAddressbuysell: "So11111111111111111111111111111111111111112",
    },
    {
      name: "BNB Chain",
      chainid: "56",
      img: BNB,
      descode: "0x38",
      walletAddressbuysell: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    {
      name: "Avalanche",
      chainid: "43114",
      img: avalanche,
      descode: "0xa86a",
      walletAddressbuysell: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    },
    {
      name: "Cronos",
      chainid: "25",
      img: cronos,
      descode: "0x19",
      walletAddressbuysell: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    },
    {
      name: "Base",
      chainid: "250",
      img: base,
      descode: "0x2105",
      walletAddressbuysell: "0x4200000000000000000000000000000000000006",
    },
    {
      name: "Blast",
      chainid: "81457",
      img: BURST,
      descode: "0xee",
      // walletAddressbuysell: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    },
    {
      name: "Linea",
      chainid: "250",
      img: Linea,
      descode: "0xe705",
      // walletAddressbuysell: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    },
    {
      name: "Fantom",
      chainid: "250",
      img: fantom,
      descode: "0xfa",
      walletAddressbuysell: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    },
  ];

  const token_data_ETH = [
    {
      name: "BNB",
      symbol: "BNB",
      chianid: "1",
      address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      decimal: "18",
      logoURI: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      networkname: "Ethereum",
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      chianid: "1",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimal: "6",
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      networkname: "Ethereum",
    },
  ];

  const token_data_ARB = [
    {
      name: "ChainLink Token",
      symbol: "LINK",
      chianid: 42161,
      address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
      decimal: "18",
      logoURI: "https://cryptologos.cc/logos/chainlink-link-logo.png",
      chainname: "arbitrum",
      descode: `0xa4b1`,
    },
    {
      name: "USDT",
      symbol: "USDT",
      chianid: 42161,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      decimal: "6",
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      chainname: "arbitrum",
      descode: `0xa4b1`,
    },
    {
      name: "Arbitrum",
      symbol: "ARB",
      chianid: 42161,
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      decimal: "18",
      logoURI: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
      chainname: "arbitrum",
      descode: `0xa4b1`,
    },
    {
      name: "USDC",
      symbol: "USDC",
      chianid: 42161,
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimal: "6",
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
      chainname: "arbitrum",
      descode: `0xa4b1`,
    },
  ];

  const token_data_BLAST = [
    {
      name: "Blast ",
      symbol: "BLAST",
      chianid: 81457,
      address: "0xb1a5700fA2358173Fe465e6eA4Ff52E36e88E2ad",
      decimal: "18",
      logoURI: "https://blastscan.io/token/images/blast_32.png",
      chainname: "blast",
      descode: `0xee`,
    },
    {
      name: "USDB ",
      symbol: "USDB",
      chianid: 81457,
      address: "0x4300000000000000000000000000000000000003",
      decimal: "18",
      logoURI: "https://blastscan.io/token/images/usdb_32.png",
      chainname: "blast",
      descode: `0xee`,
    },

    {
      name: "Wrapped Ether",
      symbol: "WETH",
      chianid: 81457,
      address: "0x4300000000000000000000000000000000000004",
      decimal: "18",
      logoURI:
        "https://d1k8z2xrei817b.cloudfront.net/images/logo/aave-polygon-weth-94f8bbe8.png",
      chainname: "blast",
      descode: `0xee`,
    },
  ];

  const token_data_POLY = [
    {
      name: "Tether USD",
      symbol: "USDT",
      chianid: 137,
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      decimal: "6",
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      chainname: "polygon",
      descode: `0x89`,
    },
    {
      name: "BNB",
      symbol: "BNB",
      chianid: 137,
      address: "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
      decimal: "18",
      logoURI: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      chainname: "polygon",
      descode: `0x89`,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      chianid: 137,
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      decimal: "6",
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
      chainname: "polygon",
      descode: `0x89`,
    },
    {
      name: "SHIBA INU",
      symbol: "SHIB",
      chianid: 137,
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      decimal: "18",
      logoURI:
        "https://s3.coinmarketcap.com/static/img/portraits/62837c68ab0e763d5f77e9a6.png",
      chainname: "polygon",
      descode: `0x89`,
    },
  ];

  const token_data_BNB = [
    {
      name: "Wrapped BNB",
      symbol: "WBNB",
      chianid: 56,
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimal: "18",
      logoURI: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      chainname: "bsc",
      descode: `0x38`,
    },
    {
      name: "TRX",
      symbol: "TRX",
      chianid: 56,
      address: "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3",
      decimal: "18",
      logoURI:
        "https://s3.coinmarketcap.com/static/img/portraits/62837c68ab0e763d5f77e9a6.png",
      chainname: "bsc",
      descode: `0x38`,
    },

    {
      name: "USDC",
      symbol: "USDC",
      chianid: 56,
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      decimal: "18",
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
      chainname: "bsc",
      descode: `0x38`,
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      chianid: 56,
      address: "0x2B90E061a517dB2BbD7E39Ef7F733Fd234B494CA",
      decimal: "6",
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      chainname: "bsc",
      descode: `0x38`,
    },
  ];

  const token_data_LINEA = [
    {
      name: "Tether USD",
      symbol: "USDT",
      chianid: 250,
      address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
      decimal: "6",
      logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      chainname: "linea",
      descode: `0xe705`,
    },
    {
      name: "USDC.e",
      symbol: "USDC",
      chianid: 250,
      address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      decimal: "6",
      logoURI: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png",
      chainname: "linea",
      descode: `0xe705`,
    },

    {
      name: "SHIBA INU",
      symbol: "SHIB",
      chianid: 250,
      address: "0x99AD925C1Dc14Ac7cc6ca1244eeF8043C74E99d5",
      decimal: "18",
      logoURI: "https://lineascan.build/token/images/shibainu_32.png",
      chainname: "linea",
      descode: `0xe705`,
    },
    {
      name: "Wrapped BTC",
      symbol: "WBTC",
      chianid: 250,
      address: "0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4",
      decimal: "8",
      logoURI:
        "https://cryptoclothing.cc/merch/wrapped-bitcoin-wbtc-sticker.jpg?v=031",
      chainname: "linea",
      descode: `0xe705`,
    },
  ];

  //for nwtwork select and bydefaultm evm network select
  useEffect(() => {
    const ethereumNetwork = NetworkData.find(
      (network) => network.name === "Ethereum"
    );
    if (ethereumNetwork) {
      setSelectChain(ethereumNetwork.img);
    }
  }, []);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  //for active button click sell,buy and swap
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Update the active button
    setSelectedTokenDatato({
      name_to: "",
      image_to: "",
      price_to: "",
      address_to: "",
      decimals_to: "",
      input_to: "",
      name_from: "",
      image_from: "",
      input_from: "",
      price_from: "",
      address_from: "",
      decimals_from: "",
      chainid: "",
      descode: "",
      chainname: "",
    });
  };

  //for select token value info.
  const selectToken = (token, networkData, e) => {
    if (selectedtofrom === 1) {
      setSelectedTokenDatato({
        ...selectedTokenDatato,

        name_to: token.symbol,
        image_to: token.logoURI || token.logo,
        chainid: token.chainid,
        address_to: token.address || token.token_address || token.mint,
        decimals_to: token.decimal,
        descode: token.descode,
        chainname: token.chainname || token.name,
      });
    } else if (selectedtofrom === 2) {
      setSelectedTokenDatato({
        ...selectedTokenDatato,
        name_from: token.symbol,
        image_from: token.logoURI,
        chainid: token.chainid,
        address_from: token.address,
        decimals_from: token.decimal,
        descode: token.descode,
        chainname: token.chainname,
      });
    }

    setSelectedSymbol(token.symbol);

    setClickedTokens((prevTokens) => {
      const tokensArray = Array.isArray(prevTokens) ? prevTokens : [];
      const updatedTokens = tokensArray.filter(
        (prevToken) => prevToken !== token.name
      );
      if (selectedtofrom === 1) {
        return [token.name, selectedTokenDatato.name_from];
      } else if (selectedtofrom === 2) {
        return [selectedTokenDatato.name_to, token.name];
      }
      return prevTokens;
    });

    setShowPopup(false);
  };

  //for swap amount and token value to to from || from to to value
  const handleSwapTokens = () => {
    setSelectedTokenDatato({
      ...selectedTokenDatato,
      name_to: selectedTokenDatato?.name_from,
      image_to: selectedTokenDatato?.image_from,
      price_to: selectedTokenDatato?.price_from,
      name_from: selectedTokenDatato?.name_to,
      image_from: selectedTokenDatato?.image_to,
      price_from: selectedTokenDatato?.price_to,
      input_to: selectedTokenDatato?.input_from,
      input_from: selectedTokenDatato?.input_to,
      address_to: selectedTokenDatato?.address_from,
      address_from: selectedTokenDatato?.address_to,
    });
  };

  //for token select in dropdown after show popup
  const tokenpopup = (e) => {
    setShowPopup(true);
    setSelectedtofrom(e);
    setSearchTerm("");
  };

  //for pass value to swap solana submit
  const dataSolana = {
    input: selectedTokenDatato?.address_to,
    output: selectedTokenDatato?.address_from,
    amount: Number(selectedTokenDatato?.input_to),
    email: email,
  };
  //for pass value to swap evm submit
  const dataEvm = {
    tokenIn: selectedTokenDatato?.address_to,
    tokenOut: selectedTokenDatato?.address_from,
    amount: Number(selectedTokenDatato?.input_to),
    chain: Number(selectedChainId),
    email: email,
    chainId: selectedTokenDatato?.chainname,
    desCode: selectedTokenDatato?.descode,
    method: "swap",
  };

  //for submit swap
  const handleSwapSubmit = async () => {
    setLoading(true);

    let endpoint;
    if (selectedNetwork === "Solana") {
      endpoint = "/solanaSwap";
    } else {
      endpoint = "/EVMswap";
    }

    axiosInstance
      .post(endpoint, selectedNetwork === "Solana" ? dataSolana : dataEvm)
      .then(async (res) => {
        const myData = res?.data;
        // console.log("Response from API:", myData);
        if (myData?.status) {
          toast.success(myData?.message);
          setTimeout(async () => {
            if (selectedNetwork == "Solana") {
              await getSolanaBalance();
            } else {
              await getWalletBalance(selectedNetwork);
            }
          }, 3000);
          resetFields();
        } else {
          toast.error(myData?.message);
        }
        // Reset all fields after successful transfer
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error("An error occurred while processing your request");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //for buy amount convert for both network
  const handleBuyprice = async () => {
    if (
      selectedTokenDatato?.input_to &&
      walletAddressbuysell &&
      selectedTokenDatato?.address_to
    ) {
      const amount = Number(selectedTokenDatato?.input_to);
      // console.log("--------amount", amount);

      try {
        let endpoint;
        if (selectedNetwork === "Solana") {
          endpoint = "/getSolanaTokenPrice";
        } else {
          endpoint = "/getEvmTokenPrice";
        }
        const tokenRes = await axiosInstance.post(
          endpoint,
          selectedNetwork === "Solana"
            ? {
                token: walletAddressbuysell,
                token2: selectedTokenDatato?.address_to,
              }
            : {
                token: walletAddressbuysell,
                token2: selectedTokenDatato?.address_to,
                chain: selectedTokenDatato?.descode,
              }
        );
        console.log("🚀 ~ getPrice1 ~ tokenRes:", tokenRes);

        const tokensPrice = tokenRes?.data?.finalRes;
        let buyAmt, finalAmt;
        if (selectedNetwork === "Solana") {
          buyAmt = amount * tokensPrice?.to;
          finalAmt = buyAmt / tokensPrice?.sol;
        } else {
          buyAmt = amount * tokensPrice?.token2;
          finalAmt = buyAmt / tokensPrice?.token1;
        }
        // console.log("finalllll--------",finalAmt)

        return finalAmt?.toFixed(4);
        // if (finalAmt) {
        //   setSelectedTokenDatato({
        //     ...selectedTokenDatato,
        //     input_to: finalAmt,
        //   });
        //     // newsinglegetPrice();
        // }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    }
  };

  //for buy submit for both network
  const handleBuySubmit = async () => {
    setLoading(true);

    let endpoint;
    if (selectedNetwork === "Solana") {
      endpoint = "/solanaSwap";
    } else {
      // endpoint = "/EVMswap";
      endpoint = "/EVMBuy";
    }

    axiosInstance
      .post(
        endpoint,
        selectedNetwork === "Solana"
          ? {
              input: walletAddressbuysell,
              output: selectedTokenDatato?.address_to,

              amount: Number(selectedTokenDatato?.input_to),
              email: email,
              method: "buy",
            }
          : {
              tokenIn: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
              tokenOut: selectedTokenDatato?.address_to,
              amount: Number(selectedTokenDatato?.input_to),
              chain: Number(selectedChainId),
              email: email,
              chainId: selectedTokenDatato?.chainname,
              desCode: selectedTokenDatato?.descode,
              method: "buy",
            }
      )
      .then(async (res) => {
        const myData = res?.data;
        console.log("Response from API:", myData);
        if (myData?.status) {
          toast.success(myData?.message);
          setTimeout(async () => {
            if (selectedNetwork == "Solana") {
              await getSolanaBalance();
            } else {
              await getWalletBalance(selectedNetwork);
            }
          }, 3000);
          resetFields();
        } else {
          toast.error(myData?.message);
        }
        // Reset all fields after successful transfer
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error("An error occurred while processing your request");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //for pass value to sell evm submit
  const dataEvmSell = {
    tokenIn: selectedTokenDatato?.address_to,
    tokenOut: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    amount: Number(selectedTokenDatato?.input_to),
    chain: Number(selectedChainId),
    email: email,
    chainId: selectedNetwork.toLowerCase(),
    desCode: SelectedDescode,
    method: "sell",
  };

  //for pass value to sell solana submit
  const dataSolanaSell = {
    input: selectedTokenDatato?.address_to,
    output: walletAddressbuysell,
    amount: Number(selectedTokenDatato?.input_to),
    email: email,
    method: "sell",
  };

  //for sell submit
  const handleSellSubmit = async () => {
    setLoading(true);
    let endpoint;
    if (selectedNetwork === "Solana") {
      endpoint = "/solanaSwap";
    } else {
      endpoint = "/EVMswap";
    }

    axiosInstance
      .post(
        endpoint,
        selectedNetwork === "Solana" ? dataSolanaSell : dataEvmSell
      )
      .then(async (res) => {
        const myData = res?.data;
        console.log("Response from API:", myData);
        if (myData?.status) {
          toast.success(myData?.message);
          setTimeout(async () => {
            if (selectedNetwork == "Solana") {
              await getSolanaBalance();
            } else {
              await getWalletBalance(selectedNetwork);
            }
          }, 3000);
        } else {
          toast.error(myData?.message);
        }
        resetFields(); // Reset all fields after successful transfer
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error("An error occurred while processing your request");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //amount convert evm from ox.arg
  //   const getPrice = async () => {
  //     if (
  //       selectedTokenDatato?.input_to &&
  //       selectedTokenDatato?.address_from &&
  //       selectedTokenDatato?.address_to
  //     ) {
  //       const amount =
  //         Number(selectedTokenDatato?.input_to) *
  //         10 ** selectedTokenDatato?.decimals_to;
  //       console.log("--------amount", amount);

  //       const params = {
  //         sellToken: selectedTokenDatato?.address_to,
  //         buyToken: selectedTokenDatato?.address_from,
  //         sellAmount: amount,
  //         takerAddress: walletAddress,
  //       };

  //       const headers = {
  //         "0x-api-key": process.env.NEXT_PUBLIC_0X_API_KEY,
  //       };

  //       try {
  //         const response = await fetch(
  //           `https://arbitrum.api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
  //           {
  //             headers,
  //           }
  //         );

  //         const swapPriceJSON = await response.json();
  //         setFetchtokendata(swapPriceJSON);
  //         const Tokenprice = swapPriceJSON.buyAmount;
  //         const Tokendecimals = 10 ** selectedTokenDatato?.decimals_from;
  //         const Finaltokenprice = Tokenprice / Tokendecimals;
  //         if (Finaltokenprice) {
  //           setSelectedTokenDatato({
  //             ...selectedTokenDatato,
  //             input_from: Finaltokenprice,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error fetching price:", error);
  //       } finally {
  //       }
  //     }
  //   };

  //both amount convert from backend api
  const getPrice = async () => {
    if (
      selectedTokenDatato?.input_to &&
      selectedTokenDatato?.address_from &&
      selectedTokenDatato?.address_to
    ) {
      const amount = Number(selectedTokenDatato?.input_to);
      //   10 ** selectedTokenDatato?.decimals_to;
      // console.log("--------amount", amount);
      try {
        let endpoint;
        if (selectedNetwork === "Solana") {
          endpoint = "/getSolanaTokenPrice";
        } else {
          endpoint = "/getEvmTokenPrice";
        }
        const tokenRes = await axiosInstance.post(
          endpoint,
          selectedNetwork === "Solana"
            ? {
                token: selectedTokenDatato?.address_to,
                token2: selectedTokenDatato?.address_from,
              }
            : {
                token: selectedTokenDatato?.address_to,
                token2: selectedTokenDatato?.address_from,
                chain: selectedTokenDatato?.descode,
              }
        );
        console.log("🚀 ~ getPrice1 ~ tokenRes:", tokenRes);

        const tokensPrice = tokenRes?.data?.finalRes;
        let buyAmt, finalAmt;
        if (selectedNetwork === "Solana") {
          buyAmt = amount * tokensPrice?.to;
          finalAmt = buyAmt / tokensPrice?.sol;
        } else {
          buyAmt = amount * tokensPrice?.token2;
          finalAmt = buyAmt / tokensPrice?.token1;
        }
        console.log("finalllll--------", finalAmt);
        // return finalAmt?.toFixed(4);
        if (finalAmt) {
          setSelectedTokenDatato({
            ...selectedTokenDatato,
            input_from: finalAmt,
          });
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    }
  };

  //show solana  balance at top
  const getSolanaBalance = async () => {
    try {
      const balanceRes = await axiosInstanceAuth.post(
        "/getSolanaWalletTokenBal",
        {
          wallet: solanaAddress,
        }
      );
      const balanceData = balanceRes?.data?.response1?.tokens;
      const nativeBalance = balanceRes?.data?.response1?.nativeBalance;

      console.log("fetchSolanabalance-------------------------->", balanceData);

      const imageRes = await axios.get("https://token.jup.ag/strict");

      const tokenImages = imageRes?.data;
      const mergedData = balanceData.map((token) => {
        const tokenImage = tokenImages.find(
          (image) => image.address === token.mint
        );
        return {
          ...token,
          logo: tokenImage ? tokenImage.logoURI : null,
        };
      });

      mergedData.unshift({
        mint: "SOL", // Assuming SOL is the native token symbol
        amount: nativeBalance.solana,
        name: "Solana",
        symbol: "SOL",
        logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",

        // Add more properties if needed
      });

      setShowBalance(mergedData);
    } catch (err) {
      console.log("error--->", err);
    }
  };

  //for show evm balance
  const getWalletBalance = async (networkName) => {
    const selectedNetwork = NetworkData.find(
      (network) => network.name == networkName
    );
    if (selectedNetwork !== "Solana") {
      const myDatawallet = {
        email: localStorage.getItem("email"),
        chainId: selectedNetwork?.descode,
      };
      try {
        const res = await axiosInstance.post("/fetchbalance", myDatawallet);

        const myData = res?.data?.data;
        // console.log( "fetchbalance------------------->", myData );
        setShowBalance(myData);
      } catch (err) {
        console.log("error--->", err);
        setShowBalance([]);
      }
    } else {
      console.error("Network not found");
    }
  };

  //for dropdown close and open
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //for take input value
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  //amountconvert for both network
  //   async function solanaTokenSwapPrice() {
  //     const tokenRes = await axios({
  //       method: "post",
  //       url: "http://localhost:3332/getSolanaTokenPrice",
  //       data: {
  //         token: selectedTokenDatato.address_to,
  //         token2: selectedTokenDatato.address_from,
  //       },
  //     });
  //     const tokensPrice = tokenRes?.data?.finalRes;
  //     const buyAmt = selectedTokenDatato?.input_to * tokensPrice?.sol;
  //     const finalAmt = buyAmt / tokensPrice?.to;
  //     return finalAmt?.toFixed(4);
  //   }

  //   async function evmTokenSwapPrice() {
  //     const desCode = NetworkData.filter(
  //       (ele, index) => ele?.name == selectedNetwork
  //     );
  //     const tokenRes = await axios({
  //       method: "post",
  //       url: "http://localhost:3332/getEvmTokenPrice",
  //       data: {
  //         token: selectedTokenDatato.address_to,
  //         token2: selectedTokenDatato.address_from,
  //         chain: desCode[0].descode,
  //       },
  //     });
  //     const tokensPrice = tokenRes?.data?.finalRes;
  //     const buyAmt = selectedTokenDatato?.input_to * tokensPrice?.token1;
  //     const finalAmt = buyAmt / tokensPrice?.token2;
  //     return finalAmt?.toFixed(4);
  //   }

  useEffect(() => {
    getPrice();
  }, [selectedTokenDatato?.address_from]);

  //
  //    async function getToQty() {
  //     if (selectedNetwork == "Solana") {
  //       if (
  //         selectedTokenDatato.address_from &&
  //         selectedTokenDatato.address_to &&
  //         selectedTokenDatato.input_to
  //       ) {
  //         setRefresh(true);
  //         solanaTokenSwapPrice()
  //           .then((res) => {
  //             setRefresh(false);
  //             setSelectedTokenDatato({
  //               ...selectedTokenDatato,
  //               input_from: res,
  //             });
  //           })
  //           .catch((error) => {
  //             setRefresh(false);
  //           });
  //       }
  //     } else {
  //       if (
  //         selectedTokenDatato.address_from &&
  //         selectedTokenDatato.address_to &&
  //         selectedTokenDatato.input_to
  //       ) {
  //         setRefresh(true);
  //         evmTokenSwapPrice()
  //           .then((res) => {
  //             setRefresh(false);
  //             setSelectedTokenDatato({
  //               ...selectedTokenDatato,
  //               input_from: res,
  //             });
  //           })
  //           .catch((err) => {
  //             setRefresh(false);
  //           });
  //       }
  //     }
  //   }

  //for take input and merge value
  const handleInputChanges = async (e) => {
    const { name, value } = e.target;
    if (!value || value == 0) {
      await setSelectedTokenDatato({
        ...selectedTokenDatato,
        input_from: 0,
        input_to: value,
      });
    } else {
      await setSelectedTokenDatato({
        ...selectedTokenDatato,
        [name]: value,
      });
    }
  };

  //for network select and networkdata array and other select value
  const handleOptionClick = (name) => {
    const selectedNetworkData = NetworkData.find(
      (network) => network.name === name
    );

    setSelectedNetwork(selectedNetworkData?.name);
    if (selectedNetworkData) {
      setSelectedChainId(selectedNetworkData.chainid);
      setwalletAddressbuysell(selectedNetworkData.walletAddressbuysell);
      setSelectedDescode(selectedNetworkData.descode);
      setShowDropdown(false);
    }
  };

  //Close popup when click outside of it
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [tokens, setTokens] = useState([]);

  //for solana image
  useEffect(() => {
    if (selectedNetwork == "Solana") {
      getSolanaBalance();
      axios
        .get("https://token.jup.ag/strict")
        .then((response) => {
          setTokens(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tokens:", error);
        });
    } else {
      getWalletBalance(selectedNetwork);
    }
  }, [selectedNetwork]);

  //for statice all array merge in 1 state
  const [tokenData, setTokenData] = useState({
    Ethereum: token_data_ETH,
    Solana: [],
    Arbitrum: token_data_ARB,
    Polygon: token_data_POLY,
    "BNB Chain": token_data_BNB,
    Blast: token_data_BLAST,
    Linea: token_data_LINEA,
  });

  useEffect(() => {
    setTokenData((prevTokenData) => ({
      ...prevTokenData,
      Solana: tokens,
    }));
  }, [tokens]);

  //Close showpopup1 token select second in dropdown when click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup1(false);
      }
    };

    if (showPopup1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup1]);

  //Close DropDown when click outside of it
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  return (
    <>
      <div
        style={{
          marginLeft: isNavbar && window.innerWidth >= 1440 ? "12%" : "0",
        }}
        className="  md:pl-4 sm:pl-4 xsm:pl-0 mx-auto transition-all duration-500 ease-in-out"
      >
        {/* 2xl:pl-64 xl:pl-64 */}
        <div className="   gap-6 lg:ml-3 lg:mr-6 md:ml-0 md:mr-6 ml-5  mr-5">
          {/* xl:ml-32 xl:mr-[92px]  */}
          <div className="text-lg font-semibold flex justify-between pt-2">
            <div
              className={`lg:scale-0 scale-[1] text-3xl `}
              onClick={() => setIsNavbar(!isNavbar)}
            >
              {isNavbar === false ? (
                <div className="cursor-pointer">
                  {/* <FaBars /> */}
                  {/* <FaBarsStaggered /> */}
                  {/* <TbArrowBarRight /> */}

                  <Image
                    src={openarrow}
                    alt="open sidebar arrow"
                    width={30}
                    // height={40}
                  />
                </div>
              ) : (
                <div className="  cursor-pointer">
                  {/* <MdKeyboardDoubleArrowLeft /> */}
                  {/* <TbArrowBarLeft /> */}
                  <Image
                    src={closearrow}
                    alt="open sidebar arrow"
                    width={30}
                    // height={40}
                  />
                </div>
              )}
            </div>
            <button
              className="bg-[#1e2529] hover:bg-[#323b41] rounded-lg  px-5 py-1  text-[17px]"
              onClick={() => {
                setBalancePopup(true);
              }}
            >
              Show Balance
            </button>
          </div>
          <div className="h-[94vh] w-full flex justify-center items-center px-5">
            <div className="swap flex flex-col items-center justify-between   text-white ">
              <div className="flex flex-col justify-center items-center space-y-5">
                <div className="flex flex-col bg-slate-600 bg-opacity-10 p-6 rounded-lg shadow-lg  space-y-2 md:w-full flex-container">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex justify-between gap-5 text-lg mx-1 w-full">
                      <div>
                        <button
                          className={`md:mr-10 mr-6 ${
                            activeButton === "Swap"
                              ? "bg-blue-500 px-2 rounded-lg"
                              : ""
                          }`}
                          onClick={() => handleButtonClick("Swap")}
                        >
                          Swap
                        </button>
                        <button
                          className={`md:mr-10 mr-6 ${
                            activeButton === "Buy"
                              ? "bg-blue-500 px-2 rounded-lg"
                              : ""
                          }`}
                          onClick={() => handleButtonClick("Buy")}
                        >
                          Buy
                        </button>
                        <button
                          className={`${
                            activeButton === "Sell"
                              ? "bg-blue-500 px-2 rounded-lg"
                              : ""
                          }`}
                          onClick={() => handleButtonClick("Sell")}
                        >
                          Sell
                        </button>
                      </div>

                      <div
                        ref={dropdownRef}
                        className="dropdown-container relative"
                      >
                        <button
                          className="dropdown-toggle focus:outline-none flex"
                          onClick={toggleDropdown}
                        >
                          {selectChain && (
                            <Image
                              src={selectChain}
                              alt="selected Chain Logo"
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 text-gray-400 ${
                              showDropdown ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* {showDropdown && ( */}
                        <div
                          className={`overflow-hidden ${
                            showDropdown
                              ? "h-[430px] overflow-y-scroll py-2"
                              : "h-0"
                          } dropdown transition-all ease-in-out duration-300 absolute bg-gray-800 rounded-lg mt-1 w-48 md:min-w-fit z-10 ml-[-162px]`}
                        >
                          <ul>
                            <ul>
                              {NetworkData.map((item, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    handleOptionClick(item.name);
                                    setSelectChain(item?.img);

                                    setSelectedTokenDatato({
                                      name_to: "",
                                      image_to: "",
                                      price_to: "",
                                      address_to: "",
                                      decimals_to: "",
                                      input_to: "",
                                      name_from: "",
                                      image_from: "",
                                      input_from: "",
                                      price_from: "",
                                      address_from: "",
                                      decimals_from: "",
                                      chainid: "",
                                      descode: "",
                                      chainname: "",
                                    });
                                  }}
                                  className={`flex items-center py-2 px-4 cursor-pointer hover:bg-gray-700 ${
                                    selectedNetwork === item.name
                                      ? "bg-blue-500"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    src={item.img}
                                    alt={item.name}
                                    className="!h-[30px] !w-[30px] mr-2 rounded-full"
                                  />
                                  <span className="text-white">
                                    {item.name}
                                  </span>
                                  {selectedNetwork === item.name && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6 text-white mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </ul>
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-slate-400 bg-opacity-10 rounded-lg p-5">
                    <div className="text-gray-300">
                      <p>You pay</p>
                    </div>
                    <div className="flex justify-between py-2">
                      <div className="space-y-2">
                        <input
                          type="number"
                          className="border-none bg-transparent w-32 md:w-auto overflow-hidden outline-none text-2xl"
                          placeholder="0"
                          name="input_to"
                          value={selectedTokenDatato?.input_to}
                          onChange={(e) => {
                            handleInputChanges(e);
                          }}
                        />
                      </div>

                      <div
                        className="bg-gray-600 bg-opacity-50 cursor-pointer flex justify-center items-center px-2 py-1 gap-2 rounded-full "
                        onClick={() => tokenpopup(1)}
                      >
                        <div>
                          {selectedTokenDatato?.image_to ? (
                            <img
                              src={selectedTokenDatato?.image_to}
                              height={30}
                              width={30}
                              alt="logo"
                              className="rounded-full"
                            />
                          ) : null}
                        </div>
                        <div>
                          {selectedTokenDatato?.name_to
                            ? selectedTokenDatato?.name_to.toUpperCase()
                            : "Token"}
                        </div>
                        <div>
                          <MdKeyboardArrowDown size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {activeButton === "Swap" && (
                    <>
                      <div
                        className="flex justify-center items-center bg-gray-600 bg-opacity-50 text-white  p-2 mx-auto rounded-md cursor-pointer"
                        onClick={() => handleSwapTokens()}
                      >
                        <IoSwapVerticalOutline size={20} className="" />
                      </div>
                      <div className="flex flex-col bg-slate-400 bg-opacity-10 rounded-lg p-5">
                        <div className="text-gray-300 flex items-center gap-3">
                          <p>You receive</p>
                          <button onClick={() => getPrice()}>
                            <FiRefreshCcw
                              className={`text-[18px] ${
                                refresh ? "animate-spin" : null
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex justify-between py-2">
                          <div className="space-y-2">
                            {/* <h1 className="text-[24px] text-slate-400">
                          {selectedTokenDatato?.input_from
                            ? selectedTokenDatato?.input_from
                            : 0}
                        </h1> */}
                            <input
                              type="text"
                              className="border-none bg-transparent w-32 md:w-auto overflow-hidden outline-none text-2xl "
                              placeholder="0"
                              name="from"
                              value={selectedTokenDatato?.input_from}
                              onChange={(e) => {
                                handleInputChanges(e);
                              }}
                            />
                          </div>
                          {/*{swap 2}*/}
                          <div
                            className="bg-gray-600 bg-opacity-50 cursor-pointer flex justify-center items-center px-2 py-1 gap-2 rounded-full "
                            onClick={() => tokenpopup(2)}
                          >
                            <div>
                              {selectedTokenDatato?.image_from ? (
                                <img
                                  src={selectedTokenDatato?.image_from}
                                  height={30}
                                  width={30}
                                  alt="logo"
                                  className="rounded-full"
                                />
                              ) : null}
                            </div>
                            <div>
                              {selectedTokenDatato?.name_from
                                ? selectedTokenDatato?.name_from.toUpperCase()
                                : "Token"}
                            </div>
                            <div>
                              <MdKeyboardArrowDown size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="w-full">
                    <button
                      className={`px-3 py-2 w-full rounded-md text-xl bg-blue-500 flex items-center justify-center`}
                      onClick={() => {
                        if (activeButton === "Swap") {
                          handleSwapSubmit();
                        } else if (activeButton === "Buy") {
                          handleBuySubmit();
                        } else if (activeButton === "Sell") {
                          handleSellSubmit();
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loader "></span>
                      ) : (
                        activeButton
                      )}
                    </button>
                  </div>
                  {activeButton === "Buy" && (
                    <div className="mt-2 text-yellow-500 text-center">
                      {errorMessage}
                    </div>
                  )}
                  {activeButton === "Sell" && (
                    <div className="mt-2 text-yellow-500 text-center">
                      {errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            showPopup ? "scale-[1]" : "scale-0"
          } fixed duration-75 ease-in-out transition-all inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 `}
        >
          <div
            ref={popupRef}
            className={`${
              showPopup ? "scale-[1]" : "scale-0"
            } fixed duration-300 ease-in-out transition-all`}
          >
            <div className="bg-[#1c1c1c] shadow-blue-700 shadow-sm p-3 rounded-2xl md:w-[45vh] xsm:w-[19rem]  ">
              <div className=" space-y-5">
                <div className="flex justify-between items-center py-2 ">
                  <div className="text-xl">Select Token</div>
                  <div
                    onClick={() => setShowPopup(false)}
                    className="cursor-pointer"
                  >
                    <IoMdClose size={24} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between">
                  <div className="md:w-[360px] mb-4 md:mb-0">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-zinc-500 text-white rounded-lg p-2 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="h-[60vh] overflow-y-auto">
                {activeButton == "Sell" ? (
                  <>
                    {" "}
                    {showBalance?.length > 0 ? (
                      showBalance?.map((item, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 justify-start items-center mx-5 py-2 cursor-pointer ${clickedTokens.includes(
                            item.name
                          )}`}
                          onClick={() => {
                            {
                              selectToken(item);
                            }
                          }}
                        >
                          <img
                            src={item.logo}
                            alt={item.name || "Token"}
                            height={30}
                            width={30}
                            className="h-15 w-15 my-3 rounded-full"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "fallback-image-url";
                            }}
                          />
                          <div className="flex flex-col justify-center">
                            <div
                              className={`text-base font-bold ${clickedTokens.includes(
                                item.name
                              )}`}
                            >
                              {item.name}
                            </div>
                            <div className="text-base font-bold">
                              {item.symbol}
                            </div>
                            <div className="text-base">
                              Balance:{" "}
                              <span className="font-bold">
                                {selectedNetwork === "Solana"
                                  ? Number(item?.amount)?.toFixed(3)
                                  : Number(item?.balance_formatted)?.toFixed(3)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="mt-16 text-xl">No data</div>
                    )}
                  </>
                ) : (
                  <TokenList
                    tokens={tokenData[selectedNetwork]}
                    clickedTokens={clickedTokens}
                    selectToken={selectToken}
                    searchTerm={searchTerm}
                    showBalance={showBalance}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}

        <div
          className={`${
            balancePopup ? "scale-1" : "scale-0"
          } transition-all ease-in-out !duration-75 absolute top-0 h-[94vh] lg:h-[100vh] w-full left-0 z-[9999] flex justify-center items-center bg-[#0000007a]`}
          onClick={(e) => setBalancePopup(false)}
        >
          <BalancePopUp
            setBalancePopup={setBalancePopup}
            balancePopup={balancePopup}
            showBalance={showBalance}
            selectedNetwork={selectedNetwork}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Swap;
