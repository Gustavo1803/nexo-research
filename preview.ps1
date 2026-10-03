# Optional Windows preview server. Run from PowerShell, then open http://127.0.0.1:4173.
param([int]$Port = 4173)
$ErrorActionPreference = 'Stop'
$siteRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
$mimeTypes = @{'.html'='text/html; charset=utf-8';'.css'='text/css; charset=utf-8';'.js'='application/javascript; charset=utf-8';'.jpg'='image/jpeg';'.jpeg'='image/jpeg';'.png'='image/png';'.webp'='image/webp';'.svg'='image/svg+xml';'.ttf'='font/ttf';'.pdf'='application/pdf'}
$listener.Start()
Write-Host "Preview is running at http://127.0.0.1:$Port. Close this process to stop it."
try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    $client.ReceiveTimeout = 5000
    $stream = $client.GetStream()
    try {
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
      $request = $reader.ReadLine()
      if (-not $request) { continue }
      $parts = $request.Split(' ')
      for ($lineNumber = 0; $lineNumber -lt 100; $lineNumber++) {
        $line = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($line)) { break }
      }
      $status = '404 Not Found'
      $type = 'text/plain; charset=utf-8'
      $body = [Text.Encoding]::UTF8.GetBytes('Not found')
      if ($parts.Length -ge 2 -and $parts[0] -in @('GET','HEAD')) {
        $relative = [Uri]::UnescapeDataString(($parts[1].Split('?')[0])).TrimStart('/')
        if (-not $relative) { $relative = 'index.html' }
        $file = [IO.Path]::GetFullPath((Join-Path $siteRoot $relative))
        $allowed = $relative -in @('index.html','es.html','styles.css','app.js','research-data.js','manage-research.html','research-editor.js','research-editor.css','research.html','research-es.html','projects.html','projects-es.html','collaborators.html','collaborators-es.html','team.html','team-es.html','pages.js','projects-data.js','people-data.js','manage-projects.html','projects-editor.js','manage-people.html','people-editor.js','transportation.html','transportation-es.html','supply-chains.html','supply-chains-es.html','digital-economics.html','digital-economics-es.html','food-trade.html','food-trade-es.html','areas-data.js','areas.js','how-we-work.html','how-we-work-es.html') -or $relative.StartsWith('assets/')
        if ($allowed -and $file.StartsWith($siteRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -and [IO.File]::Exists($file)) {
          $extension = [IO.Path]::GetExtension($file).ToLowerInvariant()
          if ($mimeTypes.ContainsKey($extension)) {
            $status = '200 OK'
            $type = $mimeTypes[$extension]
            $body = [IO.File]::ReadAllBytes($file)
          }
        }
      }
      $header = "HTTP/1.1 $status`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
      $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      if ($parts[0] -ne 'HEAD') { $stream.Write($body, 0, $body.Length) }
      $stream.Flush()
    } catch {
      Write-Verbose $_.Exception.Message
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
