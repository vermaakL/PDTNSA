/**
 * To-Do
 * 1)Store the form data on local storage if user leaves page. Restore when they come back.
 * 2)Custom auto fill
*/

/**    
 * Creates a form from the inputed JSON.
 * @param {JSON} formConfig
 * {"labelTitle" : {type : "HTMLElement", additional HTMLElement attributes....}}
 */
function CreateForm(appendTo, backendDestination, formConfig){

  //function global variables
  var form = document.createElement("form");
  var attendanceData

  /**
   * 
   * @param {*} formConfig 
   */
  function createForm(formConfig){

    //add form style to appendTo
    let style = document.createElement("style");
    style.innerHTML = `
      main {
        all: initial;
      }

      .formTextBox {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
      }

      .addProcedure {
        
        padding: 0;
        margin:0;
        margin-bottom: 10px;

        border-color: var(--azure);
        border-width: 2px;
        border-style: solid;
        border-radius: 100px;

        background-color: var(--lightBlue);
      }
    `;
    appendTo.appendChild(style);
    
    //add attributes to form and append to appendTo
    form.setAttribute("id", "myForm");
    form.setAttribute("action", backendDestination);
    form.setAttribute("method", "post");
    appendTo.appendChild(form);

    //add elements from formConfig
    for(let key in formConfig){

      let elementId = key.replace(/ /g, "");;
      let elementInfo = formConfig[key];

      if(elementInfo["type"]==="h1"){
        let h1 = document.createElement("h1");
        h1.innerText = key;

        form.appendChild(h1);
        continue;
      }

      if(elementInfo["type"]==="attendance"){
        let label = document.createElement("label");
        label.setAttribute("id", "attendanceTitle");
        label.textContent = key;
        form.appendChild(label);

        attendanceData = generateAttendance(label, elementInfo["group"]);
        continue;
      }

      if(elementInfo["type"]==="textarea"){

        //create textBoxDiv
        let div = document.createElement("div");
        div.setAttribute("class", "formTextBox");
        div.setAttribute("id", elementId+"Div");

        //create the textareas label
        let label = document.createElement("label");
        label.setAttribute("for", elementId);
        label.textContent = key;
        div.appendChild(label);

        //create the textarea
        let textarea = document.createElement("textarea");
        textarea.setAttribute("id", elementId);
        textarea.setAttribute("name", elementId);
        div.appendChild(textarea);

        //append the text area to the form
        form.appendChild(div);
        form.appendChild(document.createElement("br"));
        continue;
      }

      if(elementInfo["type"]==="customDropDown"){
        let addProcedureButton = document.createElement("div");
        addProcedureButton.className = "addProcedure";
        addProcedureButton.id = "add"+elementId;

        let p = document.createElement("p");
        p.id = "add"+elementId+"p";
        p.style.margin = "0";
        p.style.padding = "0";
        p.innerText = "+ "+key;
        addProcedureButton.appendChild(p);

        form.appendChild(addProcedureButton);
        continue;
      }

      
    }

    //add submit button
    let submit = document.createElement("input");
    submit.id = "submit";
    submit.type = "submit";
    submit.value = "Submit";
    form.insertAdjacentElement("beforeend", submit);
  }

  /**
   * @param {Node} appendTo 
   * The HTMLElement to append the attendance list beneth
   * @returns 
   */
  function generateAttendance(appendTo){
    //Attendance data to return
    attendanceData = {};

    //create attendance form
    let attendance = document.createElement("div");
    attendance.setAttribute("id", "attendance");

    //attendance form css
    attendance.innerHTML =  `
      <style>
        #attendance {
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
      </style>
    `;

    /**
     * request the name of expected people from the backend server
     */
    function serverResponse(){
      let result = ["Gabe", "Leon", "Dakoda", "Aryaman", "Matt", "jamie", "jordon"];
      return result;
    }

    /**
     * Add individual attendance boxs for each brother
    */
    function createButtonsForAttendies(brothers){
      function createDiv(className){
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", className);
        
        return newDiv;
      }
      function createButton(brother, type){
        let newButton = document.createElement("div");

        newButton.setAttribute("id", brother+type);
        newButton.setAttribute("tabindex", "0");
        newButton.setAttribute("class", type);

        newButton.addEventListener("click", function(){buttonClick(brother, type);})
        newButton.addEventListener("keydown", function(e){if (e.key === "Enter") {buttonClick(brother, type);}});
        
        return newButton;
      }

      brothers.forEach(brother => {
        let attendanceBox = createDiv("attendanceBox");
        attendance.appendChild(attendanceBox);

        let attendanceBoxHeading = document.createElement("p");
        attendanceBoxHeading.textContent = brother;
        attendanceBox.appendChild(attendanceBoxHeading);

        let boxButton = createDiv("button");
        attendanceBox.appendChild(boxButton);

        let inPersonButton = createButton(brother, "inPersonButton");
        inPersonButton.innerHTML = `
          <p>Present</p>
        `;
        boxButton.appendChild(inPersonButton);
        
        let onlineButton = createButton(brother, "onlineButton");
        onlineButton.innerHTML = `
          <p>Online</p>
        `;
        boxButton.appendChild(onlineButton);
      });
    }

    /**
     * Create the button to add guests. If guest add add them to the attendance form.
     */
    function createButtonForGuests(){
      let asd = document.createElement("div");
      asd.setAttribute("class", "attendanceBox");

      attendance.appendChild(asd);
    }

    /**
     * Handels button animation and sizes. When the button is pressed.It resizes the button
     * and returns the data from the click.
     * @param {String} name 
     * @param {String} status 
     */
    function buttonClick(name, status){
      function adjustButtonCSS(){
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
      
      if(!attendanceData[name]){attendanceData[name] = [];}
      attendanceData[name].push({status, time});
    }

    let brothers = serverResponse();

    createButtonsForAttendies(brothers);

    //createButtonForGuests();

    appendTo.after(attendance);

    return attendanceData;
  }

  /**
   * handels form submition
   */
  function handleFormSubmission(){
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      //parse form data into json and add attendance data
      var formData = {};
      formData["attendance"] = attendanceData;
      new FormData(event.target).forEach(function(value, key){
          formData[key] = value;
      });

      //send form data to backend
      fetch(event.target.action, {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => {})
      .then(json => {})
      .catch(error => {});

      //remove submit button
      this.querySelector("input[type=submit]").remove();
    });
  }

  /**
   * Add procedures that arn't used often during regular meetings
  */
  function handleCustomDropDown(){
    
    //iterate through all the addProcedure divs make them trigger insertSpecialProcedures onclick
    let addProcedureButtons = document.getElementsByClassName("addProcedure");
    Array.from(addProcedureButtons).forEach(function(procedureButton){

      procedureButton.addEventListener("click", function(){
        insertCustomDropDown(procedureButton);
      });
    });

    function insertCustomDropDown(insertBelow){
      dropDownId = (insertBelow.id).replace("add", "");

      //check if already exsists. If so, prompt user to ask if they want to remove it.
      let currentElement = document.getElementById(dropDownId+"Div")
      if(currentElement){
        
        if(!confirm("Are you sure you want to remove this procedure?")){return;}
  
        currentElement.parentNode.removeChild(currentElement);
        return;
      }
      
      let labelString = insertBelow.querySelector("p").innerText.replace("+", "");

      let div = document.createElement("div");
      div.className = "formTextBox"
      div.id = dropDownId+"Div";
      div.innerHTML = `
        <label for="${dropDownId}">${labelString}</label>
        <br>
        <textarea id="${dropDownId}" name="${dropDownId}"></textarea>
        <br>
      `;



      insertBelow.insertAdjacentElement("afterend", div);
    }
  }

  /**
   * A container for storing features that enhance the user interface experience.
   */
  function handleQualityOfLifeFeatures(){

    function addListenersToTextAreas(){
      let textareas = document.querySelectorAll("textarea");

      textareas.forEach(function(textarea){
        textarea.addEventListener('focus', centerTextAreas);
        textarea.addEventListener('keyup', textAreaAutoComplete);
      });
    }
    addListenersToTextAreas();

    /**
     * Centers the textarea that the user focuses on
     */
    function centerTextAreas(){
      var rect = this.getBoundingClientRect();
      var position = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);

      window.scrollTo({ top: position, behavior: 'smooth' });
    }

    /**
     * 
     */
    function textAreaAutoComplete(){
      console.log(this.innerHTML);
    }

    /**
     * esures the page always loads at the top
     */
    function loadAtTopOfPage(){
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
    }

    loadAtTopOfPage();
  }

  //function call stack
  createForm(formConfig);
  handleFormSubmission();
  handleCustomDropDown();
  handleQualityOfLifeFeatures();
}