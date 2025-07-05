# Formulaire de Contact - Configuration et Utilisation

## 🎯 Fonctionnalités

Le formulaire de contact a été rendu entièrement fonctionnel avec les fonctionnalités suivantes :

- ✅ **Validation en temps réel** des champs email et message
- ✅ **Messages d'erreur** clairs et en français
- ✅ **Envoi d'email** automatique vers esteban.h0207@gmail.com
- ✅ **Interface utilisateur** moderne avec états de chargement
- ✅ **Sécurité** avec variables d'environnement
- ✅ **Responsive design** pour mobile et desktop

## 🚀 Installation et Configuration

### 1. Dépendances installées
```bash
npm install @emailjs/browser
```

### 2. Configuration EmailJS

#### Étape 1 : Créer un compte EmailJS
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Créez un compte gratuit
- Connectez-vous à votre tableau de bord

#### Étape 2 : Configurer un service email
- Dans le tableau de bord → "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur (Gmail recommandé)
- Suivez les instructions de connexion

#### Étape 3 : Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

```
Nouveau message de contact

De: {{from_email}}
Message: {{message}}

Vous pouvez répondre directement à cet email.
```

#### Étape 4 : Récupérer vos clés
- **Service ID**: Dans "Email Services" après création du service
- **Template ID**: Dans "Email Templates" après création du template  
- **Public Key**: Dans "Account" → "API Keys"

### 3. Mise à jour des clés

Modifiez le fichier `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'VOTRE_SERVICE_ID_ICI',
    templateId: 'VOTRE_TEMPLATE_ID_ICI',
    publicKey: 'VOTRE_PUBLIC_KEY_ICI'
  }
};
```

Faites de même pour `src/environments/environment.prod.ts` pour la production.

## 🎨 Fonctionnalités du Formulaire

### Validation
- **Email** : Format valide requis
- **Message** : Minimum 10 caractères requis
- **Validation en temps réel** avec feedback visuel

### Interface Utilisateur
- **États de chargement** : Bouton désactivé pendant l'envoi
- **Messages de confirmation** : Succès ou erreur
- **Styles d'erreur** : Bordures rouges pour les champs invalides
- **Responsive** : Adapté mobile et desktop

### Sécurité
- **Variables d'environnement** : Clés API sécurisées
- **Validation côté client** : Prévention des soumissions invalides
- **Gestion d'erreurs** : Messages d'erreur appropriés

## 🧪 Test du Formulaire

1. **Lancez l'application** : `ng serve`
2. **Remplissez le formulaire** avec des données valides
3. **Vérifiez la validation** en entrant des données invalides
4. **Testez l'envoi** avec des données valides
5. **Vérifiez votre email** esteban.h0207@gmail.com

## 📧 Format des Emails Reçus

Les emails reçus contiendront :
- **Expéditeur** : L'email saisi dans le formulaire
- **Destinataire** : esteban.h0207@gmail.com
- **Contenu** : Le message saisi par l'utilisateur
- **Possibilité de réponse** : Vous pouvez répondre directement

## 🔧 Personnalisation

### Modifier l'email de destination
Dans `src/app/contact-form/contact-form.component.ts`, ligne 32 :
```typescript
to_email: 'esteban.h0207@gmail.com', // Changez cette adresse
```

### Modifier les messages
Les messages sont en français et peuvent être modifiés dans le composant TypeScript.

### Modifier le style
Le CSS est dans `src/app/contact-form/contact-form.component.css` et peut être personnalisé.

## 🚨 Dépannage

### Erreur "Service not found"
- Vérifiez que votre Service ID est correct
- Assurez-vous que le service est bien configuré dans EmailJS

### Erreur "Template not found"  
- Vérifiez que votre Template ID est correct
- Assurez-vous que le template utilise les variables {{from_email}} et {{message}}

### Erreur "Invalid public key"
- Vérifiez que votre Public Key est correct
- Assurez-vous qu'elle est bien copiée depuis EmailJS

### Formulaire ne s'envoie pas
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que toutes les clés sont configurées
- Testez avec un email valide et un message de plus de 10 caractères

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile (iOS, Android)
- ✅ Tablettes
- ✅ Desktop

Le formulaire est maintenant entièrement fonctionnel et prêt à recevoir des messages de contact ! 🎉 