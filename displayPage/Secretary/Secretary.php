<?php
    class Secretary{
        public static $oldWorkingDirectory;
        public static $relativeDirectoryPath;

        public static function init(){
            self::$oldWorkingDirectory = getcwd();
            self::$relativeDirectoryPath = str_replace($_SERVER['DOCUMENT_ROOT'], '', __DIR__);
            
            chdir(dirname(__FILE__));
        }
        public static function ret(){
            chdir(self::$oldWorkingDirectory);
        }
    }
    Secretary::init();
?>

<!--declare functions for creating Elements--> 
<?php 
    /**
     * Create the secretary menue buttons
     */
    function SecretaryaddMenuButtons(){
        $files = glob(".\actions\*.js");
        foreach($files as $file){
            $file = pathinfo($file, PATHINFO_FILENAME);
            $name = str_replace('_', ' ', $file);
            
            echo "<button type=\"button\" onclick=\"$file()\" class=\"mainMenu\">$name</button>\n";
        }
    }

    /**
     * Add the java script files that the secretary requires
     */
    function AddJsFiles(){
        $files = glob(".\actions\*.js");
        foreach($files as $file){
            $path = Secretary::$relativeDirectoryPath.$file;

            echo "<script src=\"$path\"></script>\n";
        }
    }
?>

<!--call web elements functions-->
<?php
    SecretaryaddMenuButtons();
    AddJsFiles();
?>

<?php Secretary::ret();?>