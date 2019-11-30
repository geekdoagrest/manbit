# CSS, HTML, and Images - Load Performance

In this article I will make an overview of various techniques used :)

We know that performance is the main point when working with WEB, but this performance walks through several roads: performance in loading, rendering, processing and so on. Much has been said about this but in here I will make an overview of several widely used techniques :)

##CSS
When we talk about CSS files, we have one of the main bottlenecks in loading a page, by two factors: one is the position, the other the size.

In position you should be very careful about the files being declared inside the head tag, these calls block the rendering of the elements, so that the HTML will only be shown by the browser after loading, so leave only the necessary CSS in the head, and in these files ONLY the corresponding selectors for the first user view screen (usually the first 1000px), all other files should go to the end of the document.

To separate the selectors corresponding to the mentioned load, you can use the Dust-Me Selectors and CSS Stress Test tools.

File size is a point of concern, for each request we have an http window and the file should fit in a single “trip” in that window, so avoid many small files as well as avoid large files, group smaller files to all have the same size average (preferably around 14kb)

Clean the CSS file, for that there are several tools, one of them is CSS Compressor

Enable Cache, Gzip and Deflate for the request in these files, for each infrastructure there is a different technique, a good alternative is Gulp, below I will put a code in php that takes care of this process, I will not go into detail because it deserves an article just for him.

```javascript
<?php
//define cache
header('Expires: ' . gmdate( "D, d M Y H:i:s", time() + 31536000 ) . ' GMT');
header("Cache-Control: public, max-age=31536000");

///recieves the file by ?file=arquivo.css
$file = explode("/", $_GET['file']);
$file = $file[count($file) -1];

$ext = explode(".", $_GET['file']);
$ext = $ext[count($ext) -1];

$out = file_get_contents($file);

$mimeTypes = array(
	'pdf' => 'application/pdf',
	'txt' => 'text/plain',
	'html' => 'text/html',
	'exe' => 'application/octet-stream',
	'zip' => 'application/zip',
	'doc' => 'application/msword',
	'xls' => 'application/vnd.ms-excel',
	'ppt' => 'application/vnd.ms-powerpoint',
	'gif' => 'image/gif',
	'png' => 'image/png',
	'jpeg' => 'image/jpg',
	'jpg' => 'image/jpg',
	'css' => 'text/css',
	'js' => 'application/x-javascript',
	'php' => 'text/plain'
);

header('Content-Type: ' . $mimeTypes[$ext]);

if ( !ini_get('zlib.output_compression') && 'ob_gzhandler' != ini_get('output_handler') && isset($_SERVER['HTTP_ACCEPT_ENCODING']) ) {
	header('Vary: Accept-Encoding');
	if ( false !== stripos($_SERVER['HTTP_ACCEPT_ENCODING'], 'deflate') && function_exists('gzdeflate')) {
		header('Content-Encoding: deflate');
		$out = gzdeflate( $out, 3 );
	} elseif ( false !== stripos($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') && function_exists('gzencode') ) {
		header('Content-Encoding: gzip');
		$out = gzencode( $out, 3 );
	}
}

echo $out;
?>
```


Whenever possible use CDN's, there are several tools for this like Cloudflare, Amazon CloudFront, among others.

#HTML Just like css, keep the HTML clean :)

Avoid, css inline, if the file is too large divide it in parts, and remove unnecessary spaces. Below I will pass a code in php that makes this removal but can also be done with gulp.

```javascript
<?php
    ob_start();
	
	  ///code here
	
    $content = ob_get_contents();
    ob_end_clean();
  
    $content = preg_replace('/\s+/', ' ', $content); 
	echo $content;
?>
```

Image For the images we must take care other than those already described:

Use formats that are as small as possible as webp

Compress the images to remove unnecessary size, there are several tools but the main one is TinyPNG, with Gulp you can automate this process, in another article we will talk only about Gulp, if you want you can use PHP, sending the image to the TinyPNG API and saving the already compressed return. Example:

```javascript
<?php
//conprimindo no tiny
$key = "xxx"; //// your tiny api key
if($ext = 'jpg') $ext = 'jpeg';
$f = 'imagem.jpg';

$result = fopen("https://api.tinify.com/shrink", "r", false, stream_context_create(array(
"http" => array(
"method" => "POST",
"header" => array(
"Content-type: image/".$ext,
"Authorization: Basic " . base64_encode("api:".$key)
),
"content" => file_get_contents($f)
),
"ssl" => array(
"cafile" => __DIR__ . "/cacert.pem",
"verify_peer" => true
)
)));			    

if ($result) {
foreach ($http_response_header as $header) { 
if (substr($header, 0, 10) === "Location: ") {
file_put_contents($f, fopen(substr($header, 10), "rb", false));
}
}
}
?>
```

## Tools
In addition to all the recommendations above, it is essential that you test your page, for that we have several tools: PageSpeed Insights, thinkwithgoogle and WebPageTest