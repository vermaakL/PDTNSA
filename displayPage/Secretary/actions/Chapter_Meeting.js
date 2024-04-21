function Chapter_Meeting(){
  /**
   * outputs form for regular meeting
   */
  document.querySelector('main').innerHTML = `
    <style>
    main {
      all: initial;
    }
    </style>


    
    <form action="" autocomplete="off">
      <h1>Chapter Meeting Minutes</h1>

      <label for="callingTheRoll">Calling the Roll</label>
      <br>
      <textarea id="callingTheRoll" name="callingTheRoll"></textarea>
      <br>

      <label for="readingAndAdoptingTheMinutes">Reading and Adopting the Minutes</label>
      <br>
      <textarea id="readingAndAdoptingTheMinutes" name="readingAndAdoptingTheMinutes"></textarea>
      <br>

      <label for="reportsOfOfficers">Reports of Officers</label>
      <br>
      <textarea id="reportsOfOfficers" name="reportsOfOfficers"></textarea>
      <br>

      <label for="reportsOfCommittes">Reports of Committes</label>
      <br>
      <textarea id="reportsOfCommittes" name="reportsOfCommittes"></textarea>
      <br>

      <label for="generalBuisness">General Buisness</label>
      <br>
      <textarea id="generalBuisness" name="generalBuisness"></textarea>
      <br>

      <label for="standingBuisness">Standing Buisness</label>
      <br>
      <textarea id="standingBuisness" name="standingBuisness"></textarea>
      <br>

      <input type="submit" value="Submit">
    </form>
  `;

  var specialProcedures =  {
    "initationAffiliationOrReceptionCeremony": {
      "string": "Initation Affiliation or ReceptionCeremony", 
      "insertBelowId": "readingAndAdoptingTheMinutes"
    },
    "literaryExercises": {
      "string": "Literary Exercises",
      "insertBelowId": "initationAffiliationOrReceptionCeremony"
    },
    "proposalsForMembership": {
      "string": "Proposals For Membership",
      "insertBelowId": "literaryExercises"
    },
    "readingCorrespondence": {
      "string": "Reading Correspondence",
      "insertBelowId": "reportsOfOfficers"
    },
    "electionOrInstallationOfOfficers": {
      "string": "Election or Installation of Officers",
      "insertBelowId": "readingCorrespondence"
    },
    "memorialCeremony": {
      "string": "Memorial Ceremony",
      "insertBelowId": "standingBuisness"
    }
  }

  /**
   * handels form submition
   */
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = {};
    new FormData(event.target).forEach(function(value, key){
        formData[key] = value;
    });

    console.log(formData);
  });
}   