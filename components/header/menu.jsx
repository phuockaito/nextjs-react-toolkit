import * as React from "react";
import Link from "next/link";
import useSWR from "swr";

import { Image, LinkHref } from "@/customize";
import { IconLogo } from "@/image/index";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { useAuth } from "@/hooks";
import { Search } from "./search";
import { Profile } from "./profile";

export const Menu = () => {
    const { data, error } = useSWR("/menu", {
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000,
    });
    const { profile } = useAuth();

    if (!data || error) {
        return (
            <header className="px-6 border-b bg-white sticky top-0 z-[5] shadow-md h-20">
                <div className=" flex gap-4 h-full items-center">
                    {[...new Array(5)].map((_, index) => (
                        <div key={index.toString()} className="animate-pulse h-5 bg-slate-400 rounded w-28" />
                    ))}
                </div>
            </header>
        );
    }

    return (
        <header className="px-4 py-2 border-b bg-white sticky top-0 z-[5] shadow-md">
            <nav className="relative block">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <LinkHref href="/" className="flex mr-2">
                            <Image src={IconLogo.src} alt="" className="w-40 h-14" />
                        </LinkHref>
                        <ul className="menu">
                            <li>
                                <Link href="/" rel="canonical">
                                    <a className="menu-item text-[#6e6d7a] font-normal hover:text-[#4058ff]">Home</a>
                                </Link>
                            </li>
                            {Object.entries(data).map((menu) => (
                                <li key={menu[0]} className="menu-item">
                                    <LinkHref href={`/trademark/${menu[0].toLowerCase()}`}>{menu[0]}</LinkHref>
                                    <div className="site-nav-hover-menu">
                                        <ul className="sub-menu">
                                            {menu[1].map((item) => (
                                                <li key={item}>
                                                    <Link href={`/product/${item.replace(/ /g, "-")}`} rel="canonical">
                                                        <a className="menu-item">{item}</a>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Search />
                        {profile ? (
                            <Profile {...profile} />
                        ) : (
                            <div className="flex gap-4 items-center">
                                <LinkHref
                                    className="px-6 py-2 bg-[#4058ff] text-white rounded-[0.25rem] border border-[#4058ff] hover:bg-white hover:text-[#4058ff]"
                                    href="/login"
                                >
                                    Login
                                </LinkHref>
                                <LinkHref
                                    className="px-6 py-2 bg-[#4058ff] text-white rounded-[0.25rem] border border-[#4058ff] hover:bg-white hover:text-[#4058ff]"
                                    href="/register"
                                >
                                    Sign up
                                </LinkHref>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};
