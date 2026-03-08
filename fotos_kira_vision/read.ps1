$folderPath = 'C:\Users\PHOENIX\Dropbox\Python\kira-website\fotos_kira_vision'
$shell = New-Object -ComObject Shell.Application
$folder = $shell.Namespace($folderPath)
foreach ($file in $folder.Items()) {
    $comment = $folder.GetDetailsOf($file, 24)
    if ($comment) {
        Write-Host "$($file.Name): $comment"
    }
}
