<?php include( 'inc/header.php' ); ?>
	
	<form id="login" method="POST" action="index.php">

	<h1><img src="dist/img/dashboard.png"> leDashboard</h1>

	<fieldset>

		<label for="user_name">Benutzername:</label>
		<input type="text" name="user_name" id="user_name" />
		
		<label for="password">Passwort:</label>
		<input type="password" name="password" id="password" />

		<label><input name="permanent" id="permanent" type="checkbox"> Keep me logged in</label>

		<button>Login</button>

	</fieldset>

</form>

<script>
	// add background class to have some extra spice
	document.getElementsByTagName( 'body' )[0].setAttribute( 'class', 'background' );
</script>

<?php include( 'inc/footer.php' ); ?>
