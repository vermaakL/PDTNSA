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
            return;

            if(isset(self::$connection)){return;}
            
            self::$connection =  new mysqli(self::servername, 
                                            self::username, 
                                            self::password, 
                                            self::dbname
            );

            if(self::$connection->connect_error){
                die("Connection failed: " . self::$connection->connect_error);
            }
        }

        public static function getUser(){
            $result = [];

            $result["bond"] = 1130;
            $result["firstName"] = "Leon";
            $result["lastName"] = "Vermaak";
            $result["email"] = "lvermaak.2002@gmail.com";
            $result["phone"] = "19022297122";

            $result["position"] = "Secretary";
            $result["permissions"] = self::getRolePermissions("Secretary");

            return $result;
        }

        public static function getRolePermissions($position){
            if($position=="Secretary"){
                return ["Brother", "Executive", "WebMasterHistorian", "PhikeiaEducator", "Secretary"];
            }
        }

        public static function checkPassword($username, $password){
            if($username==="asd"){
                return true;
            }

            return false;
        }

        public static function getTableColumns($table){
            
            if($table=="Forms"){
                return ["FormID", "Bond", "PositionID", "Date", "EventId"];
            }
        }

    }

    Database::connect();
?>