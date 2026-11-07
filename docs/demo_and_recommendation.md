# Démonstration de 7 minutes et note de recommandation

## Déroulé de démonstration

| Temps | Action |
|---|---|
| 0:00–0:45 | Problème, élève S2, manuel et rôle de l'enseignant |
| 0:45–2:15 | Question anglais, premier indice, passage/page réelle affichée |
| 2:15–3:30 | Même concept en kinyarwanda; signaler si traduction non relue |
| 3:30–4:15 | Question absente des passages : refus et orientation enseignant |
| 4:15–5:15 | Exécuter une injection de prompt, montrer sortie conforme et journal |
| 5:15–6:15 | Installer PWA et ouvrir chapitre en mode avion (les réponses en ligne ne fonctionnent pas dans ce prototype) |
| 6:15–7:00 | Mesures réelles, limites, coût et décision pilote |

Ne présenter les étapes avec réponse de modèle, citations de manuel, mesures ou mode hors ligne génératif qu'après implantation et essai avec les ressources réelles. L'état actuel permet de démontrer le shell PWA, l'ingestion d'un PDF textuel, l'extrait source et le refus; il ne suffit pas à démontrer les performances exigées.

## Questions difficiles du jury

**« Comment savez-vous que l'IA ne se trompe pas ? »** On ne peut pas garantir l'absence d'erreur. Le système doit citer la page, vérifier mécaniquement la citation et refuser les passages absents. Le pilote ne devrait commencer qu'après mesure de l'exactitude et supervision enseignante; les scores restent à recueillir.

**« Le kinyarwanda est-il fiable ? »** Pas encore établi. Il faut mesurer séparément les réponses, faire relire les traductions et afficher clairement les parties non validées. Le pilote doit s'interrompre ou limiter l'usage si l'écart de qualité dépasse le seuil convenu.

**« Le tuteur remplace-t-il l'enseignant ? »** Non dans le périmètre proposé : indices et lecture des manuels, tandis que l'enseignant règle les évaluations et prend en charge les cas difficiles. Le tableau de bord et les contrôles de rôle restent à construire avant usage scolaire.

## Recommandation au jury

**Recommandation actuelle : ne pas lancer encore le pilote scolaire; autoriser une phase de préparation et un pilote conditionnel de six semaines seulement après les conditions ci-dessous.** Les documents initiaux cadrent un cas d'usage cohérent et le présent prototype donne un squelette vérifiable. Mais les manuels du corpus sont absents; aucun résultat de qualité, test utilisateur, comparaison de modèles, avis de deux enseignants, test adversarial avant/après ni contrôle de sécurité n'a été produit. Il n'existe donc pas de preuve suffisante pour demander la mise en production auprès de mineurs aujourd'hui.

Avant pilote : obtenir et valider les documents/droits; relier chaque énoncé aux pages; faire auditer confidentialité et comptes; vérifier citations et refus sur corpus; conduire les essais utilisateurs consentis; mesurer les langues et modèles; corriger les cas adverses; faire approuver le plan par les écoles, enseignants et responsables concernés.

Une fois ces étapes passées, le pilote proposé dure six semaines dans trois écoles (urbaine, rurale, connectivité limitée), environ 300 élèves S2 et six enseignants de mathématiques. Commencer en lecture guidée et exercices non notés, enseignant présent, sans collecte de données nominatives. Relire chaque semaine un échantillon de réponses. Comparer résultats de classe et retours enseignants seulement avec une méthodologie et les autorisations nécessaires. Ne pas étendre à d'autres matières/niveaux sans nouvelle évaluation.

Arrêter et examiner si une fuite de données se produit, si une réponse dangereuse reste non corrigée 48 heures, ou si le taux d'erreur d'un échantillon relu dépasse 10%. Décider l'extension seulement si les seuils d'évaluation proposés dans `evaluation_protocol.md` sont mesurés et atteints, si les enseignants recommandent la suite et si les coûts réels sont acceptés.
