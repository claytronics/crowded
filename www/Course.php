<!DOCTYPE html>
<head>
  <title>CrowdEd: An e-Learning Tool</title>
  <!--insert jquery and js and css links here-->
  <script src="d0/sjs/libs/jquery-1.10.2.js" type="text/javascript"></script>
  <link type="text/css" rel="stylesheet" href="/d1/scss/Course.css"/>
  <script src="/d1/sjs/Course.js"></script>
</head>
<body onload="showLectureChooser()">
  <div id="hdr" data-role="header"><span id="title">CrowdEd</span> An e-Learning Tool
    <div id="topbar">
      <div id="topbaritem"><a href="#home">Home</a></div>
      <div id="topbaritem"><a href="#news">News</a></div>
      <div id="topbaritem"><a href="#contact">Contact</a></div>
      <div id="topbaritem"><a href="#about">About</a></div>
    </div>
  </div>
  <div id="dummyheader"></div>
  <div id="chooser"></div>
  <div id="id">
    <?php
       $id = $_GET["id"];
       echo $id;
       ?>
  </div>
</body>
</html>
