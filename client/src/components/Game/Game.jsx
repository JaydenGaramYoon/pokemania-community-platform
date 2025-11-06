// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import './game.css';

// const Game = () => {
//     const [score, setScore] = useState(0);
//     const [pokemon, setPokemon] = useState(null);
//     const [pokemonName, setPokemonName] = useState('');
//     const [guess, setGuess] = useState('');
//     const [gameRunning, setGameRunning] = useState(false);
//     const [gameOver, setGameOver] = useState(false);
//     const [finalScore, setFinalScore] = useState(0);
//     const [pokemonList, setPokemonList] = useState([]);
//     const [pokemonImage, setPokemonImage] = useState('');
//     const [shadowImage, setShadowImage] = useState('');
//     const [shadowVisible, setShadowVisible] = useState(true);

//     // 저장 관련 state
//     const [saveMessage, setSaveMessage] = useState('');
//     const [savedDate, setSavedDate] = useState('');
//     const [autoEndMessage, setAutoEndMessage] = useState(''); // 게임 자동 종료 메시지

//     // 오디오 객체는 useRef로 한 번만 생성
//     const clickSound = useRef(null);
//     const backgroundMusic = useRef(null);

//     const location = useLocation();
//     const prevPath = useRef(location.pathname);

//     // 오디오 초기화
//     useEffect(() => {
//         clickSound.current = new window.Audio('/sounds/click.mp3');
//         backgroundMusic.current = new window.Audio('/sounds/background.mp3');
//     }, []);

//     // 페이지 이동 시 게임 종료 및 음악 정지 + 메시지 표시
//     useEffect(() => {
//         // 처음 마운트 시에는 실행하지 않음
//         if (prevPath.current !== location.pathname) {
//             if (backgroundMusic.current) {
//                 backgroundMusic.current.pause();
//                 backgroundMusic.current.currentTime = 0;
//             }
//             if (gameRunning) {
//                 setGameRunning(false);
//                 setGameOver(false);
//                 setAutoEndMessage('Game is automatically ended due to page navigation.');
//             }
//         }
//         prevPath.current = location.pathname;

//         // 게임 페이지로 돌아왔을 때 항상 첫 시작 화면으로
//         setGameOver(false);
//         setGameRunning(false);
//         setFinalScore(0);
//         setGuess('');
//         setShadowVisible(true);
//         setSaveMessage('');
//         setSavedDate('');
//         setAutoEndMessage('');

//         // Cleanup function to stop music when component unmounts or on page navigation
//         return () => {
//             if (backgroundMusic.current) {
//                 backgroundMusic.current.pause();
//                 backgroundMusic.current.currentTime = 0;
//             }
//         };

//         // eslint-disable-next-line
//     }, [location.pathname]);

//     // Fetch list of Pokémon to choose from
//     useEffect(() => {
//         const fetchPokemonList = async () => {
//             const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
//             const data = await response.json();
//             setPokemonList(data.results);
//         };

//         fetchPokemonList();
//     }, []);

//     // Select a random Pokémon and get its shadow image
//     useEffect(() => {
//         if (pokemonList.length > 0 && gameRunning) {
//             const randomIndex = Math.floor(Math.random() * pokemonList.length);
//             const pokemonUrl = pokemonList[randomIndex].url;

//             const fetchPokemonData = async () => {
//                 const response = await fetch(pokemonUrl);
//                 const data = await response.json();
//                 console.log(data.name);
//                 setPokemon(data);
//                 setPokemonName(data.name);
//                 setPokemonImage(data.sprites.other['official-artwork'].front_default);
//                 setShadowImage(data.sprites.other['official-artwork'].front_default);
//                 setShadowVisible(true);
//             };

//             fetchPokemonData();
//         }
//     }, [pokemonList, gameRunning]);

//     const handleGuessChange = (e) => {
//         setGuess(e.target.value);
//     };

