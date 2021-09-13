function test() {
  var test2 = document.getElementById("data1")
  console.log(test2)
}

  function test3() {
    var testtest = document.getElementById("id1")
    testtest.addEventListener("click", function() {
      console.log(testtest)
    })
}

function test4() {
  var test = document.getElementById("id1"); 
  console.log(test)
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