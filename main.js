song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";
scoreRightWrist = 0;


function setup() {
    canvas = createCanvas(500,400);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);


}
function modelLoaded() {
    console.log("PoseNet Is Initialized");


}

function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log( "scoreRightWrist = " + scoreRightWrist+ "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}


function draw() {
image(video,0,0,500,400);
song1_status = song1.isPlaying();
song2_status = song2.isPlaying();
fill("#FF0000");
stroke("FF0000");

if(scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    song2.stop();

    if(song1_status == false) {
        song1.play();
        document.getElementById("song_name").innerHTML = "Wellerman | Nathan Evans";
    }
}

if(scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
 song1.stop();
if(song2_status == false) {
    song2.play();
    document.getElementById("song_name").innerHTML = "He's A Pirate | Hans Zimmer";
}
} 

}



function preload() {
song2 = loadSound("potc.mp3");
song1 = loadSound("wellerman.mp3");
}


function play() {
song1.play();
song.setVolume(1.5);
song.rate(1);

}
    
