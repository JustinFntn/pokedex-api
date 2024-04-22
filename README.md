# Création d'une API Pokémon

Nous allons tâcher de créer une API permettant d'effectuer des opérations CRUD sur les pokémons. Ce projet sera réalisé avec Express pour la gestion des routes et avec une base de donnée SQLite.

## Prérequis

-   NodeJS version LTS
-   Postman : pour vérifier nos requêtes
-   Editeur de code type Vs Code

## Initialisation

### Serveur

Créer le fichier `src/index.js` et initialiser un serveur http sur le port 3000. Ce serveur initialisera également une instance express dans une variable.

### Base de donnée

Le projet contient un dossier `db` qui se compose de deux fichiers. Un pokedex.db.js qui sert à gérer l'instanciation et la gestion de la base de donnée `pokedex.db`. Et un script d'initialisation `init.db.js` qui va servir à initialiser la base de donnée avec des tables et valeurs par défaut afin d'éviter d'avoir à polluer notre code source avec ces infos. Il contient déjà une table `Types` correspondant au type de pokémons.

Le fichier `package.json` contient une commande `npm run init-db` qui permet d'initialiser la base de donnée. Vous pouvez tester cette commande et regarder le contenu de votre base à l'aide d'un outil comme [DB Browser for SQLite](https://sqlitebrowser.org/) ou l'extension VsCode **SQLite Viewer**.

Une fois votre base de donnée initialisée nous allons compléter ce fichier `init.db.js`. Durant ce tp nous allons chercher à créer une API permettant de gérer des pokémons. Nous allons donc créer une table `pokemons` qui contiendra les informations suivantes:

| Nom            | Type          | Propriété      | Description                        |
| -------------- | ------------- | -------------- | ---------------------------------- |
| id             | Number        | clé primaire   | Identifiant unique du Pokémon      |
| nom            | String        | requis, unique | Nom du Pokémon                     |
| pokedexId      | Number        | requis, unique | Numéro dans le Pokédex             |
| type1_id       | REF(Types)    | requis         | 1er type du Pokémon                |
| type2_id       | REF(Types)    |                | 2ème type du Pokémon               |
| pre_evolution  | REF(Pokemons) |                | Pokémon précédent dans l'évolution |
| post_evolution | REF(Pokemons) |                | Pokémon suivant dans l'évolution   |

### Structure du projet

Nous allons suivre la structure suivante pour nos API.

```txt
src
├── nom_du_module
│   ├── *.model.js
│   └── *.controller.js
│   └── *.route.js
└── db.js
```

## Endpoints Types

Avant d'attaquer le coeur du TP nous allons chercher à pouvoir accéder en lecture à notre liste de Types que nous avons stockés en base. Cela nous servira plus tard d'avoir un modèle de Types lorsqu'il faudra faire des contrôles de données dans nos futurs controlleurs.

Voici les routes à implémenter:

-   `GET:/types` : Permet d'otenir la liste des types
-   `GET;/types/:typeId` : Permet d'obtenir un type spécifique en fonction de la clé typeId passé en paramètre.

Ces deux routes se décomposeront en fichier `types.routes.js`, `types.controller.js`, `types.model.js`.
Il n'y a pas de contrôles particulier à faire dans ces routes, elles sont extrêmement basique.

## Endpoints Pokémon

### Routes

Le but va être de créer 5 endpoints pour gérer les pokémons. Ces endpoints seront les suivants:

-   `GET:/pokemons` : permet d'obtenir la liste de tous les pokémons
-   `GET:/pokemons/:pokemonId` : permet d'obtenir un pokémon spécifique en fonction de la clé `pokemonId` passé en paramètre
-   `POST:/pokemons` : permet d'enregistrer le pokémon dont les propriétés sont passées dans le body de la requête
-   `PATCH:/pokemons/pokemonId` : permet de modifier le pokémon donc le `pokemonId` est passé en paramètre et les propriétés passées dans le body.
-   `DELETE:/pokemons/pokemonId:` : permet de supprimer le pokémon renseigné avec son `pokemonId`.

Le pokemonId de l'endpoint peut correspondre au choix le champs `id` ou le champs `pokedexId`. Si vous en choisissez un gardez simplement le même en permanence.

Dans le cas des endpoints **POST** et **PATCH** vous avez besoin de données à renseigner dans le body. Voici un exemple de ce à quoi elles peuvent ressembler:

```JSON
// POST
{
  "name":"Bulbizarre",
  "pokedexId":1,
  "type1":1, // Référence à l'id de la table types
  "type2":5,
}
```

Ces fonctions seront extrêmement simple pour le moment et n'auront pour but d'appeler que les fonctions controllers associées à chacun des endpoints que nous développerons dans la partie suivante.

_N'oubliez pas les routes ne doivent pas contenir de logiques particulières ou de vérifications c'est le rôle des controllers._

### Controllers

Pour chacune des routes il y a une méthode CRUD(Create Read Update Delete) associée

-   GET/Read: lecture d'un ou plusieurs documents
-   POST/Create: création d'un document
-   PATCH/Update: modification d'un document
-   DELETE/Delete : suppression d'un document

