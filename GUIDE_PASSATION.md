# Rapport de passation — Nour Academy
## Administration et gestion des inscriptions

### 1. Objectif du projet

Nous travaillons sur la partie administration de **Nour Academy**. L'objectif est de permettre à l'administration de consulter les inscriptions, rechercher un dossier et afficher les informations du parent et de ses enfants.

Le projet utilise HTML, CSS et JavaScript natif avec des modules ES6. Les données sont stockées dans `localStorage`, sans serveur ni base de données distante.

Le code doit rester simple, organisé et facile à comprendre pour toute l'équipe.

---

## 2. Organisation générale du projet

Les fichiers principaux sont :

- `js/main.js` : démarre l'application et relie les différents composants.
- `js/router.js` : gère la navigation entre les pages.
- `js/store.js` : gère les cours sélectionnés et les places disponibles.
- `js/components/admin.js` : construit l'interface d'administration et les cartes statistiques.
- `js/admin/registration-storage.js` : sauvegarde et récupère les dossiers d'inscription.
- `js/admin/inscriptions-view.js` : affiche le tableau des inscriptions et gère la recherche.
- `js/components/form.js` : affiche et valide le formulaire d'inscription.

Chaque fichier a une responsabilité précise. Il faut éviter de mettre toute la logique dans un seul fichier.

## 3. `main.js` — Point de départ de l'application

Ce fichier crée les objets nécessaires et les relie entre eux.

### Les objets principaux

`const store = new Store();`

Crée l'objet qui gère les cours sélectionnés et les places disponibles.

`const storage = new RegistrationStorage();`

Crée l'objet qui gère les dossiers des parents et des enfants.

`const form = new RegistrationForm(store, storage);`

Le formulaire reçoit les deux objets : `store` pour récupérer les cours sélectionnés et `storage` pour enregistrer le dossier final.

Les lignes suivantes sont également importantes :

```js
form.selection = selection;
form.catalogue = catalogue;
catalogue.selection = selection;
```

Elles permettent au formulaire d'accéder aux composants de sélection et de catalogue après la validation.

### Les fonctions de rendu

- `renderHome()` : construit la page d'accueil avec la navigation, le hero, le catalogue, la sélection et le formulaire.
- `renderCatalogue()` : affiche uniquement le catalogue.
- `renderSelection()` : affiche les cours sélectionnés.
- `renderInscription()` : affiche le formulaire d'inscription.
- `renderInscriptions()` : ouvre la page d'administration des inscriptions.
- `renderDashboard()` : affiche la page du tableau de bord.
- `renderNotFound()` : affiche un message lorsque la page demandée n'existe pas.

L'objet `routes` associe chaque URL à la fonction qui construit la page correspondante.

## 4. `router.js` — Navigation entre les pages

Le routeur utilise les fragments de l'URL, par exemple :

- `#/accueil`
- `#/catalogue`
- `#/selection`
- `#/inscription`
- `#/inscriptions`
- `#/tableau-de-bord`

Son fonctionnement est simple :

1. Il écoute les changements de l'URL.
2. Il identifie la route demandée.
3. Il appelle la fonction correspondante.
4. Il remplace le contenu de l'application par la nouvelle page.

Cela permet de naviguer entre plusieurs pages sans recharger entièrement le document HTML.

## 5. `store.js` — Gestion des cours

Ce fichier est différent du stockage des dossiers administratifs.

Il utilise deux clés de `localStorage` :

- `courses` : les cours sélectionnés.
- `seats` : les places disponibles par cours.

### Explication des fonctions

**`constructor()`**

Charge les cours sélectionnés et les places sauvegardées. S'il n'existe aucune donnée, il utilise une liste vide pour les cours et un objet vide pour les places.

**`setSeats(id, count)`**

Met à jour le nombre de places disponibles pour un cours, puis sauvegarde les nouvelles valeurs.

**`getSeats(id, defaultSeats)`**

Retourne le nombre de places enregistré. Si aucune valeur n'existe pour ce cours, elle retourne le nombre de places par défaut.

**`convertString(selectedCourses)`**

Transforme un tableau JavaScript en chaîne JSON afin de pouvoir le sauvegarder.

**`convertJson(selectedCourses)`**

Transforme une chaîne JSON en valeur JavaScript.

**`setCours(cours)`**

Ajoute un cours à la liste des cours sélectionnés et sauvegarde la liste.

**`getCours()`**

Retourne les cours sélectionnés.

**`removeCours(id)`**

Retire le cours dont l'identifiant correspond à `id`, sauvegarde la nouvelle liste et remet une valeur de place disponible à `1`.

Attention : la remise automatique à `1` doit être vérifiée avec la logique réelle de réservation des places. Le nombre original n'est pas nécessairement égal à `1`.

## 6. `registration-storage.js` — Gestion des dossiers

Ce fichier gère les données affichées dans l'administration.

La clé utilisée est :

```js
nour-academy-admin
```

