<?php 
    include_once "backend/SessionManager.php";
    $role = SessionManager::init();
?>

<!DOCTYPE html>
<html lang="en">
    <!-- include <head> -->
    <?php include_once "include/head.php"; ?>

    <body>
        <header id="mainHeader">
            <!--Add icon to header. It links to the users highest permission-->
            <a href="page.php">
                <img id="headerIcon" src="assets/images/NSAicon.png" alt="NSA icon">
            </a>
            
            <!--Add heading to header. It links the user to the main page of that role-->
            <a id="headerTitle" href="page.php?role=<?php echo $role?>">
                <h1><?php echo $role;?></h1>
            </a>

            <!--Creates the nav bar from the permissions the user has-->
            <nav>
                <ul><?php
                    foreach($_SESSION['permissions'] as $permission){
                        echo "<li><a href=\"page.php?role=$permission\">$permission</a></li>";
                    }
                ?></ul>
            </nav> 
            
            <form action="backend/SessionManager.php" method="post" id="logoutForm">
                <input type="hidden" name="function" value="logout">
                <button id="logout">Logout</button>
            </form>   
        </header>

        <!--main content generate for specified role from displayPage-->
        <main><?php include_once "displayPage/$role/$role.php";?></main>

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