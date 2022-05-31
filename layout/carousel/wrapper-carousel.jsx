import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { responsiveCarousel } from "./responsive-carousel";
import "keen-slider/keen-slider.min.css";

export const WrapperCarousel = ({
    children,
    rtlCarousel = false,
    responsive = responsiveCarousel,
    defaultCarousel = 0,
    autoplay = false,
    time = 3000,
    loop = false,
    slidesPerView = 5,
    spacingPerView = 5,
    snapMode = "free",
    centerCarousel = false,
    classCarousel = "carousel relative",
    ...rest
}) => {
    const [sliderRef, slider] = useKeenSlider({
        initial: defaultCarousel,
        loop: loop,
        mode: snapMode,
        duration: time,
        slidesPerView: slidesPerView,
        spacing: spacingPerView,
        centered: centerCarousel,
        rtl: rtlCarousel,
        breakpoints: responsive,
        ...rest,
    });
    // Effect
    useEffect(() => {
        const clear = setInterval(() => {
            if (autoplay && slider) {
                slider.next();
            }
        }, time);
        return () => {
            clearInterval(clear);
        };
    }, [autoplay, slider, time]);

    // Return
    return (
        <div ref={sliderRef} className="keen-slider">
            {children}
        </div>
    );
};
