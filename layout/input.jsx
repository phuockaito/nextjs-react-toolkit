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
    props,
    iconSubmit,
    defaultValue,
}) => {
    const [textType, setTextType] = React.useState(type);

    const IconShowPassword = textType === "text" ? IoEyeOutline : IoEyeOffOutline;

    return (
        <div className={className}>
            {label && <span className="mb-2 block text-sm font-medium text-[#495057]">{label}</span>}
            <div className="relative flex flex-col">
                {iconSubmit ? (
                    <div className="absolute inset-y-0 left-1 flex h-full w-8 items-center pl-2">
                        <button>
                            <Icon className="text-slate-500" />
                        </button>
                    </div>
                ) : (
                    <div className="absolute inset-y-0 left-1 flex h-full w-8 items-center pl-2">
                        <Icon className="text-slate-500" />
                    </div>
                )}

                {validate ? (
                    <input
                        {...props}
                        className={clsx(
                            "block w-full rounded-[0.25rem] border border-[#ced4da] bg-white px-8 text-[#495057] shadow-sm placeholder:text-[13px] placeholder:text-[#74788d] focus:border-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#ced4da]",
                            inputClassName,
                            size === "sm" && "py-[5px]",
                            size === "md" && "py-2"
                        )}
                        {...validate(name, { ...validateOptions })}
                        placeholder={placeholder}
                        type={textType}
                        defaultValue={defaultValue}
                    />
                ) : (
                    <input
                        {...props}
                        className={clsx(
                            "block w-full rounded-[0.25rem] border border-[#ced4da] bg-white pl-8 pr-3 text-[#495057] shadow-sm placeholder:text-[13px] placeholder:text-[#74788d] focus:border-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#ced4da]",
                            inputClassName,
                            size === "sm" && "py-[5px]",
                            size === "md" && "py-2"
                        )}
                        placeholder={placeholder}
                        type={type}
                    />
                )}
                {showIconPassword && (
                    <div className="absolute inset-y-0 right-1 flex h-full w-8 items-center pl-2">
                        <IconShowPassword
                            className="cursor-pointer text-slate-500"
                            onClick={() => setTextType(textType === "text" ? "password" : "text")}
                        />
                    </div>
                )}
            </div>
            {errors && <p className="mt-1 text-[0.8rem] text-[#f46a6a]">{errors}</p>}
        </div>
    );
};
