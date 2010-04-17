<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>addAnother Example</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" src="addAnother.jquery.js"></script>
<script>
$(function(){
	$('a.copy-service').addAnother({
		selector:    'div.service',
		copyClass:   'copy-service',
		limit:       3,
		append:      '<a href="#" class="remove-service">[-] Remove Service</a>',
		removeClass: 'remove-service',
		animate:     true,
		onFull:      function(){$('a.copy-service').hide();},
		onRemove:    function(){$('a.copy-service').show();}
	});
	$('a.copy-person').addAnother({
		selector:    'div.person',
		copyClass:   'copy-person',
		limit:       5,
		append:      '<a href="#" class="remove-person">[-] Remove Person</a>',
		removeClass: 'remove-person',
		animate:     true,
		onFull:      function(){$('a.copy-person').hide();},
		onRemove:    function(){$('a.copy-person').show();}
	});
});
</script>
</head>
<body>
	<pre><?php print_r($_POST) ?></pre>
	<form action="#" method="post">
	
		<div class="service" style="margin-bottom: 1em;">
			<div>
				<label>Title:</label>
				<input type="text" name="title" id="name" />
			</div>
			<div>
				<label>Description:</label>
				<input type="text" name="desc" id="desc" />
			</div>
		</div>
		<p><a href="#" class="copy-service">[+] Add Another Service</a></p>
		
		<hr />
		
		<div class="person" style="margin-bottom: 1em;">
			<div>
				<label>First Name:</label>
				<input type="text" name="fname" id="name" />
			</div>
			<div>
				<label>Last Name:</label>
				<input type="text" name="lname" id="desc" />
			</div>
		</div>
		<p><a href="#" class="copy-person">[+] Add Another Person</a></p>
		
		<hr />
		
		<p><input type="submit" /></p>
	</form>
</body>
</html>