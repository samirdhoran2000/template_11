<?php

// Get the domain dynamically from the request
$domain = $_SERVER['HTTP_HOST']; // Extracts the domain from the request

// Validate and fetch template ID from request
if (!isset($_GET['templateId']) || !is_numeric($_GET['templateId'])) {
    die("Error: Missing or invalid templateId parameter.");
}

$templateId = intval($_GET['templateId']); // Convert to integer for safety

// Define the base directory structure
$baseTemplateDir = "/home/q2g3j98i4rdo/seo_websites_templates";
$projectDir = "$baseTemplateDir/bih_seo_template_$templateId";
$buildDir = "$projectDir/dist";
$targetBaseDir = "/home/q2g3j98i4rdo/websites";
$targetDir = "$targetBaseDir/$domain";

// Check if the directory exists
if (!is_dir($projectDir)) {
    die("Error: Template directory not found for template ID: $templateId");
}

// Change to the project directory
if (!chdir($projectDir)) {
    die("Error: Could not change directory to $projectDir");
}

// Run the React build command
echo "Building the React project for Template ID: $templateId...\n";
exec("npm run build", $output, $returnVar);

if ($returnVar !== 0) {
    die("Error: Build failed! Check logs for details.");
}

// Check if the build directory exists
if (!is_dir($buildDir)) {
    die("Error: Build directory not found: $buildDir");
}

// Create the target directory if it doesn't exist
if (!is_dir($targetDir)) {
    echo "Creating target directory: $targetDir\n";
    mkdir($targetDir, 0777, true);
}

// Copy the build files to the target directory
echo "Copying build files to $targetDir...\n";
exec("cp -r $buildDir/* $targetDir/");

echo "Deployment to $domain completed successfully for Template ID: $templateId.\n";

?>
