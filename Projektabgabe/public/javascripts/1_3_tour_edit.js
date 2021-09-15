let toEdit; 


function getElement(arg) {
  toEdit = arg; 
}



/** 
//das ist bisher alles nur aus dem Internet kopiert
// https://getbootstrap.com/docs/5.0/components/list-group/
var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})



//You can activate individual list item in several ways:

var triggerEl = document.querySelector('#myTab a[href="#profile"]')
bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name

var triggerFirstTabEl = document.querySelector('#myTab li:first-child a')
bootstrap.Tab.getInstance(triggerFirstTabEl).show() // Select first tab


function show() {
  alert("Test")
}
*/