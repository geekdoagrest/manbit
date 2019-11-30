# How to use auth in Firebase
User Authentication with Firebase Auth

Firebase workers are probably living a dream, after all, we have an infrastructure that easily gives you all the services you need to run a live web application. For those who do not know it, I will describe in a short series of articles some of its features.

The starting point of almost every application is authentication. Within Firebase, we have this feature in the Authentication tab. There you can make all controls simple and intuitive so I will not go into the details of the administrative area and go straight to the codes.

Taking as your starting point you already know Firebase and understand a bit of JavaScript, it starts by stating it in the tag or application:

```javascript
<script src="https://www.gstatic.com/firebasejs/4.6.1/firebase.js"></script>
Após essa declaração, basta iniciarmos a aplicação com as chaves geradas no Firebase. Isso é super simples e bem documentado por isso não entrarei em detalhes:
```

Allright. Now you already have Firebase in your application;)

To improve your understanding, have all the code ready here: https://jsfiddle.net/tm0jx4hp/28/

We start by getting the status of auth, whether it is logged in or not. To do so, just include the code below in the desired place. The onAuthStateChanged event is fired whenever there is a change in auth status, it can be anywhere in the code:

```javascript
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //online
    console.log( user );
  } else {
    //offline
  }
});
```

As we already have the status, we now need to login. There are several ways to do this: through Google, Facebook, phone number, etc. In this example we will use email and password (which is the simplest way). At the login page you will use the code below (probably in the onclick button of some form):

```javascript
firebase.auth().signInWithEmailAndPassword(‘email@dominio.com.br’, ‘senha’)
.catch(function(error) {
  console.error( error );
});
```
Logging out is as simple as that:

```javascript
  firebase.auth().signOut()
  .then(function() {
    console.log('Logout');
  }, function(error) {
    console.error( error );
  });
```

Needing to change password, use updatePassword:

```javascript
firebase.auth().currentUser.updatePassword(pass1)
.then(function() {
	////Senha alterada!
})
.catch(function(error) {
	console.error(error);
});
```
  
To add new user:

```javascript
firebase.auth().createUserWithEmailAndPassword('email@email.com.br', "123pass").catch(function(error) {
  console.error(error);
});
```

To exclude logged user:

```javascript
var user = firebase.auth().currentUser;

user.delete().then(function() {
  // User deleted.
}).catch(function(error) {
  // An error happened.
});
```

Firebase is designed to be simple and deliver as much as possible with minimal code. In this article we can see how with a few lines we can implement features that in another structure would be much more complicated. In the next article we will look at other auth methods.

More details in the official Firebase documentation: https://firebase.google.com/docs/auth/web/start?authuser=0

If you have any questions, just leave it here in the comments :)