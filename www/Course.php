<!DOCTYPE html>
<head>
  <title>CrowdEd: An e-Learning Tool</title>
  <!--insert jquery and js and css links here-->
  <script src="d0/sjs/libs/jquery-1.10.2.js" type="text/javascript"></script>
  <link type="text/css" rel="stylesheet" href="/d1/scss/Course.css"/>
  <script src="/d1/sjs/Course.js"></script>
</head>
<body onload="showLectureChooser()">
  <div id="hdr" data-role="header"><span id="title"></span> An e-Learning Tool
    <div id="settingsButton"></div>
    <div id="loginButton"></div>
    <div id="topbar">
      <div id="topbaritem"><a href="Home.html">Home</a></div>
      <div id="topbaritem"><a href="#news">My Courses</a></div>
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
