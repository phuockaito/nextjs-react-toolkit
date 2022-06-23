import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Input } from "@/layout";

export const Search = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const submitSearch = ({ search }) => {
        router.push(`/search/${search}`);
    };

    return (
        <form onSubmit={handleSubmit(submitSearch)}>
            <Input
                className="w-64"
                placeholder="Search for anything..."
                type="text"
                name="search"
                size="md"
                iconSubmit
                defaultValue={router.query.keyword}
                validate={register}
                validateOptions={{
                    required: true,
                }}
            />
        </form>
    );
};
