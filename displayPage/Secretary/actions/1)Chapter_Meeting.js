function Chapter_Meeting(){
  //clear main to get ready to display the form
  let main = document.querySelector('main');
  main.innerHTML = '';

  //get the script to create the form
  let script = document.createElement("script");
  script.src = "assets/actions/CreateForm.js";
  main.appendChild(script);

  //once the script is loaded create the form
  script.onload = ()=>{
    let form = new CreateForm("Chapter Meeting Minutes");

    let attendance = ["Gabe", "Leon", "Dakoda", "Aryaman", "Matt", "jamie", "jordon"];
    form.attendance("Calling the Role", attendance);

    form.textarea("Reading and Adopting the Minutes");
    form.dropDownTextarea("Initation Affiliation or Reception Ceremony");
    form.dropDownTextarea("Literary Exercises");
    form.dropDownTextarea("Proposals For Membership");
    form.textarea("Reports of Officers");
    form.dropDownTextarea("Reading Correspondence");
    form.dropDownTextarea("Election or Installation of Officers");
    form.textarea("Reports of Committes");
    form.textarea("General Buisness");
    form.dropDownTextarea("Memorial Ceremony");

    form.display(main)
  }
}



