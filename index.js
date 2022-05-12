//  https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=i1sccEVkqbpTVtAQrhjiQzrX7UdfEtzj&begin_date=20220101&end_date=20221231&q=covid
//  i1sccEVkqbpTVtAQrhjiQzrX7UdfEtzj

$(document).ready(function () {
  // fetch("https://bloggy-api.herokuapp.com/posts/", {
  //     method: "GET",
  // }).then(res =>{
  //     let secondPromise = res.json()
  //     return secondPromise

  // }).then(data=>{
  //     console.log(data);
  // })

  // fetch("https://bloggy-api.herokuapp.com/posts/", {
  //     method: "POST",
  //     headers: {
  //         'Accept' : 'application/json',
  //         'Content-Type' : 'application/json'
  //     },
  //     body: JSON.stringify ({
  //         data: {
  //             title: "Fetch ile elave etdik",
  //             body: "Mayace Leorem"
  //         },
  //     }),
  // }).then(res =>{
  //     let secondPromise = res.json()
  //     return secondPromise

  // }).then(data=>{
  //     console.log(data);
  // })

  // let postData = {
  //     title: "Ajaxla putt ile elave etddim",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sapiente repellendus "
  // };

  // let promise = $.ajax({
  // url: "https://bloggy-api.herokuapp.com/posts",
  // method: "GET",
  // //data: postData
  // });

  // promise.then((res) => {
  //     console.log(res);
  // })

  const postList = $("#postList");

  const renderPosts = (arr) => {
    postList.html(
      arr
        .reverse()
        .map(
          (post) =>
            `
        <div class="card my-5 m-4 w-100 position-relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfGL0JlFJtuob4kSY-wO--9gjlbSNMjlm6pvZFxAH917uo2PS11We8Vv_mzcpmKg109MU&usqp=CAU"
          class="card-img-top"
          id="moviePoster"
          style="object-fit: cover"
        />
        <div class="card-body">
          <h5 class="card-title" id="movieName">${post.title}</h5>
          <p class="card-text" id="movieAwards">
          ${post.body}
          </p>

<button class = "delete-button" value="${post.id}">
<i class="fa-solid fa-trash"></i>
</button>
        </div>
      </div>
        `
        )
        .join()
    );
  };

  const getPosts = () => {
    $.ajax({
      url: "https://bloggy-api.herokuapp.com/posts",
      method: "GET",
    }).then((res) => {
      renderPosts(res);
      console.log(res);
    });
  };
  // let postData = {
  //     title: "Ajaxla putt ile elave etddim",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sapiente repellendus "
  // };

  const createPost = (postData) => {
    $.ajax({
      url: "https://bloggy-api.herokuapp.com/posts",
      method: "POST",
      data: postData,
    })
      .then(() => {
        alert("Successfuly added post");
        getPosts();
        location.reload(true);
      })
      .catch(() => {
        alert("Wrong not added post");
      });
  };

  $("#addPostBtn").on("click", function () {
    let title = $("#postTitle").val();
    let body = $("#postDesc").val().trim();

    let createPostData = {
      title,
      body,
    };
    console.log(createPostData);
    createPost(createPostData);
  });

  
  $(document).on("click", ".delete-button", function (){
      let buttonValue = $(this).val();
      console.log("postID", buttonValue);
      let userConfirm = confirm("Silmek istediyinizden eminsinizmi?")
      if(userConfirm){
          console.log("Xeber silindi");
          deletePost(buttonValue); }else{
            console.log("Teesuf xeber silinmedi");
        }
        
    })


 const deletePost = (id) => {
     $.ajax({
         url:`https://bloggy-api.herokuapp.com/posts/${id}`,
         method: "DELETE",

     }).then(() => {
         alert("Post ugurla silindi")
         getPosts()
     }).catch((err) => {
         alert("Yeniden cehd edin")
     })
 }   

    getPosts();
});
