/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

 function viewAllLikes() {
    fetch('/api/likes')
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewLikesbyFreet(fields) {
    fetch(`/api/likes?freetId=${fields.id}`)
      .then(showResponse)
      .catch(showResponse);
  }

  function addLike(fields) {
    fetch(`/api/likes/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function createLikes(fields) {
    fetch('/api/likes', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  