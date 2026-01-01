import "./index.scss";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { Totast } from "@/Hooks/Utils";
const HomeTopBox: FC = () => {
  const navigate = useNavigate();
  const navigateHint = () => {
    Totast(t("暂未开放"), "info");
  };
  return (
    <div className="HomeTopBox">
      <div className="dappBox">
        <div className="dappTitle">VEILX</div>
      </div>
      <div className="dappHintTxt">{t("让行为成为资产,让身份自由流动")}</div>
      <div className="dappHintBgTxt">{t("构建可移植的全链上身份协议")}</div>
      <div className="btnList">
        <div className="btn bgOne" onClick={() => navigateHint()}>
          {t("捐赠挖矿")}
        </div>
        <div className="btn bgTwo" onClick={() => navigate("/Node")}>
          {t("节点购买")}
        </div>
      </div>
    </div>
  );
};
export default HomeTopBox;
