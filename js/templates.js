var feed = {};

/**
 *	feed template
 */

feed.templates.main = _.template( '<div id="<%= _self.id %>" class="feed"><h2><a href="<% url %>" target="_blank"><% title %></a></h2></div>' );

/**
 *	feed item template
 */

feed.templates.item = _.template()
