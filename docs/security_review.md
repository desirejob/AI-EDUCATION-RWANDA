# Revue de sécurité — Umuseke

Date : 7 novembre 2026  
Périmètre : serveur Node, routes HTTP, authentification locale, import PDF, stockage du prototype et image Docker. Cette revue de code n'est ni un test d'intrusion indépendant, ni une certification de conformité ou d'aptitude à accueillir des mineurs.

## Correctifs appliqués

- **CORS permissif retiré.** Le serveur ne déclare plus `Access-Control-Allow-Origin: *`; les appels d'écriture qui utilisent les cookies exigent une origine correspondant à l'hôte de la requête. L'absence d'origine est refusée.
- **Abus des routes réduit.** L'API de tutorat est limitée à 60 requêtes par minute par adresse vue par Node; les comptes sont limités à 8 essais d'authentification par pseudonyme sur 15 minutes et les imports à 20 par compte et par heure. L'inscription est plafonnée à 5 000 comptes dans cette installation prototype.
- **Import PDF encadré.** Vérification du type de fichier et de sa signature, maximum de 25 Mo à l'entrée, 15 secondes de traitement et 15 Mo de texte extrait. Le fichier n'est enregistré qu'après extraction réussie et les fichiers utilisateur sont créés avec des permissions privées.
- **Erreurs et réponses.** Les erreurs internes ne révèlent plus leurs messages au client; les réponses JSON ne sont pas mises en cache.
- **En-têtes HTTP.** CSP restrictive, protection contre l'inclusion en iframe, MIME sniffing, politique de référent et permissions navigateur. HSTS est ajouté en mode `NODE_ENV=production`.
- **Dépendances côté navigateur.** Les polices Google ont été retirées pour éviter une requête externe vers Google et permettre une CSP sans exceptions externes.
- **Docker.** Le processus tourne sous l'utilisateur non privilégié `node`. Le volume `/var/lib/umuseke` conserve désormais les comptes, PDF téléversés et index. Le conteneur active le mode production pour les cookies sécurisés.

## Risques qui restent avant un partage public

| Sévérité | Constat | Conséquence | Mesure nécessaire |
|---|---|---|---|
| Bloquant pour Internet | Node/Docker ne terminent pas TLS; le port ne doit pas être directement publié sur Internet | Identifiants et trafic seraient exposés sur un réseau non fiable sans HTTPS | Reverse proxy HTTPS administré, pare-feu, configuration TLS et contrôle d'accès réseau avant publication |
| Élevée | Comptes stockés dans un fichier JSON local; sessions en mémoire | Pas de déploiement multi-instance fiable; sessions perdues au redémarrage; sauvegarde/restauration manuelles | Stockage transactionnel, sessions persistantes/révocables, sauvegardes testées et procédure de restauration |
| Élevée | La bibliothèque, l'API de passages et le tutorat sont publics; les documents téléversés peuvent être cités dans des réponses | Les passages de manuels chargés sont visibles aux visiteurs; un document ne doit pas être considéré comme privé | Charger seulement des documents autorisés pour la diffusion aux utilisateurs; définir les droits et les règles de suppression |
| Élevée | Un modèle cloud configuré reçoit les questions et passages retrouvés | Les données saisies par un élève peuvent quitter l'hébergement | Ollama local ou fournisseur approuvé par l'établissement; politique de confidentialité, consentement et filtrage des données personnelles |
| Élevée | Inscription publique par pseudonyme, sans vérification d'identité; pas de récupération de compte, MFA ou journal d'audit | Comptes abusifs possibles; attribution et réponse à incident limitées | Revue indépendante, gestion institutionnelle des comptes/rôles, assistance compte et journalisation proportionnée |
| Moyenne | Limites de fréquence en mémoire et basées sur l'adresse distante | Redémarrage réinitialise les compteurs; un reverse proxy peut faire partager une seule limite à toute une classe | Limiteur partagé correctement configuré dans l'hébergement; adresse client fiable configurée uniquement derrière un proxy de confiance |
| Moyenne | Poppler (`pdftotext`) traite des fichiers fournis par les enseignants | Une vulnérabilité de la dépendance native peut affecter le serveur | Image régulièrement reconstruite, mises à jour de sécurité, limites CPU/mémoire et isolement renforcé du traitement PDF |
| Moyenne | Questions libres envoyées au tuteur sans filtrage fiable des informations personnelles | Un élève peut saisir son nom, coordonnées ou informations sensibles malgré le rappel dans l'interface | Minimisation des données, avertissements adaptés, revue de confidentialité et règles de conservation avant pilote |

## Vérifications effectuées

- Inspection des routes et des contrôles d'accès côté serveur, du code d'authentification, des scripts, du manifeste PWA, des règles ignore et du Dockerfile.
- Vérification syntaxique Node et shell; vérification isolée des règles d'inscription : tentative d'auto-attribution admin reste élève, absence d'origine refusée, code enseignant invalide refusé, cookie de production HttpOnly/SameSite/Secure, fichier de comptes limité aux empreintes de mot de passe.
- Aucun secret réel n'a été imprimé ni modifié. Aucun déploiement ou changement de données utilisateur n'a été effectué.
- Le serveur HTTP n'a pas pu être démarré dans l'environnement de revue (liaison de port refusée); Docker n'est pas installé ici. Aucun scanner externe, audit de dépendance native, test d'intrusion, test navigateur complet ni validation par une école n'a été effectué.

## Décision de partage

- **Même réseau Wi-Fi pour une démonstration :** possible en ouvrant l'adresse LAN et le port 8080; ne pas y saisir d'informations personnelles. Le navigateur peut signaler une connexion non sécurisée.
- **Internet ou usage avec élèves :** pas prêt à publier tel quel. Terminer les mesures de la colonne « Mesure nécessaire », configurer HTTPS et faire une revue indépendante avec l'établissement avant d'inviter des élèves.
