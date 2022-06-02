import * as React from "react";
import { Dropdown, Modal, message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { Image } from "@/customize";
import { VscSignOut, VscLock } from "react-icons/vsc";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Button, Input } from "@/layout";
import { useAuth } from "@/hooks";
import { apiAccount } from "@/api-client";

const schema = yup.object().shape({
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

export const Profile = ({ avatar, name }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { handleLogout } = useAuth();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleChagePassword = async (data) => {
        try {
            await apiAccount.changePassword(data);
            message.success("Đã lưu thay đổi mật khẩu");
        } catch (error) {
            message.error("Có lỗi xãi ra");
        }
    };
    return (
        <>
            <div className="flex gap-4 items-center">
                <AiOutlineShoppingCart className="text-[#6e6d7a] text-[1.2rem]" />
                <Dropdown
                    trigger={["click"]}
                    overlay={() => (
                        <div className="py-2 shadow-dropdown-menu bg-white rounded-[0.25rem] relative top-[1rem]">
                            <div className="w-[215px]">
                                <div className="flex gap-2 px-[24px] py-[8px] items-center cursor-pointer hover:bg-[#f8f9fa]">
                                    <AiOutlineShoppingCart className="text-[1rem]" />
                                    <h1>Lịch sử mua hàng</h1>
                                </div>
                                <div className="flex gap-2 px-[24px] py-[8px] items-center cursor-pointer hover:bg-[#f8f9fa]">
                                    <AiOutlineHistory className="text-[1rem]" />
                                    <h1>Nhật ký hoạt động</h1>
                                </div>
                                <div
                                    className="flex gap-2 px-[24px] py-[8px] items-center cursor-pointer hover:bg-[#f8f9fa]"
                                    onClick={() => setIsModalVisible(true)}
                                >
                                    <VscLock className="text-[1rem]" />
                                    <h1>Đổi mật khẩu</h1>
                                </div>
                                <div
                                    className="flex gap-2 px-[24px] py-[8px] items-center cursor-pointer hover:bg-[#f8f9fa]"
                                    onClick={handleLogout}
                                >
                                    <VscSignOut className="text-[#f46a6a] text-[1rem]" />
                                    <h1 className="text-[#f46a6a]">Đăng xuất</h1>
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <div className="flex cursor-pointer items-center justify-center gap-2 p-0 md:px-2 md:py-1">
                        <Image src={avatar} className="h-8 w-8 rounded-full" alt={name} />
                        <div className="hidden items-center md:flex">
                            <h6 className="font-semibold">{name}</h6>
                            <RiArrowDropDownLine className="text-[1.25rem] text-[#555b6d]" />
                        </div>
                    </div>
                </Dropdown>
            </div>
            <Modal
                footer={false}
                title="Đổi mật khẩu"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
            >
                <form onSubmit={handleSubmit(handleChagePassword)}>
                    <div className="flex flex-col gap-3 w-full relative">
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
                        <Button label="Lưu mật khẩu" className="mt-3" />
                    </div>
                </form>
            </Modal>
        </>
    );
};
