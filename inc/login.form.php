<form method="POST" action="index.php">

	<fieldset>

		<label for="username">Benutzername:</label>
		<input type="text" name="username" id="username" />
		
		<label for="password">Passwort:</label>
		<input type="text" name="password" id="password" />
		
	</fieldset>

</form>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>

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
