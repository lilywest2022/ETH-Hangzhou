import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import { Popover, } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { ethers } from "ethers"
import networkMapping from "../constants/networkMapping.json"
import vidToken_abi from "../constants/VIDToken.json"
import account from "../constants/account.json"
import React, { useContext } from "react"
import { SharedStateContext } from "../components/SharedStateContext"

const VIDToken_addr = networkMapping["31337"].VIDToken[0]
const TESTNET_URL = "http://localhost:8545"

export default function VideoPage () {
    const router = useRouter()
    const {
        userbalance,
        setuserBalance,
        platformbalance,
        setplatformBalance,
        advertiserbalance,
        setadvertiserBalance,
    } = useContext(SharedStateContext)
    const [videoId, setVideoId] = useState(null)

    const adImages = ["/ad/adimage/ad1.jpg", "/ad/adimage/ad2.jpg", "/ad/adimage/ad3.jpg"]
    const adVideos = ["/ad/advideo/ad1.mp4", "/ad/advideo/ad2.mp4", "/ad/advideo/ad3.mp4"]

    const [currentAdIndex, setCurrentAdIndex] = useState(0)
    const adInterval = useRef(null)

    useEffect(() => {
        if (router && router.query) {
            setVideoId(router.query.id)
        }
    }, [router])

    useEffect(() => {
        adInterval.current = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length)
        }, 1000)

        return () => {
            clearInterval(adInterval.current)
        }
    }, [])

    const handleAdClick = async (index) => {
        const videoIdFromAd = adVideos[index].split("/").pop().split(".")[0]
        setVideoId(videoIdFromAd)
        // 这里可以是广告页面的路由，例如/ad/ad1，你需要根据实际情况调整
        const adPagePath = `/ad/${adVideos[index].split("/").pop().split(".")[0]}`
        router.push(adPagePath)
        const provider = new ethers.JsonRpcProvider(TESTNET_URL)
        const accounts = await provider.getSigner()
        const admin = account["account"][0]
        const platform = account["account"][3]
        const user_address = account["account"][1]
        const advertiser = account["account"][2]
        console.log("platform", platform)
        console.log("user_account", user_address)

        const vidToken = new ethers.BaseContract(VIDToken_addr, vidToken_abi, accounts)
        console.log("vidToken", vidToken)
        await vidToken.connect(user_address)

        const tx3 = await vidToken.burn(advertiser, ethers.parseEther("100"))
        const advertiser_balance = ethers.formatEther(await vidToken.balanceOf(advertiser))

        setadvertiserBalance(advertiser_balance.toString())
    }

        

    if (!videoId) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <header className="relative">
                <nav aria-label="Top">
                    {/* Top navigation */}
                    <div className="bg-gray-900">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            {/* Currency selector */}


                            <div className="flex items-center space-x-6">
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                    Sign in
                                </a>
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                    Create an account
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Secondary navigation */}
                    <div className="bg-white shadow-sm">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                {/* Logo (lg+) */}
                                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                    <a href="#">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </a>
                                </div>

                                <div className="hidden h-full lg:flex">
                                    {/* Flyout menus */}
                                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                                        <div className="flex h-full justify-center space-x-8">

                                        </div>
                                    </Popover.Group>
                                </div>

                                {/* Mobile menu and search (lg-) */}
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileMenuOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Search */}
                                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Logo (lg-) */}
                                <a href="#" className="lg:hidden">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                        className="h-8 w-auto"
                                    />
                                </a>

                                <div className="flex flex-1 items-center justify-end">
                                    <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                        Upload
                                    </a>

                                    <div className="flex items-center lg:ml-8">
                                        {/* Help */}
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                                            <span className="sr-only">Help</span>
                                            <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                        <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                                            Help
                                        </a>

                                        {/* Cart */}
                                        <div className="ml-4 flow-root lg:ml-8">
                                            <a href="#" className="group -m-2 flex items-center p-2">
                                                <ShoppingBagIcon
                                                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                                <span className="sr-only">items in cart, view bag</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header >
            <h1>Playing Video {videoId}</h1>
            <video width="640" height="360" controls autoPlay>
                <source src={`/videos/${videoId}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <br />
            <br />
            <div className="flex justify-center">广告</div>

            <div className="overflow-hidden relative w-640px top-1">
                <img
                    src={adImages[currentAdIndex]}
                    alt="Advertisement"
                    className="transition-opacity w-full h-auto"
                    onClick={() => handleAdClick(currentAdIndex)}
                />
            </div>


            <section aria-labelledby="featured-heading" className="relative mt-16 overflow-hidden rounded-lg lg:h-96">
                <div className="absolute inset-0">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
                <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
                <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:flex-col lg:items-start lg:rounded-tl-lg lg:rounded-br-none">
                    <div>
                        <h2 id="featured-heading" className="text-xl font-bold text-white">
                            Workspace Collection
                        </h2>
                        <p className="mt-1 text-sm text-gray-300">
                            Upgrade your desk with objects that keep you organized and clear-minded.
                        </p>
                    </div>
                    <a
                        href="#"
                        className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 py-3 px-4 text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
                    >
                        View the collection
                    </a>
                </div>
            </section>
        </div>
    )
}
