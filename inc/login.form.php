<form method="POST" action="index.php">

	<fieldset>

		<label for="username">Benutzername:</label>
		<input type="text" name="username" id="username" />
		
		<label for="password">Passwort:</label>
		<input type="text" name="password" id="password" />
		
	</fieldset>

</form>

<script src="http://code.jquery.com/jquery-1.8.2.js"></script>
<script src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>

<script>
	$( 'form' ).dialog( {
		title: "Login-Daten",
		modal: true,
		resizable: false,
		draggable: false,
		closeOnEscape: false,
		buttons: {
			"Login": function() {
				$( 'form' ).submit();
			}
		}
	});
</script>
