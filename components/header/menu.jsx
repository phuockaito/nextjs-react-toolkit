import * as React from "react";
import Link from "next/link";
import useSWR from "swr";
import { Badge } from "antd";

import { Image, LinkHref } from "@/customize";
import { IconLogo } from "@/image/index";
import { useAuth, useCart } from "@/hooks";
import { Search } from "./search";
import { Profile } from "./profile";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Menu = () => {
    const { data, error } = useSWR("/menu", {
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000,
    });
    const { profile } = useAuth();
    const { storeCart } = useCart();

    if (!data || error) {
        return (
            <header className="sticky top-0 z-[5] h-20 border-b bg-white px-6 shadow-md">
                <div className=" flex h-full items-center gap-4">
                    {[...new Array(5)].map((_, index) => (
                        <div key={index.toString()} className="h-5 w-28 animate-pulse rounded bg-slate-400" />
                    ))}
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-[5] border-b bg-white px-4 py-2 shadow-md">
            <nav className="relative block">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <LinkHref href="/" className="mr-2 flex">
                            <Image src={IconLogo.src} alt="" className="h-14 w-40" />
                        </LinkHref>
                        <ul className="menu">
                            <li>
                                <Link href="/" rel="canonical">
                                    <a className="menu-item font-normal text-[#6e6d7a] hover:text-[#4058ff]">Home</a>
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
                    <div className="flex items-center gap-4">
                        <Search />
                        <Badge count={storeCart.dataCart.length}>
                            <LinkHref href="/cart">
                                <AiOutlineShoppingCart className="text-[1.2rem] text-[#6e6d7a]" />
                            </LinkHref>
                        </Badge>
                        {profile ? (
                            <Profile {...profile} />
                        ) : (
                            <div className="flex items-center gap-4">
                                <LinkHref
                                    className="rounded-[0.25rem] border border-[#4058ff] bg-[#4058ff] px-6 py-2 text-white hover:bg-white hover:text-[#4058ff]"
                                    href="/login"
                                >
                                    Login
                                </LinkHref>
                                <LinkHref
                                    className="rounded-[0.25rem] border border-[#4058ff] bg-[#4058ff] px-6 py-2 text-white hover:bg-white hover:text-[#4058ff]"
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
