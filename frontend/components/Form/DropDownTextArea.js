/**
   * Appends a drop down text area 
   */
#dropDownTextarea = {type: "dropDownTextarea", count: 0};
dropDownTextarea(labelText){
  
  //add drop down button
  var button = document.createElement("div");
  button.className = this.#dropDownTextarea.type;
  this.#form.insertBefore(button, this.#submitButton);

  //add text to button
  let p = document.createElement("p");
  p.style.margin = "0";
  p.style.padding = "0";
  p.innerText = "+"+labelText;
  button.appendChild(p);

  //add drop down functionality
  button.addEventListener("click",()=>{

    //get the element after the button
    let elementAfterButton = button.nextElementSibling;

    //check if its a label. If not a label or its not the corresponding one then add the text area
    let labelAfterButton = elementAfterButton.querySelector("label");
    if(!labelAfterButton || labelAfterButton.innerText!==labelText){
      this.textarea(labelText, button);
      return;
    }

    //if the label does exsist and its the corresponding one prompt the user if they want to remove it
    if(confirm("Are you sure you want to remove this procedure?")){
      elementAfterButton.remove()
    }
  });
}