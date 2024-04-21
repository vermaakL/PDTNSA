<head>
    <title><?php echo (substr(basename($_SERVER["PHP_SELF"]), 0, -4));?></title> 
    <link rel="icon" type="image/x-icon" href="../assets/images/NSA icon.png">
    
    <meta charset="UTF-8">
    <meta name="PDTNSA" content="Nova Scotia Alpha Internal site">
    <meta name="keywords" content="PDTNSA, NSA">
    <meta name="author" content="Leon Vermaak">
    
    <!--Import all css files from assets/css-->
    <?php
        $CSSfiles = glob("assets/css/*.css");
        foreach($CSSfiles as $file){
            echo "<link rel=\"stylesheet\" href=\"$file\">";
        }
    ?>
</head>