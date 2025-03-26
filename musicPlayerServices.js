import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';
import { playListData } from './src/constants';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrack();
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } finally {
        return isSetup;
    }
}

export async function addTrack() {
    await TrackPlayer.add(playListData);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
    return async () => {
        TrackPlayer.addEventListener(Event.RemotePause, async () => {
            await TrackPlayer.pause();
        });

        TrackPlayer.addEventListener(Event.RemotePlay, async () => {
            await TrackPlayer.play();
        });

        TrackPlayer.addEventListener(Event.RemoteNext, async () => {
            await TrackPlayer.skipToNext();
        });

        TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
            await TrackPlayer.skipToPrevious();
        });
    };
}
