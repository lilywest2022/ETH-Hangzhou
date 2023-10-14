import { Fragment, useState } from "react"
import { Dialog, Disclosure, Menu, Popover, Tab, Transition } from "@headlessui/react"
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"

import { ethers } from "ethers"
import networkMapping from "../constants/networkMapping.json"
import vidToken_abi from "../constants/VIDToken.json"
import account from "../constants/account.json"
import React, { useContext } from "react"
import { SharedStateContext } from "../components/SharedStateContext"
import path from "path"
import fs from "fs"

const VIDToken_addr = networkMapping["31337"].VIDToken[0]
const TESTNET_URL = "http://localhost:8545"

import { ChevronDownIcon } from "@heroicons/react/20/solid"

export async function getStaticProps() {
    const videoDir = path.join(process.cwd(), "public", "videos")
    const filenames = fs.readdirSync(videoDir)

    const products1 = filenames.map((filename, index) => ({
        id: path.basename(filename, "mp4"),
        name: "video",
        href: "#",
        owner: "owner",
        description: "Heather Gray",
        imageSrc: `/thumbnails/${path.basename(filename, ".mp4")}.jpg`,
        imageAlt: `Thumbnail for video ${index + 1}`,
    }))

    return {
        props: {
            products1,
        },
    }
}
export default function Example({ products1 }) {
    const {
        userbalance,
        setuserBalance,
        platformbalance,
        setplatformBalance,
        advertiserbalance,
        setadvertiserBalance,
    } = useContext(SharedStateContext)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <div className="bg-gray-50">
            <div>
                {/* Mobile menu */}
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileMenuOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pt-5 pb-2">
                                        <button
                                            type="button"
                                            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Links */}

                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        <div className="flow-root">
                                            <a
                                                href="#"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                Create an account
                                            </a>
                                        </div>
                                        <div className="flow-root">
                                            <a
                                                href="#"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                Sign in
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        {/* Currency selector */}
                                        <form>
                                            <div className="inline-block">
                                                <label
                                                    htmlFor="mobile-currency"
                                                    className="sr-only"
                                                >
                                                    Currency
                                                </label>
                                                <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                                    <select
                                                        id="mobile-currency"
                                                        name="currency"
                                                        className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                                                    ></select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                                        <ChevronDownIcon
                                                            className="h-5 w-5 text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <header className="relative">
                    <nav aria-label="Top">
                        {/* Top navigation */}
                        <div className="bg-gray-900">
                            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                                {/* Currency selector */}

                                <div className="flex items-center space-x-6"></div>
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
                                            <div className="flex h-full justify-center space-x-8"></div>
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
                                        <a
                                            href="#"
                                            className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
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
                                        <a
                                            href="/upload"
                                            className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                                        >
                                            Upload
                                        </a>

                                        <div className="flex items-center lg:ml-8">
                                            {/* Help */}
                                            <a
                                                href="#"
                                                className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                                            >
                                                <span className="sr-only">Help</span>
                                                <QuestionMarkCircleIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                            <a
                                                href="#"
                                                className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                                            >
                                                Help
                                            </a>

                                            {/* Cart */}
                                            <div className="ml-4 flow-root lg:ml-8">
                                                <a
                                                    href="#"
                                                    className="group -m-2 flex items-center p-2"
                                                >
                                                    <ShoppingBagIcon
                                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                        0
                                                    </span>
                                                    <span className="sr-only">
                                                        items in cart, view bag
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 sm:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="py-24 text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                Decentralized Video-revenue Distribution platform
                            </h1>
                            <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                                Thoughtfully designed objects for the workspace, home, and travel.
                            </p>
                        </div>

                        {/* Product grid */}
                        <section aria-labelledby="products-heading" className="mt-8">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                {products1.map((product) => (
                                    <a key={product.id} href={product.href} className="group">
                                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                onClick={async function handlewatchClick() {
                                                    window.location.pathname = `/${product.id}`
                                                    const provider = new ethers.JsonRpcProvider(
                                                        TESTNET_URL
                                                    )
                                                    const accounts = await provider.getSigner()
                                                    const admin = account["account"][0]
                                                    const platform = account["account"][3]
                                                    const user_address = account["account"][1]
                                                    const advertiser = account["account"][2]
                                                    console.log("platform", platform)
                                                    console.log("user_account", user_address)

                                                    const vidToken = new ethers.BaseContract(
                                                        VIDToken_addr,
                                                        vidToken_abi,
                                                        accounts
                                                    )
                                                    console.log("vidToken", vidToken)
                                                    await vidToken.connect(user_address)
                                                    const tx1 = await vidToken.mint(
                                                        platform,
                                                        ethers.parseEther("70")
                                                    )
                                                    const tx2 = await vidToken.mint(
                                                        user_address,
                                                        ethers.parseEther("30")
                                                    )
                                                    const user_balance = ethers.formatEther(
                                                        await vidToken.balanceOf(user_address)
                                                    )
                                                    const platform_balance = ethers.formatEther(
                                                        await vidToken.balanceOf(platform)
                                                    )

                                                    setuserBalance(user_balance.toString())

                                                    setplatformBalance(platform_balance.toString())
                                                }}
                                            />
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                            <h3>{product.name}</h3>
                                            <p>{product.owner}</p>
                                        </div>
                                        <p className="mt-1 text-sm italic text-gray-500">
                                            {product.description}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </section>

                        <section
                            aria-labelledby="featured-heading"
                            className="relative mt-16 overflow-hidden rounded-lg lg:h-96"
                        >
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
                                    <h2
                                        id="featured-heading"
                                        className="text-xl font-bold text-white"
                                    >
                                        Workspace Collection
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-300">
                                        Upgrade your desk with objects that keep you organized and
                                        clear-minded.
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

                        <section aria-labelledby="more-products-heading" className="mt-16 pb-24">
                            <h2 id="more-products-heading" className="sr-only">
                                More products
                            </h2>
                        </section>
                    </div>
                </main>

                <footer
                    aria-labelledby="footer-heading"
                    className="border-t border-gray-200 bg-white"
                >
                    <h2 id="footer-heading" className="sr-only">
                        Footer
                    </h2>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-t border-gray-100 py-10 text-center">
                            <p className="text-sm text-gray-500">
                                &copy; 2021 Your Company, Inc. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