//     const handleSubmitGuess = () => {
//         clickSound.current && clickSound.current.play();

//         if (guess.toLowerCase() === pokemonName.toLowerCase()) {
//             setScore((prevScore) => prevScore + 10);
//             setShadowVisible(false);

//             // 새로운 문제를 로드하도록 setTimeout 추가
//             setTimeout(() => {
//                 levelUp();  // 레벨업
//                 loadNextPokemon();  // 다음 문제를 로드
//             }, 1000);
//         } else {
//             if (backgroundMusic.current) {
//                 backgroundMusic.current.pause();
//                 backgroundMusic.current.currentTime = 0;
//             }
//             setFinalScore(score);
//             setGameOver(true);
//             setGameRunning(false);
//         }

//         setGuess('');
//     };

//     const loadNextPokemon = () => {
//         const randomIndex = Math.floor(Math.random() * pokemonList.length);
//         const pokemonUrl = pokemonList[randomIndex].url;

//         const fetchPokemonData = async () => {
//             const response = await fetch(pokemonUrl);
//             const data = await response.json();
//             console.log(data.name);
//             setPokemon(data);
//             setPokemonName(data.name);
//             setPokemonImage(data.sprites.other['official-artwork'].front_default);
//             setShadowImage(data.sprites.other['official-artwork'].front_default);
//             setShadowVisible(true);
//         };

//         fetchPokemonData();
//     };

//     const levelUp = () => {
//         setGameRunning(true);
//     };

//     const startGame = () => {
//         if (backgroundMusic.current) {
//             backgroundMusic.current.pause();
//             backgroundMusic.current.currentTime = 0;
//             backgroundMusic.current.play();
//             backgroundMusic.current.loop = true;
//         }

//         setScore(0);
//         setGameOver(false);
//         setGameRunning(true);
//         setFinalScore(0);
//         setGuess('');
//         setShadowVisible(true);
//         setSaveMessage('');
//         setSavedDate('');
//         setAutoEndMessage('');
//     };

//     const restartGame = () => {
//         setGameOver(false);
//         startGame();
//     };

//     // 저장 버튼 클릭 시
//     const handleSaveScore = async () => {
//         console.log('💾 Save button clicked');
//         const now = new Date();
//         const dateString = now.toLocaleString();
//         setSavedDate(dateString);

//         const userId = localStorage.getItem('userId_user'); // userId 가져오기
//         console.log('🔍 userId:', userId);
//         if (!userId || userId === 'null') {
//             console.error('🚫 No userId found in localStorage.');
//             setSaveMessage('Login required to save score.');
//             return;
//         }

//         console.log('✅ 시작: userId =', userId);

//         try {
//             const checkRes = await fetch(`/api/game/user/${userId}`);
//             if (!checkRes.ok) throw new Error('GET 요청 실패: ' + checkRes.status);

//             const userGames = await checkRes.json();
//             console.log('✅ 게임 데이터:', userGames);

//             const existingGame = userGames && userGames.length > 0 ? userGames[0] : null;

//             if (existingGame) {
//                 console.log('✏️ 기존 게임 ID:', existingGame._id);
//                 const updateRes = await fetch(`/api/game/${existingGame._id}`, {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ score: score }),
//                 });
//                 const updateData = await updateRes.json();
//                 console.log('✅ 업데이트 응답:', updateData);
//                 setSaveMessage('Score updated!');
//             } else {
//                 console.log('🆕 새 게임 생성');
//                 const createRes = await fetch('/api/game', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         user: userId,
//                         score: score,
//                     }),
//                 });
//                 const createData = await createRes.json();
//                 console.log('✅ 생성 응답:', createData);
//                 setSaveMessage('Score saved!');
//             }

//             setGameOver(false);
//             setGameRunning(false);
//         } catch (err) {
//             console.log('❌ 에러 발생:', err);
//             setSaveMessage('Failed to save score: ' + err.message);
//         }
//     };

