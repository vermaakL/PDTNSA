<?php include_once "Database.php";?>

<?php
    //Initalize the cookie. Set automatic log out time due to inactivty to 2 weeks. Then start session
    ini_set('session.cookie_lifetime', 60*60*24*14);
    session_start();

    /**
     * Manage the users session. Controls permissions and site access 
     */
    class SessionManager{

        /**
         * Constructor. 
         * Called after including session manager to intalize the session global var.
         * 
         * @return role users current displayPage role
         */
        public static function init(){
            self::regenerateSessionId();
            return self::verifyUserRole();
        }

        /**
         * Handels login requests to the site. 
         * Verfies the user with the database
         */
        public static function login(){
            $username = $_POST["username"];
            $password = $_POST["password"];

            //check if its a valid username and password
            if(!Database::checkPassword($username, $password)){
                header("Location: ../login.php?failedLogin=1");
                return;
            }

            //get user from DB. The redirect to main page
            $_SESSION['user'] = Database::getUser();
            if(isset($_SESSION['user']['permissions'])){
                header("Location: ../main.php");
            }
        }
        
        /**
         * Handels logout requests. 
         * Deletes cookies and session data then redirects user to login page
         */
        public static function logout(){
            //delete session cookie
            setcookie(session_name(), '', 0, '/');

            //destory server session
            $_SESSION = array();
            session_destroy();
            
            //redirect to login page
            header('Location: ../login.php');
        }

        /**
         * Prevents cookie theft by being called in init.
         */
        private static function regenerateSessionId(){
            //check if new session. If so just set the time
            if(!isset($_SESSION['lastRegenTime'])){
                $_SESSION['lastRegenTime'] = time();
                return;
            }

            //check how old the session is. Return if less than 24 hours
            $timeElapsed = time() - $_SESSION['lastRegenTime'];
            if($timeElapsed < 60*60*24){return;}

            //if session older than 24 hours refresh session
            session_regenerate_id(true);
            $_SESSION['lastRegenTime'] = time();
        }

        /**
         * Ensures the user is verfied to vist the page they are on by being called in init.
         */
        private static function verifyUserRole(){
            //check if user is initalized. If logout the user
            if(!isset($_SESSION['user'])){
                if($_SERVER['PHP_SELF']!="/login.php"){
                    self::logout();
                }
                return;
            }

            //get the users role from their permissions
            $userPermissions = $_SESSION['user']['permissions'];
            $role = end($userPermissions);
            if(isset($_GET['role'])){$role = $_GET['role'];}
            if(!in_array($role, $userPermissions)){$role = end($userPermissions);}

            //if user not on main site direct to main site
            if($_SERVER['PHP_SELF']!="/main.php"){
                header("Location: ../main.php");
            }

            return $role;
        }
    }
    
    //listen for login/out submit buttons
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if($_POST["function"]==="login"){SessionManager::login();}
        if($_POST["function"]==="logout"){SessionManager::logout();}
    }
?>