function Executive_Meeting(){
  
  formConfig = {"Executive Meeting Minutes" : {"type": "h1"},
                "Attendance" : {"type" : "attendance", "group" : "Executive"},
                "Reports of Officers" : {"type": "textarea"},
                "General Buisness" : {"type": "textarea"},
                "Closed Buisness" : {"type" : "customDropDown"}
  };

  //clear main to get ready to display the form
  let main = document.querySelector('main');
  main.innerHTML = '';

  //get the script to create the form
  let script = document.createElement("script");
  script.src = "assets/actions/CreateForm.js";
  main.appendChild(script);

  //once the script is loaded create the form
  script.onload = function() {
    CreateForm(main, "backend/submitForm.php", formConfig, );
  };
}