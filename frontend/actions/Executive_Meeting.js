function Executive_Meeting(){
  //clear main to get ready to display the form
  let main = document.querySelector('main');
  main.innerHTML = '';

  //get the script to create the form
  let script = document.createElement("script");
  script.src = "frontend/components/Form.js";
  main.appendChild(script);

  //once the script is loaded create the form
  script.onload = ()=>{
    let form = new Form("Executive Meeting Minutes");

    let attendance = ["Gabe", "Leon", "Dakoda", "Aryaman", "Matt", "jamie", "jordon"];
    form.attendance("Calling the Role", attendance);

    form.textarea("Reports of Officers");

    form.textarea("General Buisness");

    form.dropDownTextarea("Closed Buisness");

    form.display(main);
  };
}