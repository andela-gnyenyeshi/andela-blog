var myDataRef = new Firebase("https://mybudget1.firebaseio.com");
var newBudget = {},
    accountsNo = 0,
    cashTotal = 0,
    creditTotal = 0;

myDataRef.onAuth(function(authData) {
    if (authData) {
        console.log("Authenticated with uid:", authData.uid);
        $('#user-name').text(authData.google.cachedUserProfile.name);
        $("#user-image").attr("src",authData.google.cachedUserProfile.picture);
        var ref = new Firebase("https://mybudget1.firebaseio.com/users/" + authData.uid + "/budgets");
        ref.on("child_added", function(snapshot, prevChildKey) {
            newBudget = snapshot.val();
            $('<a  class="list-group-item"><ul class="no-bullets"><li><b>Budget Name:</b> ' + newBudget.budget_name + '</li><li><b>Account Type:</b> ' + (newBudget.account_type).toLowerCase().replace("_", " & ") + '</li><li><b>Budget Month:</b> ' + newBudget.budget_month + '</li><li><b>Budget Type:</b> ' + newBudget.budget_type.replace("_", "&") + '</li><li><b>Budget Notes:</b> ' + newBudget.budget_desc + '</li><li><b>Budget Amount:</b> ' + newBudget.budget_amount + '</li><li><b>Budget Priority:</b> ' + newBudget.budget_priority + '</li></ul></a>').appendTo($('#your-budgets'));
            $('#your-budgets')[0].scrollTop = $('#your-budgets')[0].scrollHeight;


        });
    } else {
        console.log("Client unauthenticated.");
    }
});
