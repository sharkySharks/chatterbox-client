(function(){

	window.app = {
		server: 'https://api.parse.com/1/classes/chatterbox',
		init: function(){

		},
		send: function(message){
			alert(message)
			$.ajax({
			  url: app.server,
			  type: 'POST',
			  data: JSON.stringify(message),
			  contentType: 'application/json',
			  success: function (data) {
			    console.log('chatterbox: Message sent');
			  },
			  error: function (data) {
			    console.error('chatterbox: Failed to send message');
			  }
			});
		},

		fetch: function(){
			// var ajaxData = data.reverse();
			$.ajax({
			  url: app.server,
			  type: 'GET',
			  data: {'order': '-createdAt'},
			  contentType: 'application/json',
			  success: function (data) {
			    console.log(data);
			  },
			  error: function (data) {
			    console.error('chatterbox: Failed to retrieve');
			  }
			});
		},

		clearMessages: function(message){
			$("#chats").empty()
		},

		addMessage: function(message){
			$("#chats").prepend("<div class='username'>"+message.username+"</div>")
		},

		addRoom: function(rooms){
			$("#roomSelect").append("<div>"+rooms+"</div>")
		},

		addFriend: function(context){
			$(context).addClass("friend")
		},

		handleSubmit: function(){
			var message = $("#message")
			app.send(message.val())
		}


	}

	$(document).ready(function(){
		// $(".username").click(function(){app.addFriend()})
		$(document).on('click', '.username', function(){
			var context=this
			app.addFriend(context)
		})


		$("#send .submit").click(function(){
			app.handleSubmit();
		})



	})

})();



