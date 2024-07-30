/**
 * REQUIRES: USER global var for metadata generation
 */
class Form{
  static #formID = 0;
  #formDOM;
  #formData = {};

  /**
   * Creates a form with a title
   * @param {String} title The Forms Title
   */
  constructor(title){
    //create form
    this.#formDOM = document.createElement("form");
    this.#formDOM.id = "Form"+Form.#formID;
    this.#formDOM.className = "CreateForm";
    this.#formDOM.action = "backend/submitForm.php";
    this.#formDOM.method = "post"

    //add form title
    let heading = document.createElement("h1");
    heading.innerHTML = title;
    this.#formDOM.appendChild(heading);
  }

  /**
   * Displayes the Form within the parent node
   * @param {Node} parent The element to apend the form inside of. It is recommended that its empty
   */
  display(parent){
    //add submit button
    let submitButton = document.createElement("input");
    submitButton.className = "submit";
    submitButton.type = "submit";
    submitButton.value = "Submit";
    this.#formDOM.appendChild(submitButton);

    //handle form submission
    this.#formDOM.addEventListener('submit', (event) => {
      event.preventDefault();
      
      //parse form data into json and add custom data
      this.#formData["metaData"] = USER;
      new FormData(event.target).forEach((value, key) => {
        this.#formData[key] = value;
      });

      //send form data to backend
      fetch(event.target.action, {
        method: 'POST',
        body: JSON.stringify(this.#formData)
      })
      .then(response => {})
      .then(json => {})
      .catch(error => {});
    });

    parent.appendChild(this.#formDOM);
    Form.#formID++;
  }

  /**
 * Creates a div to contain an element based on its type
 * @param {JSON} typeInfo 
 * @returns the div
 */
  #createContainer(typeInfo){
    let div = document.createElement("div");
    div.className = typeInfo.type + "Container";

