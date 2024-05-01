<?php include_once "Database.php"; ?>

<?php
    ini_set('session.cookie_lifetime', 60*60*24*14);
    session_start();

    class SessionManager{
        public static function init(){
            self::regenerateSessionId();
            return self::getUsersRole();
        }

        public static function login(){
            $username = $_POST["username"];
            $password = $_POST["password"];

            //check if its a valid username and password
            if(!Database::checkPassword($username, $password)){
                header("Location: ../login.php?failedLogin=1");
                return;
            }

            $_SESSION['permissions'] = Database::getUserPermissions();
            header("Location: ../page.php");
        }
        
        public static function logout(){
            //clear sesson variables
            $_SESSION = array();

            //delete session cookie
            setcookie(session_name(), '', 0, '/');

            //destory server session
            session_destroy();

            //redirect to login page
            header('Location: ../login.php');
        }

        private static function regenerateSessionId(){
            if(!isset($_SESSION['lastRegenTime'])){
                $_SESSION['lastRegenTime'] = time();
                return;
            }

            $timeElapsed = time() - $_SESSION['lastRegenTime'];
            if($timeElapsed < 60*60*24){return;}

            session_regenerate_id(true);
            $_SESSION['lastRegenTime'] = time();
        }

        private static function getUsersRole(){
            //check if user has permissions. If not redirect to login
            if(!isset($_SESSION['permissions'])){
                if($_SERVER['PHP_SELF']!="/login.php"){
                    header("Location: ../login.php");
                }
                return;
            }
            
            //get the users role from their permissions
            $role = end($_SESSION['permissions']);
            if(isset($_GET['role'])){$role = $_GET['role'];}
            if(!in_array($role, $_SESSION['permissions'])){$role = end($_SESSION['permissions']);}

            //if user not on main site direct to main site
            if($_SERVER['PHP_SELF']!="/page.php"){
                header("Location: ../page.php");
            }

            return $role;
        }
    }
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if($_POST["function"]==="login"){SessionManager::login();}
        if($_POST["function"]==="logout"){SessionManager::logout();}
    }
?>