package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.media.enums.MediaFlag;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import lombok.Getter;
import lombok.Setter;

public class SpeakerMedia extends Media {

    @Getter @Setter
    private Boolean distanceFading = false;

    public SpeakerMedia(String source) {
        super(source);
        setLoop(true);
        setDoPickup(OpenAudioMcSpigot.getInstance().getConfigurationModule().getBoolean(StorageKey.SETTINGS_SPEAKER_SYNC));
        setFadeTime(500);
        setFlag(MediaFlag.SPEAKER);
    }

}
