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

    const [select, setSelect] = useState("");
    const [remainPlayers, setRemainPlayers] = useState(initialRemainPlayers);
    const [team1, setTeam1] = useState(initialTeam1);
    const [team2, setTeam2] = useState(initialTeam2);
    // const [isTeam1Turn, setIsTeam1Turn] = useState(true);
    const [cntTurn, setCntTurn] = useState(1);

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

    const handleDraft = (opt, player) => {
        // if (isTeam1Turn) {
        // setTeam1((prev) => [...prev, player]);
        // } else {
        // setTeam2((prev) => [...prev, player]);
        // }
        // setRemainPlayers((prev) => prev.filter((p) => p !== player));
        // setIsTeam1Turn(!isTeam1Turn);

        const isTeamLeaderPhase = team1.length < 1 || team2.length < 1;

        setCntTurn((prevCntTurn) => {
    
            if (prevCntTurn % 4 === 0 || prevCntTurn % 4 === 1) {
                setTeam1((prev) => [...prev, player]);
            } else if (prevCntTurn % 4 === 2 || prevCntTurn % 4 === 3) {
                setTeam2((prev) => [...prev, player]);
            }
    
            setRemainPlayers((prev) => prev.filter((p) => p !== player));
            
            // const newCntTurn = (opt==="opt1")?prevCntTurn+2 : (isTeamLeaderPhase ? prevCntTurn + 2 : prevCntTurn + 1);

            if(opt === "opt1"){
                const newCntTurn = prevCntTurn+2;
                return newCntTurn;
            }
            else{
                const newCntTurn = (opt==="opt1")?prevCntTurn+2 : (isTeamLeaderPhase ? prevCntTurn + 2 : prevCntTurn + 1);
                return newCntTurn
            }

            // console.log("Draft cntTurn:", newCntTurn);
            // return newCntTurn;
        });
    };

    const handleUndo = (opt, team, player) => {
        // if ((team === 1 && isTeam1Turn) || (team === 2 && !isTeam1Turn)) {
        // alert("다른 팀의 차례입니다. 취소할 수 없습니다.");
        // return;
        // }

        // if (team === 1) {
        // setTeam1((prev) => prev.filter((p) => p !== player));
        // } else {
        // setTeam2((prev) => prev.filter((p) => p !== player));
        // }

        // setRemainPlayers((prev) => [...prev, player]);
        // setIsTeam1Turn(team === 1);
        console.log(opt);
        if(opt === "opt1"){
            setCntTurn((prevCntTurn) => {
                if(team === 1){
                    setTeam1((prev) => prev.filter((p) => p !== player));
                }
                else{
                    setTeam2((prev) => prev.filter((p) => p !== player));
                }
                setRemainPlayers((prev) => [...prev, player]);
                const newCntTurn = prevCntTurn - 2;
                console.log("Draft cntTurn:", newCntTurn);
                return newCntTurn;
            });
        }
        else{
            const isTeamLeaderPhase = team1.length === 1 || team2.length === 1;

            setCntTurn((prevCntTurn) => {
                if(!isTeamLeaderPhase){
                    if (team===1 && (prevCntTurn % 4 === 1 || prevCntTurn % 4 === 2)) {
                        setTeam1((prev) => prev.filter((p) => p !== player));
                    } else if (team===2 &&(prevCntTurn % 4 === 0 || prevCntTurn % 4 === 3)) {
                        setTeam2((prev) => prev.filter((p) => p !== player));
                    }
                    else {
                        alert("다른 팀의 차례입니다. 취소할 수 없습니다.");
                        return prevCntTurn;
                    }
                }
                else{
                    if(team === 1){
                        setTeam1((prev) => prev.filter((p) => p !== player));
                    }
                    else{
                        setTeam2((prev) => prev.filter((p) => p !== player));
                    }
                }
        
                setRemainPlayers((prev) => [...prev, player]);
                const newCntTurn = (isTeamLeaderPhase ? prevCntTurn - 2 : prevCntTurn - 1);
                console.log("Draft cntTurn:", newCntTurn);
                return newCntTurn;
            });
        }
    };

    const handleNext = () => {
        if (option === 6) {
        navigate(`${process.env.PUBLIC_URL}/register/${option}/draft/formation`, { state: { team1, team2, option } });
        } else {
        alert("아직 안함");
        navigate(`${process.env.PUBLIC_URL}/`);
        }
    };

    const handlePrev = () => {
        navigate(`${process.env.PUBLIC_URL}/register/${option}`, { state: { option } });
    };

    const handleHome = () => {
        navigate(`${process.env.PUBLIC_URL}/`);
    };

    const handleReset = () => {
        setTeam1([]);
        setTeam2([]);
        setRemainPlayers(initialPlayers);
        // setIsTeam1Turn(true);
        setCntTurn(1);
        setSelect("");

        if (key) {
            const updatedData = {
                ...storedData,
                team1: [],
                team2: [],
                remainPlayers: initialPlayers ,
            };
            saveToLocalStorage(updatedData);
        }
    }

    const handleRadioChange = (event) => {
        setSelect(event.target.value);
        console.log(event.target.value);
    };

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
                        onClick={() => handleUndo(select, 1, player)}
                        >
                        {player} {index === 0 && <span>(C)</span>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="remaining-players">
                <h2>픽!</h2>
                <div>
                    {select === "" && <h2>뽑기 방식을 선택하세요</h2>}
                    {(team1.length === 0 || team2.length === 0) && select !== "" && <h2>팀장을 뽑으세요</h2>}
                    {remainPlayers.length === 0 && <h2>다음을 누르세요</h2>}
                    
                    {remainPlayers.length !== 0 && (
                    <>
                        <input
                        type="radio"
                        id="option1"
                        name="번갈아"
                        value="opt1"
                        checked={select === 'opt1'}
                        onChange={handleRadioChange}
                        />
                        <label htmlFor="option1">한명씩</label>
                        <input
                            type="radio"
                            id="option2"
                            name="두명씩"
                            value="opt2"
                            checked={select === 'opt2'}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="option2">두명씩</label>
                        <h3 className={cntTurn%4 === 0|| cntTurn%4 === 1 ? "order1":"order2"}>순서: Team{cntTurn%4 === 0|| cntTurn%4 === 1?1:2}</h3>
                    </>
                    )
                    }
                </div>
                
                <div className="remain-list">
                    <div className="remaining-players-left">
                        <ul>
                        {leftRemain.map((player, index) => (
                            <li key={index} onClick={() => handleDraft(select, player)}>
                            {player}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div className="remaining-players-right">
                        <ul>
                            {rightRemain.map((player, index) => (
                                <li key={index} onClick={() => handleDraft(select, player)}>
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
                        onClick={() => handleUndo(select, 2, player)}
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