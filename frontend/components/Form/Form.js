/**
 * REQUIRES: USER global var for metadata generation
 */
class CreateForm{
  static #formCounter = 0;
  #form;
  #data = {};
  #metaData = {};

  /**
   * Creates a form with a title
   * @param {String} title The Forms Title
   */
  constructor(title){
    //create form
    this.#form = document.createElement("form");
    this.#form.id = "Form"+CreateForm.#formCounter;
    this.#form.className = "CreateForm";
    this.#form.action = "backend/submitForm.php";
    this.#form.method = "post"

    //add form title
    let heading = document.createElement("h1");
    heading.innerHTML = title;
    this.#form.appendChild(heading);
  }

  /**
   * Displayes the Form within the parent node
   * @param {Node} parent The element to apend the form inside of. It is recommended that its empty
   */
  display(parent){
    this.#handelSubmitButton();

    parent.appendChild(this.#form);
    CreateForm.#formCounter++;
  }

  appendChild(child){
    this.#form.appendChild(child);
  }

  /**
   * Creates the submit button and handels the submisson process
   */
  #handelSubmitButton(){
    //add form submit button to the end
    let submitButton = document.createElement("input");
    submitButton.className = "submit";
    submitButton.type = "submit";
    submitButton.value = "Submit";
    this.#form.appendChild(submitButton);

    //handle form submission
    this.#form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      //parse form data into json and add custom data
      this.#formData["attendance"] = this.#attendanceData;
      this.#formData["metaData"] = this.#generateMetaData();
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

      //remove submit button
      submitButton.remove();
    });

    this.#form.addEventListener('submit', (event) => {
      
    });
  }
}