//     return (
//         <div className="game-container" style={{ border: '2px solid #ccc', borderRadius: '12px' }}>
//             {/* 게임 자동 종료 메시지 */}
//             {autoEndMessage && (
//                 <div style={{
//                     position: 'absolute',
//                     top: 40,
//                     left: 0,
//                     right: 0,
//                     zIndex: 2000,
//                     color: '#fff',
//                     background: 'rgba(0,0,0,0.8)',
//                     padding: 20,
//                     fontSize: 20,
//                     borderRadius: 12,
//                     margin: '0 auto',
//                     width: 400,
//                     textAlign: 'center'
//                 }}>
//                     {autoEndMessage}
//                     <button
//                         style={{
//                             marginTop: 16,
//                             padding: '8px 24px',
//                             fontSize: 16,
//                             borderRadius: 8,
//                             border: 'none',
//                             background: '#1976d2',
//                             color: '#fff',
//                             cursor: 'pointer'
//                         }}
//                         onClick={() => setAutoEndMessage('')}
//                     >
//                         확인
//                     </button>
//                 </div>
//             )}
//             {/* Game Over Screen Inside Container */}
//             {gameOver ? (
//                 <div id="gameOverOverlay" className="show" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}>
//                     <div id="finalScoreboard">
//                         Score: <strong>{finalScore}</strong></div>
//                     <div id="displayName">{pokemonName}</div>
//                     <div>
//                         <img
//                             src={pokemonImage}
//                             alt={pokemonName}
//                             className="pokemon-image actual"
//                             style={{ width: '500px', height: '500px', objectFit: 'contain' }}
//                         />
//                     </div>
//                     <div id="finalButtons">
//                         {/* 저장 인터페이스 */}
//                         <button id="saveButton" onClick={handleSaveScore}>
//                             Save Game
//                         </button>
//                         <button id="restartButton" onClick={restartGame}>Restart Game</button>
//                         {saveMessage && (
//                             <div>
//                                 {saveMessage} {savedDate && <span>({savedDate})</span>}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ) : !gameRunning ? (
//                 // Start Screen
//                 <div id="startScreen">
//                     <div id="startMessage">Guess The Pokémon!</div>
//                     <button id="startButton" onClick={startGame}>Start Game</button>
//                 </div>
//             ) : (
//                 // Game Screen
//                 <div id="pokemonShadow">
//                     <div id="scoreboard">
//                         Score: <strong id="score">{score}</strong>
//                     </div>
//                     {pokemon ? (
//                         <div style={{ position: 'relative', width: 500, height: 500, margin: '0 auto 32px auto' }}>
//                             <img
//                                 src={pokemonImage}
//                                 alt="Pokemon"
//                                 className="pokemon-image actual"
//                                 style={{ opacity: shadowVisible ? 0 : 1, position: 'absolute', top: 0, left: 0 }}
//                             />
//                             <img
//                                 src={shadowImage}
//                                 alt="Pokemon Shadow"
//                                 className="pokemon-image shadow"
//                                 style={{ opacity: shadowVisible ? 1 : 0, filter: 'brightness(0)', position: 'absolute', top: 0, left: 0 }}
//                             />
//                         </div>
//                     ) : (
//                         <p>Loading...</p>
//                     )}
//                     <input
//                         type="text"
//                         value={guess}
//                         onChange={handleGuessChange}
//                         placeholder="Enter Pokémon name"
//                         className="pokemon-input"
//                     />
//                     <button id="submitButton"
//                         onClick={handleSubmitGuess}
//                         className="submit-button"
//                     >
//                         Submit Guess
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Game;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Game.css';
import { use } from 'react';

