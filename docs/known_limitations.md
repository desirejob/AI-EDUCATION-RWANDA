# Limites connues et décisions de mise en œuvre

| Sujet du brief | Ce que fait ce prototype | Ce qui manque / conséquence |
|---|---|---|
| Documents et chapitres | Dix leçons de démonstration organisées en dossiers, avec index et feuille de formules; import PDF disponible | Aucun document REB autorisé fourni; les pages des leçons de démonstration sont des repères internes, pas des pages de manuel |
| Scans, tableaux, équations | Les leçons structurées affichent tableaux et formules; l'import PDF extrait la couche texte | OCR des scans et conservation fiable des tableaux/équations importés nécessitent encore une étape dédiée et une vérification |
| RAG | Recherche lexicale, passages et page du fichier | Pas de retrieval sémantique; risque de non-récupération; seuil à calibrer |
| Anglais + kinyarwanda | UI bilingue et réponse demandée dans la langue | Traductions UI partielles et pas de vérification native; retrieval kinyarwanda non validé |
| Cloud + modèle local | Endpoint OpenAI-compatible configurable (Ollama compris) | Aucun modèle fourni/exécuté; pas de comparaison mesurée |
| Garde-fous pédagogiques | Practice guidé; Assessment refusé par l'API tant que l'authentification n'est pas configurée | Un LLM peut ignorer le prompt; le mode Assessment ne peut pas encore être activé par un enseignant authentifié |
| Application mobile | Site adaptatif et PWA installable | Pas APK/Expo ni modèle hors ligne; seuls assets de l'interface cachés |
| Mineurs et rôles | Inscription élève, connexion, déconnexion; enseignant par code; admin créé par commande locale; API d'import protégée par rôle | Prototype d'authentification local, pas d'audit indépendant; sessions mémoire, pas de récupération de compte ni de journal d'audit. Ne pas l'utiliser en pilote mineur sans revue institutionnelle |
| Preuves | Jeu de questions, tests et protocoles | Pas d'essais réels, scores, kappa, latences ou avis enseignants |

Le mode par défaut sans modèle est volontairement extractif et révèle le passage. Il ne déduit pas une réponse mathématique des manuels; c'est un filet de sécurité et une preuve de citation, pas une expérience pédagogique terminée.
