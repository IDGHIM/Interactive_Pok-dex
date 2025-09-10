// ================== VARIABLES GLOBALES ==================
let allPokemon = [];
let filteredPokemon = [];

// Correspondance génération -> plage d'IDs
const generationRanges = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 905 },
    9: { start: 906, end: 1010 }
};

// Traductions des types
const typeTranslations = {
    'normal': 'Normal',
    'fire': 'Feu',
    'water': 'Eau',
    'electric': 'Électrik',
    'grass': 'Plante',
    'ice': 'Glace',
    'fighting': 'Combat',
    'poison': 'Poison',
    'ground': 'Sol',
    'flying': 'Vol',
    'psychic': 'Psy',
    'bug': 'Insecte',
    'rock': 'Roche',
    'ghost': 'Spectre',
    'dragon': 'Dragon',
    'dark': 'Ténèbres',
    'steel': 'Acier',
    'fairy': 'Fée'
};

// Traductions des stats
const statTranslations = {
    'hp': 'PV',
    'attack': 'Attaque',
    'defense': 'Défense',
    'special-attack': 'Att. Spé.',
    'special-defense': 'Déf. Spé.',
    'speed': 'Vitesse'
};

// ================== INITIALISATION ==================
document.addEventListener('DOMContentLoaded', async function() {
    await initPokedex();
    setupEventListeners();
});

// ================== LISTENERS ==================
function setupEventListeners() {
    const generationFilter = document.getElementById('generationFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetFilters');
    const modal = document.getElementById('pokemonModal');
    const closeBtn = document.querySelector('.close');

    generationFilter.addEventListener('change', filterPokemon);
    typeFilter.addEventListener('change', filterPokemon);
    searchInput.addEventListener('input', debounce(filterPokemon, 300));
    resetBtn.addEventListener('click', resetFilters);
    
    // Modal
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

// ================== UTILITAIRES ==================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================== POKEDEX ==================
async function initPokedex() {
    showLoading(true);
    try {
        // Charger Génération 1 par défaut
        await loadPokemonData(1, 151);
        filteredPokemon = [...allPokemon];
        renderPokemon();
        updatePokemonCount();
    } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error);
        document.getElementById('pokemonGrid').innerHTML = 
            '<p style="text-align: center; color: #e74c3c;">Erreur lors du chargement des Pokémon. Veuillez réessayer.</p>';
    } finally {
        showLoading(false);
    }
}

async function loadPokemonData(start, end) {
    const promises = [];
    for (let i = start; i <= end; i++) {
        promises.push(fetchPokemonData(i));
    }
    const results = await Promise.all(promises);
    allPokemon.push(...results.filter(pokemon => pokemon !== null));
    allPokemon.sort((a, b) => a.id - b.id);
}

async function fetchPokemonData(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) return null;
        
        const pokemon = await response.json();
        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();
        
        // Récupérer le nom français
        const frenchName = species.names.find(name => name.language.name === 'fr')?.name || pokemon.name;
        
        return {
            id: pokemon.id,
            name: frenchName,
            englishName: pokemon.name, // Pour la recherche
            types: pokemon.types.map(type => type.type.name),
            sprites: pokemon.sprites,
            stats: pokemon.stats,
            height: pokemon.height,
            weight: pokemon.weight,
            generation: getGeneration(pokemon.id),
            species: species
        };
    } catch (error) {
        console.error(`Erreur pour le Pokémon ${id}:`, error);
        return null;
    }
}

function getGeneration(id) {
    for (const [gen, range] of Object.entries(generationRanges)) {
        if (id >= range.start && id <= range.end) {
            return parseInt(gen);
        }
    }
    return 1;
}

