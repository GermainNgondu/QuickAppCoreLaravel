# QuickAppCore Laravel 🚀

QuickAppCore est un framework d'application modulaire bâti sur Laravel, conçu pour la rapidité de développement, la maintenabilité et la robustesse. Il utilise une architecture de **Domaines** et de **Features** avec une injection dynamique de composants React (Islands Architecture).

---

## 🏗️ Architecture du Noyau (Core)

Le projet est structuré pour séparer le code infrastructurel de la logique métier :

* **Core/Infrastructure** : Gestion globale (Providers, Console, Database).
* **Core/Domains** : Modules fondamentaux de l'application (Admin, Users, Media).
* **Features** : Fonctionnalités optionnelles ou plugins activables via `module.json`.

### 🛠️ Système de Découverte (Module Discovery)
Le framework scanne automatiquement les domaines et les fonctionnalités pour enregistrer les ServiceProviders, les routes, les migrations et les ressources UI.
* **Production** : Utilisez `php artisan core:cache` pour générer un manifeste statique ultra-rapide.
* **Développement** : Le scan est dynamique pour refléter vos changements instantanément.

---

## ⚡ Développement Backend

### 🔄 Actions & Traçabilité
Toute la logique métier doit être encapsulée dans des **Actions** héritant de `BaseAction`.
* **Transactions** : Utilisez `runTransactional()` pour garantir l'intégrité des données.
* **Audit Trail** : Utilisez `runLogged($description, ...$args)` pour enregistrer automatiquement l'activité via Spatie ActivityLog.

### 📦 Ressources UI (`BaseResource`)
Les ressources définissent comment vos données sont gérées et affichées :
* **Sécurité** : Définissez un `permissionPrefix()` pour automatiser les droits d'accès.
* **Validation** : Validation stricte via `dataClass()` (Spatie Laravel Data).
* **Actions** : Ajoutez des boutons personnalisés via la méthode `actions()`.

---

## ⚛️ Frontend : React Islands

QuickAppCore utilise une **Architecture en Îlots** pour intégrer React dans Blade sans la lourdeur d'une SPA complète.

* **Rendu** : Utilisez l'attribut `data-react-component="Namespace::Chemin/Composant"` dans vos vues Blade pour monter un composant.
* **Résilience** : Chaque composant est isolé par un `ErrorBoundary`. Si un widget plante, le reste de la page reste interactif.
* **i18n** : Système de traduction partagé entre PHP et React avec mise en cache locale.

---

## 🚀 Commandes Utiles

| Commande | Description |
| :--- | :--- |
| `php artisan core:make-feature {Name}` | Génère la structure complète d'une feature. |
| `php artisan core:cache` | Génère le manifeste de cache des modules (Recommandé en Prod). |
| `php artisan setup` | Installation complète (Migrations, Clés, NPM). |
| `npm run dev` | Lance Vite pour la compilation des assets React. |

---

## 🧪 Maintenance & Tests

Le projet utilise **Pest PHP** pour les tests.
* Chaque nouvelle ressource doit être testée avec le trait `InteractsWithResources` pour valider sa structure.
* Exécutez `php artisan test` pour lancer la suite complète.

---

## 📄 Licence

Ce framework est un logiciel open-source sous licence [MIT](https://opensource.org/licenses/MIT).