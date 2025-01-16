import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/draft.css";

function Draft(){
    const navigate = useNavigate();
    const location = useLocation();
    const {saveOption} = location.state || {};

    const getKey = (p) => {
        if (p === 5) return "rift";
        if (p === 6) return "futsal";
        if (p === 11) return "soccer";
        return null;
    }
    const key = getKey(saveOption);
    const storedData = key ? JSON.parse(localStorage.getItem(key)) : null;
    const option = storedData.option;
    const players = storedData.players;

    const [remainPlayers, setRemainPlayers] = useState(players||[]);
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [isTeam1Turn, setIsTeam1Turn] = useState(true);

    const handleDraft = player =>{
        if(isTeam1Turn){
            setTeam1((prev)=>[...prev, player]);
        }
        else{
            setTeam2((prev)=>[...prev, player]);
        }
        setRemainPlayers((prev)=>prev.filter(p=>p!==player));
        setIsTeam1Turn(!isTeam1Turn);
    }
    
    const handleUndo = (team, player) => {
        if ((team === 1 && isTeam1Turn) || (team === 2 && !isTeam1Turn)) {
            alert("다른 팀의 차례입니다. 취소할 수 없습니다.");
            return;
        }

        if(team === 1){
            setTeam1((prev)=>prev.filter(p=>p!==player));
        }
        else{
            setTeam2((prev)=>prev.filter(p=>p!==player));
        }

        setRemainPlayers((prev)=>[...prev, player]);
        setIsTeam1Turn(team === 1);
    };

    const handleNext = () => {
        navigate("/register/draft/formation", { state: { team1, team2 } });
    };

    const handlePrev = () =>{
        navigate(`/register/${option}`, {state: {option}});
    }

    const handleHome = () =>{
        navigate("/");
    }

    return (
        <div className="container">
            {/* <h1>Draft</h1> */}
            <div className="team1">
                <h2>Team 1</h2>
                <ul>
                    {team1.map((player, index)=>(
                        <li key={index} className={index===0 ? "captain1" :"t1-player1"} onClick={()=>handleUndo(1, player)}>{player} {index===0 && <span>(C)</span>}</li>
                    ))}
                </ul>
            </div>
            <div className="remaining-players">
                <h2>픽!</h2>
                <ul>
                    {remainPlayers.map((player, index)=>(
                    <li key={index} onClick={()=>handleDraft(player)} >
                        {player}
                    </li>
                    ))}
                </ul>
                <div className="fixed-button">
                    <button onClick={handlePrev}>이전</button>
                    <button onClick={handleHome}>홈</button>
                    <button onClick={handleNext} disabled={remainPlayers.length !== 0}>다음</button>
                </div>
            </div>
            <div className="team2">
                <h2>Team 2</h2>
                <ul>
                    {team2.map((player, index)=>(
                        <li key={index} className={index===0 ? "captain2" :"t2-player2"} onClick={()=>handleUndo(2, player)} >{player} {index===0 && <span>(C)</span>}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Draft;