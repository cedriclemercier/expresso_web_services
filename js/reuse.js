$(document).ready(function() {
    $("#navheader").load("header.html");
});

$(document).ready(function() {
    $(function() {
    var current = location.pathname;
    $('ul li a').each(function() {
        var $this = $(this); 

        // we check comparison between current page and attribute redirection.
        if ($this.attr('href') === current) {
            $this.addClass('active');
        }
    });
});
});