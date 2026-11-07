# Architecture et flux de données

## Parcours d'une question

1. La PWA envoie question, langue, chapitre sélectionné et mode à `POST /api/ask`.
2. L'API tokenise la question et compare les termes aux passages de `data/index.json` et à la bibliothèque locale indexée (intersection lexicale). Elle sélectionne jusqu'à trois passages pertinents.
3. Sans résultat, elle renvoie un refus localisé avec `found: false` et n'appelle aucun modèle.
4. Avec un résultat, les calculs déterministes pris en charge répondent directement; les autres questions peuvent transmettre uniquement la question et les passages retenus au modèle configuré, puis retombent sur une explication fondée sur la source si le modèle ne répond pas dans le délai.
5. Les citations fournies à l'interface désignent le PDF et le numéro de page de fichier. La validation stricte de chaque citation émise par le modèle et la page imprimée n'est pas encore faite.

## Ingestion

`POST /api/ingest` accepte un PDF de 25 Mo maximum, extrait le texte page par page via `pdftotext` (Poppler) et crée des fragments chevauchants de 350 à 400 mots. Métadonnées présentes : identifiant, document, sujet/niveau par défaut, chapitre/page, type et langue. La page imprimée, le thème fin, la langue réelle, tableaux et équations doivent être revus/complétés par un pipeline dédié avant de considérer ce corpus comme validé. Les PDF scannés requièrent un OCR qui n'est pas fourni ici.

## Données et confidentialité

Les comptes pseudonymes et empreintes de mots de passe sont dans `data/users.json`; les sessions aléatoires expirent après huit heures et restent en mémoire (redémarrage = déconnexion). Les rôles élève/enseignant/admin sont vérifiés côté API; inscription enseignant par code configuré, admin créé depuis le terminal. L'index et les PDF restent sur le disque de l'hôte dans `data/`. Une question peut sortir vers le fournisseur sélectionné. L'API ne stocke pas les questions. Avant école pilote : audit indépendant, politiques de rétention, chiffrement adapté, journaux sans données personnelles, contrôle de consentement/approbation scolaire et hébergement choisi avec responsables.

## Cibles d'évolution

- ingestion reproductible par les trois manuels, OCR/tableaux/équations avec contrôle humain;
- retrieval hybride lexical + embeddings multilingues évalués sur anglais/kinyarwanda;
- seuil de refus calibré sur les exemples manuels et hors manuel;
- vérification mécanique des citations contre les passages transmis;
- base locale SQLite packagée pour quelques chapitres et générateur embarqué optionnel;
- comptes vérifiés par rôle et audit de sécurité avant toute mise à l'essai avec mineurs.
