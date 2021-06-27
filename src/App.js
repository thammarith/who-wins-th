import React, { useState, useEffect } from "react";
import WhoWins from "./who-wins.png";
import Github from "./gh.svg";

import "./App.css";

const difficulty = 4;

const common = [
  "โควิด",
  "ไม่มีใคร",
  "รัฐบาล",
  "ข้าราชการ",
  "ทหาร",
  "ตำรวจ",
  "เจ้าหน้าที่รัฐ",
  "นายทุน",
  "เจ้าสัว",
  "ฝันไปว่า",
  "เลานจ์",
];
const rare = ["ธุรกิจขนส่ง", "Food Delivery"];
const ultraRare = ["ผู้ประกอบการ SME", "เจ้าของธุรกิจรายย่อย"];
const legendary = ["ร้านอาหาร"];
const mythical = ["ประชาชน", "คนไทย", "คุณ", "เรา"];

const list = [common, rare, ultraRare, legendary, mythical];
const rarities = ["Common", "Rare", "Ultrarare", "Legendary", "Mythical"];

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState([]);

  const [rarityLevel, winner] = result;

  useEffect(() => {
    const randomiser = setInterval(() => {
      const compendium = [].concat(...list);
      const randomisedItem =
        compendium[Math.floor(Math.random() * compendium.length)];
      setResult([null, randomisedItem]);
    }, 60);

    setTimeout(() => {
      setResult(() => rarityRandom());
      clearInterval(randomiser);
    }, 1000);
  }, [count]);

  function forceUpdate() {
    setCount(count + 1);
  }

  const buttonText =
    rarityLevel >= list.length - 2 ? "555 จะบ้าหรอ" : "หาผู้ชนะใหม่";

  return (
    <div className="App">
      <a href="https://github.com/thammarith/who-wins-th">
        <img className="Github" src={Github} />
      </a>
      <img className="AppLogo" src={WhoWins} />
      <div className="Winner">
        <span className="WinnerResult">{winner}</span>
        <span className="WinnerWins">ชนะ</span>
      </div>
      {rarityLevel !== null && (
        <div className="Rarity">({rarities[rarityLevel]})</div>
      )}
      {rarityLevel !== null && (
        <button className="NewWinner" onClick={forceUpdate}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

function rarityRandom() {
  const tier = Math.floor(Math.pow(Math.random(), difficulty) * list.length);
  const item = Math.floor(Math.random() * list[tier].length);
  return [tier, list[tier][item]];
}

export default App;
