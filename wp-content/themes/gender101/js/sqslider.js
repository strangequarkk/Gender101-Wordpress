(function ( $ ) {
 
    $.fn.sQarosel = function( options ) {
 		var q = this;
		 if (q.length > 1){
		        q.each(function() { 
		        	$(this).sQarosel(options); });
		        return q;
		    }
 
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            slideClass: '.slide'
          
          
        }, options );
        
        
        
        
        var carosel = {
			
			    el: {
			      slider: $(q).children('.children').first(), //the outermost element that will contain the slider
			      holder: $(q).children('.children').children(".holder"), // the slide holder- it slides back and forth to display different slides
			      slideSet: $(q).children('.children').children(".holder").children(settings.slideClass),
			      selected: undefined
			    },
			
			    slideWidth: $(q).width(),
			    slideCount: undefined,
			    touchstartx: undefined,
			    touchmovex: undefined,
			    movex: undefined,
			    index: 0,
			    longTouch: undefined,
			    descendentClicked: false,
			    
			    init: function() {
			      this.el.slider= $(document).find(q).children('.children').first();
			      this.el.holder = this.el.slider.children('.holder');
			      this.el.slideSet = this.el.holder.children(settings.slideClass);
			      this.slideCount = this.el.slideSet.length;
			      if(this.el.holder.children('.selected').length > 0){
			      	this.el.selected = this.el.holder.children('.selected').first();
			      }else{
			      	this.el.selected = this.el.slideSet.first();
			      	this.el.selected.addClass('selected');
			      }

			      this.el.holder.width((this.slideCount * 100)+ '%');
			      this.el.slideSet.width((100 / this.slideCount)+'%');
			      this.bindUIEvents();
			      
			      
			    },
			
			    bindUIEvents: function() {
			
			      this.el.holder.on("touchstart", function(event) {
			      	//if you're acting on a descendent slider, don't do anything
			      	//aka if the event.target is a descendent of one of your slides
			      		if(($(carosel.el.selected).children('.children').length > 0) && ($(carosel.el.selected).children('.children').find(event.target).length > 0)){
			      			carosel.descendentClicked = true;
			      		}
			      		
			      	//console.log(carosel.descendentClicked);
			      	
			      	if(!carosel.descendentClicked){
			      		carosel.start(event);
			      	}
			      	
			        
			      });
			
			      this.el.holder.on("touchmove", function(event) {
			      	
			      	if(!carosel.descendentClicked){
			      		carosel.move(event);	
			      	}
			        
			      });
			
			      this.el.holder.on("touchend", function(event) {
			      	if(!carosel.descendentClicked){
			      		carosel.end(event);
			      	}else{
			      		carosel.descendentClicked = false;
			      	}
			        
			      });
			
			    },
			   
			    start: function(event) {
			      // Test for flick.
			      //Todo: differentiate flick from click
			      this.longTouch = false;
			      setTimeout(function() {
			        this.longTouch = true;
			      }, 250);
			
			      // Get the original touch position.
			      this.touchstartx =  event.originalEvent.touches[0].pageX;
			
			      // The movement gets all janky if there's a transition on the elements.
			      this.el.slideSet.addClass('selected');
			      $('.animate').removeClass('animate');
			    },
			
			    move: function(event) {
			      // Continuously return touch position.
			      this.touchmovex =  event.originalEvent.touches[0].pageX;
			      // Calculate distance to translate holder.
			      this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
			      // Defines the speed the images should move at.
			      var panx = 100-this.movex/6;
			      if (this.movex < this.slideWidth * this.slideCount ) { // Makes the holder stop moving when there is no more content.
			        this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
			      }
			      if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
			        this.el.slideSet.css('transform','translate3d(-' + panx + 'px,0,0)');
			      }
			    },
			
			    end: function(event) {
			      // Calculate the distance swiped.
			      var absMove = Math.abs(this.index*this.slideWidth - this.movex);
			      // Calculate the index. All other calculations are based on the index.
			      if (absMove > this.slideWidth/(this.slideCount-1) || this.longTouch === false) {
			        if (this.movex > this.index*this.slideWidth && this.index < (this.slideCount-1)) {
			          this.index++;
			        } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
			          this.index--;
			        }
			      }    
			      
			      
			      var endHolderX = - this.index*this.slideWidth;
			      
			      // Move and animate the elements.
			      this.el.slideSet.addClass('animate').css('transform', 'translate3d('+ 0 +'px,0,0)');
			      this.el.holder.addClass('animate').css('transform', 'translate3d(' + endHolderX + 'px,0,0)');
			      
			      var beSlow = window.setTimeout(function(){
			      	carosel.el.selected = carosel.el.holder.children(settings.slideClass+':nth-child('+(carosel.index+1)+')').first();
			      	carosel.el.selected.siblings().removeClass('selected');
			      	//console.log('index: '+ carosel.index);
			      	//console.log(carosel.el.selected);
			      }, 300);
			
			    },
			    
			    resize: function(){
			    	this.slideWidth = $(q).width();
			    },
			    
			    update: function(){
			    	carosel.init();
			    	var newDescendents = this.el.selected.find(settings.slideClass);
			    	if(newDescendents.length > 0){
			    		newDescendents.sQarosel(settings);
			    	}
			    },
			    autoSlide: function(startPoint, endPoint){
                    // Slide between two elements without a manual slide event

                    //prep for animation
                    this.el.slideSet.addClass('selected');
                    $('.animate').removeClass('animate');
                    this.el.selected = endPoint;
                    var slideTo = startPoint.position().left - endPoint.position().left;
                    console.log('from '+startPoint.attr("id")+' to '+endPoint.attr("id"));
                    console.log('startPoint position: '+startPoint.position().left+' endpoint position: '+endPoint.position().left+' holder position: '+this.el.holder.position().left);
                    console.log('slideTo: '+ slideTo);

                    this.el.slideSet.addClass('animate').css('transform', 'translate3d('+ 0 +'px,0,0)');
                    this.el.holder.addClass('animate').css('transform', 'translate3d(' + slideTo + 'px,0,0)');

                    var beSlow = window.setTimeout(function(){
                        carosel.el.selected = carosel.el.holder.children(settings.slideClass+':nth-child('+(carosel.index+1)+')').first();
                        carosel.el.selected.siblings().removeClass('selected');
                       // console.log('index: '+ carosel.index);
                       // console.log(carosel.el.selected);
                    }, 300);



				}
			    
			
			  };
        
        
 
       q.initialize = function(){
       		//console.log('ok initialize q');
       		//console.log(q);
        	carosel.init();
        	return q;
        };
        
        q.resize = function(){
        	carosel.resize();
        };
        
        q.update = function(){
        	
        	carosel.update();
        };

        q.autoSlide = function(oldSlide, newSlide){
            carosel.autoSlide(oldSlide, newSlide);
        }
        
       return q.initialize();
 
    };
 
}( jQuery ));