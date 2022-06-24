import * as React from "react";
import { Form, Input, Rate } from "antd";

import { Section, Button } from "@/layout";
import { apiComment } from "@/api-client";

export const FormComment = ({ id, mutate, dataComment }) => {
    const [form] = Form.useForm();

    const handleSubmitComment = async ({ rate, comment }) => {
        setLoading(true);
        const { data } = await apiComment.postComment({
            id_product: id,
            start: rate || 0,
            content: comment.trim(),
        });
        if (data) {
            setLoading(false);
            form.resetFields();
            const newData = dataComment.data;
            const payload = {
                ...dataComment,
                data: [data.comment, ...newData],
                length: dataComment.length + 1,
            };
            mutate(payload, false);
        }
    };

    const [loading, setLoading] = React.useState(false);
    return (
        <Section>
            <h1 className="text-xl font-semibold capitalize text-[#212427]">Phản hồi của bạn</h1>
            <Form onFinish={handleSubmitComment} form={form}>
                <Form.Item name="rate">
                    <Rate />
                </Form.Item>
                <Form.Item
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập nội dung!",
                        },
                    ]}
                >
                    <div className="rounded-[0.25rem] border border-[#ced4da]">
                        <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} allowClear bordered={false} />
                    </div>
                </Form.Item>
                <Button label="Phản hồi" loading={loading} />
            </Form>
        </Section>
    );
};
