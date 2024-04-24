/**
 * To-Do
 * 

 * 1)Store the form data on local storage if user leaves page. Restore when they come back.
 * 2)Custom auto fill
 */

/**
 * requires the generateAttendance(appendTo) from generateAttendance.js
 */
function Chapter_Meeting(){

  

  /**
   * outputs form for regular meeting
   */
  document.querySelector('main').innerHTML = `
    <style>
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
    </style>

    <form action="" autocomplete="off">
      <h1 id="ChapterMeetingFormHeader">Chapter Meeting Minutes</h1>
      <br>
      
      <label id="attendanceTitle">Calling the Role</label>

      <div class="formTextBox" id="readingAndAdoptingTheMinutesDiv">
        <label for="readingAndAdoptingTheMinutes">Reading and Adopting the Minutes</label>
        <br>
        <textarea id="readingAndAdoptingTheMinutes" name="readingAndAdoptingTheMinutes"></textarea>
        <br>
      </div>

      <div class="addProcedure", id="addInitationAffiliationOrReceptionCeremony">
        <p style="margin: 0; padding: 0;">+ Initation Affiliation Or Reception Ceremony</p>
      </div>

      <div class="addProcedure", id="addLiteraryExercises">
        <p style="margin: 0; padding: 0;">+ Literary Exercises</p>
      </div>

      <div class="addProcedure", id="addProposalsForMembership">
        <p style="margin: 0; padding: 0;">+ Proposals for Membership</p>
      </div>

      <div class="formTextBox" id="reportsOfOfficersDiv">
        <label for="reportsOfOfficers">Reports of Officers</label>
        <br>
        <textarea id="reportsOfOfficers" name="reportsOfOfficers"></textarea>
        <br>
      </div>

      <div class="addProcedure", id="addReadingCorrespondence">
        <p style="margin: 0; padding: 0;">+ Reading Correspondence</p>
      </div>
      
      <div class="addProcedure", id="addElectionOrInstallationOfOfficers">
        <p style="margin: 0; padding: 0;">+ Election or Installation of Officers</p>
      </div>

      <div class="formTextBox" id="reportsOfCommittesDiv">
        <label for="reportsOfCommittes">Reports of Committes</label>
        <br>
        <textarea id="reportsOfCommittes" name="reportsOfCommittes"></textarea>
        <br>
      </div>

      <div class="formTextBox" id="generalBuisnessDiv">
        <label for="generalBuisness">General Buisness</label>
        <br>
        <textarea id="generalBuisness" name="generalBuisness"></textarea>
        <br>
      </div>

      <div class="addProcedure", id="addMemorialCeremony">
        <p style="margin: 0; padding: 0;">+ Memorial Ceremony</p>
      </div>

      <input id="submit" type="submit" value="Submit">
    </form>
  `;

  

  /**
   * Add procedures that arn't used often during regular meetings
  */
  function handleSpecialProcedures(){

    //iterate through all the addProcedure divs make them trigger insertSpecialProcedures onclick
    let addProcedureButtons = document.getElementsByClassName("addProcedure");
    Array.from(addProcedureButtons).forEach(function(procedureButton){

      procedureButton.addEventListener("click", function(){
        insertSpecialProcedures(procedureButton);
      });
    });

    function insertSpecialProcedures(insertBelow){
      var specialProcedures =  {
        "InitationAffiliationOrReceptionCeremony": {
          "string": "Initation Affiliation or Reception Ceremony", 
          "insertBelowId": "readingAndAdoptingTheMinutes"
        },
        "LiteraryExercises": {
          "string": "Literary Exercises",
          "insertBelowId": "initationAffiliationOrReceptionCeremony"
        },
        "ProposalsForMembership": {
          "string": "Proposals For Membership",
          "insertBelowId": "literaryExercises"
        },
        "ReadingCorrespondence": {
          "string": "Reading Correspondence",
          "insertBelowId": "reportsOfOfficers"
        },
        "ElectionOrInstallationOfOfficers": {
          "string": "Election or Installation of Officers",
          "insertBelowId": "readingCorrespondence"
        },
        "MemorialCeremony": {
          "string": "Memorial Ceremony",
          "insertBelowId": "standingBuisness"
        }
      }
  
  
      
      let name = (insertBelow.id).replace("add", "");
  
      let currentElement = document.getElementById(name+"Div")
      if(currentElement){
        if(!confirm("Are you sure you want to remove this procedure?")){return;}
  
        currentElement.parentNode.removeChild(currentElement);
        return;
      }
  
      let html = `
        <div class="formTextBox slide-down" id=${name}Div>
          <label for="${name}">${specialProcedures[name]["string"]}</label>
          <br>
          <textarea id="${name}" name="${name}"></textarea>
          <br>
        </div>
      `;
      insertBelow.insertAdjacentHTML('afterend', html);
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

  /**
   * handels form submition
   */
  function handleFormSubmission(){
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      this.querySelector("input[type=submit]").remove();    
      var formData = {};
      formData["attendance"] = attendanceData;
      new FormData(event.target).forEach(function(value, key){
          formData[key] = value;
      });
  
      console.log(formData);
    });
  }
  
  //calls the generateAttendance function from generateAttendance.js and inserts the from beneth attendanceTitle
  var attendanceData = generateAttendance(document.getElementById("attendanceTitle"));

  handleSpecialProcedures();

  handleQualityOfLifeFeatures();

  handleFormSubmission();
}