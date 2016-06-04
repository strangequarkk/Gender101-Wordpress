/**
 * Created by hunter on 5/13/16.
 */
var $ = jQuery.noConflict();
$(document).ready(function(){
    //click an option
    $('body').on('click', 'ul.optionSet > li', function(e){
        e.preventDefault();
        var destID = false;
        var parentPoint = $(this).closest('section.point');
        var curOpt = $(this);
        var sibOpts = $(this).siblings();
        try{
            // Find the id of the point the option is leading to
            destID = parseInt($(this).children('a.jumpTrigger').attr('href').replace('#p', ''));
        }
        catch(e){
            console.log('lmao what the heck was that');
        }
        if(destID){


            var data = {
                'action': 'get_next_point',
                'destID' : destID
            };
            // Get the selected point & put it in the 'children' area of the parent point
            jQuery.post(ajax_object.ajax_url, data, function(response) {
                parentPoint.children('.children').first().append(response);
                sibOpts.removeClass('selected');
                curOpt.addClass('selected');

            });
        }

    });

});