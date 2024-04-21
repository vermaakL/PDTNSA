<?php

    function WebMasterHistorian(){

        function parseCamelCase($str) {
            return preg_replace('/(?!^)[A-Z][a-z]*/', ' $0', $str);
        }

        echo parseCamelCase("WebMasterHistorian");
    }

?>