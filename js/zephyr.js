/* 
 *   Zephyr 0.1
 *   Full page discussion layer for fast and simple page discussions.
 */

function Comments(id, username, content, replySource) {
/*
	this.id = id;
	this.username = username;
	this.content = content;
	this.replySource = replySource;
*/
	
	var html = "<div class='cm-commentBox' postid='"+id+"'> <div class='cm-commentText' ><b>"+username+"</b><span class='cm-boxMenu cm-reply'> Reply</span><br /><span> "+content+"</span></div></div>"; 
	$('.cm-commentBox[postid="'+replySource+'"]').append(html); 
}

function CommentBoxModel(loadData) {
	var self = this; 	
	
	// Options
	self.sidebarWidth = 400; // The window width at which the sidebar disappears and integrated comments kick in. This is useful for responsiveness. 
	
	self.commentMode = false;
	self.dragState = false;
	
	// placeholders 
	self.latestComment = '',
	self.currentUser = 'Caner'; 
	
	// window sizes 
	self.sidebar = ko.observable(true); 
	self.width = $(window).width(); 
	$(window).resize(function () { 
		$(window).width() < self.sidebarWidth ? self.sidebar(false) : self.sidebar(true); 
			
		
	}); 
	self.comments = ko.observableArray(); 	
	self.totalComments = loadData[loadData.length-1].id; 
	// load existing comments 
	for(var i = 0; i < loadData.length; i++){
		var m = loadData[i]; 
		self.comments.push(new Comments(m.id, m.username, m.content, m.replySource));
	}
	self.tabDragDown = function() {
		self.dragState = true;
		console.log(self.dragState);
	}
	self.tabDragUp = function() {
		self.dragState = false;
		console.log(self.dragState);
	}
	self.bandDrag = function() {
		if (self.dragState == true) {
			var loc = $(window).width() - event.pageX + 3;
			console.log(loc);
			$('.cm-window').css({
				'width': loc
			})
		}
	}
	self.panel = function() {
		var cm = $('.cm-pullTab');
		if (cm.parent().hasClass('cm-active')) {
			cm.parent().removeClass('cm-active').animate({
				right: "-300"
				// add other animations                                
			}, 100, function() {
				// Animation complete.
			});
			self.commentMode = false;
		} else {
			cm.parent().addClass('cm-active').animate({
				right: "0"
				// add other animations                                
			}, 100, function() {
				// Animation complete.
			});
			self.commentMode = true;
		}
	}
	self.makeComment = function() {
        self.comments.push(new Comments(self.totalComments+1, self.currentUser, self.latestComment, 0));
    }
	
	//window resize function 
   
}
