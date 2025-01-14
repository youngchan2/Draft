import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

function Home(){
    const naviagte = useNavigate();
    const onClick = (option)=>{
        naviagte("/register", {state:{option}});
    };

    return (
        <div className="home">
            <h1>드래프트</h1>
            <p>원하는 인원 수를 선택하세요</p>
            <div className="home-button">
                <button className="home-option" onClick={()=>onClick(5)}>5 vs 5</button>
                <button className="home-option" onClick={()=>onClick(6)}>6 vs 6</button>
                <button className="home-option" onClick={()=>onClick(11)}>11 vs 11</button>
            </div>
        </div>
    );
}

export default Home;