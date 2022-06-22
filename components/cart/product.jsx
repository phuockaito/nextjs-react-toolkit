import { Image } from "@/customize";
import NumberFormat from "react-number-format";
import { VscTrash } from "react-icons/vsc";

export const Product = ({ dataCart, onUpdateCartReducers, onDeleteCartReducers }) => {
    const Total = dataCart?.reduce(
        (previousValue, currentValue) => (previousValue += currentValue.quantity * currentValue.product.price),
        0
    );
    const onUpdateQuantity = (index, quantity) => {
        if (quantity > 0) {
            onUpdateCartReducers({ index: index, quantity: quantity });
        }
    };
    return (
        <>
            {dataCart?.map((cart, index) => (
                <div key={cart.product._id} className="flex gap-2">
                    <div>
                        <Image src={cart.product.image} className="h-28 w-28" alt={cart.product.name} />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-2 capitalize">{cart.product.name}</h3>
                        <div className="grid gap-2">
                            <div className="">
                                <h3>
                                    Size:<span className="ml-1">{cart.product.size}</span>
                                </h3>
                                <div className="flex items-center">
                                    <span>
                                        <NumberFormat
                                            value={cart.product.price}
                                            displayType="text"
                                            thousandSeparator={true}
                                        />
                                    </span>
                                    <span className="mx-1">x</span> <span>{cart.quantity}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <button
                                        onClick={() => {
                                            onUpdateQuantity(index, cart.quantity - 1);
                                        }}
                                        className="flex h-[30px] w-[30px] items-center justify-center rounded-l-[0.25rem] border-[0px] bg-[#1c1c1c] text-white hover:bg-[#6e7b88]"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={() =>
                                            cart.quantity < 5
                                                ? onUpdateQuantity(index, cart.quantity + 1)
                                                : cart.quantity
                                        }
                                        className="flex h-[30px] w-[30px] items-center justify-center rounded-r-[0.25rem] border-[0px] bg-[#1c1c1c] text-white hover:bg-[#6e7b88]"
                                    >
                                        +
                                    </button>
                                </div>
                                <div>
                                    <VscTrash
                                        className="cursor-pointer text-lg text-[red]"
                                        onClick={() => onDeleteCartReducers(index)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <h2 className="mt-2 flex justify-between bg-[#fafafa] p-5 text-lg font-semibold">
                Tổng tiền:
                <p>
                    <NumberFormat value={Total} displayType="text" thousandSeparator={true} />
                    <span className="ml-1">VNĐ</span>
                </p>
            </h2>
        </>
    );
};
