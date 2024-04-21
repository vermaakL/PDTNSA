<header id="mainHeader">
    
    <!--Add icon to header. It links to the users highest permission-->
    <a href="pdtnsa.php">
        <img id="headerIcon" src="../assets/images/NSA icon.png" alt="NSA icon">
    </a>
    
    <!--Add heading to header. It links the user to the main page of that role-->
    <a id="headerTitle" href="pdtnsa.php?role=<?php echo $role?>">
        <h1><?php echo $role;?></h1>
    </a>

    <!--Creates the nav bar from the permissions the user has-->
    <nav>
        <ul><?php
            $permissions = $backendResponse->permissions;
            foreach($permissions as $permission){
                echo "<li><a href=\"pdtnsa.php?role=$permission\">$permission</a></li>";
            }
        ?></ul>
    </nav> 
</header>