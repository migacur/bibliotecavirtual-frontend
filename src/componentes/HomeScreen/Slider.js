import { useState } from "react";

const Slider = () => {
  let [inicio, setInicio] = useState(1);

  const changeImgLeft = () => {
    if (inicio > 1) {
      setInicio(inicio - 1);
    } else {
      setInicio(3);
    }
  };

  const changeImgRigth = () => {
    if (inicio >= 3) {
      setInicio(1);
    } else {
      setInicio(inicio + 1);
    }
  };

  return (
    <div className="arrow-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={changeImgLeft}
        className="arrow"
        viewBox="0 0 512 512"
      >
        <path d="M0 256c0 141.4 114.6 256 256 256s256-114.6 256-256c0-141.4-114.6-256-256-256S0 114.6 0 256zM246.1 129.2C252.1 131.7 256 137.5 256 144v64h96c17.67 0 32 14.33 32 32v32c0 17.67-14.33 32-32 32h-96v64c0 6.469-3.891 12.31-9.875 14.78c-5.984 2.484-12.86 1.109-17.44-3.469l-112-112c-6.248-6.248-6.248-16.38 0-22.62l112-112C233.3 128.1 240.1 126.7 246.1 129.2z" />
      </svg>

      <div className="slider-box">
        {inicio === 1 ? (
          <img
            src="https://res.cloudinary.com/dmi8mfcre/image/upload/v1734108641/mdfoekgk3yv9ominiffv_qcbmj8.jpg"
            className="img-slider"
            alt="foto ETI"
          />
        ) : null}
        {inicio === 2 ? (
          <img
            src="https://res.cloudinary.com/dmi8mfcre/image/upload/v1734108641/ovysjyddmh2rfvtkijlv_xqwar4.jpg"
            className="img-slider"
            alt="foto ETI"
          />
        ) : null}
        {inicio === 3 ? (
          <img
            src="https://res.cloudinary.com/dmi8mfcre/image/upload/v1734108641/cf5l6xodl9vqupl2nxzp_ktwavv.jpg"
            className="img-slider"
            alt="foto ETI"
          />
        ) : null}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={changeImgRigth}
        className="arrow"
        viewBox="0 0 512 512"
      >
        <path d="M512 256c0-141.4-114.6-256-256-256S0 114.6 0 256c0 141.4 114.6 256 256 256S512 397.4 512 256zM265.9 382.8C259.9 380.3 256 374.5 256 368v-64H160c-17.67 0-32-14.33-32-32v-32c0-17.67 14.33-32 32-32h96v-64c0-6.469 3.891-12.31 9.875-14.78c5.984-2.484 12.86-1.109 17.44 3.469l112 112c6.248 6.248 6.248 16.38 0 22.62l-112 112C278.7 383.9 271.9 385.3 265.9 382.8z" />
      </svg>
    </div>
  );
};

export default Slider;
