
/*
 *  Zephyr page wide commenting tool with UI components
 *  Load after jquery and define within document.ready for events to work
 */

function Zephyr(options) {

    /************************ VARIABLES  ************************/

    var top = this;
    this.dragState = false;
    this.sidebarWidth = 300;    // dynamic width of sidebar as dragging changes the width.
    /************************ OPTIONS  ************************/
    this.settings = $.extend({
        format       : 'auto',         // Where the comments should be placed; auto: based on window size; sidebar: force sidebar; inline: force inline
        sidebarWidth : 400,  // starting width of the sidebar
        sidebarResize: true    // Allow for resizing the sidebar or not; tru:yes, false: no.
    }, options);


    /************************  EVENTS  ************************/
    this.LoadComments();

    $('.cm-pullTab').on('click', function(){
        top.SidebarToggle();
    })
    $('.cm-band').on('mousedown', function(){
      top.DragDown();
    });
    $('.cm-band').on('mouseup', function(){
        top.DragUp();
    });
    $(document).on('mousemove', function(){
        top.SidebarDrag();
    });
    $( window ).resize(function() {
        top.PlacementToggle();
    });
}

/************************ METHODS  ************************/

Zephyr.prototype.LoadComments = function() {
    /*
     *  Load comments from json file and place accordingly
     */
    var main = this;

    $.ajax({
        dataType: "json",
        url: "data.json",
        success: function(data){
            console.log(data);
            main.DisplayComments(data);
        },
        error : function(xhr, status) {// If there was an error
            console.log('There was an error talking to data.json');
            console.log(xhr);
            console.log(status);
        }
    });


};

Zephyr.prototype.DisplayComments = function(data) {
    /*
     *  Layout the Comments
     */
    var main = this;
    var i,m;
    for(i=0; i < data.length; i++){
        m = data[i];
        var html = "<div class='cm-commentBox' data-postid='"+ m.id+"'> <div class='cm-commentText' ><b>"+ m.username+"</b><span class='cm-boxMenu cm-reply'> Reply</span><br /><span> "+ m.content+"</span></div></div>";
        $('.cm-commentBox[data-postid="'+ m.replySource+'"]').append(html);
    }


};

Zephyr.prototype.SidebarToggle = function() {
    /*
     *  Show/Hide Sidebar
     */
    var main = this;
    var cm = $('.cm-pullTab');
    if (cm.parent().hasClass('cm-active')) {
        cm.parent().removeClass('cm-active').animate({
            right: -main.sidebarWidth,
            // add other animations
        }, 100, function() {
            // Animation complete.
        });
        self.commentMode = false;
    } else {
        cm.parent().addClass('cm-active').animate({
            right: 0
            // add other animations
        }, 100, function() {
            // Animation complete.
        });
        self.commentMode = true;
    }

};

Zephyr.prototype.PlacementToggle = function() {
    /*
     *  Depending on the size of the window whether to put it inline or as sidebar. or depending on whether this is off.
     */
    var main = this;
    if($(window).width() < 600){
        $( ".cm-content" ).appendTo( ".cm-inline" );    // append cm-content to inline div
        $(".cm-window").hide(); // hide cm-window
    } else {
        $(".cm-content").appendTo('.cm-window')// append cm-content to cm-window
        $(".cm-window").show(); // show cm-window

    };

};

Zephyr.prototype.DragDown = function() {
    /*
     *  User clicked to drag the sidebar
     */
    var main = this;
    main.dragState = true;
    console.log(main.dragState);
}
Zephyr.prototype.DragUp = function() {
    /*
     *  User released the sidebar
     */
    var main = this;

    main.dragState = false;
    console.log(main.dragState);
}
Zephyr.prototype.SidebarDrag = function() {
    /*
     *  User is dragging the sidebar
     */
    var main = this;

    if (main.dragState == true) {
        var loc = $(window).width() - event.pageX+3;
        $('.cm-window').css({
            'width': loc
        });
        main.sidebarWidth = loc;

    }
}