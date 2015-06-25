var postRef = new Firebase('https://andelablog.firebaseio.com/posts');
  var category ="";
  var catId = [];
  var categoryArray = [];
//posting the new posts to firebase
$('#element').on('click', '#addPost', function () {
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
    postElement.append("<div class='well'><p class='title'>" + category+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title:" + title +" </p><p class='body'>" + body+"</p><p>" + when +" <em class='pull-right'>" +fromNow + "</em></p></div>");

}};



//display the recent post
function recentPostsDisplay(category,title) {
  var recentPostsDiv=$("ul#recentPosts");
  recentPostsDiv.append("<li class='list-group-item' onclick='listClicked(\""+title+"\");'><a >" + title + "</a></li>");
}




//function to display specific posts
function listClicked(post) {
  var postDiv = $('div#messagesDiv');
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

$('#element').on('click', '#addcat', function () {
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
function catDisplay(catId,category) {
  var catDiv = $("ul#cat");
  catDiv.append("<li class='list-group-item' onclick='catClicked(\""+category+"\");'><a >" + category + "</a></li>");
}


//function to display specific posts
function catClicked(categ) {
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
  var element = $('div#element');
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
  $('div#element').html('');
  for( var i=0; i<catId.length; i++) {
    $('option#newid').append("<option value='" + catId[i] +"'>"+ catId[i] +"</option>")
  }
  $('div#element').append('<div  class="well"><p class="post">Add New category</p><hr><div class=""><select id="catId" class="form-control"><option id="newid" >select</option><option value="2">2</option></select><br><input type="text" class="form-control" id="category" placeholder=" Category"><br><textarea id="description" class="form-control"></textarea><br><button type="submit" class="btn btn-primary btn-sm" id="addcat">Add Post</button><br></div></div>');
}
  

//user login
 var loginUser = function() {
   var ref = new Firebase("https://andelablog.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
       if (error) {
          console.log("Login Failed!", error);
            } else {
          console.log("Authenticated successfully with payload:", authData);
       }
    });


}
