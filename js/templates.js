this["tpl"] = this["tpl"] || {};

this["tpl"]["feed.item"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul>\n\t<li>\n\t\t<i></i>\n\t\t<a href=""></a>\n\t\t<p class="description"></p>\n\n</ul>\n';
}
return __p;
};

this["tpl"]["feed.main"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="'+
( id )+
'" class="feed">\n\t<h2><a href="'+
( url )+
'" target="_blank">'+
( title )+
'</a></h2>\n</div>\n';
}
return __p;
};