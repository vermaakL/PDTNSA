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
                $fileName = pathinfo($file, PATHINFO_FILENAME);

                $funcName = preg_replace('/.*\)/', '', $fileName);//remove all chars before ')'
                $displayedName = str_replace('_', ' ', $funcName);//replace '_' with spaces
                
                echo "<button type=\"button\" onclick=\"$funcName()\" class=\"mainMenu\">$displayedName</button>\n";
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