$(document).ready(function() {
    $("#navheader").load("header.html");
});

$(document).ready(function() {
    $(function(){
    var current = location.pathname;
    $('li a').each(function(){
        var $this = $(this);
        // if the current path is like this link, make it active
        if($this.attr('href').indexOf(current) !== -1){
            $this.addClass('active');
        }
    })
});
});