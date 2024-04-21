<!DOCTYPE html>
<html lang="en">

<!--backend processing-->
<?php
    //recieve necessary data from backend server
    $backendResponse = json_decode('{"permissions" : ["Brother", "Executive", "WebMasterHistorian", "PhikeiaEducator", "Secretary"]}');

    //get and check the role the user needs to see in main.
    $role = end($backendResponse->permissions);
    if(isset($_GET['role'])){$role = $_GET['role'];}
    if(!in_array($role, $backendResponse->permissions)){$role = end($backendResponse->permissions);}
?>

<!--Head-->
<?php include "includes/head.php";?>

<body>
    <!--Header-->
    <?php include "includes/header.php";?>

    <!--main content generate for specified role from displayPage-->
    <main><?php include "displayPage/$role/$role.php";?></main>

    <!--Footer-->
    <?php include "includes/footer.php";?>
</body>

<!--import Reguired Js files-->
<?php include "includes/javaScriptFiles.php";?>
</html>