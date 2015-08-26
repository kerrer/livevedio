// ------- Private vars -------
	var jsReady = false;
	var swfReady = false;

	// ------- functions called by ActionScript -------
	// called to check if the page has initialized and JavaScript is available
	function isReady() {
		console.log(jsReady);
		return jsReady;
	}

	// called to notify the page that the SWF has set it's callbacks
	function setSWFIsReady() {
		// record that the SWF has registered it's functions (i.e. that JavaScript
		// can safely call the ActionScript functions)
		swfReady = true;
		console.log("swfReady");console.log(swfReady);
		updateStatus();
	}
	
	// called to notify the page of a new message
	function newMessage(value) {
		// append the message text to the end of the transcript
		document.forms["imForm"].transcript.value += "The Other Person: " + value + "\n";
	}

	// called to notify the page that the SWF user's availability (status) has changed
	function statusChange() {
		updateStatus();
	}


	// ------- event handling -------
	// called by the onload event of the <body> tag
	function pageInit() {
		// record that JavaScript is ready to go.
		jsReady = true;
	}

	// called when the "Send" button is pressed; the value in the messageText text field
	// is passed in as a parameter.
	function sendMessage(message) {
		if (swfReady)
		{
			// if the SWF has registered it's functions, add the message text to the
			// local transcript, send it to the SWF file to be processed there, and clear
			// the message text field.
			document.forms["imForm"].transcript.value += "You: " + message + "\n";
			document.forms["imForm"].messageText.value = "";
			getSWF("app").newMessage(message);
		}
	}


	// ------- utility functions -------
	// if the SWF has indicated it's ready for communication, calls the ActionScript
	// function to get the current "availability" status and writes it into the text field.
	function updateStatus() {
		if (swfReady) {
			var currentStatus = getSWF("app").getStatus();
			document.forms["imForm"].status.value = currentStatus;
		}
	}

	// Gets a reference to the specified SWF file by checking which browser is
	// being used and using the appropriate JavaScript.
	// Unfortunately, newer approaches such as using getElementByID() don't
	// work well with Flash Player/ExternalInterface.
	function getSWF(movieName) {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			return window[movieName];
		} else {
			return document[movieName];
		}
		//return $("#"+movieName);
	}
	
	//message
	 function showDebugMessage(message){
        console.log(message);
    }
    

	
    function flushPatientQuene(quene){
           console.log(quene);
           var obj = $.parseJSON(quene);
           console.log(obj);
           if(!obj.length > 0){
			   return;
		   }
		   var options = "";
		   for(var i=0;i<obj.length;i++){
			    options += "<li data-userid='" + obj[i].user_id + "' >" + obj[i].label + "</li>";   
		   }
		   $("#userListUl").html(options);
		   bindPatientQuene();
		   
    }
    
    function bindPatientQuene(){
		$("#userListUl li").click(function(){
			$("#userListUl li").removeClass("selected");
		    var user_id = $(this).data("userid");
		    $(this).addClass("selected");
		    $("#user_id").val(user_id);
		    console.log(user_id);	
		});
	}
    
    function clearPatientQuene(){
	  	 $("#userListUl").html("<li>no users</li>");
	}
	
    //room
      function joinRoom(){
		  console.log("joinning room...");
		  getSWF("app").yxAsJoinRoom();
	  }
	  
	  function changeRoom(roomname){
		  console.log("change room...");
		  getSWF("app").yxAsChangeRoom(roomname);
	  }
	  
	  function leaveRoom(){
		  console.log("leave room...");
		  getSWF("app").yxAsLeaveRoom();
	  }
    //chat
      function sendChatMessage(message){
		  console.log("chat:" + message);
		  var m = "<li>You said: " + message + "</li>";
		  $("#roomChatDiv").append(m);
		  getSWF("app").yxAsChatMessage(message);
	 }
	//video
	 function startVideo(){
		 console.log("start video");
		 var user_id = parseInt($("#user_id").val());
		 getSWF("app").yxAsInviteVideo(user_id);
	 }
	 
	 function closeVideo(){
		 console.log("close video");
	 }
	 
	 function agreePatientVedio(message){
	   var isAgree = window.confirm(message); 	
	   if(isAgree){
		  getSWF("app").yxAsStartPatientVideo();
	   }
	 }

$(function(){     
	   pageInit();
    $("#btnjionroom").click(function(){
	    joinRoom();
    });	
    
     $("#btnchangeroom").click(function(){
		 var room_name = $("input[name=roomname]").val();
		 if(room_name == ""){
		     showDialogMessage("no room name");	 
		 }
	    changeRoom(room_name);
    });	
    
     $("#btnleaveroom").click(function(){
	    leaveRoom();
    });	
    
      $("#btnchatmessage").click(function(){
		   var message = $("input[name=inputwhatyousay]").val();
		 if(message == ""){
		     showDialogMessage("no message");	 
		 }
	    sendChatMessage(message);
    });	
    
      $("#btninvitevedio").click(function(){
	    startVideo();
    });	
    
      $("#btnclosevedio").click(function(){
	    closeVideo();
    });	
}); 




