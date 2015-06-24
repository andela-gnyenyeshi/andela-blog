var myDataRef = new Firebase('https://andelablog.firebaseio.com');

var data = [];

//posting the new posts to firebase
$('#element').on('click', '#addPost', function () {
  var title = $('#titleInput').val();
    var body = $('#bodyInput').val();
      var category = $('#catInput').val();
        var time = $('#timeInput').val();
          myDataRef.push({ title: title, body: body, category: category, time: Firebase.ServerValue.TIMESTAMP });
            $('#titleInput').val('');
              $('#bodyInput').val('');
               });

//posting the categories
$('#element').on('click', '#addcat', function () {
  var catId = $('#catId').val();
    var category = $('#category').val();
      var description = $('#description').val();
          myDataRef.push({catId:catId,category:category,description:description});
            $('#catId').val('');
              $('#Category').val('select');
              $('#description').val('');
               });

//display the blog posts

myDataRef.on('child_added', function(snapshot) {
   var message = snapshot.val();
      data.push(message);
    		displayPosts(message.title, message.body, message.category, message.time, message.catId );
          catDisplay(message.catId, message.category);
	}); 

//function to display the posts on the page
function displayPosts(title, body,category,time) {
   var when = moment(new Date(time)).format("dddd, MMMM Do ");
   var fromNow = moment(new Date(time)).fromNow();
    if(body) {
    $('div#messagesDiv').append("<div class='well'><p class='title'>" + category+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Title:" + title +" </p><p class='body'>" + body+"</p><p>" + when +" <em class='pull-right'>" +fromNow + "</em></p></div>");
      }};



//display the categories

function catDisplay(catId,category) {
  if(catId>=1){
    $("ul#cat").append("<li class='list-group-item' onclick='listClicked(\""+category+"\");'><a >" + category + "</a></li>");
  }
  
        }


//function to display specific posts
function listClicked(categ) {
  $('#messagesDiv').html('');
  for(var i = 0; i < data.length; i++) {
    var datai = data[i];
    if(datai.category == categ) {
      displayPosts(datai.title, datai.body, datai.category, datai.time);
    }
  }
}



//function to load the add new post
function loadAddPost(){
  $('div#element').html('');
  $('div#element').append('<div  class="well"><p class="post">Add New Post</p><hr><div class=""> <select id="catInput" class="form-control"><option value="Javascript"> Javascript</option><option value="php">Php</option><option value="html">Html</option></select><br><input type="text" class="form-control" id="titleInput" placeholder="title"><br><textarea id="bodyInput" class="form-control"></textarea><br><button type="submit" class="btn btn-primary btn-sm" id="addPost">Add Post</button><br></div></div>')
}


//function to load the new category
function loadNewCategory() {
  $('div#element').html('');
  $('div#element').append('<div  class="well"><p class="post">Add New category</p><hr><div class=""><select id="catId" class="form-control"><option >select</option> <option value="1">1</option><option value="2">2</option></select><br><input type="text" class="form-control" id="category" placeholder=" Category"><br><textarea id="description" class="form-control"></textarea><br><button type="submit" class="btn btn-primary btn-sm" id="addcat">Add Post</button><br></div></div>');
}



