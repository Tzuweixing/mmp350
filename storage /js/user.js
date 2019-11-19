const posts = document.getElementById('posts');
const postRef = firebase.database().ref('posts');

function loadPosts(){
    postRef.on('child_added', function(snapshot){
        createPost
//        console.log(snapshot.key, snapshot.val());
        if (users[snapshot.val().uid]) {
            createPost(snapshot.val());
        }
        
    });
}

/*get users*/
let userCount = 0;
const users = {};

firebase.database().ref('users').on('child_added', function(snapshot){
    users[snapshot.key] = snapshot.val();
    userCount += 1;

});

firebase.database().ref('users').once('value',function(snapshot){
    if(userCount === snapshot.numChildren()){
        loadPosts();
    }
});