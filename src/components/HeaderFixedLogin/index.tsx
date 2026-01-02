import "./index.scss";
import { FC, useEffect, useState } from "react";
import logoTop from "@/assets/home/logoLeft.png";
import WalletBox from "../WalletBox";

const HeaderFixedLogin: FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    // 初始判断一次（防止刷新时已在中间）
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`headerFixedLoginBox ${scrolled ? "scrolled" : ""}`}>
      <img src={logoTop} className="logoTopIcon" />
      <WalletBox />
    </div>
  );
};

export default HeaderFixedLogin;
