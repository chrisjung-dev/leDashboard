<?php include( 'inc/header.php' ); ?>	

		<header>
			<h1><img src="style/img/dashboard.png"> leDashboard</h1>
			<div class="menu">
				<button class="reload_all">reload all</button>
				<button class="add_feed">Add Feed</button>
				<button class="settings">Settings</button>
				<button class="logout">Logout <?php echo( $_SESSION[ 'full_name' ] ); ?></button>
			</div>
		</header>

		<section id="feeds"></section>

		<div id="new-feed-form" title="Add new feed" style="display:none;">
			<p class="validateTips">All form fields are required.</p>

			<form>
				<fieldset>
					<label for="id">ID</label>
					<input type="text" name="id" id="id" class="text ui-widget-content ui-corner-all" />
					<label for="site_title">Site title</label>
					<input type="text" name="site_title" id="site_title" value="" class="text ui-widget-content ui-corner-all" />
					<label for="feed_url">Feed URL</label>
					<input type="text" name="feed_url" id="feed_url" value="" class="text ui-widget-content ui-corner-all" />
					<label for="site_url">Site URL</label>
					<input type="text" name="site_url" id="site_url" value="" class="text ui-widget-content ui-corner-all" />
					<label for="entries">Number of entries</label>
					<input type="number" name="entries" id="entries" value="" class="text ui-widget-content ui-corner-all" />
				</fieldset>
			</form>
		</div>

		<div id="settings-form" title="Settings" style="display:none;">
			<p class="validateTips">All form fields are required.</p>

			<form>
				<fieldset>

					<label for="columns">Columns</label>
					<input type="number" min="2" max="5" name="columns" id="columns" class="text ui-widget-content ui-corner-all" />

					<label for="background_url">Background image URL</label>
					<input type="text" name="background_url" id="background_url" value="" class="text ui-widget-content ui-corner-all" />
				
					<label for="reload_time">Reload time</label>
					<p>Minutes to reload the feeds</p>
					<input type="number" name="reload_time" id="reload_time" value="" class="text ui-widget-content ui-corner-all" />
					
				</fieldset>
			</form>
		</div>
		<div id="dialog-confirm" title="Really delete the feed?" style="display:none;">
			<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>This items will be permanently deleted and cannot be recovered. Are you sure?</p>
		</div>

<?php include( 'inc/footer.php' ); ?>
