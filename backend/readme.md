pense-bête

typer le context avec response, user etc..
mettre en place de debugger
problématique : savoir importer les ref dans typedef d'un autre ref, à voir

LES TESTS NE FONCTIONNENT PLUS


### Comment créer une route graphql

## 1 vérifier les modèles de la base de données

# règles

- vérifier required true
- typer la base de données 

## 2 créer un test dans graphQl/resolvers/__test__ 

# règles

- global.signin() 
    -> permet de créer un utilisateur, nécessaire afin d'envoyer l'id pour l'authentification sur les tests
    -> renvoie query mutate et testUser(l'utilisateur créé)


- permet d'accéder au message personalisé (ex: throw new inputError(errors)) pour les tests 
    => console.log(res?.errors[0]?.extensions?.exception)

- permet d'accéder au message graphQl(ex: erreur d'input ) 
    => console.log(res);

# Attention

- les query des tests sont les mêmes que ceux du front (!!! pour les tests on renvoie toutes les données, pour le client on renvoie les données que l'on a besoin)

## 3 créer les resolvers

# règles

- Ne pas oublier de protéger les routes qui ont besoin d'être protéger
    => if (!context.user.id) throw new UnauthorizedError();


- ajouter un resolver query (GET) ou bien Mutation (POST, PUT, DELETE). le nom doit correspondre au nom du type écrit précédemment

- s'il y a un nouveau fichier, veuillez je vous prie l'importer dans l'index.ts du dossier resolvers


# erreurs

librairie pour tester les inputs
https://www.npmjs.com/package/validator


S'il manque une erreur il est possible de personaliser l'erreur en reprenant les autres comme modèle


## 4 créer les types dans le dossier typeDef

- ajouter le type de données à renvoyer ainsi que le type de la query ou de la mutation

- s'il y a un nouveau fichier, veuillez je vous prie l'importer dans l'index.ts du dossier typeDefs

## 5 Tester et si cela réussit soyez fier de vous


