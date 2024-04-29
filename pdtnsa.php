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

<head>
    <title><?php echo (substr(basename($_SERVER["PHP_SELF"]), 0, -4));?></title> 
    <link rel="icon" type="image/x-icon" href="../assets/images/NSAicon.png">
    
    <meta charset="UTF-8">
    <meta name="PDTNSA" content="Nova Scotia Alpha Internal site">
    <meta name="keywords" content="PDTNSA, NSA">
    <meta name="author" content="Leon Vermaak">
    
    <!--Import all css files from assets/css-->
    <?php
        $CSSfiles = glob("assets/css/*.css");
        foreach($CSSfiles as $file){
            echo "<link rel=\"stylesheet\" href=\"$file\">";
        }
    ?>
</head>

<body>
    <header id="mainHeader">
        
        <!--Add icon to header. It links to the users highest permission-->
        <a href="pdtnsa.php">
            <img id="headerIcon" src="assets/images/NSAicon.png" alt="NSA icon">
        </a>
        
        <!--Add heading to header. It links the user to the main page of that role-->
        <a id="headerTitle" href="pdtnsa.php?role=<?php echo $role?>">
            <h1><?php echo $role;?></h1>
        </a>

        <!--Creates the nav bar from the permissions the user has-->
        <nav>
            <ul><?php
                $permissions = $backendResponse->permissions;
                foreach($permissions as $permission){
                    echo "<li><a href=\"pdtnsa.php?role=$permission\">$permission</a></li>";
                }
            ?></ul>
        </nav> 
    </header>

    <!--main content generate for specified role from displayPage-->
    <main><?php include "displayPage/$role/$role.php";?></main>

    <footer>
        <img id="footerIcon" 
            src="assets/images/phiDeltDal.png" 
            alt='Phi Delta Theta Dalhousie University'
            onclick="scrollToTop()"
        >
    </footer>
</body>

<!--import Reguired Js files-->
<?php
    $JSfiles = glob("assets/js/*.js");
    foreach($JSfiles as $file){
        echo "<script src=\"$file\"></script>";
    }
?>
</html>