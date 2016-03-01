/*

My Custom JS
============

Author:  Brad Hussey
Updated: August 2013
Notes:	 Hand coded for Udemy.com

*/
$(function() {
/*alert slide downs*/
    $('#alertMe1').click(function(e) {
        e.preventDefault();
        $('#successAlert1').slideDown();
    });

    $('#alertMe2').click(function(e) {
        e.preventDefault();
        $('#successAlert2').slideDown();
    });

    $('#alertMe3').click(function(e) {
        e.preventDefault();
        $('#successAlert3').slideDown();
    });
/*end alert*/

/*nav bar visible/transparent*/
    $(document).ready(function() {
        var scroll_start = 0;
        var startchange = $('#video');
        var offset = startchange.offset();
        scroll_start = $(this).scrollTop();
        if (scroll_start > offset.top) {
            $('#navbar-collapse-1').css('background', 'rgba(34,34,34,0.9)');
        } else {
            $('#navbar-collapse-1').css('background', 'transparent');
        }
        $(document).scroll(function() {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top) {
                $('#navbar-collapse-1').css('background', 'rgba(34,34,34,0.9)');
            } else {
                $('#navbar-collapse-1').css('background', 'transparent');
            }
        });
    });
/*end nav bar visible/transparent*/

/*hero element visible/not visible*/
    $(document).ready(function() {
        var scroll_start = 0;
        var startchange = $('#video');
        var offset = startchange.offset();
        scroll_start = $(this).scrollTop();
        if (scroll_start > (offset.top)) {
            $('#hero').css('display', 'none');
        } else {
            $('#hero').css('display', 'block');
        }
        $(document).scroll(function() {
            scroll_start = $(this).scrollTop();
            if (scroll_start > (offset.top)) {
                $('#hero').css('display', 'none');
            } else {
                $('#hero').css('display', 'block');
            }
        });
    });
/*end hero element visible/not visible*/
});