const Game = () => {
    const [score, setScore] = useState(0);
    const [pokemon, setPokemon] = useState(null);
    const [pokemonName, setPokemonName] = useState('');
    const [guess, setGuess] = useState('');
    const [gameRunning, setGameRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonImage, setPokemonImage] = useState('');
    const [shadowImage, setShadowImage] = useState('');
    const [shadowVisible, setShadowVisible] = useState(true);

    // save state
    const [savedDate, setSavedDate] = useState('');
    const [autoEndMessage, setAutoEndMessage] = useState('');
    const [userGames, setUserGames] = useState([]);
    const [showScores, setShowScores] = useState(false);

    // audio objects
    const clickSound = useRef(null);
    const backgroundMusic = useRef(null);

    const location = useLocation();
    const prevPath = useRef(location.pathname);

    // userId
    const user = JSON.parse(localStorage.getItem('user')); // 'user' 객체를 가져오기
    const userId = user ? user._id : null; // userId를 추출

    // audio initialization
    useEffect(() => {
        clickSound.current = new window.Audio('/sounds/click.mp3');
        backgroundMusic.current = new window.Audio('/sounds/background.mp3');
    }, []);

    // fetch user game records on component mount
    useEffect(() => {
        // Fetch the game records if userId is available
        if (userId) {
            handleReadScore();
        }
    }, [userId]); // Ensuring it fetches every time the userId change

    // read user game records
    const handleReadScore = async () => {
        if (!userId) {
            alert('Login required to view game records.');
            return;
        }

        try {
            const res = await fetch(`/api/game/user/${userId}`);
            if (!res.ok) throw new Error('Failed to fetch game records');
            const data = await res.json();
            setUserGames(data);
            console.log('🔍 Retrieved game records:', data);
        } catch (err) {
            console.error('❌ Error:', err);
            alert('Failed to retrieve game records: ' + err.message);
        }
    };


    // audio cleanup and page navigation handling
    useEffect(() => {
        if (prevPath.current !== location.pathname) {
            if (backgroundMusic.current) {
                backgroundMusic.current.pause();
                backgroundMusic.current.currentTime = 0;
            }
            if (gameRunning) {
                setGameRunning(false);
                setGameOver(false);
                setAutoEndMessage('Game is automatically ended due to page navigation.');
            }
        }
        prevPath.current = location.pathname;

        // go to the start screen when navigating to the game page
        setGameOver(false);
        setGameRunning(false);
        setFinalScore(0);
        setGuess('');
        setShadowVisible(true);
        setSavedDate('');
        setAutoEndMessage('');

        // Cleanup function to stop music when component unmounts or on page navigation
        return () => {
            if (backgroundMusic.current) {
                backgroundMusic.current.pause();
                backgroundMusic.current.currentTime = 0;
            }
        };

    }, [location.pathname]);

    // Fetch list of Pokémon to choose from
    useEffect(() => {
        const fetchPokemonList = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
            const data = await response.json();
            setPokemonList(data.results);
        };
        fetchPokemonList();
    }, []);

    // Select a random Pokémon and get its shadow image
    useEffect(() => {
        if (pokemonList.length > 0 && gameRunning) {
            const randomIndex = Math.floor(Math.random() * pokemonList.length);
            const pokemonUrl = pokemonList[randomIndex].url;

            const fetchPokemonData = async () => {
                const response = await fetch(pokemonUrl);
                const data = await response.json();
                console.log(data.name);
                setPokemon(data);
                setPokemonName(data.name);
                setPokemonImage(data.sprites.other['official-artwork'].front_default);
                setShadowImage(data.sprites.other['official-artwork'].front_default);
                setShadowVisible(true);
            };

            fetchPokemonData();
        }
    }, [pokemonList, gameRunning]);

    const handleGuessChange = (e) => {
        setGuess(e.target.value);
    };

    const handleSubmitGuess = () => {
        clickSound.current && clickSound.current.play();

        if (guess.toLowerCase() === pokemonName.toLowerCase()) {
            setScore((prevScore) => prevScore + 10);
            setShadowVisible(false);

            // load next Pokémon after a short delay
            setTimeout(() => {
                levelUp();
                loadNextPokemon();
            }, 1000);
        } else {
            if (backgroundMusic.current) {
                backgroundMusic.current.pause();
                backgroundMusic.current.currentTime = 0;
            }
            setFinalScore(score);
            setGameOver(true);
            setGameRunning(false);
        }

        setGuess('');
    };

    const loadNextPokemon = () => {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const pokemonUrl = pokemonList[randomIndex].url;

        const fetchPokemonData = async () => {
            const response = await fetch(pokemonUrl);
            const data = await response.json();
            console.log(data.name);
            setPokemon(data);
            setPokemonName(data.name);
            setPokemonImage(data.sprites.other['official-artwork'].front_default);
            setShadowImage(data.sprites.other['official-artwork'].front_default);
            setShadowVisible(true);
        };

        fetchPokemonData();
    };

    const levelUp = () => {
        setGameRunning(true);
    };

    const startGame = () => {
        if (backgroundMusic.current) {
            backgroundMusic.current.pause();
            backgroundMusic.current.currentTime = 0;
            backgroundMusic.current.play();
            backgroundMusic.current.loop = true;
        }

        setScore(0);
        setGameOver(false);
        setGameRunning(true);
        setFinalScore(0);
        setGuess('');
        setShadowVisible(true);
        setSavedDate('');
        setAutoEndMessage('');
    };

    const restartGame = () => {
        setGameOver(false);
        startGame();
    };

    // User CRUD operation 1 : Read game record
    const displayScores = () => {
        if (userGames.length === 0) {
            alert("🔍 No game records found.");
        }
        setShowScores(!showScores);
    };

    // User CRUD operation 2 : Delete game record
    const handleDeleteScore = async (gameId) => {
        try {
            const deleteRes = await fetch(`/api/game/${gameId}`, {
                method: 'DELETE',
            });

            if (!deleteRes.ok) throw new Error('Failed to delete game record');
            const deletedData = await deleteRes.json();
            console.log('Deleted game record:', deletedData);
            alert('✅ Game record deleted successfully!');

            handleReadScore();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to delete score: ' + err.message);
        }
    };

    // User CRUD operation 3, 4 : Create and Update game record
    const handleSaveScore = async () => {
        console.log('userId:', userId);
        console.log('Save button clicked');
        const now = new Date();
        const dateString = now.toLocaleString();
        setSavedDate(dateString);

        if (!userId || userId === 'null') {
            console.error('No userId found in localStorage.');
            alert('❗Login required to save score.');
            return;
        }

        console.log('시작: userId =', userId);

        try {
            const checkRes = await fetch(`/api/game/user/${userId}`);
            if (!checkRes.ok) throw new Error('GET 요청 실패: ' + checkRes.status);

            const userGames = await checkRes.json();
            console.log('게임 데이터:', userGames);

            const existingGame = userGames && userGames.length > 0 ? userGames[0] : null;

            // Check if there is an existing game record for the user
            if (existingGame) {
                console.log('Excisting Game ID:', existingGame._id);
                const updateRes = await fetch(`/api/game/${existingGame._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ score: score }),
                });
                const updateData = await updateRes.json();
                console.log('Game ScoreUpdated :', updateData);
                alert('🎉 Score has been updated successfully!');
            } else { // New game record creation
                console.log('New Game Score Saved');
                const createRes = await fetch('/api/game', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user: userId,
                        score: score,
                    }),
                });
                const createData = await createRes.json();
                console.log('생성 :', createData);
                alert('🎉 First score has been saved successfully!');
            }

            // Reset game state after saving
            handleReadScore();
        } catch (err) {
            console.log('에러:', err);
            alert('Failed to save score: ' + err.message);
        }
    };

    return (
        <div className="game-container" style={{ border: '2px solid #ccc', borderRadius: '12px' }}>
            {/* When game ends */}
            {autoEndMessage && (
                <div style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    right: 0,
                    zIndex: 2000,
                    color: '#fff',
                    background: 'rgba(0,0,0,0.8)',
                    padding: 20,
                    fontSize: 20,
                    borderRadius: 12,
                    margin: '0 auto',
                    width: 400,
                    textAlign: 'center'
                }}>
                    {autoEndMessage}
                    <button
                        style={{
                            marginTop: 16,
                            padding: '8px 24px',
                            fontSize: 16,
                            borderRadius: 8,
                            border: 'none',
                            background: '#1976d2',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                        onClick={() => setAutoEndMessage('')}
                    >
                        확인
                    </button>
                </div>
            )}
            {/* Game Over Screen Inside Container */}
            {gameOver ? (
                <div id="gameOverOverlay" className="show" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}>
                    <div id="finalScoreboard">
                        Score: <strong>{finalScore}</strong></div>
                    <div id="displayName">{pokemonName}</div>
                    <div>
                        <img
                            src={pokemonImage}
                            alt={pokemonName}
                            className="pokemon-image actual"
                        />
                    </div>
                    <button id="scoreButton" onClick={displayScores}>
                        Saved Score
                    </button>
                    {/* Saved Score */}
                    {showScores && userGames.length > 0 && (
                        <div id="gameRecords">
                            <h3 style={{
                                color: 'black',
                                marginBottom: '12px'
                            }}>Score Board</h3>
                            <ul>
                                {userGames.map((game) => (
                                    <li
                                        key={game._id}
                                        style={{
                                            listStyle: 'none',
                                            color: '#222',
                                            marginBottom: '12px',
                                            fontSize: '25px',
                                        }}
                                    >
                                        <p style={{ margin: 0 }}>
                                            {new Date(game.playedAt).toLocaleString()} |
                                            Score : <span style={{ fontWeight: 'bold' }}>
                                                {game.score}
                                            </span>
                                        </p>
                                        <button style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            marginTop: '20px',
                                            marginRight: '10px',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }} onClick={() => setShowScores(false)}>Close</button>
                                        <button
                                            style={{
                                                backgroundColor: '#f44336',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                marginTop: '20px',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            }} onClick={() => handleDeleteScore(game._id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div id="finalButtons">
                        {/* saving interface */}
                        <button id="saveButton" onClick={handleSaveScore}>
                            Save Game
                        </button>
                        <button id="restartButton" onClick={restartGame}>Restart Game</button>
                    </div>
                </div>
            ) : !gameRunning ? (
                // Start Screen
                <div id="startScreen">
                    <div id="startMessage">Guess The Pokémon!</div>
                    <button id="startButton" onClick={startGame}>Start Game</button>
                </div>
            ) : (
                // Game Screen
                <div id="pokemonShadow">
                    <div id="scoreboard">
                        Score: <strong id="score">{score}</strong>
                    </div>
                    {pokemon ? (
                        <div className="pokemon-container" style={{ position: 'relative', margin: '0 auto 32px auto' }}>
                            <img
                                src={pokemonImage}
                                alt="Pokemon"
                                className="pokemon-image actual"
                                style={{ opacity: shadowVisible ? 0 : 1, position: 'absolute', top: 0, left: 0 }}
                            />
                            <img
                                src={shadowImage}
                                alt="Pokemon Shadow"
                                className="pokemon-image shadow"
                                style={{ opacity: shadowVisible ? 1 : 0, filter: 'brightness(0)', position: 'absolute', top: 0, left: 0 }}
                            />
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <input
                        type="text"
                        value={guess}
                        onChange={handleGuessChange}
                        placeholder="Enter Pokémon name"
                        className="pokemon-input"
                    />
                    <button id="submitButton"
                        onClick={handleSubmitGuess}
                        className="submit-button"
                    >
                        Submit Guess
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;