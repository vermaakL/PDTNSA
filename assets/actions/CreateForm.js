class CreateForm{
  static #formCounter = 0;
  
  #parent;
  #backendDestination;
  #formNum;

  #form;
  #submit;
  
  constructor(parent, backendDestination){
    this.#parent = parent;
    this.#backendDestination = backendDestination;
    this.#formNum = CreateForm.#formCounter;
    CreateForm.#formCounter++;

    //create form
    this.#form = document.createElement("form");
    this.#form.id = "Form"+this.#formNum;
    this.#form.className = "Form";
    this.#form.action = backendDestination;
    this.#form.method = "post"
    this.#parent.appendChild(this.#form);

    //add form submit button to the end
    this.#submit = document.createElement("input");
    this.#submit.className = "submit";
    this.#submit.type = "submit";
    this.#submit.value = "Submit";
    this.#form.appendChild(this.#submit);

    //call stack
    this.#handleFormSubmission();
    this.#handleQualityOfLifeFeatures();
  }

  h1(innerText){
    let h1 = document.createElement("h1");
    h1.innerText = innerText;

    this.#form.insertBefore(h1, this.#submit);
  }

  #textareaCount = 0;
  textarea(labelText){
    this.#textareaCount++;

    let className = "formTextArea";
    let id = this.#form.id+"textarea"+this.#textareaCount;

    //create textBoxDiv
    let div = document.createElement("div");
    div.setAttribute("class", className);

    //create the textareas label
    let label = document.createElement("label");
    label.for = id;
    label.textContent = labelText;
    div.appendChild(label);

    //create the textarea
    let textarea = document.createElement("textarea");
    textarea.for = id;
    textarea.name = id;
    textarea.id = id;
    div.appendChild(textarea);

    //append the text area to the form
    this.#form.insertBefore(div, this.#submit);
    this.#form.insertBefore(document.createElement("br"), this.#submit);
  }

  #dropDownTextareaCount = 0;
  dropDownTextarea(innerText){
    this.#dropDownTextareaCount++;

    let dropDownTextarea = document.createElement("div");
    dropDownTextarea.className = "formCustomDropDown";
    dropDownTextarea.id = this.#form.id+"customDropDown"+this.#dropDownTextareaCount;
    
    let p = document.createElement("p");
    p.style.margin = "0";
    p.style.padding = "0";
    p.innerText = "+ "+innerText;
    dropDownTextarea.appendChild(p);

    this.#form.insertBefore(dropDownTextarea, this.#submit);

    dropDownTextarea.addEventListener("click", function(){
      let dropDownId = dropDownTextarea.id+"dropDown";

      //check if already exsists. If so, prompt user to ask if they want to remove it.
      let currentElement = document.getElementById(dropDownId)
      if(currentElement){
        if(!confirm("Are you sure you want to remove this procedure?")){return;}
  
        currentElement.parentNode.removeChild(currentElement);
        return;
      }

      let div = document.createElement("div");
      div.className = "formTextArea";
      div.id = dropDownId;
      div.innerHTML = `
        <label for="${dropDownId}">${innerText}</label>
        <br>
        <textarea name="${innerText}"></textarea>
        <br>
      `;

      dropDownTextarea.insertAdjacentElement("afterend", div);
    });
  }

  #attendanceData;
  attendance(title, attendies){
    
    //create the attendance label
    let label = document.createElement("label");
    label.setAttribute("id", "attendanceTitle");
    label.textContent = title;
    this.#form.appendChild(label);



    //create attendance form
    let attendance = document.createElement("div");
    attendance.id = this.#form.id+"attendance";
    attendance.className = "attendance";

    //attendance form css
    attendance.innerHTML =  `
      <style>
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
      </style>
    `;

    /**
     * Add individual attendance boxs for each brother
    */
    function createButtonsForAttendies(){

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

        newButton.addEventListener("click", function(){buttonClick(attendie, type);})
        newButton.addEventListener("keydown", function(e){if (e.key === "Enter") {buttonClick(attendie, type);}});
        
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


    createButtonsForAttendies();
    //createButtonForGuests();

    this.#form.insertBefore(attendance, this.#submit);
  }

  /**
   * handels form submition
   */
  #handleFormSubmission(){
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
   * A container for storing features that enhance the user interface experience.
   */
  #handleQualityOfLifeFeatures(){

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

    function autoSaveForm(){
      
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
}