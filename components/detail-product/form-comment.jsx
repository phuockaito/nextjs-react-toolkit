import * as React from "react";
import { Form, Input, Rate } from "antd";

import { Section, Button } from "@/layout";
import { apiComment } from "@/api-client";

export const FormComment = ({ id, mutate }) => {
    const [form] = Form.useForm();

    const handleSubmitComment = async ({ rate, comment }) => {
        setLoading(true);
        const result = await apiComment.postComment({
            id_product: id,
            start: rate || 0,
            content: comment.trim(),
        });
        if (result) {
            setLoading(false);
            form.resetFields();
            await mutate();
        }
    };

    const [loading, setLoading] = React.useState(false);
    return (
        <Section>
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
