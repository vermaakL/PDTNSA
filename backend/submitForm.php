<?php include_once "Database.php";?>

<?php
    function submitForm(){
        //get and save data
        $data = file_get_contents("php://input");
        file_put_contents("files/forms/asd.json", print_r($data, true));

        // Return a JSON response
        echo json_encode(array("status" => "success", "message" => "Form data processed successfully"));
    }

    function sendMetaDataFields(){
        echo json_encode(Database::getTableColumns("Forms"));
    }

    if($_SERVER["REQUEST_METHOD"] === "POST"){
        if(file_get_contents("php://input") === NULL){return;}
            
        submitForm();

        return;
    }
    
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        if(file_get_contents("php://input") === NULL){return;}
            
        sendMetaDataFields();

        return;
    }
?>
