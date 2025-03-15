<?php
header('Content-Type: application/json');

// if (!isset($_GET['domain']) || empty($_GET['domain'])) {
//     echo json_encode(["error" => "Domain parameter is required"]);
//     exit;
// }

$domain = $_SERVER['HTTP_HOST'];
$apiUrl = "https://www.buyindiahomes.in/api/seo-detail?website=" . urlencode($domain);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
    echo json_encode(["error" => "Failed to fetch SEO data"]);
    exit;
}

$seoData = json_decode($response, true);

if (!$seoData || !isset($seoData['data'])) {
    echo json_encode(["error" => "Invalid API response"]);
    exit;
}

// Prepare data to be saved in `seodata.json`
$mappedData = [
    "data" => [
        "title" => $seoData['data']['title'] ?? '',
        "meta_description" => $seoData['data']['meta_description'] ?? '',
        "favicon" => $seoData['data']['favicon'] ?? '',
        "keywords" => $seoData['data']['keywords'] ?? '',
        "og_title" => $seoData['data']['og_title'] ?? '',
        "og_description" => $seoData['data']['og_description'] ?? '',
        "og_image" => $seoData['data']['og_image'] ?? '',
        "og_type" => $seoData['data']['og_type'] ?? '',
        "status" => $seoData['data']['status'] ?? '',
        "script_1" => $seoData['data']['script_1'] ?? '',
        "script_2" => $seoData['data']['script_2'] ?? ''
    ]
];

// Save to `seodata.json`
$localFilePath = __DIR__ . '/seodata.json';
$destinationPath = '/home/q2g3j98i4rdo/seo_websites_templates/bih_seo_template_11/public/seodata.json';
$destinationPath_2 = '/home/q2g3j98i4rdo/seo_websites_templates/bih_seo_template_11/seodata.json';


// Write JSON file locally
if (file_put_contents($localFilePath, json_encode($mappedData, JSON_PRETTY_PRINT))) {
    // Copy to destination
    if (copy($localFilePath, $destinationPath)) {
        echo json_encode(["success" => true, "message" => "SEO data saved and copied successfully"]);
    } else {
        echo json_encode(["error" => "Failed to copy SEO data to the destination"]);
    }
} else {
    echo json_encode(["error" => "Failed to save SEO data"]);
}


// Write JSON file locally
if (file_put_contents($localFilePath, json_encode($mappedData, JSON_PRETTY_PRINT))) {
    // Copy to destination
    if (copy($localFilePath, $destinationPath_2)) {
        echo json_encode(["success" => true, "message" => "SEO data saved and copied successfully"]);
    } else {
        echo json_encode(["error" => "Failed to copy SEO data to the destination"]);
    }
} else {
    echo json_encode(["error" => "Failed to save SEO data"]);
}
?>
