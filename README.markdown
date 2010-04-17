# AddAnother jQuery Plugin

A jQuery plugin for easily creating repeating HTML elements where the user can 
"Add another". This is especially good for repeating form input structures like
multiple file uploaders.

## Credits

**Author:** Jeremy Lindblom <jeremy@synapsestudios.com>
**Author's Website:** http://webdevilaz.com
**Credits:** A fork of relCopy by Andres Vidal <code@andresvidal.com>

## Settings

- limit - The number of items that can exist in the group. 0 = unlimited
- excludeSelector - Elements with this class will not be cloned
- emptySelector - Elements with this class will have subelements removed
- clearInputs - If true, then cloned input fields will have an empty value
- makeInputArrays - If true, input fields will have [] added to the name for array access
- animate - If true, show/hide funcion are used with animation
- allowRemove - If true, then a remove link will be added automatically
- removeClass - The class of the remove link
- addLinkText - The text of the add another link
- removeLinkTex - The text of the remove link
- onFull - A callback to be executed after an item is added and the group is full
- onNotFull - A callback to be executed after an item is added and the group is NOT full
- onRemove - A callback to be executed after an item is removed