# AZ Holding — Assistance voyage et visa

AZ Holding est un site web d’assistance au voyage permettant aux visiteurs de découvrir des destinations et d’obtenir de l’aide pour leurs démarches de visa.

## Fonctionnalités

- Page d’accueil moderne et responsive
- Présentation des services :
  - Fiabilité
  - Rapidité
  - Simplicité
- Liste de destinations internationales
- Formulaire d’assistance visa
- Formulaire de contact
- Navigation entre les différentes pages
- Design responsive pour ordinateur, tablette et mobile

## Pages principales

| Fichier | Description |
|---|---|
| `Index.html` | Page d’accueil |
| `destination.html` | Liste des destinations |
| `visa.html` | Formulaire d’assistance visa |
| `contact.html` | Formulaire de contact |
| `elior.css` | Styles de la page d’accueil |
| `destination.css` | Styles des destinations |
| `visa.css` | Styles du formulaire visa |
| `contact.css` | Styles de la page contact |

## Structure du projet

```text
Nouveau dossier/
│
├── Index.html
├── destination.html
├── visa.html
├── contact.html
│
├── elior.css
├── destination.css
├── visa.css
├── contact.css
│
├── images/
│   └── paris.jfif
│
└── README.md
```

## Installation

Aucune installation particulière n’est nécessaire.

1. Téléchargez ou clonez le projet.
2. Ouvrez le dossier dans Visual Studio Code.
3. Ouvrez le fichier `Index.html`.
4. Lancez le projet avec une extension comme **Live Server**.

## Lancer le projet avec Live Server

Dans Visual Studio Code :

1. Installez l’extension **Live Server**.
2. Faites un clic droit sur `Index.html`.
3. Cliquez sur **Open with Live Server**.

Le site sera ensuite disponible dans votre navigateur à une adresse similaire à :

```text
http://127.0.0.1:5500/Index.html
```

## Technologies utilisées

- HTML5
- CSS3
- Responsive Design
- Google Fonts
- Images locales et images externes

## Personnalisation

Pour modifier le site :

- Les textes se trouvent dans les fichiers `.html`.
- Les couleurs et la mise en page se trouvent dans les fichiers `.css`.
- Les images principales sont définies dans les fichiers CSS.
- Les liens de navigation peuvent être modifiés directement dans les balises `<a>`.

## Important

Les formulaires de contact et d’assistance visa sont actuellement visuels. Ils ne sauvegardent pas encore les données dans une base de données et ne les envoient pas vers un serveur.

Pour les rendre fonctionnels, il faudra ajouter :

- Un serveur backend
- Une base de données
- Un système d’envoi d’e-mails
- Une validation sécurisée des données

## Auteur

Projet réalisé pour **AZ Holding**.

## Licence

Projet personnel. Tous droits réservés.