### Les fonctions

**`constructor()`**

Charge les dossiers sauvegardés dans `localStorage`. Si la clé n'existe pas, il initialise une liste vide.

**`getAll()`**

Retourne tous les dossiers disponibles.

**`add(dossier)`**

Ajoute un nouveau dossier à la liste puis appelle `save()`.

**`save()`**

Transforme les données en JSON et les sauvegarde dans `localStorage`.

Un point important : `registration-storage.js` ne doit pas recréer des données de démonstration lorsque le stockage est vide. Après une suppression des données, le tableau doit rester vide jusqu'à l'ajout d'une nouvelle inscription.

## 7. `admin.js` — Interface de l'administration

Cette classe construit la structure générale de l'interface : la barre latérale, le contenu principal et les cartes statistiques.

### `constructor(storage)`

Reçoit le stockage des inscriptions et crée une instance de `InscriptionsView`. Il prépare également l'élément principal de l'administration.

### `render(page = "inscriptions")`

Construit la barre latérale et la zone de contenu.

Si la page demandée est `inscriptions`, elle affiche la vue des inscriptions. Sinon, elle affiche actuellement un contenu provisoire pour le tableau de bord.

### `renderCards()`

Construit les quatre cartes statistiques avec leurs SVG :

- nombre d'abonnements ;
- chiffre d'affaires ;
- taux de désabonnement ;
- total des abonnements.

Les SVG représentent les icônes des cartes. Il faut conserver leurs classes CSS pour préserver le design.

Attention : les valeurs de ces cartes sont encore des valeurs statiques de démonstration. Elles ne sont pas encore calculées à partir des dossiers enregistrés.

## 8. `inscriptions-view.js` — Tableau des inscriptions

C'est le fichier responsable de l'affichage, de la recherche et de la consultation des dossiers.

### `constructor(storage)`

Reçoit `RegistrationStorage` et crée la section HTML de la page.

Il écoute également les clics sur les boutons `.action`. Quand un utilisateur clique sur le bouton d'un dossier, il recherche ce dossier et affiche ses informations dans une boîte de dialogue.

### `render()`

Construit le HTML de la page :

- le titre ;
- le champ de recherche ;
- le tableau ;
- les en-têtes des colonnes ;
- la zone où les lignes seront ajoutées.

La fonction attache ensuite un événement `input` au champ de recherche. À chaque modification du texte, elle appelle `renderTable()`.

### `getFilteredData()`

Récupère les dossiers depuis le stockage et filtre les résultats selon le texte recherché.

La recherche peut porter sur le numéro du dossier, les informations du parent ou les informations de ses enfants, notamment le nom, le niveau, les cours et le statut.

Si le nom du parent correspond à la recherche, ses enfants restent visibles dans le résultat.

### `formatMoney(value)`

Transforme un montant numérique en texte lisible, par exemple `350.00 MAD`.

### `formatDate(value)`

Transforme une date enregistrée en texte adapté à l'affichage en français.

### `getPaymentStatus(children)`

Détermine le statut global du paiement d'un dossier :

- si tous les enfants ont le statut `Payée`, le dossier est considéré comme payé ;
- si au moins un enfant est `En attente`, le dossier est considéré comme en attente ;
- sinon, le résultat est `Validée`.

Cette règle est une règle de présentation du projet. Elle devra être adaptée si les règles métier changent.

### `getStatusClass(status)`

Associe un statut à une classe CSS :

- `paid` pour `Payée` ;
- `pending` pour `En attente` ;
- `validated` pour les autres statuts.

Les classes correspondantes doivent exister dans `admin.css`.

### `createCell(value, rowSpan = 1)`

Crée une cellule HTML `<td>`, insère sa valeur et définit éventuellement le nombre de lignes qu'elle doit occuper.

Le paramètre `rowSpan` permet d'afficher les informations du parent une seule fois lorsque plusieurs enfants appartiennent au même dossier.

### `renderTable()`

C'est la fonction principale de l'affichage du tableau.

Elle :

1. récupère les données filtrées ;
2. vide les anciennes lignes ;
3. affiche le nombre de dossiers et d'enfants trouvés ;
4. affiche un message si aucun dossier ne correspond ;
5. crée une ligne pour chaque enfant ;
6. affiche le dossier, le parent, le montant total, le paiement et le bouton d'action une seule fois par dossier.

Le montant total est calculé sur tous les enfants du dossier, et non uniquement sur ceux visibles après la recherche. Cela permet de conserver le montant complet du dossier pendant le filtrage.

## 9. `form.js` — Formulaire d'inscription

Cette classe gère le formulaire côté utilisateur, la validation des champs, le récapitulatif et l'enregistrement du dossier.

### `constructor(store, registrationStorage)`

Reçoit les deux objets de stockage et conserve leurs références. Le premier gère les cours sélectionnés ; le second enregistre le dossier administratif.

### `render()`

