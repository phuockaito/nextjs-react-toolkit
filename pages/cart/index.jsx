import * as React from "react";
import NumberFormat from "react-number-format";
import NoSSR from "react-no-ssr";
import { Form, Select, Input, message } from "antd";
import { unwrapResult } from "@reduxjs/toolkit";

import { useCart } from "@/hooks";
import { Header, Product, FormPayment } from "@/components";
import { Section, Button } from "@/layout";

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
    });

    return (
        <React.Fragment>
            <NoSSR>
                <div className="flex flex-col-reverse gap-4 px-4 sm:flex-row">
                    <Section className="basis-6/12 md:basis-7/12 lg:basis-8/12">
                        <FormPayment
                            dataDistrict={dataDistrict}
                            dataCommune={dataCommune}
                            setDistrict={setDistrict}
                            setCommune={setCommune}
                            dataCity={dataCity}
                            dataCart={storeCart.dataCart}
                            handlePostCart={handlePostCart}
                            loading={storeCart.loading}
                        />
                    </Section>
                    <Section className="basis-6/12 md:basis-5/12 lg:basis-4/12">
                        <Product
                            dataCart={storeCart.dataCart}
                            onUpdateCartReducers={handleUpdateCartReducers}
                            onDeleteCartReducers={handleDeleteCartReducers}
                        />
                    </Section>
                </div>
            </NoSSR>
        </React.Fragment>
    );
};

export default Cart;

Cart.getLayout = (page) => <Header>{page}</Header>;
