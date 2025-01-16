import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import Soccer from "../components/soccerfield";
import Futsal from "../components/futsalfield";
import Rift from "../components/Rift";

function Home(){
    const naviagte = useNavigate();
    // const onClick = (option)=>{
    //     naviagte("/register", {state:{option}});
    // };

    const onOption = (option)=>{
        naviagte(`/register/${option}`, {state:{option}});
    }

    return (
        <div className="home">
            <h1>드래프트</h1>
            <p>원하는 종목을 선택하세요</p>
            {/* <div className="home-button">
                <button className="home-option" onClick={()=>onClick(5)}>5 vs 5</button>
                <button className="home-option" onClick={()=>onClick(6)}>6 vs 6</button>
                <button className="home-option" onClick={()=>onClick(11)}>11 vs 11</button>
            </div> */}
            <div className="field-container">
                <div className="field" onClick={()=>onOption(5)}>
                    <Rift bg1="#0" bg2="#0"/>
                    <span className="title">5vs5 협곡</span>
                </div>
                <div className="field" onClick={()=>onOption(6)}>
                    <Futsal bg="#0"/>
                    <span className="title">6vs6 풋살</span>
                </div>
                <div className="field" onClick={()=>onOption(11)}>
                    <Soccer bg1="#0" bg2="#0"/>
                    <span className="title">11vs11 축구</span>
                </div>
            </div>
        </div>
    );
}

export default Home;