var API_URL = "http://127.0.0.1:8080";

export async function getComments(callback) {
  var url = new URL(API_URL + "/comments");
  url.search = new URLSearchParams().toString();
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}


export async function editComment(comment_id, text, callback) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        comment_id: comment_id,
        text: text,
    }),
  };

  fetch(API_URL + "/comments/edit", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.log(error);
    });
}


export async function addComment(author, text, image, callback) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author,
        text: text,
        image: image
      }),
    };
  
    fetch(API_URL + "/comments/add", options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  export async function deleteComment(comment_id, callback) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_id: comment_id
      }),
    };
  
    fetch(API_URL + "/comments/delete", options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