    return div;
  }

  /**
   * Generates the items ID
   * @param {JSON} typeInfo 
   * @returns the string containing the Id
   */
  #generateId(typeInfo){
    return this.#formDOM.id + typeInfo.type + typeInfo.count;
  }

  /**
   * Converts the label text into the data text for the forms submit
   * @param {String} labelText The label text displayed on the page
   * @returns The data name
   */
  #generateDataName(labelText){
    return labelText.replace(/ /g, "_");
  }

  /**
   * Appends a text area to the form.
   */
  #textarea = {type: "textarea", count: 0};
  textarea(labelText, appendAfter){
    var container = this.#createContainer(this.#textarea);
    var inputId = this.#generateId(this.#textarea);
    var dataName = this.#generateDataName(labelText);
    
    //create the textareas label
    let label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    container.appendChild(label);

    //create the textarea
    let textarea = document.createElement("textarea");
    textarea.name = dataName;
    textarea.id = inputId;
    container.appendChild(textarea);

    if(appendAfter){
      //append after the element provided
      appendAfter.insertAdjacentElement('afterend', container);
    }else{
      //append the text area to the end of the form
      this.#formDOM.appendChild(container);
    }

    //center textarea on focus
    textarea.addEventListener("focus", function(){
      var rect = this.getBoundingClientRect();
      var position = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);

      window.scrollTo({ top: position, behavior: 'smooth' });
    });


    this.#textarea.count++;
  }

  /**
   * Appends a drop down text area 
   */
  #dropDownTextarea = {type: "dropDownTextarea", count: 0};
  dropDownTextarea(labelText){
    
    //add drop down button
    var button = document.createElement("div");
    button.className = this.#dropDownTextarea.type;
    this.#formDOM.appendChild(button);

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

  /**
   * Appends an attendance box to the form
   */
  attendance(title, attendies){

    /**
     * Handels button animation and sizes. When the button is pressed.It resizes the button
     * and returns the data from the click.
     * @param {String} name 
     * @param {String} status 
     */
    const handelButtonClick = (name, status)=>{
      const adjustButtonCSS = ()=>{
        let onlineButtonWidth = document.getElementById(name+"onlineButton").offsetWidth;     
        let inPersonButtonWidth = document.getElementById(name+"inPersonButton").offsetWidth;     
        let totalWidth = document.getElementById(name+"onlineButton").parentNode.offsetWidth;

        if(status === "onlineButton"){
          if(onlineButtonWidth > inPersonButtonWidth){
            onlineButtonWidth = totalWidth/2;
            inPersonButtonWidth = totalWidth/2;
            document.getElementById(name+"onlineButton").parentElement.parentElement.style.border = "none";
          }else{
            onlineButtonWidth = totalWidth*(80/100);
            inPersonButtonWidth = totalWidth*(20/100);
            document.getElementById(name+"onlineButton").parentElement.parentElement.style.border = "solid";
            document.getElementById(name+"onlineButton").parentElement.parentElement.style.borderColor = "var(--azure)";
          }
        }else if(status === "inPersonButton"){
          if(inPersonButtonWidth > onlineButtonWidth){
            onlineButtonWidth = totalWidth/2;
            inPersonButtonWidth = totalWidth/2;
            document.getElementById(name+"onlineButton").parentElement.parentElement.style.border = "none";
          }else{
            inPersonButtonWidth = totalWidth*(80/100);
            onlineButtonWidth = totalWidth*(20/100);
            document.getElementById(name+"onlineButton").parentElement.parentElement.style.border = "solid";
            document.getElementById(name+"onlineButton").parentElement.parentElement.style.borderColor = "var(--azure)";
          }
        }

        document.getElementById(name+"onlineButton").style.width = onlineButtonWidth+"px";
        document.getElementById(name+"inPersonButton").style.width = inPersonButtonWidth+"px";
      }
      adjustButtonCSS();
      
      let time = (new Date()).toLocaleString();
      
      if(!this.#formData["attendance"][name]){this.#formData["attendance"][name] = [];}
      this.#formData["attendance"][name].push({status, time});
    }

    /**
     * Add individual attendance boxs for each brother
    */
    const createButtonsForAttendies = ()=>{

      function createDiv(className){
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", className);
        
        return newDiv;
      }
      function createButton(attendie, type){
        let newButton = document.createElement("div");

        newButton.setAttribute("id", attendie+type);
        newButton.setAttribute("tabindex", "0");
        newButton.setAttribute("class", type);

        newButton.addEventListener("click", function(){handelButtonClick(attendie, type);})
        newButton.addEventListener("keydown", function(e){if (e.key === "Enter") {handelButtonClick(attendie, type);}});
        
        return newButton;
      }

      attendies.forEach(attendie => {
        let attendanceBox = createDiv("attendanceBox");
        attendance.appendChild(attendanceBox);

        let attendanceBoxHeading = document.createElement("p");
        attendanceBoxHeading.textContent = attendie;
        attendanceBox.appendChild(attendanceBoxHeading);

        let boxButton = createDiv("button");
        attendanceBox.appendChild(boxButton);

        let inPersonButton = createButton(attendie, "inPersonButton");
        inPersonButton.innerHTML = `
          <p>Present</p>
        `;
        boxButton.appendChild(inPersonButton);
        
        let onlineButton = createButton(attendie, "onlineButton");
        onlineButton.innerHTML = `
          <p>Online</p>
        `;
        boxButton.appendChild(onlineButton);
      });
    }

    /**
     * Create the button to add guests. If guest add add them to the attendance form.
     */
    const createButtonForGuests = ()=>{
      let asd = document.createElement("div");
      asd.setAttribute("class", "attendanceBox");

      attendance.appendChild(asd);
    }

    //create attendance form
    let attendance = document.createElement("div");
    attendance.id = this.#formDOM.id+"attendance";
    attendance.className = "attendance";
    this.#formDOM.appendChild(attendance);

    //attendance style
    let style = document.createElement("style");
    style.innerHTML =  `
      .attendance {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        background-color: white;

        margin: 1vh;
        border-radius: 10px;
        width: 90%;
      }
      
      .attendanceBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        margin: 2mm; 
        width: 7cm;
        height: 2cm;
        border-radius: 50px;
        
        background-color: var(--lightBlue);
      }
      
      .attendanceBox p{
        display:flex;
        margin: 0;
        text-align: center;
      }

      .button {
        display:flex;
        width: 95%;
        flex-grow: 1;
      }
      
      .inPersonButton {
        display:flex;
        justify-content: center;
        align-items: center;

        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;

        width: 50%;
        transition: all 0.5s ease;
        background-color: var(--gold);
        opacity: 0.8;
      }

      .onlineButton {
        display:flex;
        justify-content: center;
        align-items: center;

        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;

        width: 50%;
        transition: all 0.5s ease;
        background-color: var(--red);
        opacity: 0.9;
      }
    `;
    attendance.appendChild(style);

    //create the attendance label
    let label = document.createElement("label");
    label.textContent = title;
    this.#formDOM.insertBefore(label, attendance);

    createButtonsForAttendies();
    //createButtonForGuests();
  }
}