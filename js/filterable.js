/* 
 *   Filterable JQuery plugin
 *   Makes the selected input element a filter content on the page for view.
 */
 
 (function($) {
 
    $.fn.filterable = function(options) {

        // Default options
        var settings = $.extend({
            selector: 'p',
            fade 	: false,
            complete: null
        }, options);
        
        // Method to switch between fading vs regular show in jquery. 
        // Accepts a) element:  the jquery element b) action: on - for showing; off - for hiding 
		var fade = function(element, action){
			if(action == 'on' ){
				if(settings.fade){
					element.fadeIn();
				} else {
					element.show(); 
				}			
			}
			if(action == 'off'){
				if(settings.fade){
					element.fadeOut();
				} else {
					element.hide(); 
				}				
			}

		}
        
        // the main method that filters content. It's returned so jquery can keep chaining.  
	 	return this.keyup(function() {
			var text = $(this).val();
			text = text.toLowerCase();
			if (text.length > 0) {
				$(settings.selector).each(function() {
					var content = $(this).text();
					content = content.toLowerCase();
					var exists = content.indexOf(text);
					if (exists != -1) {
						fade($(this), 'on'); 						
					} else {
						fade($(this), 'off'); 
					}
				});
				if($('.reset').length  == 0 ) {
					$(this).after('<span> <button class="reset">Reset</button></span>'); 			
				}	

			} else {	
				fade($(settings.selector), 'on'); 				
				if($('.reset').length  >  0 ) {
					$('.reset').remove();  			
				}
			}
			
			// Return a function if defined
		    if ( $.isFunction( settings.complete ) ) {
				 settings.complete.call( this );
			}
		});            
    }

}(jQuery));

(function($) {
 
    $.fn.filterTags = function(options) {

        // Default options
        var settings = $.extend({
            tags: [],
            fade 	: false,
            complete: null
        }, options);
        
        // Method to switch between fading vs regular show in jquery. 
        // Accepts a) element:  the jquery element b) action: on - for showing; off - for hiding 
		var fade = function(element, action){
			if(action == 'on' ){
				if(settings.fade){
					element.fadeIn();
				} else {
					element.show(); 
				}			
			}
			if(action == 'off'){
				if(settings.fade){
					element.fadeOut();
				} else {
					element.hide(); 
				}				
			}

		}
        var loadTags = function(element){
	        if(settings.tags.length > 1){
		        var i, m; 
		        for(i; i < settings.tags.length; i++){
			        m = settings.tags[i]; 
		        } 
	        } else {
		        
	        }
        } 
        
        // the main method that filters content. It's returned so jquery can keep chaining.  
	 	return this.each(function() {
			
			
			var text = $(this).val();
			text = text.toLowerCase();
			if (text.length > 0) {
				$(settings.selector).each(function() {
					var content = $(this).text();
					content = content.toLowerCase();
					var exists = content.indexOf(text);
					if (exists != -1) {
						fade($(this), 'on'); 						
					} else {
						fade($(this), 'off'); 
					}
				});
				if($('.reset').length  == 0 ) {
					$(this).after('<span> <button class="reset">Reset</button></span>'); 			
				}	

			} else {	
				fade($(settings.selector), 'on'); 				
				if($('.reset').length  >  0 ) {
					$('.reset').remove();  			
				}
			}
			
			// Return a function if defined
		    if ( $.isFunction( settings.complete ) ) {
				 settings.complete.call( this );
			}
		});            
    }

}(jQuery));