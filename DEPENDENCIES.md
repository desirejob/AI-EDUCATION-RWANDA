# Dépendances du projet

Ce fichier recense les dépendances nécessaires au prototype actuel et les options pour étendre le projet. Les paquets sont séparés par usage : **runtime requis**, **outils optionnels**, puis **extensions prévues**. Installer uniquement le runtime suffit pour lancer le site et l'API.

## 1. Runtime requis

| Outil | Version | Usage | Installation |
|---|---:|---|---|
| Node.js | 20+ | Serveur web/API natif et scripts JavaScript | [nodejs.org](https://nodejs.org/) ou gestionnaire de paquets du système |
| npm | fourni avec Node.js | Commandes de projet | Inclus avec Node.js |
| Poppler `pdftotext` | version système récente | Extraction du texte et des pages des PDF chargés | Debian/Ubuntu : `sudo apt install poppler-utils`; macOS : `brew install poppler`; Windows : installer Poppler et ajouter son dossier `bin` au `PATH` |
| Navigateur moderne | version récente | Utilisation de l'interface web/PWA | Firefox, Chrome, Edge ou Safari |

Le serveur utilise uniquement les modules intégrés de Node.js : `node:http`, `node:fs`, `node:path`, `node:url` et `node:child_process`. Il n'a actuellement **aucun paquet npm externe**.

### Démarrer et valider les jeux de données

```bash
npm start
```

Le script `start.sh` vérifie la version de Node.js. Le serveur utilise le port 8000 par défaut; change-le avec `PORT=8080 ./start.sh` si le port est déjà utilisé.

Dans un autre terminal :

```bash
npm run validate:data
```

La validation utilise Python 3.8+ et sa bibliothèque standard (`json`, `pathlib`). Elle vérifie le nombre et le format des items, pas la qualité des réponses.

## 2. Python

| Outil/paquet | Version conseillée | Nécessaire ? | Usage |
|---|---:|---|---|
| Python | 3.8+ (3.11+ conseillé) | Uniquement pour valider les données | Exécuter `eval/validate.py` |
| Bibliothèques Python | aucune externe | Non | Le script d'évaluation de format utilise seulement la bibliothèque standard |

Le backend actuel est en Node.js. FastAPI, pypdf et `python-multipart` ne sont pas des dépendances du projet actuel. L'extraction PDF est effectuée par `pdftotext`.

## 3. Modèle de langage (optionnel)

Aucun modèle n'est requis pour lancer l'application. Sans fournisseur configuré, le serveur renvoie un passage retrouvé ou un refus si aucun passage ne correspond.

Pour activer la génération, configurer un service exposant l'API de complétion compatible OpenAI :

| Option | Type | Variables nécessaires |
|---|---|---|
| Ollama | Modèle local, service séparé | `LLM_BASE_URL`, `LLM_MODEL`; généralement `LLM_BASE_URL=http://localhost:11434/v1` |
| Service cloud compatible | Service externe, peut être payant | `LLM_BASE_URL`, `LLM_MODEL`, `LLM_API_KEY` |

Exemple Linux/macOS :

```bash
LLM_BASE_URL=http://localhost:11434/v1 LLM_MODEL=qwen2.5:3b npm start
```

Exemple PowerShell :

```powershell
$env:LLM_BASE_URL="http://localhost:11434/v1"
$env:LLM_MODEL="qwen2.5:3b"
npm start
```

Les clés d'API doivent rester côté serveur et ne doivent jamais être ajoutées au JavaScript du navigateur ni versionnées.

## 4. Outils facultatifs pour le développement

| Outil | Usage |
|---|---|
| Git | Historique et gestion des versions; le dossier fourni actuellement n'est pas initialisé comme dépôt Git |
| `curl` | Appeler manuellement les routes HTTP |
| `pdftoppm` | Convertir les pages en images si un processus OCR est ajouté |
| Tesseract OCR | Projet futur : OCR des pages scannées |

## 5. Dépendances prévues, non installées

Ces bibliothèques ne sont pas utilisées par le prototype actuel. Les ajouter seulement lors de l'implémentation de ces fonctionnalités :

| Fonction future | Options possibles |
|---|---|
| Backend Python alternatif | FastAPI, Uvicorn, pypdf, python-multipart, httpx |
| OCR des scans | Tesseract ou PaddleOCR, avec Poppler pour le rendu des pages |
| Recherche sémantique RAG | FAISS ou une base vectorielle; modèle d'embeddings multilingue validé en kinyarwanda |
| Extraction avancée des tableaux | pdfplumber ou Camelot |
| Traitement/rendu d'équations | MathJax ou KaTeX côté interface; extraction spécialisée à évaluer |
| Application native Android/iOS | Expo et React Native |
| Authentification de production | Bibliothèque cryptographique et base de données choisies après revue d'architecture/sécurité |

Le choix et les versions de ces composants restent à faire avec le véritable corpus, le matériel des écoles et les contraintes d'hébergement. Ils ne sont pas nécessaires pour démarrer le code livré.
