/**
 * jQuery-Plugin "addAnother"
 * 
 * based on relCopy by Andres Vidal <code@andresvidal.com>
 * 
 * @version: 0.9
 * 
 * @author: Jeremy Lindblom
 *          jeremy@synapsestudios.com
 *          http://webdevilaz.com
 */
(function($) {

	// Global counter for addAnother
	var addAnotherCounters = {};

	$.fn.addAnother = function(options) {
		
		var settings = jQuery.extend({
			selector: false,
			excludeSelector: ".exclude",
			emptySelector: ".empty",
			copyClass: false,
			append: '',
			clearInputs: true,
			limit: 0, // 0 = unlimited
			onFull: false,
			onNotFull: false,
			onRemove: false,
			animate: false,
			removeClass: false
		}, options);
		
		if (!settings.selector || !settings.copyClass){
			return this;
		}
		
		settings.limit = parseInt(settings.limit);
		
		$(settings.selector).find('input, textarea, select').each(function(){
			$(this).attr('name', $(this).attr('name')+'[]');
		});
		
		// Loop each element
		this.each(function() {
			
			// Set click action
			$(this).click(function(){
				var rel = settings.selector;
				if (addAnotherCounters[rel] == undefined){
					addAnotherCounters[rel] = 1;
				}
				
				// Stop at limit
				if (settings.limit != 0 && $(rel).length >= settings.limit){
					return false;
				};
				
				var counter = addAnotherCounters[rel]++;
				var master = $(rel+":first");
				var parent = $(master).parent();
				var clone = $(master).clone(true).addClass(settings.copyClass+counter).append(settings.append);
				
				// Remove Elements with excludeSelector
				if (settings.excludeSelector){
					$(clone).find(settings.excludeSelector).remove();
				};
				
				// Empty Elements with emptySelector
				if (settings.emptySelector){
					$(clone).find(settings.emptySelector).empty();
				};								
				
				// Increment Clone IDs
				if ( $(clone).attr('id') ){
					var newid = $(clone).attr('id') + (counter +1);
					$(clone).attr('id', newid);
				};
				
				// Increment Clone Children IDs
				$(clone).find('[id]').each(function(){
					var newid = $(this).attr('id') + (counter +1);
					$(this).attr('id', newid);
				});
				
				// Clear Inputs/Textarea
				if (settings.clearInputs){
					$(clone).find(':input').each(function(){
						var type = $(this).attr('type');
						switch(type)
						{
							case "button":
								break;
							case "reset":
								break;
							case "submit":
								break;
							case "checkbox":
								$(this).attr('checked', '');
								break;
							default:
							  $(this).val("");
						}						
					});					
				};
				
				// Hide new item by default if going to animate
				if (settings.animate){
					$(clone).css('display', 'none');
				}
				
				// Append the new element(s)
				$(parent).find(rel+':last').after(clone);
				
				// Show it with animation
				if (settings.animate){
					$(clone).show('fast');
				}
				
				// Add remove operation to removeClass click event
				if (settings.removeClass){
					var removeTarget = '.'+settings.copyClass+counter;
					console.log(settings.removeClass+' || '+removeTarget);
					$(clone).find('.'+settings.removeClass).click(function(){
						// Remove the copy of which the remove link was clicked
						if (settings.animate){
							$(removeTarget).hide('fast', function(){
								$(removeTarget).remove();
							});
						}else{
							$(removeTarget).remove();
						}
						
						// Call the onRemove callback if defined
						if (settings.onRemove){settings.onRemove();}
					});
				}
				
				// Run onFull/onNotFull callbacks if defined
				if (settings.limit != 0 && $(rel).length >= settings.limit){
					if (settings.onFull){settings.onFull();}
				}else{
					if (settings.onNotFull){settings.onNotFull();}
				}
				
				return false;
				
			}); // End click action
			
		}); // End each loop
		
		return this; // Return to jQuery
	};
	
})(jQuery);