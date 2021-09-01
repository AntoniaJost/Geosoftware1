var ergebnis = searchOutput;
console.log(ergebnis)

function returnResult(){
    var input = document.getElementById("search").value;
    alert (input);
    console.log(input);
}

function returnResult2(){
    var inputHeader = document.getElementById("search2").value;
    alert (inputHeader);
    console.log(inputHeader);
}

/*$(document).ready(function(){              
    $("#searchDB").click(function(){
        $(document).ready(function(){
            //console.log(data) 
        })
    })
})

$('.save_form').on('click', '[type=submit]', function(event) {
    event.preventDefault();
    var submitbutton = $(this).attr('id');
    var formDetails = $(this).closest('form');
    var formID = formDetails.attr('id');
    var fileurl = formDetails.attr('action');
    console.log(submitbutton);
  });*/