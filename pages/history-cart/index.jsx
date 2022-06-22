import * as React from "react";
import NoSSR from "react-no-ssr";
import useSWR from "swr";
import NumberFormat from "react-number-format";

import { Header } from "@/components";
import { apiCart } from "@/api-client";
import { Image,LinkHref } from "@/customize";
import { VscTrash, VscEdit } from "react-icons/vsc";

const HistoryCart = () => {
    const { data } = useSWR("/history-cart", () => apiCart.getCart());

    if (!data) return <h3>loading...</h3>;

    return (
        <React.Fragment>
            <NoSSR>
                <div className="grid divide-y divide-[#eaeaea]">
                    {data.cart.map((items) => (
                        <div key={items._id}>
                            <div className="grid">
                                {items.cart.map((info, index) => (
                                    <div key={index} className="flex gap-x-4 p-2 hover:bg-[#eaeaea]">
                                        <Image
                                            src={info.product.image}
                                            className="h-[50px] w-[50px]"
                                            alt={info.product.name}
                                        />
                                        <div className="flex w-full flex-1 flex-col">
                                            <div className="flex justify-between gap-2">
                                                <LinkHref href={`/detail/${info.product._id}`}>
                                                <h3 className="capitalize text-gray-900">{info.product.name}</h3>
                                                </LinkHref>
                                                <p className="font-semibold">
                                                    <NumberFormat
                                                        value={info.product.price}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                    />
                                                </p>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <h3 className="text-slate-500">
                                                    Size: <span>{info.product.size}</span>
                                                </h3>
                                                <h3 className="text-slate-500">
                                                    Số lượng: <span>{info.quantity}</span>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between p-2">
                                <div>
                                    <h3 className="flex items-center gap-2">
                                        Địa chỉ:
                                        <span>{items.address}</span>
                                    </h3>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-red-600">
                                        Tổng tiền:
                                        <span>
                                            <NumberFormat
                                                value={items.totalSum}
                                                displayType="text"
                                                thousandSeparator={true}
                                            />
                                        </span>
                                    </h3>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border border-red-600">
                                        <VscTrash className="text-red-600" />
                                    </div>
                                    <div className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border border-blue-600">
                                        <VscEdit className="text-blue-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </NoSSR>
        </React.Fragment>
    );
};

export default HistoryCart;
HistoryCart.getLayout = (page) => <Header>{page}</Header>;
