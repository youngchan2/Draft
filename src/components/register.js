import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/register.css";

function Register() {
    const location = useLocation();
    const navigate = useNavigate();
    const { option } = location.state || {};

    const getKey = (p) => {
        if (p === 5) return "rift";
        if (p === 6) return "futsal";
        if (p === 11) return "soccer";
        return null;
    }

    const key = getKey(option);
    const storedData = key ? JSON.parse(localStorage.getItem(key)) : null;

    const [saveOption, setSaveOption] = useState(() => {
        // localStorage에서 데이터를 읽어서 초기화
        return storedData ? storedData.option : null;
    });

    const [players, setPlayers] = useState(() => {
        // localStorage에서 플레이어 목록을 읽어서 초기화
        return storedData ? storedData.players : [];
    });

    const [newPlayer, setNewPlayer] = useState("");

    useEffect(() => {
        // option이 변경될 때마다 로컬 스토리지 업데이트
        if (option && option !== saveOption) {
            const newGameData = { option, players: [] };
            localStorage.setItem(key, JSON.stringify(newGameData));

            setSaveOption(option);
            setPlayers([]);
        }
    }, [option, saveOption, key]);

    const addPlayer = () => {
        const trimmedPlayer = newPlayer.trim();

        if (trimmedPlayer === "") {
            alert("선수 이름을 입력하세요");
            return;
        }
        if (players.length === 2 * option) {
            alert("선수 정원을 초과했습니다");
            setNewPlayer("");
            return;
        }

        const updatedPlayers = [...players, trimmedPlayer];
        setPlayers(updatedPlayers);
        setNewPlayer("");

        // 플레이어 목록을 localStorage에 저장
        if (storedData) {
            storedData.players = updatedPlayers;
            localStorage.setItem(key, JSON.stringify(storedData));
        }
    };

    const deletePlayer = (player) => {
        const updatedPlayers = players.filter((p) => p !== player);
        setPlayers(updatedPlayers);

        // 업데이트된 플레이어 목록을 localStorage에 저장
        if (storedData) {
            storedData.players = updatedPlayers;
            localStorage.setItem(key, JSON.stringify(storedData));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addPlayer();
    };

    const handleNext = () => {
        navigate(`/register/${saveOption}/draft`, { state: { saveOption } });
    };

    const handlePrev = () => {
        navigate("/");
    };

    return (
        <div className="register">
            <h1>선 수 등 록</h1>
            <p>선택한 옵션: {saveOption ? `${saveOption}vs${saveOption}` : "null"}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newPlayer}
                    onChange={(e) => setNewPlayer(e.target.value)}
                    placeholder="선수 입력"
                />
                <button type="submit">+</button>
            </form>
            <div className="register-players">
                <h2>선수 목록</h2>
                <ul>
                    {players.map((player, index) => (
                        <li className="register-player" key={index}>
                            {player}{" "}
                            <button onClick={() => deletePlayer(player)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handlePrev}>이전</button>
            <button onClick={handleNext} disabled={players.length !== 2 * saveOption}>
                다음
            </button>
        </div>
    );
}

export default Register;