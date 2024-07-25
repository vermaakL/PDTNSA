<!--Call session manager to verify user-->
<?php 
    include_once "backend/SessionManager.php";
    $role = SessionManager::init();
?>

<!--JS page globals-->
<script>
    //get all the user data
    const USER = JSON.parse('<?php echo json_encode($_SESSION['user']);?>');
</script>

<!DOCTYPE html>
<html lang="en">
    <!-- include <head> -->
    <?php include_once "frontend/head.html"; ?>

    <body>
        <header id="mainHeader">
            <!--Add icon to header. It links to the users highest permission-->
            <a href="page.php">
                <img id="headerIcon" src="frontend/images/NSAicon.png" alt="NSA icon">
            </a>
            
            <!--Add heading to header. It links the user to the main page of that role-->
            <a id="headerTitle" href="page.php?role=<?php echo $role?>">
                <h1><?php echo $role;?></h1>
            </a>

            <!--Creates the nav bar from the permissions the user has-->
            <nav>
                <ul><?php
                    foreach($_SESSION['user']['permissions'] as $permission){
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
        <main>
            <?php
                
                $actions = ["assets"];

                //adds the menu buttons to execute the actions
                function addMenuButtons(){
                    $files = glob("frontend/actions/*.js");
                    foreach($files as $file){
                        $fileName = pathinfo($file, PATHINFO_FILENAME);

                        $funcName = preg_replace('/.*\)/', '', $fileName);//remove all chars before ')'
                        $displayedName = str_replace('_', ' ', $funcName);//replace '_' with spaces
                        
                        echo "<button type=\"button\" onclick=\"$funcName()\" class=\"mainMenu\">$displayedName</button>\n";
                    }
                }

                //adds the js files that the buttons trigger
                function addJsFiles(){
                    $files = glob("frontend/actions/*.js");
                    foreach($files as $file){
                        echo "<script src=\"$file\"></script>\n";
                    }
                }
                

                //call stack
                addMenuButtons();
                addJsFiles();
            ?>
        </main>

        <footer>
            <img id="footerIcon" 
                src="frontend/images/phiDeltDal.png" 
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