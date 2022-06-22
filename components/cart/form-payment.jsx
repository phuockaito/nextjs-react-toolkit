import * as React from "react";
import { Form, Select, Input, message } from "antd";

import { Button } from "@/layout";

export const FormPayment = ({
    dataCity,
    dataDistrict,
    dataCommune,
    dataCart,
    setDistrict,
    setCommune,
    handlePostCart,
    loading,
}) => {
    const onFinishPostCart = ({ city, commune, district, phone }) => {
        const Total = dataCart.reduce(
            (previousValue, currentValue) => (previousValue += currentValue.quantity * currentValue.product.price),
            0
        );

        const payload = {
            address: `${city} - ${district} - ${commune}`,
            phone: phone,
            payment: "Thanh toán khi nhận hàng",
            totalSum: Total,
            cart: dataCart,
        };
        handlePostCart(payload);
    };

    return (
        <Form layout="vertical" onFinish={onFinishPostCart}>
            <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                {dataCity ? (
                    <Form.Item
                        className="grid"
                        name="city"
                        label="Tỉnh/Thành Phố"
                        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố!" }]}
                    >
                        <Select
                            placeholder="Chọn Tỉnh/Thành Phố..."
                            allowClear
                            onChange={(_, index) => setDistrict(index.key)}
                            tokenSeparators={[","]}
                        >
                            {dataCity.map((city) => (
                                <Select.Option value={city.name} key={city.code}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item
                        className="grid"
                        name="city"
                        label="Tỉnh/Thành Phố"
                        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành Phố!" }]}
                    >
                        <Select
                            placeholder="Tỉnh/Thành Phố..."
                            allowClear
                            fieldNames={{ label: "", value: "" }}
                            tokenSeparators={[","]}
                        ></Select>
                    </Form.Item>
                )}
                {dataDistrict ? (
                    <Form.Item
                        className="grid"
                        name="district"
                        label="Quận/Huyện"
                        rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện!" }]}
                    >
                        <Select
                            placeholder="Chọn Quận/Huyện..."
                            allowClear
                            onChange={(_, index) => setCommune(index.key)}
                        >
                            {dataDistrict.districts.map((dis) => (
                                <Select.Option value={dis.name} key={dis.code}>
                                    {dis.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item
                        className="grid"
                        name="district"
                        label="Quận/Huyện"
                        rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện!" }]}
                    >
                        <Select placeholder="Chọn Quận/Huyện..." allowClear></Select>
                    </Form.Item>
                )}
                {dataCommune ? (
                    <Form.Item
                        className="grid"
                        name="commune"
                        label="Xã/Thị Trấn"
                        rules={[{ required: true, message: "Vui lòng chọn Xã/Thị trấn" }]}
                    >
                        <Select placeholder="Chọn Xã/Thị Trấn..." allowClear>
                            {dataCommune.wards.map((wards) => (
                                <Select.Option value={wards.name} key={wards.code}>
                                    {wards.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item
                        className="grid"
                        name="commune"
                        label="Xã/Thị Trấn"
                        rules={[{ required: true, message: "Vui lòng chọn Xã/Thị trấn" }]}
                    >
                        <Select placeholder="Chọn Xã/Thị Trấn..." allowClear></Select>
                    </Form.Item>
                )}
                <Form.Item
                    className="grid"
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại!" },
                        {
                            pattern: /^[0-9]+$/,
                            message: "Số điện thoại không đúng!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
            </div>
            <div className="mt-4 flex justify-center">
                <Button loading={loading} label="Đặt hàng ngay" className="w-full max-w-lg sm:max-w-xs" size="sm" />
            </div>
        </Form>
    );
};
