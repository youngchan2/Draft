import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/formation.css";

function Formation() {
    const navigate = useNavigate();
    const location = useLocation();
    const team1 = location.state.team1;
    const team2 = location.state.team2;
    const savedOption = Number(localStorage.getItem("option"))||null;

    const [positions, setPositions] = useState({
        team1: [
            { id: 1, name: `${team1[0]}(C)`, top: "30%", left: "40%" },
            { id: 2, name: team1[1], top: "60%", left: "40%" },
            { id: 3, name: team1[2], top: "47%", left: "33%" },
            { id: 4, name: team1[3], top: "60%", left: "25%" },
            { id: 5, name: team1[4], top: "30%", left: "25%" },
            { id: 6, name: team1[5], top: "47%", left: "9.5%" },
        ],
        team2: [
            { id: 1, name: `${team2[0]}(C)`, top: "30%", left: "60%" },
            { id: 2, name: team2[1], top: "60%", left: "60%" },
            { id: 3, name: team2[2], top: "47%", left: "67%" },
            { id: 4, name: team2[3], top: "60%", left: "75%" },
            { id: 5, name: team2[4], top: "30%", left: "75%" },
            { id: 6, name: team2[5], top: "47%", left: "85%" },
        ],
    });

    const [dragged, setDragged] = useState(null);

    const handleDragStart = (team, playerID) => {
        setDragged({ team, playerID });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (team, targetPlayerID) => {  //targetID: 드랍된 위치에 있는 선수의 Id
        if (!dragged) return;
        if (dragged.team !== team){
            alert("팀 변경은 불가능합니다");
            return;
        }

        const updatedPositions = { ...positions };
        const draggedPlayer = updatedPositions[team].find(
            (p) => p.id === dragged.playerID
        );
        const targetPlayer = updatedPositions[team].find(
            (p) => p.id === targetPlayerID
        );

        // 위치 교환
        [draggedPlayer.top, targetPlayer.top] = [targetPlayer.top, draggedPlayer.top];
        [draggedPlayer.left, targetPlayer.left] = [targetPlayer.left, draggedPlayer.left];

        setPositions(updatedPositions);
        setDragged(null);
    };

    const handlePrev = () => {
        navigate(`/register/${savedOption}/draft`);
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <div className="draft-background">
            <div className="fm-team1">
                {positions.team1.map((player) => (
                    <div
                        key={player.id}
                        className={`fm-t1-player player${player.id}`}
                        style={{ top: player.top, left: player.left }}
                        draggable
                        onDragStart={() => handleDragStart("team1", player.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop("team1", player.id)}
                    >
                        {player.name}
                    </div>
                ))}
            </div>
            <div className="fm-team2">
                {positions.team2.map((player) => (
                    <div
                        key={player.id}
                        className={`fm-t2-player player${player.id}`}
                        style={{ top: player.top, left: player.left }}
                        draggable
                        onDragStart={() => handleDragStart("team2", player.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop("team2", player.id)}
                    >
                        {player.name}
                    </div>
                ))}
            </div>
            <div className="fixed-button">
                <button onClick={handlePrev}>이전</button>
                <button onClick={handleHome}>홈</button>
            </div>
        </div>
    );
}

export default Formation;