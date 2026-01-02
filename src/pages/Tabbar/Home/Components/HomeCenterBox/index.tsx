import "./index.scss";
import type { FC } from "react";
import copyIcon from "@/assets/basic/copyIcon.png";
import { t } from "i18next";
import allDataBg from "@/assets/home/allDataBg.png";

const HomeCenterBox: FC = () => {
  return (
    <div className="HomeCenterBox">
      <div className="title">{t("全网数据")}</div>
      <div className="allBox">
        <img src={allDataBg} className="allDataBg"></img>
        <div className="boxContent">
          {
            [1, 2, 3,4,5,6,7,8].map((item, index) => {
              return (
                <div className="boxItem" key={index}>
                  <div className="boxItemNumber">-</div>
                </div>
              );
            })
          }
        </div>
        <div className="boxTitle">{t("全网总捐赠量")}(USDT)</div>
      </div>
      <div className="lineHeight65"></div>
      <div className="box">
        <div className="totalBox">
          <div className="totalOption">
            <div className="font12Option">
              <span className="txt">{t("全网总LP质押")}(VIPL)</span>
              <span className="txt">{t("全网总销毁")}(VIPL)</span>
            </div>

            <div className="font16Option">
              <span className="txt">-</span>
              <span className="txt">-</span>
            </div>
          </div>

          <div className="totalOption totalTop20">
            <div className="font12Option">
              <span className="txt">{t("节点总分红")}(USDT)</span>
              <span className="txt">{t("回购池")}(USDT)</span>
            </div>
            <div className="font16Option">
              <span className="txt">-</span>
              <span className="txt">-</span>
            </div>
          </div>
        </div>
      </div>
      <div className="centerBoxBg">
        <div className="biTitle">{t("代币经济学")}</div>
        <div className="lineHeight210"></div>
        <div className="box">
          <div className="vipBox">
            <div className="title">VIPL</div>
            <div className="hintTxt">
              Veil Labs {t("生态首个可移植身份协议的功能性代币")}
            </div>
            <div className="centerBox">
              <div className="centerTxtOption">
                <div className="centerTxt">
                  {t("代币名称")}：<span className="centerValue">VIPL</span>
                </div>
                <div className="centerTxt">
                  {t("总发行量")}：
                  <span className="centerValue">-{t("亿")}</span>
                </div>
              </div>
              <div className="centerTxtOption centerTxtTop12">
                <div className="centerTxt">
                  {t("发行价")}：<span className="centerValue">-USDT</span>
                </div>
                <div className="centerTxt">
                  {t("初始发行量")}：
                  <span className="centerValue">-{t("万")}</span>
                </div>
              </div>
            </div>
            <div className="stepBox">
              <div className="lpOption">
                35%
                <div className="lpTxt">LP{t("池")}</div>
              </div>
              <div className="lpLine"></div>
              <div className="nodeOption">
                5%
                <div className="nodeTxt">{t("节点")}</div>
              </div>
              <div className="nodeLine"></div>
              <div className="donateOption">
                60%
                <div className="donateTxt">{t("捐赠池")}</div>
              </div>
            </div>

            <div className="addressBox">
              <div className="adddressTxt">
                <span className="spn1">{t("合约地址")}:</span>
                <span className="spn2">
                  0xC0B51b2633b809C3c82554e084E17397D0e2EaC5
                </span>
              </div>
              <img src={copyIcon} className="copyIcon"></img>
            </div>
          </div>
        </div>
      </div>
      <div className="rankingBox">
        <div className="rankIngTxt">{t('捐赠排行榜')}</div>
        <div className="rankingTopBox">
          <div className="topItemOne topItem">
            <div className="txt">-</div>
            <div className="usdt">USDT</div>
            <div className="walletAddress">-</div>
          </div>
          <div className="topItemTwo topItem">
            <div className="txt">-</div>
            <div className="usdt">USDT</div>
            <div className="walletAddress">-</div>
          </div>
          <div className="topItemThree topItem">
            <div className="txt">-</div>
            <div className="usdt">USDT</div>
            <div className="walletAddress">-</div>
          </div>
        </div>
        <div className="box">
          <div className="rankingListBox">
            <div className="headerTopOption">
              <div className="headerLeft colorSize">{t('排名')}</div>
              <div className="headerCenter colorSize">{t('用户')}</div>
              <div className="headerRight colorSize">{t('总捐赠')}</div>
            </div>
            <div className="rankingItemBox">
              {[4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                <div className="rankingItem" key={index}>
                  <div className="itemLeft">{item}</div>
                  <div className="itemCenter">-</div>
                  <div className="itemRight">- USDT</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeCenterBox;
