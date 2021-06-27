import React, { useState, useEffect } from "react";
import WhoWins from "./who-wins.png";

import "./App.css";

const difficulty = 6;

const common = [
  "ไม่มีใคร",
  "รัฐบาล",
  "ข้าราชการ",
  "ทหาร",
  "ตำรวจ",
  "เจ้าหน้าที่รัฐ",
  "นายทุน",
];
const rare = ["ธุรกิจขนส่ง"];
const ultraRare = ["ผู้ประกอบการ SME", "เจ้าของธุรกิจรายย่อย", "เจ้าสัว"];
const legendary = ["ร้านอาหาร"];
const mythical = ["ประชาชน", "คนไทย", "คุณ"];

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
    }, 80);

    setTimeout(() => {
      setResult(() => rarityRandom());
      clearInterval(randomiser);
    }, 1000);
  }, [count]);

  function forceUpdate() {
    setCount(count + 1);
  }

  return (
    <div className="App">
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
          หาผู้ชนะใหม่
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