# AddAnother jQuery Plugin

A jQuery plugin for easily creating repeating HTML elements where the user can 
"Add another". This is especially good for repeating form input structures like
multiple file uploaders.

## Credits

**Author:** Jeremy Lindblom \<<http://webdevilaz.com>\>

**Contributor:** Alan Hogan \<<http://alanhogan.com>\>

**Note:** This is a fork of *relCopy* by Andres Vidal \<<http://www.andresvidal.com/labs/relcopy.html>\>

## Settings

- **limit** - The number of items that can exist in the group. 0 = unlimited
- **excludeSelector** - Elements with this class will not be cloned
- **emptySelector** - Elements with this class will have subelements removed
- **clearInputs** - If true, then cloned input fields will have an empty value
- **animate** - If true, show/hide funcion are used with animation
- **allowRemove** - If true, then a remove link will be added automatically
- **removeClass** - The class of the remove link
- **addLinkText** - The text of the add another link
- **addLinkClass** - The class of the add another link 
	(by default, 'add-another-x' where '.x' appears in selector used to indicate what will be duplicated.)
- **removeLinkText** - The text of the remove link
- **onFull** - A callback to be executed after an item is added and the group is full
- **onNotFull** - A callback to be executed after an item is added and the group is NOT full
- **onRemove** - A callback to be executed after an item is removed

## Usage

In order to use AddAnother you must first include jQuery and the 
`addAnother.jquery.js` script in your page. Then create a chunk of HTML you 
would like to be able to replicate, and give it a class. Then add some javascript:

	$('.the-class-of-the-html-chunk').addAnother({...});
	
where "&hellip;" is the options. You can have more than one AddAnother on one
page. AddAnother does not automatically add brackets to your HTML names, so you
must do this yourself if you plan on using the posted data as an array. Take a 
look at the examples for more details.
