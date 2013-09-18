<?php include( 'inc/header.php' ); ?>	

		<header>
			<h1><img src="dist/img/dashboard.png"> leDashboard</h1>
			<div class="menu">
				<button class="reload_all">reload all</button>
				<button class="add_feed">Add Feed</button>
				<button class="settings">Settings</button>
				<button class="logout">Logout <?php echo( $_SESSION[ 'full_name' ] ); ?></button>
			</div>
		</header>

		<section id="feeds"></section>

		<div id="dialog-confirm" title="Really delete the feed?" style="display:none;">
			<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>This items will be permanently deleted and cannot be recovered. Are you sure?</p>
		</div>

<?php include( 'inc/footer.php' ); ?>
