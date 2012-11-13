<form id="login" method="POST" action="index.php">

	<h1><img src="style/img/dashboard.png"> leDashboard</h1>

	<fieldset>

		<label for="user_name">Benutzername:</label>
		<input type="text" name="user_name" id="user_name" />
		
		<label for="password">Passwort:</label>
		<input type="password" name="password" id="password" />

		<label><input name="permanent" id="permanent" type="checkbox"> Keep me logged in</label>

		<button>Login</button>

	</fieldset>

</form>
<footer>
	<p>2012, <a href="http://campino2k.de">Christian Jung</a> | Fork me on <a href="http://github.com/campino2k/leDashboard">Github</a> | Dashboard Icon <a href="http://creativecommons.org/licenses/by/3.0/">CC-BY</a> from <a href="http://www.doublejdesign.co.uk/products-page/icons/super-mono-icons/">Double-J Design's "Super Mono" Iconset</a> | Picture <a href="http://creativecommons.org/licenses/by/3.0/">CC-BY</a> by <a href="http://www.flickr.com/photos/khouri/5622794373/">Michael Cory on Flickr</a></p>
</footer>

<script>
	// add background class to have some extra spice
	document.getElementsByTagName( 'body' )[0].setAttribute( 'class', 'background' );
</script>