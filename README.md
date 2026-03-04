# Laboratoire - Système de Planification

---

## Description

Ce script prend en entrée un fichier JSON contenant des données structurées avec :

- samples – les échantillons à analyser

- technicians – les techniciens disponibles

- equipment – le matériel disponible

À partir de ces données, le script génère un planning optimisé pour réaliser les tests des échantillons. Le planning prend en compte :

- Les priorités des échantillons

- La disponibilité des techniciens

- La disponibilité des équipements

En plus du planning, le script calcule des métriques d’analyse pour évaluer la performance :

- totalTime : durée totale du planning

- efficiency : somme des durées d’analyse ÷ durée totale du planning × 100

- nombre de conflits détectés : cas où plusieurs tâches entrent en conflit

Le résultat est exporté dans un fichier JSON horodaté pour chaque exécution dans le fichier `output/`, afin de faciliter le suivi et l’archivage.

---

## Installation

### Prérequis

- Node.js version 18.x ou supérieure
- npm version 9.x ou supérieure

### Commandes

#### **1. Installation des dépendances**

```bash
npm install
```

#### **2. Exécuter le code**

```bash
# Syntaxe générale :
npm run start <chemin/vers/fichier.json>

# Exemple :
npm run start input/data/single-sample.json
```

#### **3. Exécuter les test**

```bash
npm run test
```

---

## Architecture du projet

```
laboratory-analysis-planning/
├─ 2026/
│  └─ 03/
│   └─ planning-2026-03-04T14-30.json # Output
├─ src/
│ ├─ config/ # Configuration et chemins
│ │ └─ path.ts
│ ├─ types/ # Types, interfaces, enums et schemas
│ ├─ services/ # Logique métier
│ ├─ utils/ # Fonctions utilitaires
│ └─ index.ts # Point d'entrée
├─ tests/ # Tests
│ ├─ integration/ # test d'integration
│ └─ unit # test unitaire
├─ package.json
├─ README.md
└─ tsconfig.json
```

---

## Choix technique

### 1. TypeScript
- **Pourquoi** : Typage statique pour éviter les erreurs runtime et faciliter le refactoring.
- **Avantage** : Meilleure lisibilité, autocomplétion et sécurité dans le code métier.

### 2. Luxon pour la gestion du temps
- **Pourquoi** : Manipulation simple des heures et durées ISO, comparaisons et formats flexibles.
- **Avantage** : Permet de calculer les créneaux, durées et décalages facilement.

### 3. Zod pour la validation des entrées
- **Pourquoi** : Validation stricte des fichiers JSON d’entrée.
- **Avantage** : Détection immédiate des erreurs de format ou de données manquantes.

### 4. Architecture services / utils / types
- **Services** : Contiennent la logique métier (planification, ressources, échantillons, fichiers).
- **Utils** : Fonctions réutilisables (gestion du temps).
- **Types** : Interfaces, enums et schemas pour centraliser le typage.
- **Avantage** : Séparation claire des responsabilités, code maintenable et testable.

### 5. Priorisation des échantillons
- **STAT > URGENT > ROUTINE**
- **Pourquoi** : Respect des urgences cliniques et planning optimal.
- **Avantage** : Garantit que les échantillons critiques sont traités en priorité.

### 6. Dossier `output` structuré par année / mois
- **Pourquoi** : Organisation automatique des fichiers générés.
- **Avantage** : Historique clair, facile à retrouver et archiver.

---

## Tests

- **Framework** : Jest  
- **Types de tests** :  
  - **Unitaires** : `tests/unit/` → teste les fonctions individuellement.  
  - **Intégration** : `tests/integration` → Vérifier que le planificateur (`planifyLab`) fonctionne correctement avec différents scénarios d’entrée.  
- **Organisation** :  
  - `input/` → fichiers JSON d’entrée pour le test  
  - `expected/` → fichiers JSON attendus pour vérifier le résultat  
  - `*.spec.ts` → fichiers de test qui comparent la sortie réelle à la sortie attendue  