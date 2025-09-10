# 🔴 Pokédex Interactif 3D

Un Pokédex moderne et interactif avec des cartes 3D retournables, créé en HTML, CSS et JavaScript vanilla. Explorez tous les Pokémon par génération avec des effets visuels immersifs !

## ✨ Fonctionnalités

### 🎮 Interface Pokédex Authentique
- Design inspiré du vrai Pokédex avec effets LED et écran scanline
- Interface rouge et bleue emblématique
- Animations et transitions fluides
- Mode responsive (mobile-friendly)

### 🃏 Cartes 3D Interactives
- **Cartes retournables** - Cliquez pour retourner et voir le dos avec logo Pokéball
- **Effets 3D** - Rotation et perspective sur survol
- **Effets spéciaux pour légendaires** - Aura dorée et animation flottante
- **Effets shinies** - Animation arc-en-ciel scintillante

### 🔍 Filtrage Avancé
- **Par génération** (I à IX - Kanto à Paldea)
- **Par type** (18 types Pokémon disponibles)
- **Recherche intelligente** par nom ou numéro
- **Réinitialisation rapide** des filtres

### 📊 Données Complètes
- **API PokéAPI officielle** - Données à jour
- **Images haute qualité** (official artwork)
- **Statistiques complètes** (PV, Attaque, Défense, etc.)
- **Types avec couleurs officielles**
- **Taille et poids** en unités métriques
- **Modal détaillée** pour chaque Pokémon

### ⚡ Performance Optimisée
- **Chargement progressif** - Gen I au démarrage, autres à la demande
- **Debounce sur recherche** - Performance fluide
- **Gestion d'erreurs robuste**
- **Cache des données** en mémoire

## 🚀 Démo en ligne

[🔗 Voir la démo](https://idghim.github.io/Interactive_Pok-dex/)

## 📋 Installation

1. **Clonez le repository**
```bash
git clone https://github.com/votre-username/pokedex-3d.git
cd pokedex-3d
```

2. **Structure des fichiers**
```
pokedex-3d/
│
├── index.html      # Structure HTML principale
├── styles.css      # Styles et animations 3D
├── script.js       # Logique JavaScript
└── README.md       # Documentation
```

3. **Lancez le projet**
```bash
# Ouvrez index.html dans votre navigateur
open index.html
```

## 🎯 Utilisation

### Navigation de base
- **Cliquez sur une carte** pour la retourner et voir le dos Pokéball
- **Cliquez sur l'image** d'un Pokémon pour ouvrir ses détails
- **Utilisez les filtres** en haut pour explorer par génération/type
- **Recherchez** par nom ou numéro dans la barre de recherche

### Filtres disponibles
- **Génération** : Kanto (I) à Paldea (IX)
- **Type** : Normal, Feu, Eau, Électrik, Plante, etc.
- **Recherche** : "Pikachu", "025", "Charizard"...

### Effets spéciaux
- 🌟 **Légendaires** : Aura dorée avec animation flottante
- ✨ **Shinies** : Effet arc-en-ciel scintillant (à implémenter)
- 🔄 **Cartes 3D** : Rotation sur survol et retournement

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations 3D, gradients, backdrop-filter
- **JavaScript ES6+** - Async/await, modules, API calls
- **PokéAPI** - Base de données Pokémon officielle
- **CSS Grid & Flexbox** - Layout responsive
- **Transform 3D** - Effets de cartes retournables

## 🎨 Caractéristiques techniques

### CSS Avancé
- **Transform 3D** pour les cartes retournables
- **Backdrop-filter** pour les effets de verre
- **Custom animations** (@keyframes)
- **Gradients complexes** pour les types
- **Box-shadow** multicouches pour la profondeur

### JavaScript Moderne
```javascript
// Chargement asynchrone optimisé
const pokemonData = await Promise.all(promises);

// Debounce pour la performance
const debouncedSearch = debounce(filterPokemon, 300);

// Gestion d'état réactive
filteredPokemon = allPokemon.filter(matchCriteria);
```

## 📱 Responsive Design

- **Mobile First** - Optimisé pour tous les écrans
- **Breakpoints** - 768px, 1024px, 1200px
- **Grid adaptative** - 1 à 4 colonnes selon l'écran
- **Touch-friendly** - Boutons et zones de clic adaptés

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. **Forkez** le projet
2. **Créez** votre branche (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Pushez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines
- Code propre et commenté
- Respect des conventions ES6+
- Tests sur mobile et desktop
- Documentation des nouvelles features

## 🙏 Remerciements

- **[PokéAPI](https://pokeapi.co/)** - API Pokémon gratuite et complète
- **The Pokémon Company** - Pour l'univers Pokémon
- **Game Freak & Nintendo** - Créateurs des jeux Pokémon
- **MDN Web Docs** - Documentation technique
- **CSS-Tricks** - Inspiration pour les animations 3D

## 📞 Contact

**Votre Nom** - [@votre_twitter](https://twitter.com/votre_twitter) - email@example.com

**Lien du projet** : [https://github.com/votre-username/pokedex-3d](https://github.com/votre-username/pokedex-3d)

---

⭐ **N'oubliez pas de mettre une étoile si ce projet vous plaît !** ⭐

  <br>
  <strong>Attrapez-les tous ! 🔴⚪</strong>
</div>