Construit tout le formulaire en HTML, affiche les champs et les messages d'aide, puis appelle `handllerForm()` pour activer la logique de validation.

### `handllerForm()`

Cette fonction prépare et contrôle le formulaire.

Elle récupère les champs, associe les messages d'erreur et de succès aux champs correspondants, puis attache les événements de validation.

Lors de la soumission :

1. elle empêche le rechargement de la page ;
2. elle valide tous les champs ;
3. elle vérifie qu'au moins un cours a été sélectionné ;
4. elle bloque la validation si un champ est invalide ;
5. si tout est valide, elle appelle `confirmRegistration()`.

### `showValidation(field, isValid, message)`

Affiche le message d'erreur ou de succès correspondant au champ. Elle ajoute également les classes CSS `is-valid` ou `is-invalid` et met à jour l'attribut `aria-invalid`.

### `CheckOnlyCharacter(name)`

Vérifie que le nom comporte au moins deux caractères et contient uniquement des lettres, avec les séparateurs autorisés : espace, apostrophe ou tiret.

### `emailIsValid(email)`

Vérifie la structure générale de l'adresse email.

### `phoneIsValid(phone)`

Vérifie le format du numéro de téléphone marocain prévu par le formulaire : numéro local commençant par `06` ou `07`, ou format international commençant par `+212 6` ou `+212 7`.

### `passwordIsValid(password)`

Vérifie que le mot de passe contient au moins huit caractères, une majuscule, un chiffre et un caractère spécial.

Le mot de passe ne doit pas être enregistré en texte brut dans `localStorage`.

### `showSummary(form, child, level, courses)`

Cette méthode construit un premier récapitulatif et masque le formulaire.

Cependant, elle fait actuellement doublon avec `confirmRegistration()`. Il faut choisir une seule méthode d'affichage pour éviter de maintenir deux versions du récapitulatif.

### `confirmRegistration()`

C'est la méthode qui doit finaliser l'inscription.

Elle récupère les informations du parent, de l'enfant et les cours sélectionnés. Elle calcule le montant total, crée un numéro de dossier et construit un objet avec les informations de l'inscription.

Elle appelle ensuite :

```js
this.registrationStorage.add(dossier);
```

Cette opération sauvegarde le dossier dans `nour-academy-admin`.

Enfin, elle affiche le récapitulatif, libère les cours sélectionnés, actualise les composants du catalogue et de la sélection, puis réinitialise le formulaire.

---

## 10. Structure des données d'un dossier

Le tableau administratif attend des données organisées de cette façon :

```js
{
  id: 1,
  dossier: "NA-2026-001",
  parent: "Nom du parent",
  telephone: "0612345678",
  email: "parent@email.com",
  childs: [
    {
      id: 101,
      name: "Prénom de l'enfant",
      niveau: "2ème Bac",
      courses: ["Maths"],
      status: "En attente",
      date: "2026-10-29",
      prix: 350,
      centre: "Nador Centre"
    }
  ],
  center: "Nador Centre",
  montant: 350
}
```

Le champ `childs` est un tableau, même si le formulaire actuel enregistre un seul enfant. Cette structure permet d'envisager plusieurs enfants dans un même dossier par la suite.

## 11. Travail restant à terminer

Voici les points à vérifier pour poursuivre le projet correctement :

1. **Unifier le récapitulatif** : dans `handllerForm()`, appeler uniquement `confirmRegistration()` et éviter l'appel redondant à `showSummary()`.
2. **Vérifier l'enregistrement** : confirmer que `RegistrationStorage` possède bien la méthode `add()` et que `main.js` transmet `storage` au formulaire avec `new RegistrationForm(store, storage)`.
3. **Tester le parcours complet** : sélectionner des cours, remplir le formulaire, valider puis vérifier que le dossier apparaît dans `#/inscriptions`.
4. **Tester la recherche** : chercher un numéro de dossier, un parent, un enfant ou un cours.
5. **Finaliser les cartes statistiques** : remplacer les nombres statiques par des données calculées à partir des dossiers enregistrés, avec des définitions métier cohérentes.
6. **Préserver le design** : conserver les couleurs, les classes CSS et les SVG existants.
7. **Améliorer le modèle d'inscription** : lorsque le parcours actuel est stable, ajouter la possibilité pour un parent d'inscrire plusieurs enfants dans un seul dossier.

### Conclusion

Le but n'est pas de tout réécrire. Il faut comprendre le rôle de chaque fichier, vérifier les connexions entre les classes, tester le parcours utilisateur et terminer les fonctionnalités une par une.

Les données administratives sont indépendantes des cours sélectionnés : `Store` gère les cours et les places, tandis que `RegistrationStorage` gère les dossiers. Cette séparation est importante pour garder le projet compréhensible et facile à maintenir.

**À retenir :** avant de modifier une fonction, lire son rôle, identifier les fichiers qui l'utilisent, faire une petite modification puis tester le parcours complet.
