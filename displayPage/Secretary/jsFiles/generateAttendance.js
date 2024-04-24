/**
 * To do
 * 
 * 1)create button to add guests to attendance
 */
function generateAttendance(appendTo){
  //Attendance data to return
  var attendanceData = {};
  
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
    let result = ["Adrian", "Nathan", "Vishosh", "Sister"];
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