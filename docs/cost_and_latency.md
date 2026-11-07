# Coût et charge — estimation de cadrage pour 10 000 élèves

Hypothèses : 20 questions par élève par mois; donc `N = 200 000` requêtes/mois. Moyenne 2 500 tokens entrée/requête (consigne, passages, historique) et 150 sortie. Cela donne 500 millions de tokens d'entrée et 30 millions de sortie. Tarifs ci-dessous illustratifs : remplacer par une grille datée du fournisseur et les tokens mesurés.

`Coût = (500 × prix entrée par million) + (30 × prix sortie par million)`.

| Profil hypothétique | Entrée / M tokens | Sortie / M tokens | Coût génération mensuel | Par élève / mois |
|---|---:|---:|---:|---:|
| Économique | $0.30 | $1.50 | $195 | $0.0195 |
| Intermédiaire | $1.00 | $5.00 | $650 | $0.065 |
| Haut de gamme | $3.00 | $15.00 | $1,950 | $0.195 |

Ajouter hébergement API/stockage, observabilité, taxes, réseau, sauvegardes et travail humain. Hypothèse exploratoire d'hébergement : $50–150/mois; elle n'est pas une offre fournisseur. Le cache de prompt peut réduire certains tokens d'entrée s'il est supporté.

## Charge et latence

Sur 22 jours de classe : ~9 091 requêtes/jour. Réparties sur 2 h actives : ~1,26 req/s moyenne; avec facteur de pointe 5 : ~6,3 req/s. À 3,5 s par requête, loi de Little donne environ 22 requêtes concurrentes en pointe. Prévoir file d'attente et quotas et mesurer au vrai débit.

| Composant | Hypothèse, non mesurée |
|---|---:|
| Retrieval local | 50–100 ms |
| Premier token cloud | 0,5–1 s |
| 150 tokens à 60 tokens/s | 2,5 s |
| Total cloud visé | 3–4 s |
| Modèle local CPU à 5–10 tokens/s | 15–30 s |

Les chiffres sont des objectifs d'estimation, pas des observations de cette application. Benchmarker sur téléphone, API et connexion réellement retenus.