// ================== RENDU DES CARTES ==================
function createPokemonCard(pokemon) {
    const imageUrl = pokemon.sprites.other['official-artwork']?.front_default || 
                     pokemon.sprites.front_default || 
                     'https://via.placeholder.com/120x120?text=?';

    // Détection légendaires + shiny
    const isLegendary = pokemon.species?.is_legendary || false;
    const isShiny = Math.random() < 0.02;

    const cardClasses = [
        "pokemon-card",
        isLegendary ? "legendary" : "",
        isShiny ? "shiny" : ""
    ].join(" ").trim();

    return `
        <div class="${cardClasses}" data-id="${pokemon.id}">
            <!-- Face avant -->
            <div class="card-face card-front">
                <div class="generation-badge">Gen ${pokemon.generation}</div>
                <div class="pokemon-header">
                    <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                </div>
                <img class="pokemon-image" src="${imageUrl}" alt="${pokemon.name}" loading="lazy">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-types">
                    ${pokemon.types.map(type => 
                        `<span class="type-badge type-${type}">${typeTranslations[type] || type}</span>`
                    ).join('')}
                </div>
                <div class="pokemon-stats">
                    ${pokemon.stats.slice(0, 4).map(stat => `
                        <div class="stat">
                            <span class="stat-name">${statTranslations[stat.stat.name] || stat.stat.name}</span>
                            <span class="stat-value">${stat.base_stat}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Face arrière -->
            <div class="card-face card-back">
                <div class="pokeball-logo"></div>
                <div class="card-back-text">Attrapez-les tous !</div>
            </div>
        </div>
    `;
}

function renderPokemon() {
    const grid = document.getElementById('pokemonGrid');
    
    if (filteredPokemon.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #7f8c8d;">Aucun Pokémon trouvé avec ces critères.</p>';
        return;
    }

    // Affiche TOUT sans pagination
    grid.innerHTML = filteredPokemon.map(pokemon => createPokemonCard(pokemon)).join('');
    
    // Flip et modal
    document.querySelectorAll('.pokemon-card').forEach((card, index) => {
        card.addEventListener('click', (e) => {
            card.classList.toggle('flipped');
            if (e.detail === 2) {
                showPokemonDetails(filteredPokemon[index]);
            }
        });
    });
}

// ================== DETAILS ==================
function showPokemonDetails(pokemon) {
    const modal = document.getElementById('pokemonModal');
    const details = document.getElementById('pokemonDetails');
    
    const imageUrl = pokemon.sprites.other['official-artwork']?.front_default || 
                     pokemon.sprites.front_default || 
                     'https://via.placeholder.com/200x200?text=?';
    
    details.innerHTML = `
        <img class="modal-pokemon-image" src="${imageUrl}" alt="${pokemon.name}">
        <div class="modal-pokemon-name">${pokemon.name}</div>
        <div class="modal-pokemon-id">#${pokemon.id.toString().padStart(3, '0')} - Génération ${pokemon.generation}</div>
        
        <div class="pokemon-types" style="justify-content: center; margin-bottom: 20px;">
            ${pokemon.types.map(type => 
                `<span class="type-badge type-${type}">${typeTranslations[type] || type}</span>`
            ).join('')}
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div><strong>Taille:</strong> ${pokemon.height / 10} m</div>
            <div><strong>Poids:</strong> ${pokemon.weight / 10} kg</div>
        </div>
        
        <h3 style="margin-bottom: 15px; color: #ffffff;">Statistiques</h3>
        <div class="modal-stats">
            ${pokemon.stats.map(stat => `
                <div class="modal-stat">
                    <span>${statTranslations[stat.stat.name] || stat.stat.name}</span>
                    <span style="font-weight: bold; color: #ffffff;">${stat.base_stat}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
}

// ================== FILTRAGE ==================
async function filterPokemon() {
    const generation = document.getElementById('generationFilter').value;
    const type = document.getElementById('typeFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    if (generation !== 'all' && generation !== '1') {
        await loadGenerationIfNeeded(parseInt(generation));
    } else if (generation === 'all') {
        await loadAllGenerationsIfNeeded();
    }
    
    filteredPokemon = allPokemon.filter(pokemon => {
        const matchGeneration = generation === 'all' || pokemon.generation === parseInt(generation);
        const matchType = type === 'all' || pokemon.types.includes(type);
        const matchSearch = pokemon.name.toLowerCase().includes(search) || 
                           pokemon.englishName.toLowerCase().includes(search) ||
                           pokemon.id.toString().includes(search);
        return matchGeneration && matchType && matchSearch;
    });
    
    renderPokemon();
    updatePokemonCount();
}

async function loadGenerationIfNeeded(generation) {
    const range = generationRanges[generation];
    if (!range) return;
    
    const hasGeneration = allPokemon.some(p => p.generation === generation);
    if (!hasGeneration) {
        showLoading(true);
        await loadPokemonData(range.start, range.end);
        showLoading(false);
    }
}

async function loadAllGenerationsIfNeeded() {
    const maxId = Math.max(...allPokemon.map(p => p.id));
    if (maxId < 1010) {
        showLoading(true);
        await loadPokemonData(maxId + 1, 1010);
        showLoading(false);
    }
}

function resetFilters() {
    document.getElementById('generationFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    
    filteredPokemon = [...allPokemon];
    renderPokemon();
    updatePokemonCount();
}

function updatePokemonCount() {
    const countElement = document.getElementById('pokemonCount');
    countElement.textContent = `${filteredPokemon.length} Pokémon trouvé(s)`;
}

// ================== LOADING ==================
function showLoading(show) {
    const loading = document.getElementById('loading');
    const grid = document.getElementById('pokemonGrid');
    
    if (show) {
        loading.classList.remove('hidden');
        grid.style.opacity = '0.5';
    } else {
        loading.classList.add('hidden');
        grid.style.opacity = '1';
    }
}