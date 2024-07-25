/**
 * Appends a text area to the form.
 */
class TextArea{
    #textarea = {type: "textarea", count: 0};

    constructor(){
        let container = document.createElement("div");
        

    }

    textarea(labelText, appendAfter) {
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
        //append the text area to the form above the submit button
        this.#form.insertBefore(container, this.#submitButton);
    }

    //center textarea on focus
    textarea.addEventListener("focus", function(){
        var rect = this.getBoundingClientRect();
        var position = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);

        window.scrollTo({ top: position, behavior: 'smooth' });
    });


    this.#textarea.count++;
    }
    
}

#textarea = {type: "textarea", count: 0};
    textarea(labelText, appendAfter) {
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
        //append the text area to the form above the submit button
        this.#form.insertBefore(container, this.#submitButton);
    }

    //center textarea on focus
    textarea.addEventListener("focus", function(){
        var rect = this.getBoundingClientRect();
        var position = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);

        window.scrollTo({ top: position, behavior: 'smooth' });
    });


    this.#textarea.count++;
    }

