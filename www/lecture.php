<!DOCTYPE html>
<head>
  <title>CrowdEd: An e-Learning Tool</title>
  <script src="/d0/sjs/libs/jquery-1.10.2.js" type="text/javascript"></script>
  <link type="text/css" rel="stylesheet" href="d1/scss/Interface.css"/>
  <script src="d1/sjs/Interface.js"></script>
</head>
<body>
  <div id="hdr" data-role="header"><span id="title"></span> An e-Learning Tool
    <div id="settingsButton"></div>
    <div id="loginButton"></div>
    <div id="topbar">
      <div id="topbaritem"><a href="Home.html">Home</a></div>
      <div id="topbaritem"><a href="#news">My Courses</a></div>
    </div>
  </div>
  <div id="dummyheader"></div>\
  <div id="vidandpptpanel" data-role="content">
    <div id="video">
      <!--This div is filled with an iframe-->
    </div>
    <div id="pptpanel">
      <div id="ppt">
	<img id="currentSlide" style="width: 480; height: 360;"/>
      </div>
      <div id="navbarpanel">
	<div id="navbar">
	  <button id="navbaritem" class="prev" onclick="prev()">   PREV   </button>
	  <button id="navbaritem" class="first" onclick="first()">   FIRST  </button>
	  <button id="navbaritem" class="next" onclick="next()">   NEXT   </button>
	  <button id="slidechooser" onclick="showscp()"> CHOOSE </button>
	</div>
      </div>
    </div>
  </div>
  <div id="slidechoicepanel">
    <button id="closescp" onclick="closescp()">X</button>
    <div id="chooser">
      
    </div> 
  </div>
  <div id="notespanel">
  </div>
  <div id="checkpoint" class="checkpoint1"></div>
  <div id="id">
    <?php
       $id = $_GET["id"];
       echo $id;
       ?>
  </div>

</body>
</html>

