<?php
// Get the domain from the request
$domain = $_SERVER['HTTP_HOST'];

// Set the environment variable
putenv("VITE_SLUG_URL=$domain");

// Verify if it is set
echo "VITE_SLUG_URL: " . getenv("VITE_SLUG_URL");
?>
