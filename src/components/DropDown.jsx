import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { Language,Sitemap } from "../utils/Enum";
import { useNavigate } from "react-router-dom";

export default function DropdownComp({ type }) {
  const {selectedLanguage, setSelectedLanguage } = useLanguage();
  const [selectedSite, setSelectedSite] = useState();
  const [dropdownKey, setDropdownKey] = useState(0);  

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setDropdownKey((prevKey) => prevKey + 1);
  }, [i18n.language]);

  const handleSiteChange = (site) => {
    setSelectedSite(site);
    navigate(
      `/${
        site === "HOME"
          ? Sitemap.HOME
          : site === "PRODUCTS"
          ? Sitemap.PRODUCTS
          : Sitemap.CART
      }`
    );
    window.scrollTo(0, 0);
  };

  let options = Object.keys(
    type === "Language" ? Language : Sitemap
  ).map((option) => {
    return {
      value: option,
      label: type !== "Language" ? t(`Footer.SITEMAP.${option}`) : option
    };
  });

  return (
    <div
      className={`w-[4vh] ${
        type !== "Language" && "w-fit ml-[2vh] md:translate-y-1"
      } flex justify-center items-center rounded-sm`}
    >
      <Dropdown
        key={dropdownKey}
        arrowClosed={
          <span className="material-symbols-outlined">arrow_drop_down</span>
        }
        arrowOpen={
          <span className="material-symbols-outlined">arrow_drop_up</span>
        }
        menuClassName="absolute text-amber-950 bg-white p-2 pr-6 -translate-x-2 rounded-b-sm"
        controlClassName="flex flex-row "
        options={options}
        onChange={(option) =>
          type === "Language"
            ? setSelectedLanguage(option.value)
            : handleSiteChange(option.value)            
        }
        value={
          type === "Language"
            ? selectedLanguage
            : selectedSite            
        }
        placeholder={
          type === "Language"
            ? "Select an option"
            : t("Footer.SITEMAP.TITLE").toUpperCase()        
        }
      />
    </div>
  );
}
