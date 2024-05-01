<?php
    class Database{
        //database constants
        private const servername = "localhost";
        private const username = "root";
        private const password = "root";
        private const dbname = "pdtnsaDB";

        //instance variabels
        private static $connection;

        public static function connect(){
            self::$connection =  new mysqli(self::servername, 
                                            self::username, 
                                            self::password, 
                                            self::dbname
            );

            if(self::$connection->connect_error){
                die("Connection failed: " . self::$connection->connect_error);
            }
        }

        public static function getUserPermissions(){
            return ["Brother", "Executive", "WebMasterHistorian", "PhikeiaEducator", "Secretary"];
        }

        public static function checkPassword($username, $password){
            if($username==="asd"){
                return true;
            }

            return false;
        }


    }


?>