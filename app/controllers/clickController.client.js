'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'https://my-clementine-js-ruja.c9users.io/api/clicks';
   
   function ready (fn) { //function to execute other function only if document is completely loaded
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () { // check if readyState is 4, then execute callback on response
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
   
   function updateClickCount (data) { //callbackfunction to update clicknumber-span
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
   
   ready(ajaxRequest('GET', apiUrl, updateClickCount)); //using the ready function from above to send request for number of clicks and then update clicknumber-span
   
   addButton.addEventListener('click', function () { //on addbutton-click send a post-request then update clicknumber as callback
      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount)
      });

   }, false);
    
     deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);
    
})();