# Registre des risques pour un tuteur utilisé par des mineurs

Échelles : gravité et probabilité de 1 (faible) à 3 (élevée). Indicateur = mesure à suivre; cible initiale à confirmer avec l'école.

| ID | Catégorie | Risque | G | P | Atténuation / responsable | Indicateur |
|---|---|---|---:|---:|---|---|
| R1 | Confidentialité | Collecte de nom, école, voix ou adresse d'un enfant | 3 | 2 | Identifiant pseudonyme; retirer champs superflus; responsable données | Champs personnels stockés = 0 |
| R2 | Confidentialité | Questions transmises à un service cloud | 3 | 3 | Minimisation/masquage, revue contrat et fournisseur, option locale; responsable technique | Questions contenant données perso transmises |
| R3 | Confidentialité | Révélation de santé ou situation familiale dans une question | 3 | 2 | Avertissement, ne pas mémoriser, procédure de signalement vers adulte de confiance; enseignant référent | Signalements reçus et délais de traitement |
| R4 | Biais | Exemples et noms sans lien au Rwanda | 2 | 2 | Exemples locaux et relecture enseignants; responsable programme | Part d'exemples jugés pertinents |
| R5 | Biais | Qualité inférieure en kinyarwanda | 3 | 3 | Mesures par langue, locuteur natif, terme source conservé, étiquette traduction revue; responsable langue | Écart anglais/kinyarwanda |
| R6 | Équité | Connexion lente ou téléphone modeste pénalise l'élève rural | 2 | 3 | Pages légères, PWA/offline, test appareils et 3G; responsable produit | Chargement et réussite en réseau lent |
| R7 | Dépendance | Élève consomme la réponse sans réfléchir | 2 | 3 | Indices progressifs, question sur tentative, suivi enseignant; responsable pédagogique | Réponses directes avant tentative |
| R8 | Dépendance | Confiance aveugle dans réponse erronée | 3 | 2 | Citation de chaque passage, invitation à vérifier le manuel, refus si absent; responsable IA | Citations correctes / affirmations |
| R9 | Dépendance | Outil remplace le rôle de l'enseignant | 2 | 1 | Escalade des questions difficiles, contrôle enseignant, tableau agrégé; direction d'école | Cas référés et retours enseignants |
| R10 | Tricherie | Résolution d'un devoir noté ou examen | 2 | 3 | Mode contrôle activé par enseignant authentifié; indices seulement; responsable pédagogique | Tentatives de contrôle bloquées |
| R11 | Tricherie / sécurité | Injection de prompt contourne les règles | 3 | 3 | Séparer données/instructions, politique côté serveur, red team répétée; responsable sécurité | Attaques conformes avant/après |
| R12 | Exactitude | Hallucination présentée comme programme ou citation | 3 | 2 | RAG strict, seuil de refus calibré, vérifier citations avec source; responsable IA | Taux d'erreur et page correcte |

## Réponse si incident

Mettre le pilote en pause si une réponse dangereuse reste accessible sans correction, si les journaux contiennent des données personnelles, ou si l'audit enseignant dépasse le seuil d'erreur convenu. Informer le référent d'école, préserver uniquement les éléments nécessaires à l'analyse, corriger et retester avant réouverture. Cette procédure doit être adaptée et approuvée par l'établissement avant un pilote.
