<!--Import all js files from assets/js-->
<?php
    $JSfiles = glob("assets/js/*.js");
    foreach($JSfiles as $file){
        echo "<script src=\"$file\"></script>";
    }
?>