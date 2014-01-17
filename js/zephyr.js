/* 
 *   Zephyr 0.1
 *   Full page discussion layer for fast and simple page discussions.
 */

function Comments(id, username, content, replySource) {
	this.id = id;
	this.username = username;
	this.content = content;
	this.replySource = replySource;
}

function CommentBoxModel() {
	var self = this;
	self.commentMode = false;
	self.dragState = false;
	self.load = ko.observableArray([
	new Comments(1, "Jeff", "This is a comment", 0), new Comments(2, "Josh", "Another comment to text", 0), new Comments(3, "Caner", "Reply to a comment", 1)]);
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
}
ko.applyBindings(new CommentBoxModel());