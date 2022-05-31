import * as React from "react";
import clsx from "clsx";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

export const Input = ({
    Icon = FiSearch,
    className,
    placeholder,
    type,
    name,
    inputClassName,
    label,
    size = "sm",
    validate,
    validateOptions,
    errors,
    showIconPassword,
}) => {
    const [textType, setTextType] = React.useState(type);

    const IconShowPassword =
        textType === "text" ? IoEyeOutline : IoEyeOffOutline;

    return (
        <div className={className}>
            {label && (
                <span className="block mb-2 text-sm font-medium text-[#495057]">
                    {label}
                </span>
            )}
            <div className="relative flex flex-col">
                <div className="absolute inset-y-0 left-1 flex h-full items-center pl-2 w-8">
                    <Icon className="text-slate-500" />
                </div>
                {validate ? (
                    <input
                        className={clsx(
                            "text-[#495057] placeholder:text-[#74788d] block placeholder:text-[13px] bg-white w-full border border-[#ced4da] rounded-[0.25rem] px-8 shadow-sm focus:outline-none focus:border-[#ced4da] focus:ring-[#ced4da] focus:ring-1",
                            inputClassName,
                            size === "sm" && "py-[5px]",
                            size === "md" && "py-2"
                        )}
                        {...validate(name, { ...validateOptions })}
                        placeholder={placeholder}
                        type={textType}
                    />
                ) : (
                    <input
                        className={clsx(
                            "text-[#495057] placeholder:text-[#74788d] block placeholder:text-[13px] bg-white w-full border border-[#ced4da] rounded-[0.25rem] pl-8 pr-3 shadow-sm focus:outline-none focus:border-[#ced4da] focus:ring-[#ced4da] focus:ring-1",
                            inputClassName,
                            size === "sm" && "py-[5px]",
                            size === "md" && "py-2"
                        )}
                        placeholder={placeholder}
                        type={type}
                    />
                )}
                {showIconPassword && (
                    <div className="absolute inset-y-0 right-1 flex h-full items-center w-8 pl-2">
                        <IconShowPassword
                            className="text-slate-500 cursor-pointer"
                            onClick={() =>
                                setTextType(
                                    textType === "text" ? "password" : "text"
                                )
                            }
                        />
                    </div>
                )}
            </div>
            {errors && (
                <p className="text-[#f46a6a] text-[0.8rem] mt-1">{errors}</p>
            )}
        </div>
    );
};
