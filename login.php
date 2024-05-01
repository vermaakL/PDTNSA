<?php
    include_once "backend/SessionManager.php";
    SessionManager::init();
?>

<!DOCTYPE html>
<html lang="en">

<!-- include <head> -->
<?php include_once "include/head.php"; ?>

<style>
    body {
        display: flex;
        align-items: center;
        min-height:90vh;
    }

    #headerIcon {
        height:3cm;
    }

    #username, #password {
        font-size: x-large;
        width:90%;
    }

    #submit {
        background-color: var(--blue);
        min-width:20mm;
        width: 15vw;
        height: 7vh;
    }

    /*Make the button flash if the user fails to login */
    <?php
        if(isset($_GET['failedLogin'])){
            echo <<<CSS
                @keyframes flash {
                    0%, 100%{background-color: var(--blue);}
                    25%, 75% {background-color: var(--red);}
                }

                #submit {
                    animation: flash 0.75s linear 3;
                }
            CSS;
        }
    ?>
</style>

<body>
    <main>
        <form action="backend/SessionManager.php" method="post">
            <input type="hidden" name="function", value="login">

            <img id="headerIcon" src="assets/images/NSAicon.png" alt="NSA icon">
            <br>

            <label for="username">Bond Number</label>
            <input type="text" id="username" name="username">
            <br><br>

            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <br><br>

            <input type="submit" value="Login" id="submit">
        </form> 
    </main>
</body>

</html>