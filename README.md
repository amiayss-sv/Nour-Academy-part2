# Nour-Academy ----2

Nour Academy
Portail d'inscription en ligne et espace d'administration pour un réseau de centres de soutien scolaire à Nador.

Nour Academy est une application web front-end qui simplifie le parcours d'inscription des parents : consultation du catalogue, sélection des cours, saisie des informations de l'élève et validation du dossier. Elle comprend également un espace d'administration permettant de consulter et de gérer les inscriptions.

Projet pédagogique — Cette version fonctionne côté navigateur avec JavaScript et localStorage. Elle n'utilise pas de backend ni de base de données distante. Les données enregistrées sont propres au navigateur utilisé.

Sommaire
[Contexte et objectifs](#contexte-et-objectifs)
[Fonctionnalités](#fonctionnalit%C3%A9s)
[Parcours utilisateur](#parcours-utilisateur)
[Espace administration](#espace-administration)
[Technologies utilisées](#technologies-utilis%C3%A9es)
[Architecture du projet](#architecture-du-projet)
[Organisation des fichiers](#organisation-des-fichiers)
[Installation et lancement](#installation-et-lancement)
[Navigation](#navigation)
[Gestion des données](#gestion-des-donn%C3%A9es)
[Équipe](#%C3%A9quipe)
[Périmètre et limites](#p%C3%A9rim%C3%A8tre-et-limites)
Contexte et objectifs
Nour Academy dispose de trois centres :

Nador Centre ;
Hay Al Matar ;
Selouane.
L'établissement accompagne les élèves du primaire au baccalauréat. Le projet vise à rendre l'inscription plus claire et plus simple pour les parents, tout en facilitant le suivi administratif des dossiers.

Objectifs principaux
Présenter les cours, les matières, les niveaux, les horaires et les tarifs dans un catalogue unique.
Aider les parents à choisir les cours adaptés à leur enfant.
Calculer automatiquement le montant mensuel de la sélection.
Vérifier les informations saisies avant l'enregistrement du dossier.
Donner au secrétariat une vue centralisée des inscriptions enregistrées dans le navigateur.
Fonctionnalités
Espace parents
Fonctionnalité	Description
Catalogue des cours	Affichage des cours à partir du fichier js/courses.json.
Filtres	Filtrage des cours par niveau scolaire et par matière.
Disponibilité	Un cours marqué comme complet ne peut pas être ajouté à la sélection.
Sélection des cours	Ajout et suppression des cours, avec prévention des doublons dans l'affichage de la sélection.
Calcul du montant	Calcul automatique du total mensuel à partir des prix des cours sélectionnés.
Formulaire d'inscription	Saisie du parent, de son e-mail, de son téléphone, du prénom de l'élève et du centre choisi.
Validation	Vérification des champs, du format de l'e-mail et du numéro de téléphone, ainsi que du choix du centre.
Consentement	Case de consentement relative au traitement des données, faisant référence à la loi marocaine 09-08.
Confirmation	Affichage d'un récapitulatif avec les informations principales et le numéro du dossier après validation.
Espace administration
Fonctionnalité	Description
Tableau de bord	Présentation d'indicateurs sur les dossiers, les élèves, les inscriptions en attente et les montants payés.
Liste des inscriptions	Affichage des dossiers et des informations des parents et des élèves dans un tableau.
Recherche	Recherche instantanée dans les informations du dossier, notamment le parent, l'élève, le téléphone et le numéro de dossier.
Filtrage par statut	Filtrage des inscriptions en attente, acceptées/payées ou refusées.
Tri	Tri par date, nom du parent, numéro de dossier, centre ou montant total, dans les deux ordres.
Modification	Modification des informations du parent, de l'élève, du centre et du statut depuis le formulaire.
Suppression	Suppression d'un dossier depuis la liste des inscriptions.
Parcours utilisateur
Le parent ouvre l'espace parents.
Il consulte le catalogue et filtre les cours par niveau ou matière.
Il ajoute les cours souhaités à sa sélection.
Il vérifie les cours sélectionnés et le montant mensuel total.
Il remplit le formulaire, choisit un centre et accepte le consentement demandé.
L'application valide les champs et vérifie qu'au moins un cours est sélectionné.
Le dossier est enregistré dans le stockage local et un récapitulatif de confirmation est affiché.
Le secrétariat retrouve ensuite le dossier dans l'espace administration du même navigateur.
Espace administration
L'administration est organisée autour de deux vues :

Tableau de bord : accès aux indicateurs principaux.
Inscriptions : recherche, filtrage, tri, modification et suppression des dossiers.
Les statuts utilisés dans les dossiers sont : En attente, Validée, Payée et Refusée. Dans le filtre de la liste, les statuts Validée et Payée sont regroupés sous l'option Accepté / Payé.

Technologies utilisées
Technologie	Utilisation
HTML5	Structure de la page et des formulaires.
CSS3	Mise en page, styles et adaptation de l'interface.
JavaScript (Vanilla JS)	Logique applicative, composants, événements et validation.


C:.
│   index.html
│   README.md
│   
├───csss
│       style.css
│       
├───img
│       hero-classroom.jpg
│       
└───js
    │   courses.json
    │   main.js
    │   router.js
    │   routes.js
    │   store.js
    │   
    ├───admin
    │       inscriptions-view.js
    │       registration-storage.js
    │       
    └───components
            action.js
            admin.js
            catalogue.js
            footer.js
            form.js
            hero.js
            navbar.js
            selection.js
            status.js

