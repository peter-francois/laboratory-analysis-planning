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

``` bash
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

``` bash
npm run test
```
