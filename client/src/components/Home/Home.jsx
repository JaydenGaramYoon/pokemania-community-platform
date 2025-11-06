import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [pokemonInfos, setPokemonInfos] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [backgroundPokemons, setBackgroundPokemons] = useState([]);

    useEffect(() => {
        // pokemon_으로 시작하는 키만 파싱
        const storedFavourites = Object.keys(localStorage)
            .filter(key => key.startsWith('pokemon_'))
            .map(key => {
                try {
                    return JSON.parse(localStorage.getItem(key));
                } catch {
                    return null;
                }
            })
            .filter(Boolean);
        setFavourites(storedFavourites);

        // Load background pokemons
        loadBackgroundPokemons();
    }, []);

    const loadBackgroundPokemons = async () => {
        try {
            // 랜덤하게 20개의 포케몬 가져오기 (1-898 범위)
            const randomIds = Array.from({ length: 20 }, () => Math.floor(Math.random() * 898) + 1);
            const promises = randomIds.map(id => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then(res => res.json())
                    .then(data => data.sprites.front_default)
                    .catch(() => null)
            );
            const images = await Promise.all(promises);
            setBackgroundPokemons(images.filter(Boolean));
        } catch (error) {
            console.error('Failed to load background pokemons:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchInput) return;

        setIsLoading(true); // Show the spinner
        setErrorMessage(''); // Clear previous error message
        setPokemonInfos([]); // Clear previous Pokémon info

        const url = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;

        try {
            const response = await fetch(url);
            if (response.status === 404) {
                throw new Error('❌ Pokémon not found');
            }

            const data = await response.json();
            const newPokemon = {
                id: data.id,
                abilities: data.abilities,
                height: data.height,
                weight: data.weight,
                types: data.types.map(type => type.type.name),
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            };
            setPokemonInfos([newPokemon]);
        } catch (error) {
            setErrorMessage(error.message); // Set error message if Pokémon not found
        } finally {
            setIsLoading(false); // Hide the spinner when the loading is complete
        }
    };

    //Crud Operation 1: Create Pokémon to favourites
    const handleAddToFavourites = async (pokemon) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user._id : null;
        console.log("User ID:", userId, pokemon.id);

        if (!userId) {
            alert("Login required!");
            return;
        }

        // Prompt user for optional memo
        const memo = prompt(`Enter a memo for ${pokemon.name} (optional):`);

        try {
            console.log("[디버그] fetch POST /api/favourites 요청 시작");

            const response = await fetch(`/api/favourites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userId,
                    pokemonId: pokemon.id,
                    memo: memo || '',
                }),
            });
            console.log("fetch response:", response);
            if (response.status === 409) {
                alert("This Pokémon is already in your Poké Box!");
                return;
            }

            if (!response.ok) if (!response.ok) {
                let err;
                try {
                    err = await response.json();
                } catch {
                    err = { error: "Failed to add favourites" };
                }
                console.error("[디버그] 서버 에러 응답:", err);

                throw new Error(err.error || "Failed to add favourites");
            }

            setFavourites(prev => [...prev, pokemon]);
            alert(`${pokemon.name} added to your Favourites!`);
        } catch (error) {
            console.error("Add Favourite Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleModalOpen = (pokemon) => {
        setModalContent(pokemon);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleClickOutside = (e) => {
        // Check if click is outside pokemon-card
        if (e.target.id === 'pokemon-details') {
            setPokemonInfos([]);
        }
    };




    return (
        <>
            <div className="pokemon-background">
                {backgroundPokemons.map((imgUrl, idx) => (
                    <img key={idx} src={imgUrl} alt="" className="background-pokemon" />
                ))}
            </div>
            <div className="search-area">
                <input
                    type="text"
                    id="search-input"
                    value={searchInput}
                    placeholder='Search Pokémon by name or ID...'
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                <button id="search-button" onClick={handleSearch} disabled={isLoading}>
                    <img
                        src="/images/search.png"
                        alt="Search"
                        style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    />
                </button>
            </div>

            {/* Show the spinner while loading */}
            {isLoading && (
                <div style={{ textAlign: 'center', margin: '32px 0' }}>
                    <img
                        src="/images/loading.webp"
                        alt="Loading"
                        className="spinner"
                        style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    />
                </div>
            )}

            {/* Show the Pokémon details or error message */}
            {!isLoading && pokemonInfos.length === 0 && searchInput && errorMessage && (
                <div style={{ textAlign: 'center', color: 'black', fontWeight: 400, marginTop: 24, fontSize: 15 }}>
                    {errorMessage} {/* Display error message if Pokémon is not found */}
                </div>
            )}

            {/* Display Pokémon card if found */}
            {!isLoading && pokemonInfos.length > 0 && (
                <div id="pokemon-details" onClick={handleClickOutside}>
                    {pokemonInfos.map(pokemon => (
                        <div key={pokemon.id} className="pokemon-card" onClick={(e) => e.stopPropagation()}>
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.image} alt={pokemon.name} />
                            <p>ID: {pokemon.id}</p>
                            <p>Types: {pokemon.types.join(', ')}</p>
                            <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                            <p>Height: {pokemon.height}</p>
                            <p>Weight: {pokemon.weight}</p>
                            <div className="pokemon-card-buttons">
                                <button onClick={() => handleModalOpen(pokemon)}>More Info</button>
                                <button onClick={() => handleAddToFavourites(pokemon)}>⭐ Add to Favourites</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && modalContent && (
                <div id="pokemon-modal" className="modal"
                    onClick={e => {
                        // modal-content 바깥을 클릭하면 닫기
                        if (e.target.id === "pokemon-modal") handleModalClose();
                    }}
                >
                    <div id="modal-content" className="modal-content">
                        <span id="close-modal" className="close" onClick={handleModalClose}>&times;</span>
                        <div className="modal-header">
                            <h2 id="modal-name">{modalContent.name}</h2>
                            <span className="modal-id" id="modal-id">#{modalContent.id}</span>
                        </div>
                        <div className="modal-image-container">
                            <img
                                id="modal-img"
                                src={modalContent.image}
                                alt="Pokemon Image"
                            />
                        </div>
                        <div className="modal-info">
                            <div className="modal-types" id="modal-types">
                                <h3>Types</h3>
                                <div className="types-container">
                                    {modalContent.types.map(type => (
                                        <span key={type} className={`type-badge type-${type}`}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-basic-info">
                                <div className="info-column">
                                    <p id="modal-height">Height: {modalContent.height} m</p>
                                    <p id="modal-weight">Weight: {modalContent.weight} kg</p>
                                </div>
                                <div className="info-column">
                                    <p id="modal-abilities">
                                        Abilities:<br />
                                        <span>
                                            {modalContent.abilities.map(a => a.ability.name).join(', ')}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="modal-stats-container">
                                <h3>Base Stats</h3>
                                <div id="modal-stats" className="stats-grid">
                                    <div>hp: {modalContent.hp}</div>
                                    <div>attack: {modalContent.attack}</div>
                                    <div>defense: {modalContent.defense}</div>
                                    <div>special-attack: {modalContent.specialAttack}</div>
                                    <div>special-defense: {modalContent.specialDefense}</div>
                                    <div>speed: {modalContent.speed}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
