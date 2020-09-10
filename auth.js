var user = null;

function showContent() {
	document.getElementById("content").style.display = 'block';
}

function hideContent() {
	document.getElementById("content").style.display = 'none';
}

function onLogin() {
	console.log('login', user);
	showContent();
}

function onLogout() {
	console.log('Logged out');
	hideContent();
	netlifyIdentity.open();
}

function onNetlifyLoad() {
	console.log('----- onNetlifyLoad')
	user = netlifyIdentity.currentUser();
	// Bind to events
	netlifyIdentity.on('init', user => console.log('init', user));
	netlifyIdentity.on('login', onLogin);
	netlifyIdentity.on('logout', onLogout);
	netlifyIdentity.on('error', err => console.error('Error', err));
	netlifyIdentity.on('open', () => console.log('Widget opened'));
	netlifyIdentity.on('close', () => console.log('Widget closed'));
	if(!user) {
		netlifyIdentity.open();
	} else {
		console.log('----- User')
		console.log(user);
		document.getElementById('login').textContent = "Fazer LOGOUT!"
		showContent();
	}
}
function initBasicAuth() {
	var script = document.createElement('script');
	script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
	script.async = false
	script.onload = onNetlifyLoad;
	document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function() {
	initBasicAuth();

	if(document.getElementById('login')) {
		document.getElementById('login').addEventListener('click', function() {
		netlifyIdentity.open();
		})
	}
});