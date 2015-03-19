(function(){

	window.app = {
		server: 'https://api.parse.com/1/classes/chatterbox',
		init: function(){

		},
		send: function(data){
			alert("this is the alert from send: ", data)
			$.ajax({
			  url: app.server,
			  type: 'POST',
			  data: JSON.stringify(data),
			  contentType: 'application/json',
			  success: function (data) {
			  	app.fetch()
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
			  	console.log(data)
			    for (var i=0;i<data.results.length;i++){
			    	if (data.results[i].roomname===$("#roomSelect option:selected").text()){
			    		app.addMessage(data.results[i])
			    	}
			    }

			    var rooms=[]

			    for (var i=0;i<data.results.length;i++){
			    	rooms.push(data.results[i].roomname)
			    }

			    rooms=_.uniq(rooms)

			    for (var i=0;i<rooms.length;i++){
			    	app.addRoom(rooms[i])
			    }



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
			var user = message.username
			var box = "<div class='box'><div class='username "+user+"'>"+user+"</div><div class='text'>"+message.text+"</div></div>"
			$("#chats").append(box)
		},

		addRoom: function(rooms){
			$("#roomSelect").append("<option>"+rooms+"</option>")
		},

		addFriend: function(context){
			var classHolder=$(context).attr('class').split(" ")
			$("."+classHolder[1]).addClass("friend")
		},

		// handleSubmit: function(){
		// 	var message = $("#message")
		// 	app.send(message.val())
		// }


	}

		app.fetch()
	window.setInterval(function(){
		app.clearMessages()
		app.fetch()
	},10000)

	$(document).ready(function(){


		// $(".username").click(function(){app.addFriend()})
		$(document).on('click', '.username', function(){
			var context=this
			app.addFriend(context)
		})

		$(document).on('click', '.submit', function(){
			var userName = window.location.href.split('username=')[1];
			console.log(userName);
			var message = {
				username: userName.slice(0,-1),
				text:$("#message").val(),
				roomname:$("#roomSelect option:selected").text()
			}
			console.log("username:"+message.username)
			console.log("text: "+ message.text)
			console.log("roomname:" + message.roomname)
			app.send(message)
		})

		
	})

})();



