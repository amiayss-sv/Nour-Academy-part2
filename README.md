# Nour Academy

**Portail d'inscription en ligne et espace d'administration pour un réseau de centres de soutien scolaire à Nador.**

Nour Academy est une application web front-end qui simplifie le parcours d'inscription des parents : consultation du catalogue, sélection des cours, saisie des informations de l'élève et validation du dossier. Elle comprend également un espace d'administration permettant de consulter et de gérer les inscriptions.

> **Projet pédagogique —** Cette version fonctionne côté navigateur avec JavaScript et `localStorage`. Elle n'utilise pas de backend ni de base de données distante. Les données enregistrées sont propres au navigateur utilisé.

---

## Sommaire

- [Contexte et objectifs](#contexte-et-objectifs)
- [Fonctionnalités](#fonctionnalités)
- [Parcours utilisateur](#parcours-utilisateur)
- [Espace administration](#espace-administration)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Organisation des fichiers](#organisation-des-fichiers)
- [Installation et lancement](#installation-et-lancement)
- [Navigation](#navigation)
- [Gestion des données](#gestion-des-données)
- [Équipe](#équipe)
- [Périmètre et limites](#périmètre-et-limites)

---

## Contexte et objectifs

Nour Academy dispose de trois centres :

- Nador Centre ;
- Hay Al Matar ;
- Selouane.

L'établissement accompagne les élèves du primaire au baccalauréat. Le projet vise à rendre l'inscription plus claire et plus simple pour les parents, tout en facilitant le suivi administratif des dossiers.

### Objectifs principaux

- Présenter les cours, les matières, les niveaux, les horaires et les tarifs dans un catalogue unique.
- Aider les parents à choisir les cours adaptés à leur enfant.
- Calculer automatiquement le montant mensuel de la sélection.
- Vérifier les informations saisies avant l'enregistrement du dossier.
- Donner au secrétariat une vue centralisée des inscriptions enregistrées dans le navigateur.

## Fonctionnalités

### Espace parents

| Fonctionnalité | Description |
|---|---|
| Catalogue des cours | Affichage des cours à partir du fichier `js/courses.json`. |
| Filtres | Filtrage des cours par niveau scolaire et par matière. |
| Disponibilité | Un cours marqué comme complet ne peut pas être ajouté à la sélection. |
| Sélection des cours | Ajout et suppression des cours, avec prévention des doublons dans l'affichage de la sélection. |
| Calcul du montant | Calcul automatique du total mensuel à partir des prix des cours sélectionnés. |
| Formulaire d'inscription | Saisie du parent, de son e-mail, de son téléphone, du prénom de l'élève et du centre choisi. |
| Validation | Vérification des champs, du format de l'e-mail et du numéro de téléphone, ainsi que du choix du centre. |
| Consentement | Case de consentement relative au traitement des données, faisant référence à la loi marocaine 09-08. |
| Confirmation | Affichage d'un récapitulatif avec les informations principales et le numéro du dossier après validation. |

### Espace administration

| Fonctionnalité | Description |
|---|---|
| Tableau de bord | Présentation d'indicateurs sur les dossiers, les élèves, les inscriptions en attente et les montants payés. |
| Liste des inscriptions | Affichage des dossiers et des informations des parents et des élèves dans un tableau. |
| Recherche | Recherche instantanée dans les informations du dossier, notamment le parent, l'élève, le téléphone et le numéro de dossier. |
| Filtrage par statut | Filtrage des inscriptions en attente, acceptées/payées ou refusées. |
| Tri | Tri par date, nom du parent, numéro de dossier, centre ou montant total, dans les deux ordres. |
| Modification | Modification des informations du parent, de l'élève, du centre et du statut depuis le formulaire. |
| Suppression | Suppression d'un dossier depuis la liste des inscriptions. |

## Parcours utilisateur

1. Le parent ouvre l'espace parents.
2. Il consulte le catalogue et filtre les cours par niveau ou matière.
3. Il ajoute les cours souhaités à sa sélection.
4. Il vérifie les cours sélectionnés et le montant mensuel total.
5. Il remplit le formulaire, choisit un centre et accepte le consentement demandé.
6. L'application valide les champs et vérifie qu'au moins un cours est sélectionné.
7. Le dossier est enregistré dans le stockage local et un récapitulatif de confirmation est affiché.
8. Le secrétariat retrouve ensuite le dossier dans l'espace administration du même navigateur.

## Espace administration

L'administration est organisée autour de deux vues :

- **Tableau de bord** : accès aux indicateurs principaux.
- **Inscriptions** : recherche, filtrage, tri, modification et suppression des dossiers.

Les statuts utilisés dans les dossiers sont : `En attente`, `Validée`, `Payée` et `Refusée`. Dans le filtre de la liste, les statuts `Validée` et `Payée` sont regroupés sous l'option **Accepté / Payé**.

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de la page et des formulaires. |
| CSS3 | Mise en page, styles et adaptation de l'interface. |
| JavaScript (Vanilla JS) | Logique applicative, composants, événements et validation. |
| JavaScript ES Modules | Séparation du code en modules avec `import` et `export`. |
| JSON | Source des données du catalogue de cours. |
| LocalStorage | Conservation locale des sélections, disponibilités et dossiers. |
| Hash routing | Navigation entre les vues avec des routes de type `#/catalogue`. |

Aucun framework JavaScript ni aucune dépendance npm n'est requis dans la version actuelle.

## Architecture du projet

L'application suit une architecture front-end modulaire :

- `main.js` est le point d'entrée de l'application.
- `router.js` gère la navigation et le changement de vue.
- `routes.js` instancie les composants partagés et associe les routes à leurs vues.
- `store.js` gère la sélection des cours et leurs disponibilités dans le navigateur.
- `registration-storage.js` gère les dossiers d'inscription enregistrés localement.
- `components/` contient les éléments réutilisables de l'interface.
- `admin/` contient la vue de gestion des inscriptions et le stockage associé.

## Organisation des fichiers

```text
Nour-Academy-part2/
│   index.html
│   README.md
│
├── csss/
│   └── style.css
│
├── img/
│   └── hero-classroom.jpg
│
└── js/
    │   courses.json
    │   main.js
    │   router.js
    │   routes.js
    │   store.js
    │
    ├── admin/
    │   │   inscriptions-view.js
    │   └── registration-storage.js
    │
    └── components/
        │   action.js
        │   admin.js
        │   catalogue.js
        │   footer.js
        │   form.js
        │   hero.js
        │   navbar.js
        │   selection.js
        └── status.js
```

### Rôle des fichiers

| Fichier | Responsabilité |
|---|---|
| `index.html` | Page HTML principale et conteneur `#app` de l'application. |
| `csss/style.css` | Feuille de styles principale. |
| `img/hero-classroom.jpg` | Image utilisée dans la section d'accueil. |
| `js/main.js` | Initialise le routeur et démarre l'application. |
| `js/router.js` | Écoute les changements de hash et affiche la vue correspondante. |
| `js/routes.js` | Crée les instances partagées et définit les fonctions de rendu des pages. |
| `js/store.js` | Gère les cours sélectionnés et les disponibilités dans `localStorage`. |
| `js/courses.json` | Contient les données des 12 cours du catalogue. |
| `js/admin/registration-storage.js` | Initialise les données de démonstration et assure la lecture, l'ajout, la modification et la suppression des dossiers. |
| `js/admin/inscriptions-view.js` | Construit le tableau des inscriptions et gère recherche, filtres, tri et actions. |
| `js/components/navbar.js` | Affiche la navigation principale et son menu mobile. |
| `js/components/footer.js` | Affiche le pied de page et les informations des centres. |
| `js/components/hero.js` | Affiche la section d'introduction de l'accueil. |
| `js/components/catalogue.js` | Charge, filtre et affiche les cours. |
| `js/components/selection.js` | Affiche les cours sélectionnés et leur montant total. |
| `js/components/form.js` | Gère le formulaire, sa validation, la création et la modification d'un dossier. |
| `js/components/admin.js` | Construit l'espace d'administration et le tableau de bord. |
| `js/components/action.js` | Fournit le menu d'actions associé à un dossier. |
| `js/components/status.js` | Module complémentaire lié à l'affichage des statuts. |

## Installation et lancement

### Prérequis

- Un navigateur web récent (Chrome, Firefox, Edge, etc.).
- Visual Studio Code, ou un autre éditeur.
- L'extension **Live Server** de Visual Studio Code, ou un serveur HTTP local équivalent.

### Étapes

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/amiayss-sv/Nour-Academy-part2.git
   ```

2. Ouvrir le dossier du projet :

   ```bash
   cd Nour-Academy-part2
   ```

3. Ouvrir le dossier dans Visual Studio Code.
4. Lancer `index.html` avec **Open with Live Server**.
5. Ouvrir l'adresse locale affichée par Live Server dans le navigateur.

> **Important :** lancer le projet via un serveur HTTP local. Ne pas ouvrir directement `index.html` avec `file://`, car l'application charge un fichier JSON et utilise des modules JavaScript.

## Navigation

La navigation utilise le hash de l'URL. Les principales routes sont :

| Route | Vue |
|---|---|
| `#/accueil` | Accueil et présentation du catalogue, de la sélection et du formulaire. |
| `#/catalogue` | Catalogue des cours. |
| `#/selection` | Sélection des cours. |
| `#/inscription` | Formulaire d'inscription. |
| `#/admin` | Liste des inscriptions dans l'espace administration. |
| `#/inscriptions` | Liste des inscriptions. |
| `#/tableau-de-bord` | Tableau de bord administratif. |

Au premier lancement, le routeur redirige vers `#/admin` si aucun hash de navigation n'est déjà présent.

## Gestion des données

L'application utilise trois clés principales dans le `localStorage` du navigateur :

| Clé | Données conservées |
|---|---|
| `courses` | Cours ajoutés à la sélection du parent. |
| `seats` | Disponibilités enregistrées pour les cours. |
| `nour-academy-admin` | Dossiers d'inscription affichés dans l'espace administration. |

Le fichier `js/courses.json` fournit les cours du catalogue. Le stockage des inscriptions ajoute des dossiers de démonstration lors de la première initialisation, si la clé `nour-academy-admin` n'existe pas encore.

Les données de `localStorage` sont limitées au navigateur et à l'origine utilisée. Elles ne sont pas synchronisées entre plusieurs appareils ou navigateurs. Effacer les données du site dans le navigateur supprime également les dossiers enregistrés localement.

## Équipe

| Rôle | Nom |
|---|---|
| Scrum Master | Zahra |
|   | Mohamed Ndoumghar |

## Périmètre et limites

Cette version est un prototype front-end destiné à démontrer le parcours d'inscription et la gestion des dossiers. Elle ne comprend pas :

- de backend ni d'API ;
- de base de données distante ;
- de connexion, d'authentification ou de gestion des rôles ;
- de synchronisation des dossiers entre plusieurs utilisateurs ou appareils ;
- de système de paiement en ligne.

Le formulaire affiche un consentement faisant référence à la loi 09-08. Cette mention dans l'interface ne constitue pas, à elle seule, une garantie de conformité juridique ou de sécurisation d'un traitement réel de données personnelles.

---
