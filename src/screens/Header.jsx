import React, { memo, useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDown from "../components/DropDown";

function Header() {
  const { t } = useTranslation();
  const title = useRef();
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    if (title.current) {
      setTitleWidth(title.current.offsetWidth);
    }
  }, [title]);

  return (
    <div className="flex flex-col">
      <div className="w-[100%] flex flex-row justify-between items-center px-[4vw]">
        <div className="w-[10vw]">aaaaaaaaaaa</div>
        <h1
          ref={title}
          className="font-anton text-5xl text-cyan-500 bg-white rounded-full translate-y-[3vh] px-[4vw] pb-[2vw]"
          style={{
            textShadow:
              "4px 4px 0px rgba(0, 0, 0, 0.8), -1px -1px 0px rgba(0, 0, 0, 0.4)"
          }}
        >
          Dashboard
        </h1>
        <DropDown type={"Language"} />
      </div>
      <div className="w-full absolute top-[9vh] flex flex-row">
        <div className="flex-1 bg-amber-50 rounded-3xl"></div>
        <div
          style={{ width: `${titleWidth-14}px` }}
          className=" h-[40px] rounded-xl"
        ></div>
        <div className="flex-1 bg-amber-50 rounded-3xl"></div>
      </div>
    </div>
  );
}

export default memo(Header);
