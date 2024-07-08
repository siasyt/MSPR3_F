# Frontend

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Serveur de développement

Exécutez `ng serve` pour démarrer un serveur de développement. Naviguez vers `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers sources.

## Génération de code

Exécutez `ng generate component component-name` pour générer un nouveau composant. Vous pouvez également utiliser `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construction

Exécutez `ng build` pour construire le projet. Les artefacts de construction seront stockés dans le répertoire `dist/`.

## Exécution des tests unitaires

Exécutez `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io).

## Exécution des tests de bout en bout

Exécutez `ng e2e` pour exécuter les tests de bout en bout via une plateforme de votre choix. Pour utiliser cette commande, vous devez d'abord ajouter un package qui implémente des capacités de test de bout en bout.

## Introduction au projet

MSPR3_F Frontend est un projet basé sur Angular, visant à identifier et enregistrer les traces de la faune sauvage à l'aide de technologies d'intelligence artificielle. Ce projet fournit un outil puissant aux chercheurs et au grand public, les aidant à surveiller plus efficacement la biodiversité.

## Fonctionnalités

- **Reconnaissance haute précision** : Utilisation de modèles d'apprentissage profond pour identifier les traces de la faune sauvage.
- **Design responsive** : Supporte une expérience utilisateur optimale sur divers appareils.
- **Gestion des utilisateurs** : Fournit des fonctionnalités d'inscription, de connexion et de gestion de l'historique des utilisateurs.
- **Traitement des données** : Supporte le téléchargement d'images et l'affichage en temps réel des résultats de prédiction.
- **Intégration continue** : Intègre GitHub Actions pour une intégration et un déploiement continus automatisés.

## Étapes d'installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/siasyt/MSPR3_F.git
cd MSPR3_F

2. Installer les dépendances
Assurez-vous d'avoir installé Node.js et npm, puis exécutez la commande suivante pour installer les dépendances du projet :
npm install

3. Démarrer le serveur de développement
Exécutez la commande suivante pour démarrer le serveur de développement :

ng serve

Ouvrez http://localhost:4200 dans votre navigateur pour voir le projet.

Stratégie de gestion des branches
Création et poussée des branches
Pour maintenir l'ordre et la collaboration dans le développement, nous avons utilisé plusieurs branches pour gérer différents modules et dossiers de fonctionnalités. Par exemple :

Création et poussée de la branche add-consult :

git checkout -b add-consult
git add src/app/pages/consult
git commit -m "Add consult page"
git push origin add-consult

Création et poussée de la branche add-footer :

git checkout main
git checkout -b add-footer
git add src/app/pages/footer
git commit -m "Add footer page"
git push origin add-footer

Fusion des branches dans la branche principale
Une fois le développement et les tests des branches de fonctionnalités terminés, nous fusionnons ces branches dans la branche principale (main), garantissant ainsi que la branche principale contient toujours le code le plus récent et stable.

Utilisation de GitHub Actions pour l'intégration continue (CI)
Nous utilisons GitHub Actions pour automatiser le processus de construction, de test et de déploiement, garantissant la qualité du code et accélérant le flux de développement.

Configuration du workflow GitHub Actions
Créez un fichier main.yml dans le répertoire .github/workflows et configurez-le comme suit :

name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Run tests
        run: npm test

Déclenchement manuel du workflow
Accédez à la page du dépôt GitHub.
Cliquez sur l'onglet Actions.
Dans la liste des workflows à gauche, sélectionnez le workflow que vous avez configuré (par exemple CI).
Déclenchez manuellement le workflow en cliquant sur le bouton Run workflow, puis sélectionnez la branche à exécuter (par exemple main) et cliquez sur le bouton vert Run workflow.

Conclusion
Grâce à une gestion efficace des branches Git et à l'automatisation via GitHub Actions, nous avons mis en place un processus de développement et de déploiement efficace et fiable. La gestion des branches assure la coordination et la stabilité du développement, tandis que GitHub Actions garantit que chaque modification de code est automatiquement construite, testée et déployée, réduisant ainsi les erreurs humaines et augmentant l'efficacité globale du développement.
