import * as React from "react";
import { Form, Input, Rate } from "antd";

import { Section, Button } from "@/layout";
import { apiComment } from "@/api-client";

export const FormComment = ({ id, mutate, dataComment, initialValues, id_product, _id_comment, setIdCommentEdit }) => {
    const [form] = Form.useForm();

    const handleSubmitComment = async ({ rate, comment }) => {
        setLoading(true);
        const newData = dataComment.data;
        if (initialValues) {
            const { data } = await apiComment.updateComment({
                id_product: id_product,
                start: rate || 0,
                content: comment.trim(),
                _id_comment: _id_comment,
            });
            if (data) {
                setLoading(false);
                setIdCommentEdit(null);
                await mutate();
            }
        } else {
            const { data } = await apiComment.postComment({
                id_product: id,
                start: rate || 0,
                content: comment.trim(),
            });
            if (data) {
                setLoading(false);
                form.resetFields();
                const payload = {
                    ...dataComment,
                    data: [data.comment, ...newData],
                    length: dataComment.length + 1,
                };
                mutate(payload, false);
            }
        }
    };

    const [loading, setLoading] = React.useState(false);
    return (
        <Form onFinish={handleSubmitComment} form={form} name="form_comment" initialValues={initialValues}>
            <Form.Item name="rate">
                <Rate />
            </Form.Item>
            <div className="mb-4 rounded-[0.25rem] border border-[#ced4da]">
                <Form.Item
                    name="comment"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập nội dung!",
                        },
                    ]}
                >
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} allowClear bordered={false} />
                </Form.Item>
            </div>
            <Button label={initialValues ? "Lưu lại" : "Phản hồi"} loading={loading} />
        </Form>
    );
};
