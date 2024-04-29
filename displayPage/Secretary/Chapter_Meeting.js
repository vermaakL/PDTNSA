/**
 *REQUIRES CreateForm(formConfig, backendDestination) FROM assets/actions/CreateForm.js
*/
function Chapter_Meeting(){

  formConfig = {"Chapter Meeting Minutes" : {"type": "h1"},
                "Calling the Role" : {"type" : "attendance", "group" : "actives"},
                "Reading and Adopting the Minutes" : {"type" : "textarea"},
                "Initation Affiliation or Reception Ceremony" : {"type" : "customDropDown"},
                "Literary Exercises" : {"type" : "customDropDown"},
                "Proposals For Membership" : {"type" : "customDropDown"},
                "Reports of Officers" : {"type": "textarea"},
                "Reading Correspondence" : {"type" : "customDropDown"},
                "Election or Installation of Officers" : {"type" : "customDropDown"},
                "Reports of Committes" : {"type": "textarea"},
                "General Buisness" : {"type": "textarea"},
                "Memorial Ceremony" : {"type" : "customDropDown"}
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
  }
}