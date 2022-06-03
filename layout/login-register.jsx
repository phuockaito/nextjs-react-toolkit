import * as React from "react";
import { GoogleLogin } from "react-google-login";

import { Image, LinkHref } from "@/customize";
import { useAuth } from "@/hooks";
import { BackgroundLogin, IconLogo } from "@/image/index";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";

export const LoginRegister = ({
    children,
    title,
    description,
    url_page,
    title_url_page,
    title_sign_connect,
    description_page,
}) => {
    const [loading, setLoading] = React.useState(false);
    const { handleGoogleLogin } = useAuth();
    const responseGoogle = async ({ tokenId }) => {
        setLoading(true);
        try {
            await handleGoogleLogin({ tokenId: tokenId });
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen overflow-y-hidden">
            <div className="relative basis-9/12 bg-[#d4dbf9]">
                <div className="absolute left-0 top-0">
                    <Image src={BackgroundLogin.src} alt="" className="h-full w-full" />
                </div>
            </div>
            <div className="basis-3/12 bg-white p-12">
                <div className="flex flex-col">
                    <LinkHref href="/" className="mb-6 flex justify-center">
                        <Image src={IconLogo.src} alt="" className="h-14 w-40" />
                    </LinkHref>
                    <div className="my-20">
                        {title && <h6 className="mb-2 text-[1.015625rem] text-[#556ee6]">{title}</h6>}
                        {description && <p className="mb-5 text-[0.85rem] text-[#74788d]">{description}</p>}
                        {children}
                        {title_sign_connect && (
                            <p className="my-4 text-center text-[14px] font-medium text-[#495057]">
                                {title_sign_connect}
                            </p>
                        )}
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full bg-[#556ee6]">
                                <BsFacebook className="text-white" />
                            </div>
                            <div className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full bg-[#50a5f1]">
                                <BsTwitter className="text-white" />
                            </div>
                            <GoogleLogin
                                clientId="122492016743-7udd70aeqetm6u3g58r8c4i9cc8rfs8s.apps.googleusercontent.com"
                                onSuccess={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                                icon={false}
                                buttonText=""
                                render={(renderProps) => (
                                    <>
                                        {loading ? (
                                            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#f46a6a]">
                                                <AiOutlineLoading className="animate-spin text-white" />
                                            </div>
                                        ) : (
                                            <div
                                                onClick={renderProps.onClick}
                                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#f46a6a]"
                                            >
                                                <AiOutlineGoogle className="text-white" />
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <p className="mt-12 text-center text-[0.85rem] text-[#74788d]">
                            {description_page}
                            <LinkHref href={url_page} className="ml-2 text-[#556ee6]">
                                {title_url_page}
                            </LinkHref>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
