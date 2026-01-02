import "./index.scss";
import { userAddress } from "@/Store/Store.ts";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { BigNumber, ethers } from "ethers";
import { storage } from "@/Hooks/useLocalStorage";
import { Drawer, Flex, Spin } from "antd";
import { ProgressCircle } from "antd-mobile";
import checkIcon from "@/assets/node/nodeIcon.png";
import BuyNftPopup from "./component/BuyNftPopup";
import BackHeader from "@/components/BackHeader";
import { fromWei, Totast, toWei } from "@/Hooks/Utils.ts";
import InviteModal from "@/components/InviteModal";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import teamIcon from "@/assets/node/teamIcon.png";
interface nodeItem {
  amount: BigNumber;
  nodeName: string;
  inventory: BigNumber; //库存
  max: BigNumber; //最大
  id: number; //node 编号
  txtLst: string[];
}
interface userNodeInfo {
  nodeId: BigNumber; //0小 1大
  flg: boolean; //是否是节点
  weight: BigNumber;
  storeValue: BigNumber;
  rewardDebt: BigNumber;
}
const Node: React.FC = () => {
  const [inviteShow, setInviteShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const [invite, setInvite] = useState<string | null>(null); // 新增 invite 状态
  // 当前钱包地址
  const walletAddress = userAddress((state) => state.address);
  const [showBuyNftPopup, setShowBuyNftPopup] = useState<boolean>(false);
  const [userNodeInfo, setUserNodeInfo] = useState<userNodeInfo>({}); //用户节点信息
  const [nodeId, setNodeId] = useState<number>(0); //购买节点信息Id
  const [nodeList, setNodeList] = useState<nodeItem[]>([
    {
      amount: BigNumber.from("0"),
      nodeName: t("联创节点"),
      max: BigNumber.from("0"),
      inventory: BigNumber.from("0"),
      id: 2,
      txtLst: [
        t("赠送V3级别"),
        t("赠送20000枚VEX"),
        t("白名单购买资格10000U"),
        t("捐赠盈利税5%"),
        t("市场盈利税25%"),
      ],
    },
    {
      amount: BigNumber.from("0"),
      nodeName: t("社区节点"),
      max: BigNumber.from("0"),
      inventory: BigNumber.from("0"),
      id: 1,
      txtLst: [
        t("赠送V2级别"),
        t("赠送6000枚VEX"),
        t("白名单购买资格2000U"),
        t("捐赠盈利税5%"),
        t("市场盈利税25%"),
      ],
    },
    {
      amount: BigNumber.from("0"),
      nodeName: t("普通节点"),
      max: BigNumber.from("0"),
      inventory: BigNumber.from("0"),
      id: 0,
      txtLst: [
        t("赠送V1级别"),
        t("赠送2000枚VEX"),
        t("白名单购买资格500U"),
        t("捐赠盈利税5%"),
        t("市场盈利税25%"),
      ],
    },
  ]);
  const openPopupClick = () => {
    setShowBuyNftPopup(true);
  };
  const BuyNftPopupCloseChange = () => {
    setShowBuyNftPopup(false);
    //关闭弹窗后刷新数据
    initNodeInfo();
    getUserNodeInfo();
  };
  //总数量
  const totalNumer: number = 609;
  //nft列表加载状态
  const [listLoading, setListLoading] = useState<boolean>(false);
  /**
   *
   * @param item 购买节点
   */
  const buyClick = (item) => {
    if (userNodeInfo.flg) return Totast(t("你已购买过节点"), "info"); //已购买节点
    if (item.id == Number(userNodeInfo.nodeId) && userNodeInfo.flg) {
      return Totast(t("待激活"), "info");
    }
    setNodeId(item.id);
    setShowBuyNftPopup(true);
  };
  const myTeamPath = () => {
    navigate("/MyTeam");
  };
  /**
   *
   * @param item 节点item
   * @returns 返回已售卖的数量
   */
  const selllNumber = (item) => {
    const result = item.max.sub(item.inventory);
    return result.toString();
  };
  /**
   *
   * @param item 节点item
   * @returns 返回已售卖的数量
   */
  const selllWith = (item) => {
    const total = item.max.toString();
    const stock = selllNumber(item);
    const percent = (stock / total) * 100;
    return percent;
  };
  /**
   *
   * @returns 当前用户是否存在上级
   */
  const isInviterFn = async () => {
    // 1️⃣ 先检查 URL 是否有 invite 参数
    const params = new URLSearchParams(location.search);
    const inviteParam = params.get("invite");
    if (inviteParam) {
      setInvite(inviteParam); // 保存到 state
      storage.set("invite", inviteParam); // 可选：存本地
    }

    if (!walletAddress) return; // 地址不存在不查
    const result = await ContractRequest({
      tokenName: "vailPlusUserToken",
      methodsName: "userInfo",
      params: [walletAddress],
    });
    if (result.value) {
      if (result.value[0] == ethers.constants.AddressZero) {
        setInviteShow(true);
      }
    }
  };
  /**
   * 查询用户的节点信息
   */
  const getUserNodeInfo = async () => {
    const result = await ContractRequest({
      tokenName: "vailPlusNodeToken",
      methodsName: "userNode",
      params: [walletAddress],
    });
    setUserNodeInfo(result.value);
  };
  const nodeBtn = (item) => {
    if (item.id == Number(userNodeInfo.nodeId) && userNodeInfo.flg) {
      //已经是节点
      return <span>{t("待激活")}</span>;
    } else {
      return <span>{t("购买")}</span>;
    }
  };
  /**
   * 获取节点信息
   */
  const initNodeInfo = async () => {
    setListLoading(true);
    try {
      const results = await Promise.all(
        nodeList.map((item) =>
          ContractRequest({
            tokenName: "vailPlusNodeToken",
            methodsName: "nodeInfo",
            params: [item.id],
          })
        )
      );
      setNodeList((prev) =>
        prev.map((item, index) => {
          const res = results[index]?.value;
          if (!res) return item;
          return {
            ...item,
            amount: res[0],
            max: res[1],
            inventory: res[2],
          };
        })
      );
    } catch (error) {
      console.error("initNodeInfo error:", error);
    } finally {
      setListLoading(false);
    }
  };
  useEffect(() => {
    initNodeInfo();
    getUserNodeInfo();
  }, []);
  return (
    <>
      <div className="NodePage">
        <BackHeader isHome={true} />
        <div className="header-box">
          <div className="header-box-image">
            <div className="appNameBox">
              <div className="appName">VEILX{t("生态节点")}</div>
            </div>
            <div className="center-number-option">
              <div className="number-option">
                <span className="spn-1">{t("限量")}</span>
                <span className="spn-2">{totalNumer}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="block200"></div>
        <div className="nodesListBox">
          {listLoading ? (
            <div className="assetDetailSpinBox">
              <Spin />
            </div>
          ) : (
            nodeList.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <div className="nodeBox">
                    <div className="headerTop">
                      <div className="leftOption">
                        <div className="txt">{item.nodeName}</div>
                        <div className="tagOption">
                          <span className="spn1">{t("限量")}</span>
                          <span className="spn2">
                            {item.inventory.toString()}
                            <span className="spn2-1">
                              / {item.max.toString()}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="rightOption">
                        {fromWei(item.amount, 18, true, 2)}U
                      </div>
                    </div>

                    <div className="stepBox">
                      <div className="stepOption">
                        <div
                          className="stepCheckOption"
                          style={{ width: `${selllWith(item)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className={item.inventory.isZero() ? "noBuy" : "buyBtn"}
                      onClick={() => buyClick(item)}
                    >
                      {item.inventory.isZero() ? "已售空" : nodeBtn(item)}
                    </div>
                    {item.txtLst.map((txtItem, txtIndex) => {
                      return (
                        <div className="txtBox" key={txtIndex}>
                          <div className="txtOption">
                            <img src={checkIcon} className="txtIcon"></img>
                            <div className="txt">{txtItem}</div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="endTxtOption">
                      {t("注：捐赠和市场盈利税按1000U/份为单")}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="lineHeight24"></div>
        <div className="teamBox">
          <div className="teamBtn" onClick={() => myTeamPath()}>
            <img src={teamIcon} className="teamIcon"></img>
            <span className="spnTxt">{t("我的团队")}</span>
          </div>
        </div>
      </div>
      <Drawer
        rootClassName="buyNodeDrawer"
        maskClosable={true}
        destroyOnHidden={true}
        height={"auto"}
        closeIcon={false}
        open={showBuyNftPopup}
        title=""
        placement="bottom"
      >
        <BuyNftPopup nodeId={nodeId} onClose={() => BuyNftPopupCloseChange()} />
      </Drawer>
    </>
  );
};
export default Node;
