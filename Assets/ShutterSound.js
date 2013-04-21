#pragma strict

function Update() {
	if (Input.GetMouseButtonDown(0)) {
		PlayShutterSound();
	}
}

static private var mediaActionSound : AndroidJavaObject;

static private function PlayShutterSound() {
#if UNITY_ANDROID

	if (!mediaActionSound) {
		mediaActionSound = AndroidJavaObject("android.media.MediaActionSound");
	}

	var soundName : int = mediaActionSound.GetStatic.<uint>("SHUTTER_CLICK");
	mediaActionSound.Call("play", soundName);

#endif
}