Il va donc falloir un controller qui sera associé à chacune des routes précedemment définis. Nous aurons donc les fonctions controllers suivantes: `listPokemons`,`getPokemonById`,`createPokemon`,`updatePokemon` et `deletePokemon`.

Créer ses fonctions dans le fichier `pokemons.controller.js` du dossier `src/pokemons` et implémenter les. L'étape finale de ces fonctions sera chacun d'appeler le modèle Pokémon et d'utiliser la fonction associées à l'opération CRUD en cours.

#### Data checking

Le but initial d'un controlleur reste de vérifier les données qui transitent entre l'endpoint et le modèle. Dans le cas d'une création et d'une update vous allez vérifier une série d'éléments avant d'appeler le modèle. Si le test n'est pas bon vous renverrez l'erreur indiquée:

-   Si champs pre_evolution ou post_evolution contient l'id d'un pokémon qui n'existe pas on renvoie une erreur 400 en précisant que l'id renseigné n'existe pas.
-   SI champs type contient l'id d'un type qui n'existe pas on renvoie une erreur 400 en précisant que l'id renseigné n'existe pas.
-   Si le nom du pokémon ou le pokemonId est déjà renseignée en base sur l'une des lignes de la table alors on renvoie une erreur 400 en indiquant qu'il y a un doublon de data.

_N'hésitez pas à utiliser les modèles pour aller chercher les informations nécessaires à vos tests_

### Modeles

Les modèles contiendront de leur côté autant de fonction que d'opération CRUD nécessaire. Ces fonctions seront très simples et devront faire appel à la base de donnée via le package SQLite.

## Utilisateurs et permission d'accès

Nous allons essayer d'ajouter des fonctionnalités de permissions afin que certains endpoint ne soient pas accessibles si vous n'êtes pas connectés. Par exemple il serait intéressant que seuls les utilisateurs authentifiés puissent créer, modifier ou supprimer des pokémons.

### Modèles users

Créer une table dans le script `init.db.js` qui sera de la structure suivante:

| Nom      | Type   | Propriété      | Description                         |
| -------- | ------ | -------------- | ----------------------------------- |
| id       | Number | clé primaire   | Identifiant unique de l'utilisateur |
| email    | String | requis, unique | Email de l'utilisateur              |
| password | String | requis         | Mot de passe                        |

### Endpoints users

Créer l'endpoint de création d'un utilisateur `POST:/users` à travers les fichiers `users.route.js` et `users.controller.ts`. Attention dans la partie controlleur veillez bien à crypter le mot de passe entré dans le body afin qu'il ne soit pas stocké en clair dans la base de donnée.

Pour ce faire vous pouvez utiliser le package: `npm install bcrypt`. Renseignez vous dans la [doc](https://www.npmjs.com/package/bcrypt) concernant la méthode `hash`. Elle renvoie une promesse que vous devrez gérer.

On aura ensuite un second endpoint `POST:/users/login`. Cet endpoint récupèrera l'utilisateur en base de données avec les informations email et mot de passe entrés dans le body de la requête.
Il renverra ensuite un JWT construit à l'aide du package `jsonwebtoken` et du retour de la requête en BDD permettant d'obtenir les informations utilisateurs.

_Nous utilons ici une méthode POST et non GET car il s'agit d'un point de vue applicatif de la création d'une session utilisateur. Dans le cas d'une création le POST est donc plus logique._

_La requête login va vous renvoyer un jwt crypté sur Postman. Dans ce cas vous devez récuperer ce JWT et le stocker dans le champs Authorization du header de votre requête_

### Middleware de permission

Maintenant que nous gérons les utilisateurs nous ajouter une vérification de la validité du JWT dans certaines de nos requêtes. Pour ce faire créer un fichier `jwt.middleware.js` dans le dossier `src/common`. Ce dossier contient toutes les logiques communes à plusieurs endpoints.

Ce fichier contiendra une fonction `verifyJWT(req,res,next)` qui vérifiera l'objet `req.headers.authorization` pour récupérer le JWT entré en paramètre de votre requête. Il vérifiera le JWT grâce au package `jsonwebtoken`. Si le jwt est valide il appelera la fonction `next()` afin de continuer le processus de la requête sinon il renverra une réponse `401 Unauthorized`.

### Connecter le middleware de permission à nos routes

Jusque là les fichiers de route ne faisaient pas grande chose en dehors de l'appel du controller associé. Désormais vous allez vérifier la validité du JWT avec le middleware que nous venons de créer avant l'appel de chaque controller pour les routes suivantes:

-   Création d'un pokémon
-   Modification d'un pokémon
-   Suppression d'un pokémon

### Test des permissions

Essayer de tester votre application en indiquant ou non dans votre requêtre votre JWT. Désormais les routes où le JWT est requis devraient vous renvoyer des erreurs et ne pas réaliser d'opérations sur la BDD si vous n'avez pas de JWT valide.

## Documentation Swagger

En utilisant les informations du cours sur la mise en place d'une documentations Swagger vous allez créer un fichier swagger qui sera accessible à l'url `/api-docs`.

Dans cette documentation vous détaillerez bien chacun de vos endpoints existant dans votre API.
