/**
   * Appends an attendance box to the form
   */
#attendanceData = {};
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
    
    if(!this.#attendanceData[name]){this.#attendanceData[name] = [];}
    this.#attendanceData[name].push({status, time});
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
  attendance.id = this.#form.id+"attendance";
  attendance.className = "attendance";
  this.#form.insertBefore(attendance, this.#submitButton);

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
  this.#form.insertBefore(label, attendance);

  createButtonsForAttendies();
  //createButtonForGuests();
}