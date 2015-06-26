var postRef = new Firebase('https://andelablog.firebaseio.com/posts');
  var categoryArray = [];
//posting the new posts to firebase
$('#messagesDiv').on('click', '#addPost', function () {
    var title = $('#titleInput').val();
    var body = $('#bodyInput').val();
    var category = $('#catInput').val();
    var time = $('#timeInput').val();

    postRef.push({ title: title, body: body, category: category, time: Firebase.ServerValue.TIMESTAMP });

    $('#titleInput').val('');
    $('#bodyInput').val('');

});


//display the blog posts
postRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  if(message.title){
    displayPosts(message.title, message.body, message.category, message.time);
    recentPostsDisplay(message.category,message.title);
  }
}); 



//function to display the posts on the page
function displayPosts(title, body,category,time) {
  var when = moment(new Date(time)).format("dddd, MMMM Do ");
  var fromNow = moment(new Date(time)).fromNow();
  if(body) {
    var postDiv = $('div#messagesDiv');
    var postElement = $('div#element');
    postDiv.append("<div class='well'><p class='title'>" + category+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title:" + title +" </p><p class='body'>" + body+"</p><p>" + when +" <em class='pull-right'>" +fromNow + "</em></p></div>");
    postElement.append("<div class='well'><p class='title'>" + category+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title:" + title +" </p><p class='body'>" + body+"</p><p>" + when +"<i onclick = >comment<i> <em class='pull-right'>" +fromNow + "</em></p></div>");

}};



//display the recent post
function recentPostsDisplay(category,title) {
  var recentPostsDiv=$("ul#recentPosts");
  recentPostsDiv.append("<li class='list-group-item' onclick='listClicked(\""+title+"\");'><a >" + title + "</a></li>");
}




//function to display specific posts
function listClicked(post) {
  var postDiv = $('div#messagesDiv');
  var elDiv = $('div#element');
  postDiv.html('');
  postRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    if(message.title === post){
      displayPosts(message.title, message.body, message.category, message.time);
    }
  });
}

//posting the categories
var catRef = new Firebase('https://andelablog.firebaseio.com/categories');

$('#messagesDiv').on('click', '#addcat', function () {
  var catId = $('#catId').val();
  var category = $('#category').val();
  var description = $('#description').val();
  catRef.push({name:category, description:description});

  $('#catId').val('');
  $('#Category').val('');
  $('#description').val('');
});

//retriving the categories from firebase
catRef.on('child_added', function(snapshot) {
  var category = snapshot.val();
  categoryArray.push({name: category.name, description: category.description});
  catDisplay(category.catId, category.name);
}); 

//display the categories
 var catDisplay = function(catId,category) {
  var catDiv = $("ul#cat");
  catDiv.append("<li class='list-group-item' onclick='catClicked(\""+category+"\");'><a >" + category + "</a></li>");
}


//function to display specific posts
 var catClicked = function(categ) {
  var catClickDiv = $('div#messagesDiv');
  catClickDiv.html('');
  catClickDiv.html('');
  postRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    if(message.category ===categ){
      displayPosts(message.title, message.body, message.category, message.time);
    }     
  });
}

var buildCategoryOptions = function() {
  var options = '';
  for(var i = 0; i < categoryArray.length; i++) {
    var option_name = categoryArray[i].name;
    var option = '<option value= "' + option_name + '">' + option_name + '</option>';
    options = options + option;
  }
  return options;
};


//function to load the add new post
 var loadAddPost = function (){
  var element = $('div#messagesDiv');
  element.html('');
  var div = '<div  class="well"><p class="post">Add New Post</p><hr><div class="">';
  var select = '<select id="catInput" class="form-control">';
  var options = buildCategoryOptions();
  var rest = '</select><br><input type="text" class="form-control" id="titleInput" placeholder="title"><br><textarea id="bodyInput" class="form-control"></textarea><br><button type="submit" class="btn btn-primary btn-sm" id="addPost">Add Post</button><br></div></div>';

  var add_post_block = div + select + options + rest;

  element.append(add_post_block);
}


//function to load the new category
var loadNewCategory = function() {
  $('div#messagesDiv').html('');
  var div1 = '<div  class="well"><p class="post">Add New category</p><hr>';
  var div2 = '<div class=""><br>';
  var input = '<input type="text" class="form-control" id="category" placeholder=" Category"><br>';
  var textarea = '<textarea id="description" class="form-control"></textarea><br>';
  var lastElement = '<button type="submit" class="btn btn-primary btn-sm" id="addcat">Add category </button><br></div></div>';
  var form = div1 + div2 + input + textarea + lastElement;
  var element = $('div#messagesDiv');
  element.append(form);
};
 
 //login users through google 
var logRef = new Firebase("https://andelablog.firebaseio.com");
var logUser = function() {
  var isNewUser = true;

  logRef.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      logRef.onAuth(function(authData) {
        if(authData && isNewUser) {
          logRef.child("users").child(authData.uid).set({
            provider: authData.provider,
            token: authData.token,
            providerId:authData.google.id,
            UserName:authData.google.displayName
          });
        }else{
          logRef.child("users").child(authData.uid).update({
            provider: authData.provider,
            token: authData.token,
            providerId:authData.google.id,
            UserName:authData.google.displayName
          });
        }
      });
     window.location.replace("/index.html");
   }

   console.log("YOU GOOGLE NAME", authData.google.displayName)
        $('div#name').append('<li id="google-name">' + authData.google.displayName + '</li>');
  });
}

//dispaly user data
// logRef.on


var logOut = function(){
  logRef.unauth();
  window.location.replace("/index.html");
}


//function to create the comments
var commentRef = new Firebase("https://andelablog.firebaseio.com/comments");

var comment = function(title) {
  var commentId = $('#comment');
  var nameId = $('#name');
  var name = nameId.val();
  var comment = commentId.val();
  commentRef.push({title:title,name: name, comment:body});
  commentId.val('');

};


//function to retrive the comments
var retrieveComments = function(title) {
  commentRef.on('value', function(comSnap){
    var comment = comSnap.val();
    if(comment.title === title ) {
      displayComment(comment.name, comment.body);
    }
  });
}

//function to display the comments

var displayComment  = function(name,body) {
  var displayDiv = $('messagesDiv');
  displayDiv.html('');
  //create the html for the posts
  var divPanel = '<div class="panel panel-default">';
  var divPanelBody = '<div class="panel-body">';
  var ptag = '<p>';
  var ptag1 = '</p>';
  var closeDivs = '</div></div>';
  var combinedTags = divPanel + divPanelBody + ptag + name + ptag1 + ptag + body + ptag1 + closeDivs; 
  
  //display them on the display div

  displayDiv.append(combinedTags);
}


logRef.onAuth(function(authData) {
    if (authData) {
        console.log("Authenticated with uid:", authData.uid);
        $('#username').text(authData.google.cachedUserProfile.name);
        $("#picture").attr("src",authData.google.cachedUserProfile.picture);
        
    } else {
        console.log("Client unauthenticated.");
    }
});
