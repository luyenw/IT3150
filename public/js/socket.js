const socket = io('/');

fetch('/', {
  method: 'GET'
})
.then(response => {
  var headerValue = response.headers.get('userId');
  console.log('The value of the X-Custom-Header header is: ' + headerValue);
})
.catch(error => {
  console.error(error);
});