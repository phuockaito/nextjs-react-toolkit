import * as React from "react";
import { Form, Select, Input } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import vnmToAlphabet from "vnm-to-alphabet";

import { Button } from "@/layout";
import { useAuth } from "@/hooks";

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
    const router = useRouter();
    const { profile } = useAuth();

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
            <div className="grid grid-cols-1 gap-x-4">
                {dataCity ? (
                    <Form.Item
                        className="grid"
                        name="city"
                        label="Tỉnh/Thành Phố"
                        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố!" }]}
                    >
                        <StyledSelect
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                vnmToAlphabet(option.children.toLowerCase(), "lowercase").includes(
                                    vnmToAlphabet(input.toLowerCase(), "lowercase")
                                )
                            }
                            placeholder="Chọn Tỉnh/Thành Phố..."
                            allowClear
                            onChange={(_, index) => setDistrict(index.key)}
                        >
                            {dataCity.map((city) => (
                                <Select.Option value={city.name} key={city.code}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </StyledSelect>
                    </Form.Item>
                ) : (
                    <Form.Item
                        className="grid"
                        name="city"
                        label="Tỉnh/Thành Phố"
                        rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành Phố!" }]}
                    >
                        <StyledSelect
                            placeholder="Tỉnh/Thành Phố..."
                            allowClear
                            fieldNames={{ label: "", value: "" }}
                        ></StyledSelect>
                    </Form.Item>
                )}
                {dataDistrict ? (
                    <Form.Item
                        className="grid"
                        name="district"
                        label="Quận/Huyện"
                        rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện!" }]}
                    >
                        <StyledSelect
                            placeholder="Chọn Quận/Huyện..."
                            allowClear
                            onChange={(_, index) => setCommune(index.key)}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                vnmToAlphabet(option.children.toLowerCase(), "lowercase").includes(
                                    vnmToAlphabet(input.toLowerCase(), "lowercase")
                                )
                            }
                        >
                            {dataDistrict.districts.map((dis) => (
                                <Select.Option value={dis.name} key={dis.code}>
                                    {dis.name}
                                </Select.Option>
                            ))}
                        </StyledSelect>
                    </Form.Item>
                ) : (
                    <Form.Item
                        className="grid"
                        name="district"
                        label="Quận/Huyện"
                        rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện!" }]}
                    >
                        <StyledSelect placeholder="Chọn Quận/Huyện..." allowClear></StyledSelect>
                    </Form.Item>
                )}
                {dataCommune ? (
                    <Form.Item
                        className="grid"
                        name="commune"
                        label="Xã/Thị Trấn"
                        rules={[{ required: true, message: "Vui lòng chọn Xã/Thị trấn" }]}
                    >
                        <StyledSelect
                            placeholder="Chọn Xã/Thị Trấn..."
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                vnmToAlphabet(option.children.toLowerCase(), "lowercase").includes(
                                    vnmToAlphabet(input.toLowerCase(), "lowercase")
                                )
                            }
                        >
                            {dataCommune.wards.map((wards) => (
                                <Select.Option value={wards.name} key={wards.code}>
                                    {wards.name}
                                </Select.Option>
                            ))}
                        </StyledSelect>
                    </Form.Item>
                ) : (
                    <Form.Item
                        className="grid"
                        name="commune"
                        label="Xã/Thị Trấn"
                        rules={[{ required: true, message: "Vui lòng chọn Xã/Thị trấn" }]}
                    >
                        <StyledSelect placeholder="Chọn Xã/Thị Trấn..." allowClear></StyledSelect>
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
                    <StyledInput placeholder="Nhập số điện thoại" />
                </Form.Item>
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    loading={loading}
                    label="Đặt hàng ngay"
                    className="w-full"
                    size="sm"
                    Element={profile ? "button" : "p"}
                    onClick={() => !profile && router.push("/login")}
                />
            </div>
        </Form>
    );
};

const StyledSelect = styled(Select)`
    & > .ant-select-selector {
        border-radius: 0.25rem !important;
        padding: 0px 10px !important;
        height: 35px !important;
        border: 2px solid #ced4da !important;
    }
`;

const StyledInput = styled(Input)`
    border-radius: 0.25rem !important;
    padding: 0px 10px !important;
    height: 35px !important;
    border: 2px solid #ced4da !important;
`;
