#pragma strict

function Update() {
	if (Input.GetMouseButtonDown(0)) {
		PlayShutterSound();
	}
}

static function PlayShutterSound() {
#if UNITY_ANDROID

	var unityPlayer = AndroidJavaClass("com.unity3d.player.UnityPlayer");
	var currentActivity = unityPlayer.GetStatic.<AndroidJavaObject>("currentActivity");

	// AudioManager audioManager = currentActivity.getSystemService(Context.AUDIO_SERVICE);
	var audioService = currentActivity.GetStatic.<String>("AUDIO_SERVICE");
	var audioManager = currentActivity.Call.<AndroidJavaObject>("getSystemService", audioService);

	// maxVolume = audioManager.getStreamMaxVolume(audioManager.STREAM_SYSTEM_ENFORCED);
	var streamType : int = audioManager.GetStatic.<uint>("STREAM_SYSTEM_ENFORCED");
	var maxVolume = audioManager.Call.<int>("getStreamMaxVolume", streamType);

	// audioManager.setStreamVolume(audioManager.STREAM_SYSTEM_ENFORCED, maxVolume, 0);
	audioManager.Call("setStreamVolume", streamType, maxVolume, 0);

	// mediaPlayer = new MediaPlayer();
	// mediaPlayer.setDataSource("file:///system/media/audio/ui/camera_click.ogg");
	var mediaPlayer = AndroidJavaObject("android.media.MediaPlayer");
	mediaPlayer.Call("setDataSource", "file:///system/media/audio/ui/camera_click.ogg");

	// mediaPlayer.setAudioStreamType(audioManager.STREAM_SYSTEM_ENFORCED);
	var audioManagerClass = AndroidJavaClass("android.media.AudioManager");
	mediaPlayer.Call("setAudioStreamType", streamType);

	// mediaPlayer.prepare();
	// mediaPlayer.start();
	mediaPlayer.Call("prepare");
	mediaPlayer.Call("start");

#endif
}
