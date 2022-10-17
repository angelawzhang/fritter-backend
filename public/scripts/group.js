/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

 function viewAllGroups() {
    fetch('/api/groups')
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewGroupbyId(fields) {
    fetch(`/api/groups?name=${fields.name}`)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function createGroup(fields) {
    fetch('/api/groups', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
//   function editFreet(fields) {
//     fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
//       .then(showResponse)
//       .catch(showResponse);
//   }
  
//   function deleteFreet(fields) {
//     fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
//       .then(showResponse)
//       .catch(showResponse);
//   }
  