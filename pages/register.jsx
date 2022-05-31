import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { Button, Input, LoginRegister } from "@/layout";
import { VscLock } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";
import { MetaTag } from "@/customize";

import {
    defaultURL,
    defaultDescription,
    defaultContent,
    defaultThumbnail,
    defaultKeyword,
} from "const";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Vui lòng nhập họ và tên của bạn!")
        .min(4, "Họ và cần dài ít nhất 4 ký tự")
        .max(32, "Họ và phải có nhiều nhất 32 ký tự")
        .matches(/^[A-Za-z]+$/i, "Họ và tên không phải là số!"),
    email: yup
        .string()
        .email("Email không họp lệ")
        .required("Vui lòng nhập email của bạn!"),
    password: yup
        .string()
        .min(8, "Mật khẩu cần dài ít nhất 8 ký tự")
        .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự")
        .required("Vui lòng nhập mật khẩu của bạn!")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Phải chứa một chữ hoa, một chữ thường, một số và một ký tự viết hoa đặc biệt!"
        ),
    confirm_password: yup
        .string()
        .required("Vui lòng nhập mật khẩu của bạn!")
        .oneOf([yup.ref("password")], "Mật khẩu nhập không khớp !"),
});
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log({ data });
    };

    return (
        <React.Fragment>
            <MetaTag
                resolvedUrl={defaultURL}
                title="Register | Kaito Shop"
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />
            <LoginRegister
                title="Đăng ký tài khoản"
                url_page="/login"
                title_url_page="Đăng nhập"
                title_sign_connect="Đăng ký bằng cách sử dụng"
                description_page="Bạn đã có tài khoản đăng nhập ngay ?"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 w-full">
                        <Input
                            type="text"
                            Icon={HiOutlineMail}
                            label="Họ và tên"
                            placeholder="Nhập họ và tên"
                            name="username"
                            validate={register}
                            validateOptions={{
                                required: true,
                            }}
                            errors={errors && errors.username?.message}
                        />
                        <Input
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
                            name="password"
                            type="password"
                            Icon={VscLock}
                            label="Mật khẩu"
                            placeholder="Nhập password"
                            validate={register}
                            validateOptions={{
                                required: true,
                            }}
                            errors={errors && errors.password?.message}
                            showIconPassword
                        />
                        <Input
                            name="confirm_password"
                            type="password"
                            Icon={VscLock}
                            label="Xác nhận mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            validate={register}
                            validateOptions={{
                                required: true,
                            }}
                            errors={errors && errors.confirm_password?.message}
                            showIconPassword
                        />
                        <Button label="Đăng ký" className="mt-3" />
                    </div>
                </form>
            </LoginRegister>
        </React.Fragment>
    );
};

export default Register;

export const getServerSideProps = async (context) => {
    context.res.setHeader(
        "Cache-Control",
        "s-maxage=9999999999,stale-while-revalidate=9999999999"
    );
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
        props: {
            access_token: access_token,
        },
    };
};
