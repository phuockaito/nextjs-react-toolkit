import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import { Button, Input, LoginRegister } from "@/layout";
import { MetaTag } from "@/customize";
import { useAuth } from "@/hooks";

import { VscLock } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";

import { defaultURL, defaultDescription, defaultContent, defaultThumbnail, defaultKeyword } from "const";

const schema = yup.object().shape({
    email: yup.string().email("Email không họp lệ").required("Vui lòng nhập email của bạn!"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu của bạn!")
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Phải chứa một chữ hoa, một chữ thường, một số và một ký tự viết hoa đặc biệt!"
        ),
});

const Login = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [infoLogin, setInfoLogin] = React.useState({
        messageError: null,
        loadingLogin: false,
    });
    const { handleLogin } = useAuth({
        revalidateOnMount: false,
    });

    const submitLogin = async (data) => {
        setInfoLogin({
            messageError: null,
            loadingLogin: true,
        });
        try {
            await handleLogin(data);
            setInfoLogin({
                messageError: null,
                loadingLogin: true,
            });
            router.replace("/");
        } catch (error) {
            setInfoLogin({
                messageError: error.response.data.message,
                loadingLogin: false,
            });
        }
    };

    return (
        <React.Fragment>
            <MetaTag
                resolvedUrl={`${defaultURL}/login`}
                title="Login"
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />

            <LoginRegister
                title="Chào mừng trở lại !"
                description="Đăng nhập để tiếp tục mua sắm"
                url_page="/register"
                title_url_page="Đăng ký ngay"
                title_sign_connect="Đăng nhập với"
                description_page="Không có tài khoản?"
            >
                <form onSubmit={handleSubmit(submitLogin)}>
                    <div className="relative flex w-full flex-col gap-3">
                        <Input
                            size="md"
                            name="email"
                            type="email"
                            Icon={HiOutlineMail}
                            label="E-mail"
                            placeholder="Nhập email"
                            validate={register}
                            validateOptions={{
                                required: true,
                            }}
                            errors={errors && errors.email?.message}
                        />
                        <Input
                            size="md"
                            name="password"
                            type="password"
                            Icon={VscLock}
                            label="Mật khẩu"
                            placeholder="Nhập password"
                            validate={register}
                            validateOptions={{
                                required: true,
                            }}
                            showIconPassword
                            errors={errors && errors.password?.message}
                        />
                        {infoLogin.messageError && (
                            <p className="absolute w-full text-center text-[0.8rem] text-[#f46a6a]">
                                {infoLogin.messageError}
                            </p>
                        )}
                        <Button loading={infoLogin.loadingLogin} className="mt-3" label="Đăng nhập" />
                    </div>
                </form>
            </LoginRegister>
        </React.Fragment>
    );
};

export default Login;

export const getServerSideProps = async (context) => {
    const access_token = context.req.cookies.access_token || null;

    if (access_token) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
    return {
        props: {},
    };
};
