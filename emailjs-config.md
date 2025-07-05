# Configuration EmailJS pour le formulaire de contact

## Étapes de configuration

### 1. Créer un compte EmailJS
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Créez un compte gratuit
- Connectez-vous à votre tableau de bord

### 2. Configurer un service email
- Dans le tableau de bord, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
- Suivez les instructions pour connecter votre compte email

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

```
Nouveau message de contact

De: {{from_email}}
Message: {{message}}

Vous pouvez répondre directement à cet email.
```

### 4. Récupérer vos clés
- **Service ID**: Trouvé dans "Email Services" après avoir créé votre service
- **Template ID**: Trouvé dans "Email Templates" après avoir créé votre template
- **Public Key**: Trouvé dans "Account" > "API Keys"

### 5. Mettre à jour le code
Remplacez dans `src/app/contact-form/contact-form.component.ts` :

```typescript
// Remplacez ces valeurs par vos vraies clés
'YOUR_SERVICE_ID', // Votre Service ID
'YOUR_TEMPLATE_ID', // Votre Template ID  
'YOUR_PUBLIC_KEY' // Votre Public Key
```

### 6. Configuration alternative avec variables d'environnement
Pour plus de sécurité, créez un fichier `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
  }
};
```

Puis mettez à jour le composant pour utiliser ces variables d'environnement.

## Test du formulaire
Une fois configuré, le formulaire :
- Valide l'email et le message
- Affiche des messages d'erreur en temps réel
- Envoie l'email à esteban.h0207@gmail.com
- Affiche un message de confirmation
- Se réinitialise après envoi réussi 