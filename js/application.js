$(document).ready(function(){

	// Default show up: list, read selected
	// Pick actions
	// Read:
		// get all info
		// construct html
		// display it
		// or!!!!!
		// search by name or id
		// print result
	// Create
		// enter the form
	// put
		// enter the form
	// delete enter the form

	//Print the full list
	var clearTable = function (){
		$('.contentTable').replaceWith('<table class="table table-striped contentTable"> <tr class="firstRow"> <th>User</th> <th>Title</th> <th>Text</th> <th>ID</th> </tr> </table>');
	}

	var printFullList = function (){

		var makehtml = function (items, keys) {
			var html = "";
			items.forEach(function(item){
				html += '<tr>'
				keys.forEach(function(key){
					html +=		'<td>';
					html +=			item[key];
					html +=		'</td>';
				});
				html += '</tr>'
			});
			return html;
		}

		var successAndPrint = function (items) {
			var keys = ["user","title","text","_id"];
			var html = makehtml(items, keys);
			$('.firstRow').after(html);
		}

		$.ajax({
			type: 'GET',
			url: 'http://ga-wdi-api.meteor.com/api/posts/',
			dataType: 'JSON',
			success: successAndPrint
		});
	};

	//Print the list with specific ID
	var printIDSearchResult = function (id){

		var makehtml = function (items, keys) {
			var html = "";
			items.forEach(function(item){
				if (item['_id'] === id) {
					html += '<tr>'
					keys.forEach(function(key){
						html +=	'<td>';
						html +=		item[key];
						html +=	'</td>';
					});
					html += '</tr>'
				};
			});
			return html;
		}

		var successAndPrint = function (items) {
			var keys = ["user","title","text","_id"];
			var html = makehtml(items, keys);
			$('.firstRow').after(html);
		}

		$.ajax({
			type: 'GET',
			url: 'http://ga-wdi-api.meteor.com/api/posts/',
			dataType: 'JSON',
			success: successAndPrint
		});
	};

	// Print the list with specific name
	var printNameSearchResult = function (name){

		var makehtml = function (items, keys) {
			var html = "";
			items.forEach(function(item){
				if (item['user'] === name) {
					html += '<tr>'
					keys.forEach(function(key){
						html +=		'<td>';
						html +=			item[key];
						html +=		'</td>';
					});
					html += '</tr>'
				};
			});
			return html;
		}

		var successAndPrint = function (items) {
			var keys = ["user","title","text","_id"];
			var html = makehtml(items, keys);
			$('.firstRow').after(html);
		}

		$.ajax({
			type: 'GET',
			url: 'http://ga-wdi-api.meteor.com/api/posts/',
			dataType: 'JSON',
			success: successAndPrint
		});
	};

	var createItem = function (newUser, newTitle, newText){
		$.ajax({
			type: 'POST',
			url: 'http://ga-wdi-api.meteor.com/api/posts/',
			data: {
				user: newUser,
				title: newTitle,
				text: newText
			},
			dataType: 'JSON',
			success: console.log('successfully add new item!')
		})
	};

	var updateItem = function (targetID, updateTitle, updateText){
		$.ajax({
			type: "PUT",
			url: 'http://ga-wdi-api.meteor.com/api/posts/' + targetID,
			data: {
				title: updateTitle,
				text: updateText
			},
			dataType: "JSON",
			success: console.log('update successfully!!')
		})
	};

	var deleteItem = function (targetID){
		$.ajax({
			type: "DELETE",
			url: 'http://ga-wdi-api.meteor.com/api/posts/' + targetID,
			success: console.log('delete an item successfully!')
		})
	}

	// Initiation
	printFullList ();

	// change button change interface
	$(document).on('click', '.read', function(){
		$('.readInputGroup').show();
		$('.createInputGroup').hide();
		$('.putInputGroup').hide();
		$('.deleteInputGroup').hide();
		$('.mainSelect').text('Read');
	});

	$(document).on('click', '.create', function(){
		$('.readInputGroup').hide();
		$('.createInputGroup').show();
		$('.putInputGroup').hide();
		$('.deleteInputGroup').hide();
		$('.mainSelect').text('Create');
	});

	$(document).on('click', '.update', function(){
		$('.readInputGroup').hide();
		$('.createInputGroup').hide();
		$('.putInputGroup').show();
		$('.deleteInputGroup').hide();
		$('.mainSelect').text('Update');
	});

	$(document).on('click', '.delete', function(){
		$('.readInputGroup').hide();
		$('.createInputGroup').hide();
		$('.putInputGroup').hide();
		$('.deleteInputGroup').show();
		$('.mainSelect').text('Delete');
	});

	// Give command
	$(document).on('click', '.listAllButton', function(){
		clearTable ();
		printFullList ();
	});

	$(document).on('click', '.readIDButton', function(){
		var id = $('.readID').val();
		clearTable ();
		printIDSearchResult(id);
		$('.readID').val('');
	});

	$(document).on('click', '.readNameButton', function(){
		var name = $('.readName').val();
		clearTable ();
		printNameSearchResult(name);
		$('.readName').val('');
	});

	$(document).on('click', '.createButton', function(){
		var newUser = $('.createName').val();
		var newTitle = $('.createTitle').val();
		var newText = $('.createText').val();
		createItem (newUser, newTitle, newText);
		clearTable ();
		printFullList ();
	});

	$(document).on('click', '.putButton', function(){
		var targetID = $('.putID').val();
		var updateTitle = $('.putTitle').val();
		var updateText = $('.putText').val();
		updateItem (targetID, updateTitle, updateText);
		clearTable();
		printFullList();
	});

	$(document).on('click', '.deleteButton', function(){
		var targetID = $('.deleteID').val();
		deleteItem (targetID);
		clearTable ();
		printFullList ();
	});

})