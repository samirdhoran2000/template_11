<?php

// Function to log messages with timestamps
function logMessage($message) {
    $timestamp = date("Y-m-d H:i:s");
    echo "[$timestamp] $message\n";
}

// Get the domain dynamically from the request
$domain = $_SERVER['HTTP_HOST']; // Extracts the domain from the request
logMessage("Request received from domain: $domain");

// Validate and fetch template ID from request
if (!isset($_GET['templateid']) || !is_numeric($_GET['templateid'])) {
    logMessage("Error: Missing or invalid templateId parameter.");
    die("Error: Missing or invalid templateId parameter.");
}

$templateId = intval($_GET['templateid']); // Convert to integer for safety
logMessage("Received templateId: $templateId");

// Define the base directory structure
$baseTemplateDir = "/home/q2g3j98i4rdo/seo_websites_templates";
$projectDir = "$baseTemplateDir/bih_seo_template_$templateId";
$buildDir = "$projectDir/dist";
$targetBaseDir = "/home/q2g3j98i4rdo/websites";
$targetDir = "$targetBaseDir/$domain";

// Check if the project directory exists
if (!is_dir($projectDir)) {
    logMessage("Error: Template directory not found for template ID: $templateId at $projectDir");
    die("Error: Template directory not found for template ID: $templateId");
}

logMessage("Project directory found: $projectDir");

putenv("VITE_SLUG_URL=$domain");
logMessage("Set environment variables: VITE_SLUG_URL=$domain");


// Change to the project directory
if (!chdir($projectDir)) {
    logMessage("Error: Could not change directory to $projectDir");
    die("Error: Could not change directory to $projectDir");
}

logMessage("Changed directory to $projectDir");

// Run the React build command
logMessage("Starting build process...");
$npmPath = "/home/q2g3j98i4rdo/.nvm/versions/node/v22.9.0/bin/npm";
$buildCommand = "$npmPath run build";
exec($buildCommand . " 2>&1", $output, $returnVar);

if ($returnVar !== 0) {
    logMessage("Error: Build failed! Check logs for details.");
    logMessage("Build Output: " . implode("\n", $output));
    die("Error: Build failed! Check logs for details.");
}

logMessage("Build completed successfully.");

// Check if the build directory exists
if (!is_dir($buildDir)) {
    logMessage("Error: Build directory not found: $buildDir");
    die("Error: Build directory not found: $buildDir");
}

logMessage("Build directory exists: $buildDir");

// Create the target directory if it doesn't exist
if (!is_dir($targetDir)) {
    logMessage("Creating target directory: $targetDir");
    if (!mkdir($targetDir, 0777, true)) {
        logMessage("Error: Failed to create target directory: $targetDir");
        die("Error: Failed to create target directory.");
    }
}

logMessage("Target directory is ready: $targetDir");

// Copy the build files to the target directory
logMessage("Copying build files to $targetDir...");
exec("cp -r $buildDir/* $targetDir/");

logMessage("Deployment to $domain completed successfully for Template ID: $templateId.");
echo "Deployment to $domain completed successfully for Template ID: $templateId.\n";

?>
