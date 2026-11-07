# Plan de travail sur 10 jours — pilote S2 Mathématiques

**Décision de départ :** mathématiques S2, au moins dix unités du manuel de l'élève REB, avec équations et tableaux. À confirmer dès réception et vérification des droits des trois documents demandés. Le choix permet de contrôler calculs, pages et exemples; il ne prouve pas encore la représentativité du programme.

| Jour | Travail | Jalon / preuve |
|---|---|---|
| 1 | Confirmer matières, niveau, manuels, droits, enseignant référent; créer dépôts et registre | Cas d'usage et accès aux sources confirmés |
| 2 | Extraire le texte page par page, OCR des scans, tableaux/équations; vérifier échantillon | Corpus structuré et journal de qualité |
| 3 | Découper par thème/exercice, métadonnées; index hybride et citations | Recherche récupère la page source |
| 4 | API et consigne pédagogique; refus hors corpus et vérification des citations | Flux de questions et cas de refus |
| 5 | PWA mobile; tests de tâches avec élève, enseignant, parent/fonctionnaire (consentement) | Résultats observés et changements consignés |
| 6 | 30 questions, 20 variantes bilingues; comparer trois modèles, trois répétitions | Scores, langue, latence, coûts consignés |
| 7 | 25 invites adverses avant/après; corriger; deux enseignants notent réponses | Journal de red team et accord inter-évaluateurs |
| 8 | PWA hors ligne pour chapitres sélectionnés, rôles sécurisés, contrôle enseignant | Parcours hors réseau et tests d'accès |
| 9 | Estimer coût/charge, automatiser validation, installation, architecture et guide | Prise en main reproductible en 30 minutes |
| 10 | Répétition démo 7 min, note pilote, arbitrage sur preuves et limites | Démonstration et note finale relues |

## Risques de planning

| Risque | Probabilité | Réponse |
|---|---|---|
| Accès/licence aux documents ou scans difficiles | Élevée | Obtenir les fichiers et droits J1; mesurer le taux d'extraction J2; demander le PDF officiel natif |
| Tableaux/équations OCR incorrects | Élevée | Relecture d'au moins 10 pages et 20 équations; conserver image originale |
| Kinyarwanda pédagogique imprécis | Élevée | Locuteur natif/enseignant révise interface et items; publier les écarts de scores |
| Connectivité/appareils faibles | Moyenne | Tester téléphone milieu de gamme/3G; fournir chapitres offline sans dépendre du LLM |
| Disponibilité évaluateurs | Moyenne | Bloquer les séances J1 et prévoir des remplaçants qualifiés |
| Modèle local lent | Moyenne | Mesurer sur l'appareil cible; permettre la lecture du passage sans génération |

## Si deux jours sont perdus

- Conserver en priorité dix chapitres, citations vérifiées, journal des risques et recommandation basée sur preuves.
- Passer au PWA installable plutôt qu'à une application native; hors ligne limité aux chapitres et passages, sans LLM embarqué.
- Garder trois modèles et mêmes 30 questions; les 20 items bilingues restent un sous-ensemble de questions existantes.
- Garder les 25 invites et un seul cycle de correction; publier les échecs plutôt que d'omettre la mesure.
- Supprimer tableaux de bord élaborés et fonctions secondaires avant de raccourcir l'essai de sécurité.
