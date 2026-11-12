JBL FILMMAKER — SEO/GEO V2

Cette version ajoute une page éditoriale anglaise dédiée aux films de mariage haut de gamme en France :
/en/luxury-wedding-videographer-france/

Modifications :
- Page HTML anglaise statique, avec title, meta description, canonical, Open Graph et données structurées Schema.org.
- Ajout de la page au sitemap.xml.
- Lien depuis la page portfolio lorsque la langue anglaise est active.
- Prise en charge du paramètre ?lang=en ou ?lang=fr pour choisir la langue de l'application et la mémoriser.

Déploiement :
1. Extraire l'archive.
2. Dans le dossier du projet, lancer : npm install
3. Vérifier avec : npm run build
4. Déployer le dossier dist sur Netlify.

Note : le build n'a pas pu être validé dans l'environnement de préparation, car la dépendance optionnelle Rollup pour Linux était absente. Cela n'indique pas un défaut du code ; réinstaller les dépendances sur votre poste avec npm install avant le build.
