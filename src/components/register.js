import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {
    const location = useLocation();
    const navigate = useNavigate();
    const { option } = location.state || {};

    const [players, setPlayers] = useState(() => {
        const savedPlayers = JSON.parse(localStorage.getItem("players"));
        return savedPlayers || [];
    });

    const [newPlayer, setNewPlayer] = useState("");

    const addPlayer = () => {
        const trimmedPlayer = newPlayer.trim();

        if(trimmedPlayer === ""){
            alert("선수 이름을 입력하세요");
            return;
        }
        if(players.length === 2*option){
            alert("선수 정원을 초과했습니다");
            setNewPlayer("");
            return;
        }
        
        const updatedPlayers = [...players, trimmedPlayer];
        setPlayers(updatedPlayers);
        setNewPlayer("");
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
    };

    const deletePlayer = (player) => {
        const updatedPlayers = players.filter(p => p !== player);
        setPlayers(updatedPlayers);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        addPlayer();
    }

    const handleNext = () => {
        navigate("/register/draft", { state: { players } });
    };

    const handlePrev = () =>{
        navigate("/");
    }

    return (
        <div>
            <h1>선 수 등 록</h1>
            <p>선택한 옵션: {option ? `${option}vs${option}` : "null"}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newPlayer}
                    onChange={(e) => setNewPlayer(e.target.value)}
                    placeholder="선수 입력"
                />
                <button type="submit">+</button>
            </form>
            <div>
                <h2>선수 목록</h2>
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>
                            {player}{" "}
                            <button onClick={() => deletePlayer(player)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handlePrev}>이전</button>
            <button onClick={handleNext} disabled={players.length!==2*option}>다음</button>
        </div>
    );
}

export default Register;