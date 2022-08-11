var prediction1, prediction2;
Webcam.set({
    height: 300,
    width: 400,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img src="' + data_uri + '" id="captured_image">'
    });
}
console.log("ml5 version is:", ml5.version);
classifer = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uLBUuamJ5/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model has loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is: " + prediction1;
    speak_data_2 = "And the second prediction is: " + prediction2;
    utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);

}

function check() {
    img = document.getElementById("captured_image");
    classifer.classify(img, got_result);
}

function got_result(error, results) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (result[0].label == "happy") {
            document.getElementById("update_emoji_1").innerHTML = "&#128512;";
        }
        if (result[0].label == "normal") {
            document.getElementById("update_emoji_1").innerHTML = "&#128522;";
        }
        if (result[0].label == "sad") {
            document.getElementById("update_emoji_1").innerHTML = "&#128546;";
        }
        if (result[0].label == "angry") {
            document.getElementById("update_emoji_1").innerHTML = "&#128545;";
        }
        if (result[1].label == "happy") {
            document.getElementById("update_emoji_2").innerHTML = "&#128512;";
        }
        if (result[1].label == "normal") {
            document.getElementById("update_emoji_2").innerHTML = "&#128522;";
        }
        if (result[1].label == "sad") {
            document.getElementById("update_emoji_2").innerHTML = "&#128546;";
        }
        if (result[1].label == "angry") {
            document.getElementById("update_emoji_2").innerHTML = "&#128545;";
        }

    }

}