import * as React from "react";
import NoSSR from "react-no-ssr";

import { useCart } from "@/hooks";
import { Header, Product, FormPayment } from "@/components";
import { Section } from "@/layout";
import { MetaTag } from "@/customize";
import { defaultContent, defaultDescription, defaultKeyword, defaultThumbnail, defaultURL } from "@/const";

const Cart = () => {
    const [district, setDistrict] = React.useState(null);
    const [commune, setCommune] = React.useState(null);

    const {
        storeCart,
        handleUpdateCartReducers,
        handleDeleteCartReducers,
        handlePostCart,
        dataCity,
        dataDistrict,
        dataCommune,
    } = useCart({
        code_district: district,
        code_commune: commune,
        revalidateOnMount: true,
    });

    return (
        <>
            <MetaTag
                resolvedUrl={defaultURL}
                title="Giỏ hàng"
                description={defaultDescription}
                content={defaultContent}
                thumbnail={defaultThumbnail}
                keywords={defaultKeyword}
                isDefault
            />
            <NoSSR>
                {storeCart.dataCart?.length > 0 ? (
                    <div className="flex flex-col-reverse gap-4 px-4 sm:flex-row">
                        <Section className="basis-4/12">
                            <FormPayment
                                dataDistrict={dataDistrict}
                                dataCommune={dataCommune}
                                setDistrict={setDistrict}
                                setCommune={setCommune}
                                dataCity={dataCity}
                                dataCart={storeCart.dataCart}
                                handlePostCart={handlePostCart}
                            />
                        </Section>
                        <Section className="basis-8/12">
                            <Product
                                dataCart={storeCart.dataCart}
                                onUpdateCartReducers={handleUpdateCartReducers}
                                onDeleteCartReducers={handleDeleteCartReducers}
                            />
                        </Section>
                    </div>
                ) : (
                    <Section className="">
                        <h3>Không có sản phẩm nào trong giỏ hàng của bạn.</h3>
                    </Section>
                )}
            </NoSSR>
        </>
    );
};

export default Cart;

Cart.getLayout = (page) => <Header>{page}</Header>;
