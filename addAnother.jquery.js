// AddAnother jQuery Plugin by Jeremy Lindblom. Based on relCopy by Andres Vidal.
(function($) {
	
	var regexSingleBrackets = /\[0?\]+$/;
	var regexDoubleBrackets = /\[0\]\[([^\]]*)\]+$/;

	// Create the addAnother jQuery plugin
	$.fn.addAnother = function(options) {

		// Keeps track of the current number of items. Ensures uniqueness of IDs
		var counters = {};

		// This is the selector used to call addAnother
		var itemSelector = $(this).selector;

		// This is the class name of the item to which addAnother was called
		var itemClass = itemSelector.substr(itemSelector.lastIndexOf('.')+1);

		// The class added to copies of the item
		var copyClass = 'copy-'+itemClass;

		// Take the options parameter and combine with default settings
		var settings = jQuery.extend({
			limit: 0,
			excludeSelector: ".exclude-item",
			emptySelector: ".empty-item",
			clearInputs: true,
			animate: false,
			allowRemove: true,
			removeClass: 'remove-item',
			addLinkText: "Add Another",
			addLinkClass: 'add-another-'+itemClass,
			removeLinkText: "Remove",
			onFull: false,
			onNotFull: false,
			onRemove: false,
			explicitBracketNumbering: true
		}, options);
		
		// Make sure limit is an int
		settings.limit = parseInt(settings.limit);

		// Add Another Link
		$(this).after('<div class="add-another"><a href="#" class="'+settings.addLinkClass+'">'+settings.addLinkText+'</a></div>');
		
		// Fix initial bracketed values of input names for array submittal
		if (settings.explicitBracketNumbering) {
			$(itemSelector).find('input, textarea, select').each(function(){
				var elementName = $(this).attr('name');
				if (regexDoubleBrackets.test(elementName)){
					elementName = elementName.replace(regexDoubleBrackets, '[0][$1]');
				} else if (regexSingleBrackets.test(elementName)){
					elementName = elementName.replace(regexSingleBrackets, '[0]');
				}
				$(this).attr('name', elementName);
			});
		}
		
		// Loop each element
		this.each(function() {
			
			// Set click action
			$('.add-another-'+itemClass).click(function(){
				
				// Stop at limit
				if (settings.limit != 0 && $(itemSelector).length >= settings.limit){
					return false;
				};

				// Increment the element counter
				if (!counters[itemSelector]){
					counters[itemSelector] = 1;
				}
				var counter = counters[itemSelector]++;
				
				// Get jQuery objects for all of the participating elements
				var master = $(itemSelector+":first");
				var parent = $(master).parent();
				var clone = $(master).clone(true)
					.addClass(copyClass+counter);

				// Add a remove link if enabled
				if (settings.allowRemove){
					$(clone).append('<a href="#" class="'+settings.removeClass+'">'+settings.removeLinkText+'</a>');
				}
				
				// Remove elements with excludeSelector from the clone
				if (settings.excludeSelector){
					$(clone).find(settings.excludeSelector).remove();
				};
				
				// Empty elements with emptySelector in the clone
				if (settings.emptySelector){
					$(clone).find(settings.emptySelector).empty();
				};								
				
				// Increment clone IDs
				if ($(clone).attr('id') ){
					var newid = $(clone).attr('id')+'_'+counter;
					$(clone).attr('id', newid);
				};
				
				// Increment clone children IDs
				$(clone).find('[id]').each(function(){
					var newid = $(this).attr('id')+'_'+counter;
					$(this).attr('id', newid);
				});
				
				// Increment clone children labels
				$(clone).find('[for]').each(function(){
					var newfor = $(this).attr('for')+'_'+counter;
					$(this).attr('for', newfor);
				});
				
				// Fix bracketed values of input names for array submittal
				if (settings.explicitBracketNumbering) {
					$(clone).find('input, textarea, select').each(function(){
						var elementName = $(this).attr('name');
						if (regexDoubleBrackets.test(elementName)){
							elementName = elementName.replace(regexDoubleBrackets, '['+counter+'][$1]');
						} else if (regexSingleBrackets.test(elementName)){
							elementName = elementName.replace(regexSingleBrackets, '['+counter+']');
						}
						$(this).attr('name', elementName);
					});
				}
				
				// Clear Inputs/Textarea
				if (settings.clearInputs){
					$(clone).find(':input').each(function(){
						switch ($(this).attr('type'))
						{
							case "button":
							case "reset":
							case "submit":
								break;
							case "checkbox":
							case "radio":
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
				$(parent).find(itemSelector+':last').after(clone);
				
				// Show it with animation
				if (settings.animate){
					$(clone).show('fast');
				}
				
				// Add remove operation to removeClass click event
				if (settings.removeClass){
					var removeTarget = '.'+copyClass+counter;
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
						if (settings.onRemove){
							settings.onRemove();
						}
					});
				}
				
				// Run onFull/onNotFull callbacks if defined
				if (settings.limit != 0 && $(itemSelector).length >= settings.limit){
					if (settings.onFull){
						settings.onFull();
					}
				}else{
					if (settings.onNotFull){
						settings.onNotFull();
					}
				}
				
				return false;
				
			}); // End click action
			
		}); // End each loop
		
		return this; // Return to jQuery
	};
	
})(jQuery);