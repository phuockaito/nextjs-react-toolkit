import { Image, LinkHref } from "@/customize";
import { BackgroundLogin, IconLogo } from "@/image/index";

import { AiOutlineGoogle } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";

export const LoginRegister = ({
    children,
    title,
    description,
    url_page,
    title_url_page,
    title_sign_connect,
    description_page,
}) => {
    return (
        <div className="flex min-h-screen overflow-y-hidden">
            <div className="basis-9/12 bg-[#d4dbf9] relative">
                <div className="absolute left-0 top-0">
                    <Image
                        src={BackgroundLogin.src}
                        alt=""
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className="basis-3/12 bg-white p-12">
                <div className="flex flex-col">
                    <LinkHref href="/" className="flex mb-6 justify-center">
                        <Image
                            src={IconLogo.src}
                            alt=""
                            className="w-40 h-14"
                        />
                    </LinkHref>
                    <div className="my-20">
                        {title && (
                            <h6 className="mb-2 text-[1.015625rem] text-[#556ee6]">
                                {title}
                            </h6>
                        )}
                        {description && (
                            <p className="mb-5 text-[#74788d] text-[0.85rem]">
                                {description}
                            </p>
                        )}
                        {children}
                        {title_sign_connect && (
                            <p className="text-[#495057] font-medium text-[14px] text-center my-4">
                                {title_sign_connect}
                            </p>
                        )}
                        <div className="flex gap-2 items-center justify-center">
                            <div className="w-8 h-8 cursor-not-allowed flex items-center justify-center rounded-full bg-[#556ee6]">
                                <BsFacebook className="text-white" />
                            </div>
                            <div className="w-8 h-8 cursor-not-allowed flex items-center justify-center rounded-full bg-[#50a5f1]">
                                <BsTwitter className="text-white" />
                            </div>
                            <div className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-[#f46a6a]">
                                <AiOutlineGoogle className="text-white" />
                            </div>
                        </div>
                        <p className="text-center text-[#74788d] text-[0.85rem] mt-12">
                            {description_page}
                            <LinkHref
                                href={url_page}
                                className="text-[#556ee6] ml-2"
                            >
                                {title_url_page}
                            </LinkHref>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
