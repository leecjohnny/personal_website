"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

type Voice = {
  id: "cedar" | "coral" | "ballad";
  label: string;
  audioSrc: string;
  timingSrc: string;
};

type WordTiming = {
  id: string;
  start: number;
  end: number;
};

type TimingData = {
  words: WordTiming[];
};

const voices: Voice[] = [
  {
    id: "cedar",
    label: "Cedar",
    audioSrc:
      "/audio/dynamism/audio/dynamism-narration-realtime-2.1-cedar.mp3",
    timingSrc:
      "/audio/dynamism/dynamism-narration-realtime-2.1-cedar.sync.json",
  },
  {
    id: "coral",
    label: "Coral",
    audioSrc:
      "/audio/dynamism/audio/dynamism-narration-realtime-2.1-coral.mp3",
    timingSrc:
      "/audio/dynamism/dynamism-narration-realtime-2.1-coral.sync.json",
  },
  {
    id: "ballad",
    label: "Ballad",
    audioSrc:
      "/audio/dynamism/audio/dynamism-narration-realtime-2.1-ballad.mp3",
    timingSrc:
      "/audio/dynamism/dynamism-narration-realtime-2.1-ballad.sync.json",
  },
];

function activeWordAt(words: WordTiming[], time: number) {
  let low = 0;
  let high = words.length - 1;
  let match: WordTiming | null = null;

  while (low <= high) {
    const middle = (low + high) >> 1;
    const word = words[middle];

    if (word.start <= time) {
      match = word;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return match && time < match.end ? match : null;
}

export default function NarrationPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);
  const pauseStartRectRef = useRef<DOMRect | null>(null);
  const timingRef = useRef<TimingData | null>(null);
  const timingCache = useRef(new Map<string, Promise<TimingData>>());
  const frameRef = useRef(0);
  const currentWordRef = useRef<string | null>(null);
  const playbackRequestRef = useRef(0);
  const [expanded, setExpanded] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPauseFloating, setIsPauseFloating] = useState(false);
  const [status, setStatus] = useState("Choose a narrator");

  const loadTiming = useCallback((voice: Voice) => {
    const cached = timingCache.current.get(voice.id);
    if (cached) {
      return cached;
    }

    const request = fetch(voice.timingSrc).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load narration timing");
      }
      return response.json() as Promise<TimingData>;
    });

    timingCache.current.set(voice.id, request);
    return request;
  }, []);

  const clearHighlight = useCallback(() => {
    if (currentWordRef.current) {
      document
        .querySelector(
          `[data-narration-word="${currentWordRef.current}"]`,
        )
        ?.classList.remove("is-narration-current");
    }
    currentWordRef.current = null;
  }, []);

  const setNarrationActive = useCallback((active: boolean) => {
    const article = document.getElementById("top");
    if (active) {
      article?.setAttribute("data-narration-active", "true");
    } else {
      article?.removeAttribute("data-narration-active");
    }
  }, []);

  const updateHighlight = useCallback(() => {
    frameRef.current = 0;
    const audio = audioRef.current;
    const timing = timingRef.current;

    if (!audio || !timing) {
      return;
    }

    const active = activeWordAt(timing.words, audio.currentTime);
    const nextWordId = active?.id ?? null;

    if (nextWordId !== currentWordRef.current) {
      clearHighlight();
      if (nextWordId) {
        document
          .querySelector(`[data-narration-word="${nextWordId}"]`)
          ?.classList.add("is-narration-current");
        currentWordRef.current = nextWordId;
      }
    }

  }, [clearHighlight]);

  const preloadTimings = useCallback(() => {
    voices.forEach((voice) => {
      void loadTiming(voice).catch(() => undefined);
    });
  }, [loadTiming]);

  const toggleChoices = () => {
    setExpanded((open) => {
      const next = !open;
      if (next) {
        preloadTimings();
      }
      return next;
    });
  };

  const chooseVoice = async (voice: Voice) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const requestId = ++playbackRequestRef.current;

    if (selectedVoice === voice.id && audio.currentSrc) {
      if (audio.paused) {
        setStatus(`Playing ${voice.label}`);
        try {
          await audio.play();
          if (requestId !== playbackRequestRef.current || audio.paused) {
            return;
          }
          setStatus(`Playing ${voice.label}`);
        } catch {
          if (requestId === playbackRequestRef.current) {
            setStatus("Narration could not be played");
          }
        }
      } else {
        audio.pause();
        setStatus(`${voice.label} paused`);
      }
      return;
    }

    audio.pause();
    clearHighlight();
    setNarrationActive(false);
    timingRef.current = null;
    setSelectedVoice(voice.id);
    setStatus(`Loading ${voice.label}`);

    const timingRequest = loadTiming(voice);
    audio.src = voice.audioSrc;
    audio.load();
    const playRequest = audio.play();

    try {
      const timing = await timingRequest;
      await playRequest;
      if (requestId !== playbackRequestRef.current || audio.paused) {
        return;
      }
      timingRef.current = timing;
      setStatus(`Playing ${voice.label}`);
      updateHighlight();
    } catch {
      if (requestId !== playbackRequestRef.current) {
        return;
      }
      audio.pause();
      clearHighlight();
      setNarrationActive(false);
      setStatus("Narration could not be played");
    }
  };

  const pauseNarration = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    playbackRequestRef.current += 1;
    audio.pause();
    clearHighlight();
    setNarrationActive(false);
    setIsPlaying(false);

    const voice = voices.find(({ id }) => id === selectedVoice);
    setStatus(voice ? `${voice.label} paused` : "Narration paused");
  };

  const toggleNarration = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      pauseNarration();
      return;
    }

    const requestId = ++playbackRequestRef.current;
    const voice = voices.find(({ id }) => id === selectedVoice);
    setStatus(voice ? `Playing ${voice.label}` : "Playing narration");

    void audio.play().catch(() => {
      if (requestId === playbackRequestRef.current) {
        setStatus("Narration could not be played");
      }
    });
  };

  useEffect(() => {
    const playButton = playButtonRef.current;
    if (!playButton) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const shouldFloat = !entry.isIntersecting;
      setIsPauseFloating((floating) => {
        if (floating === shouldFloat) {
          return floating;
        }

        pauseStartRectRef.current =
          pauseButtonRef.current?.getBoundingClientRect() ?? null;
        return shouldFloat;
      });
    });

    observer.observe(playButton);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const pauseButton = pauseButtonRef.current;
    const startRect = pauseStartRectRef.current;
    pauseStartRectRef.current = null;

    if (
      !pauseButton ||
      !startRect ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const endRect = pauseButton.getBoundingClientRect();
    const offsetX = startRect.left - endRect.left;
    const offsetY = startRect.top - endRect.top;
    const distance = Math.hypot(offsetX, offsetY);

    const animation = pauseButton.animate(
      [
        {
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        },
        {
          transform: "translate(0, 0)",
        },
      ],
      {
        duration: Math.min(720, Math.max(380, distance * 0.9)),
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );

    return () => animation.cancel();
  }, [isPauseFloating]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => {
      setIsPlaying(true);
      setNarrationActive(true);
      updateHighlight();
      if (!frameRef.current) {
        frameRef.current = window.setInterval(updateHighlight, 40);
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
      setNarrationActive(false);
      clearHighlight();
      if (frameRef.current) {
        window.clearInterval(frameRef.current);
        frameRef.current = 0;
      }
    };
    const handleEnded = () => {
      handlePause();
      setStatus("Narration finished");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("seeked", updateHighlight);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("seeked", updateHighlight);
      setNarrationActive(false);
      clearHighlight();
      if (frameRef.current) {
        window.clearInterval(frameRef.current);
      }
    };
  }, [clearHighlight, setNarrationActive, updateHighlight]);

  return (
    <section className="narration-dock" aria-label="Listen to the essay">
      <div className="narration-controls">
        <button
          ref={playButtonRef}
          type="button"
          className={`narration-play ${expanded ? "is-expanded" : ""}`}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide narrator choices" : "Choose a narrator"}
          onClick={toggleChoices}
        >
          <span className="play-symbol" aria-hidden="true" />
        </button>

        {expanded ? (
          <div className="voice-choices" role="group" aria-label="Narrators">
            {voices.map((voice, index) => {
              const selected = selectedVoice === voice.id;
              return (
                <button
                  type="button"
                  className={`voice-choice ${selected ? "is-selected" : ""}`}
                  style={{ "--voice-index": index } as CSSProperties}
                  aria-pressed={selected}
                  aria-label={`${
                    selected && isPlaying ? "Pause" : "Play"
                  } ${voice.label} narration`}
                  key={voice.id}
                  onClick={() => void chooseVoice(voice)}
                >
                  {voice.label}
                </button>
              );
            })}
          </div>
        ) : null}
        {isPlaying || (isPauseFloating && selectedVoice !== null) ? (
          <button
            ref={pauseButtonRef}
            type="button"
            className={`narration-pause ${
              isPauseFloating ? "is-floating" : ""
            }`}
            aria-label={isPlaying ? "Pause narration" : "Resume narration"}
            onClick={toggleNarration}
          >
            <span
              className={isPlaying ? "pause-symbol" : "play-symbol"}
              aria-hidden="true"
            />
          </button>
        ) : null}
      </div>

      <audio ref={audioRef} preload="metadata" />
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
    </section>
  );
}
