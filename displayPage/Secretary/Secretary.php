<?php
    class Secretary{
        private static $relativeDirPath;

        //call to intalize class
        public static function init(){
            //saves the relative path to the current folder from the root
            self::$relativeDirPath = str_replace(getcwd().'\\', '', __DIR__);
        }

        //adds the menu buttons to execute the actions
        public static function addMenuButtons(){
            $files = glob(self::$relativeDirPath."/*.js");
            foreach($files as $file){
                $file = pathinfo($file, PATHINFO_FILENAME);
                $name = str_replace('_', ' ', $file);
                
                echo "<button type=\"button\" onclick=\"$file()\" class=\"mainMenu\">$name</button>\n";
            }
        }

        //adds the js files that the buttons trigger
        public static function addJsFiles(){
            $files = glob(self::$relativeDirPath."/*.js");
            foreach($files as $file){
                echo "<script src=\"$file\"></script>\n";
            }
        }
    }

    //call stack
    Secretary::init();
    Secretary::addMenuButtons();
    Secretary::addJsFiles();
?>