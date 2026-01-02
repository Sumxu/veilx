import "./index.scss";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //倒计时三秒后跳转页面
    setTimeout(() => {
      navigate("/Home");
    }, 3000);
  }, []);
  return (
    <div className="GuidePage">
      <div className="hintBox">
          <div className="hintTxt1">VEILX</div>
        <div className="hintTxt2">{t('让行为成为资产,让身份自由流动')}</div>
        <div className="hintTxt3">{t('构建可移植的全链上身份协议')}</div>
      </div>
    </div>
  );
};
export default Home;
