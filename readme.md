# Pages :
## Accueil : attente sur le stream avant de lancer l'event
- Le 'header' sur toute la page
- OU (si spoil de la map avant les regles) une image de la map ARAM en fond
    + titres du Header [sans le fond noir]

==> (fond + contenu)

## Regles + Récompenses + Liste des teams
### [Maxime] Layout colonne
- Colonne 1 : Regles a gauche avec alternance images/texte
- Colonne 2 :
    - Déroulement (étapes) en haut et en sous-colonne
    - Récompense en dessous
- en dessous : liste des équipe

### [Val] Layout scroll
- Les regles
- Puis le déroulement
- Les récompense
- Puis les teams

### [] 'Dynamique'
- Afficher chaque section en cliquant dessus

==> (fond + contenu)

## Bracket
Step 1 : Fusion
- Clique 'Randomize' pour les Fusions sur page Bracket
    - Affichage des "Fusions"
        - V1 : Saisie des points
        - V2 : Saisie des stats + calcul auto des points

Step 2 : Pick Restriction
- Les deux duos avec le plus de points de chaque match Fusion
- Saisie des restriction de pick pour chaque match

Step 3 : Deux duos gagnant

Bonus :
- Selection des champions choisie : affichage auto des recompenses spéciales gagnées (pick de Main Champion)


http://fr.123rf.com/ai-image-generator/
    Timer de 20 minutes dans un style qui mélange fun, jeu vidéo et bagarre

# TODO - DEV
## index.html
- [ ] Header au centre
- [x] Bouton vers main-page.html : style 'Match found' sur LoL
## main page
- [ ] Header un peu moins haut
- HTML :
    - Bouton a gauche
        - [x] 1 par 'section' : affiche le contenu a droite
        - [x] 1 pour aller sur la page du Bracket
    - Section a affichées
        - [x] Regles
        - [x] Déroulement
        - [x] Récompenses
        - [x] Teams (cf screen dans la conversation)
- [x] code bouton sur le côté (affichage de la bonne section)
- [ ] Finir le style
## bracket
- [x] Afficher la step suivante a la fin de la step d'avant
- [x] Style specifique pour la team des Winners dans la bracket
- [x] Couleur traits bracet dorée (couleur a revoir au dernier point avant le tournoi)
- [IN PROGRESS] LocalStorage : Save/Get data (supporter le F5)
## Global
- [ ] index.html doit avoir un 'big' header
- [ ] Faire démarrer l'image de fond sous le headeur ?

## BONUS
- [ ] Merger index.html et main-page.html (et bracket.html ?)

# TODO - Gesionnaire tournois
- [ ] Réfléchir aux différents texte a afficher
- [x] Filer l'image du papyrus
- [ ] Images de skin en .png ou .svg
