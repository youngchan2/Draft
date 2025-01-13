import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/formation.css";

function Formation(){
    const navigate = useNavigate();
    const location = useLocation();
    const team1 = location.state.team1;
    const team2 = location.state.team2;

    const handlePrev = () =>{
        navigate("/register/draft");
    }

    const handleHome = () =>{
        navigate("/");
    }

    return (
        <div className="draft-background">
            <div className="fm-team1">
                <div className="fm-t1-player player1">{team1[0]}</div>
                <div className="fm-t1-player player2">{team1[1]}</div>
                <div className="fm-t1-player player3">{team1[2]}</div>
                <div className="fm-t1-player player4">{team1[3]}</div>
                <div className="fm-t1-player player5">{team1[4]}</div>
                <div className="fm-t1-player player6">{team1[5]}</div>
            </div>
            <div className="fm-team2">
                <div className="fm-t2-player player1">{team2[0]}</div>
                <div className="fm-t2-player player2">{team2[1]}</div>
                <div className="fm-t2-player player3">{team2[2]}</div>
                <div className="fm-t2-player player4">{team2[3]}</div>
                <div className="fm-t2-player player5">{team2[4]}</div>
                <div className="fm-t2-player player6">{team2[5]}</div>
            </div>
            <div className="fixed-button">
                <button onClick={handlePrev}>이전</button>
                <button onClick={handleHome}>홈</button>
            </div>
        </div>
    )
}

export default Formation;