import "./index.scss";
import { userAddress } from "@/Store/Store.ts";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { BigNumber, ethers } from "ethers";
import { fromWei, Totast, toWei } from "@/Hooks/Utils.ts";
import { t } from "i18next";
import ContractSend from "@/Hooks/ContractSend.ts";
import ContractList from "@/Contract/Contract.ts";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import closeIcon from "@/assets/basic/close.png";
interface nodeItem {
  amount: BigNumber;
  inventory: BigNumber; //库存
  max: BigNumber; //最大
}
interface buyNftPopupClass {
  onClose: () => void;
  nodeId: number;
}
function BuyNftPopup(Props: buyNftPopupClass) {
  const mapTxts = {
    0: [t("联创节点")],
    1: [t("社区节点")],
    2: [t("普通节点")],
  };
  const walletAddress = userAddress((state) => state.address);
  //usdt 余额
  const [usdtBalanceOf, setUsdtBalanceOf] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [nodeInfo, setNodeInfo] = useState<nodeItem>({});
  //
  const [buyLoding, setBuyLoding] = useState(false);
  //获取自己的usdt余额
  const fetchUsdt = async () => {
    const usdtRes = await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "balanceOf",
      params: [walletAddress],
    });
    if (usdtRes.value) {
      setUsdtBalanceOf(usdtRes.value);
    }
  };
  //购买nft购买逻辑
  const btnClick = async () => {
    //判断库存是否不足
    if (nodeInfo.inventory.eq(0)) {
      Totast(t("库存不足"), "warning");
      return;
    }
    //先判断自己的usdt是否满足购买
    if (usdtBalanceOf.lt(nodeInfo.amount)) {
      Totast(t("余额不足"), "warning");
      return;
    }

    setBuyLoding(true);
    //开始授权 进行购买
    let applyAmount: BigNumber = BigNumber.from(0);
    let isApply = false;
    await ContractRequest({
      tokenName: "USDTToken",
      methodsName: "allowance",
      params: [walletAddress, ContractList["vailPlusNodeToken"].address],
    }).then((res) => {
      if (res.value) {
        applyAmount = res.value;
      }
    });
    if (applyAmount.lt(nodeInfo.amount)) {
      await ContractSend({
        tokenName: "USDTToken",
        methodsName: "approve",
        params: [
          ContractList["vailPlusNodeToken"].address,
          ethers.constants.MaxUint256, //授权最大值
        ],
      }).then((res) => {
        if (res.value) {
          isApply = true;
        } else {
          return;
        }
      });
    } else {
      isApply = true;
    }
    if (!isApply) {
      return;
    }
    try {
      const result = await ContractSend({
        tokenName: "vailPlusNodeToken",
        methodsName: "ido",
        params: [Props.nodeId],
      });
      if (result.value) {
        Props.onClose();
        Totast(t("购买成功"), "success"); // 检查授权或者授权时发生了错误，请检查网络后重新尝试
      }
    } finally {
      // 无论成功或失败，都需要关闭加载状态
      setBuyLoding(false);
    }
  };
  const getNodeInfo = async () => {
    const nodeInfo = await ContractRequest({
      tokenName: "vailPlusNodeToken",
      methodsName: "nodeInfo",
      params: [Props.nodeId],
    });
    setNodeInfo(nodeInfo.value);
  };
  useEffect(() => {
    if (Props.nodeId == null) return;
    getNodeInfo();
    fetchUsdt();
  }, [Props.nodeId]);
  return (
    <div className="BuyNftPopup">
      <div className="header-top-box">
        <div className="txt">
          {t("购买")}
          {mapTxts[Props.nodeId]}
        </div>
        <img
          src={closeIcon}
          className="icon-close"
          onClick={() => Props.onClose()}
        ></img>
      </div>
      <div className="price-option">
        {fromWei(nodeInfo.amount, 18, true, 2)} USDT
      </div>
      <div className="get-txt-option">
        {t("即可获得")}{mapTxts[Props.nodeId]}
      </div>
       
      <div className="need-pay-option">
        <div className="need-txt-1">
          {t("需支付")}：{fromWei(nodeInfo.amount, 18, true, 2)} USDT
        </div>
        <div className="need-txt-2">
          {t("余额")}：{fromWei(usdtBalanceOf, 18, true, 2)} USDT
        </div>
      </div>
      <div className="btn-option" onClick={() => btnClick()}>
        {buyLoding ? <Spin /> : t("确认购买")}
      </div>
    </div>
  );
}

export default BuyNftPopup;
