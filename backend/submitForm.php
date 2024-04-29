<?php
    if($_SERVER["REQUEST_METHOD"] != "POST"){return;}
    if(file_get_contents("php://input") === NULL){return;}

    function saveFormToTxt($filePath){
        $data = file_get_contents("php://input");
        $decodedData = json_decode($data, true);
        file_put_contents($filePath, print_r($decodedData, true));

        // Return a JSON response
        echo json_encode(array("status" => "success", "message" => "Form data processed successfully"));
    }

    saveFormToTxt('files/form_data.txt');

?>
