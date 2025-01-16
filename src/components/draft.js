import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/draft.css";

function Draft() {
    const navigate = useNavigate();
    const location = useLocation();
    const { saveOption } = location.state || {};

    const getKey = (p) => {   
    if (p === 5) return "rift";
    if (p === 6) return "futsal";
    if (p === 11) return "soccer";
    return null;
    };

    const key = getKey(saveOption);
    const storedData = key ? JSON.parse(localStorage.getItem(key)) : null;

    const option = storedData?.option;
    const initialPlayers = storedData?.players || [];
    const initialRemainPlayers = storedData?.remainPlayers || initialPlayers;
    const initialTeam1 = storedData?.team1 || [];
    const initialTeam2 = storedData?.team2 || [];

    const [remainPlayers, setRemainPlayers] = useState(initialRemainPlayers);
    const [team1, setTeam1] = useState(initialTeam1);
    const [team2, setTeam2] = useState(initialTeam2);
    const [isTeam1Turn, setIsTeam1Turn] = useState(true);

  // 데이터를 localStorage에 저장하는 함수 (메모화)
    const saveToLocalStorage = useCallback(
    (updatedData) => {
        if (key) {
            localStorage.setItem(key, JSON.stringify(updatedData));
        }
    },
    [key] // key가 변경될 때만 함수가 재생성
    );

    useEffect(() => {
        if (key) {
        const updatedData = {
            ...storedData,
            team1,
            team2,
            remainPlayers,
        };
        saveToLocalStorage(updatedData);
    }
  }, [team1, team2, remainPlayers, key, saveToLocalStorage, storedData]); // 필요한 모든 의존성을 포함

    const handleDraft = (player) => {
        if (isTeam1Turn) {
        setTeam1((prev) => [...prev, player]);
        } else {
        setTeam2((prev) => [...prev, player]);
        }
        setRemainPlayers((prev) => prev.filter((p) => p !== player));
        setIsTeam1Turn(!isTeam1Turn);
    };

    const handleUndo = (team, player) => {
        if ((team === 1 && isTeam1Turn) || (team === 2 && !isTeam1Turn)) {
        alert("다른 팀의 차례입니다. 취소할 수 없습니다.");
        return;
        }

        if (team === 1) {
        setTeam1((prev) => prev.filter((p) => p !== player));
        } else {
        setTeam2((prev) => prev.filter((p) => p !== player));
        }

        setRemainPlayers((prev) => [...prev, player]);
        setIsTeam1Turn(team === 1);
    };

    const handleNext = () => {
        if (option === 6) {
        navigate(`/register/${option}/draft/formation`, { state: { team1, team2, option } });
        } else {
        alert("아직 안함");
        navigate("/");
        }
    };

    const handlePrev = () => {
        navigate(`/register/${option}`, { state: { option } });
    };

    const handleHome = () => {
        navigate("/");
    };

    const handleReset = () => {
        setTeam1([]);
        setTeam2([]);
        setRemainPlayers(initialPlayers);
        setIsTeam1Turn(true);

        if (key) {
            const updatedData = {
                ...storedData,
                team1,
                team2,
                remainPlayers,
            };
            saveToLocalStorage(updatedData);
        }
    }

    const halfIndex = Math.ceil(remainPlayers.length / 2);
    const leftRemain = remainPlayers.slice(0, halfIndex);
    const rightRemain = remainPlayers.slice(halfIndex);

    return (
        <div className="container">
            <div className="team1">
                <h2>Team 1</h2>
                <ul>
                    {team1.map((player, index) => (
                        <li
                        key={index}
                        className={index === 0 ? "captain1" : "t1-player1"}
                        onClick={() => handleUndo(1, player)}
                        >
                        {player} {index === 0 && <span>(C)</span>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="remaining-players">
                <h2>픽!</h2>
                <h3 className={isTeam1Turn?"order1":"order2"}>순서: Team{isTeam1Turn?1:2}</h3>
                <div className="remain-list">
                    <div className="remaining-players-left">
                        <ul>
                        {leftRemain.map((player, index) => (
                            <li key={index} onClick={() => handleDraft(player)}>
                            {player}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="remaining-players-right">
                        <ul>
                            {rightRemain.map((player, index) => (
                                <li key={index} onClick={() => handleDraft(player)}>
                                {player}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="fixed-button">
                    <button onClick={handlePrev}>이전</button>
                    <button onClick={handleHome}>홈</button>
                    <button onClick={handleReset}>초기화</button>
                    <button onClick={handleNext} disabled={remainPlayers.length !== 0}>
                        다음
                    </button>
                </div>
            </div>
            <div className="team2">
                <h2>Team 2</h2>
                <ul>
                    {team2.map((player, index) => (
                        <li
                        key={index}
                        className={index === 0 ? "captain2" : "t2-player2"}
                        onClick={() => handleUndo(2, player)}
                        >
                        {player} {index === 0 && <span>(C)</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Draft;