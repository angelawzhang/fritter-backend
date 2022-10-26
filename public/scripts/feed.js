/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

 function viewFeedByUser() {
    fetch('/api/feed')
      .then(showResponse)
      .catch(showResponse);
  }

  function viewFeedWithGenre(fields) {
    fetch(`/api/feed?genre=${fields.genre}`)
      .then(showResponse)
      .catch(showResponse);
  }

  function addGenre(fields) {
    fetch(`/api/feed/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function createFeed(fields) {
    fetch('/api/feed', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
