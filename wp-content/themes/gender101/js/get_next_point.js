/**
 * Created by hunter on 5/13/16.
 */
var $ = jQuery.noConflict();



$(document).ready(function(){

    //the option that corresponds to the currently selected point
    window.clickedOption = 0;
    // the immediate parent of the currently selected point ?
    window.parentPoint ={};
   // window.optionTree = Cookies.get('optionTree') ? Cookies.get('optionTree') : {};
    var slidingPoints = $('.point').sQarosel({slideClass:".point"});


    //click an option
    $('body').on('click', 'ul.optionSet > li', function(e){
        e.preventDefault();
        var destID = false;
        var curPoint = $(this).closest('section.point');
        var oldSelected = curPoint.children('.children').children('.holder').children('.selected').first();
        var curOpt = $(this);
        var sibOpts = $(this).siblings();
        var destHref = $(this).children('a.jumpTrigger').attr('href');


        window.clickedOption = $(this).attr('opt-id');

        window.parentPoint = $(this).closest('.point');

        if($(document).find( $(destHref) ).length == 0){
            try{
                // Find the id of the point the option is leading to
                destID = parseInt($(this).children('a.jumpTrigger').attr('href').replace('#p', ''));
            }
            catch(e){
                console.log('lmao what the heck was that');
            }
            if(destID){
                ajax_get_point(destID, curPoint, curOpt, sibOpts, oldSelected);
            }
        }else{
            console.log('point is already on the page');

            //if destination is an ancestor or a descendant, just jump to it
            if((curPoint.parents(destHref).length > 0)  || (curPoint.children('.children').children('.holder').children(destHref).length > 0)){

                if(curPoint.parents(destHref).length > 0){
                    window.parentPoint = $(document).find( $(destHref) );
                }
                if(oldSelected.length > 0){
                    animateTransition(oldSelected, $(destHref));
                }
                //
                //jumpSelect($(dest));


            }else{

                //if the selected point exists, but isn't your child or ancestor, steal it
                $(destHref).removeClass('leftPoint rightPoint');
                var stolenPoint = $(destHref).clone();
                $(destHref).remove();
                window.parentPoint = curPoint;

                placePoint(stolenPoint);

                //animateTransition($(destHref));
            }

        }

    });

    function ajax_get_point(destID, curPoint, curOpt, sibOpts, oldSelected){


        var data = {
            'action': 'get_next_point',
            'destID' : destID
        };
        // Get the selected point & put it in the 'children' area of the parent point
        jQuery.post(ajax_object.ajax_url, data, function(response) {

            var newPoint = placePoint(response);

            if(oldSelected.length > 0){
                animateTransition(oldSelected, newPoint);
            }

            //curPoint.children('.children').first().append();
            //sibOpts.removeClass('selected');
            //curOpt.addClass('selected');

        });

    }

    animateTransition = function(oldPoint, newPoint){
        
        

       /* var slideRight = false;

        var newID = $(newPoint).attr('id');
        console.log('animate transition to '+newID);

        var pointSiblingsWrapper = window.parentPoint.children('.children').children('.holder');

        var oldSelected = pointSiblingsWrapper.children('.selected').first();
        var pointsToAnimate = [];
        var ptOffset = $(document).find('#'+newID).offset().top;
        //grab the currently selected point, the previously selected point, and everything in between them
        var firstSelected = false;

        if(!newPoint.hasClass('selected')){
console.log('give new point "selected" class');
            $(newPoint).hide();
            $(newPoint).addClass('selected');
        }
        firstSelected = pointSiblingsWrapper.children('.selected').first();

        if (firstSelected.length > 0){

            if(firstSelected.attr('id') == newID ){
                slideRight = true;
            }

            //collect old point, new point, and any points between for animation
            pointsToAnimate.push(firstSelected);
            if(firstSelected.nextAll('.selected').length > 0){
                if(firstSelected.nextUntil('.selected').length > 0){
                    pointsToAnimate.push(firstSelected.nextUntil('.selected'));
                }
                pointsToAnimate.push(firstSelected.nextAll('.selected').first());
            }

            if(pointsToAnimate.length > 1){

                //$.mobile.changePage(oldSelected, {transition:"slide"});
               // horizSlide(pointsToAnimate, slideRight);
            }else{
                $('html,body').animate({
                    scrollTop: ptOffset
                },600);
            }


        }*/
        console.log("animate transition");
        //var pointSiblingsWrapper = window.parentPoint.children('.children').children('.holder');
       // var oldSelected = pointSiblingsWrapper.children('.selected').first();
        slidingPoints.autoSlide(oldPoint, newPoint);
        //slidingPoints.start();


        //scroll to the newly-placed point

    };



    findSib = function(currentOpt, direction){
        var foundSib = false;

        //var destLink = $(currentOpt).children('a.optionLink').first().attr('href').split('pt_id=');
        //var destLink = $(currentOpt).children('a.optionLink').first().attr('href').split('pt_id=');
        //var optDest =  destLink[destLink.length - 1] ;
        var optDest = $(currentOpt).children('a.jumpTrigger').first().attr('href');
       // var destPoint = window.parentPoint.children('.children').children('.holder').children('#p'+optDest);
        var destPoint = window.parentPoint.children('.children').children('.holder').children(optDest);
        if(destPoint.length > 0){
            foundSib = destPoint;
            return destPoint;
        } else{
            if ((currentOpt.prev().length > 0 )&&(direction == 'prev')){
                foundSib = findSib(currentOpt.prev(), direction);
            }
            else if ((currentOpt.next().length > 0 )&&(direction == 'next')){
                foundSib = findSib(currentOpt.next(), direction);
            }
            else{
                return false;
            }

        }
        return foundSib;
    };

    pokeLeftSib = function(curLi, newPoint){
        var added = false;
        // & if the sibling is on the table, place the new point after
        prevSib = findSib(curLi.prev(), 'prev');
        if(prevSib.length > 0){

            added = true;

            $(prevSib).after(newPoint);
            //$(prevSib).addClass('leftPoint');

        }
        return added;
    };

    pokeRightSib = function(added, curLi, newPoint){
        nextSib = findSib(curLi.next(), 'next');
        if($(nextSib).length > 0){
            if(!added){
                // check if it has a sibling on the table & place it before
                $(newPoint).hide();
                $(nextSib).before(newPoint);

                added = true;
            }
            $(nextSib).addClass('rightPoint');
        }
        return added;
    };

    placePoint = function (newPoint){
        console.log('placepoint');
        var hasBeenAdded = false;
        var placedPoint = false;
        var navClasses ='';
        var pointSiblingsWrapper = window.parentPoint.children('.children').children('.holder');

        // unless it's an only child, we don't want to see it until it's time to animate
        if(pointSiblingsWrapper.children('.point').length > 0){
            //newPoint.removeClass('selected');
           newPoint = newPoint.replace('selected', '');
        }

        //check if the clicked option has left or right siblings
        var curLi = $(document).find('li[opt-id='+ window.clickedOption +']');

        curLi.siblings().removeClass('selected');
        //newPoint.removeClass('selected');
        //does it have a left sibling?
        if(curLi.prev().length > 0 ){
            console.log('clicked option has left sib');
            //give it a < arrow
            navClasses += ' hasLeftSib';
            hasBeenAdded = pokeLeftSib(curLi, newPoint);
        }

        //does it have a right sibling?
        if(curLi.next().length > 0 ){
            console.log('clicked option has right sib');
            //if so, give it a > arrow
            navClasses += ' hasRightSib';
            hasBeenAdded = pokeRightSib(hasBeenAdded, curLi, newPoint);
        }
        //if it hasn't been placed by now, just plonk it in there
        if(!hasBeenAdded){
            pointSiblingsWrapper.append(newPoint);
            console.log('just add the point');
        }
        placedPoint = $(document).find('#'+$(newPoint).attr('id')).first();
        placedPoint.addClass(navClasses);
        //return newly placed point
        //update parent slider
        slidingPoints.update();

        return placedPoint;

    };
});