'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';
import {
  Channel, defaultChannels, categories, Category,
} from '@/lib/channels';

// ─── Icons (inline SVGs to avoid extra deps) ──────────────────────────────────

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
}
function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}
function IconStar(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function IconPlay(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="6 3 20 12 6 21 6 3"/></svg>;
}
function IconPause(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>;
}
function IconSkipBack(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>;
}
function IconSkipForward(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>;
}
function IconVolume2(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
}
function IconVolumeX(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>;
}
function IconMaximize(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>;
}
function IconMinimize(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>;
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
}
function IconSun(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
}
function IconMoon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
}
function IconUpload(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;
}
function IconPiP(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="3" rx="2"/><rect width="8" height="5" x="12" y="10" rx="1"/></svg>;
}
function IconRefresh(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>;
}
function IconTv(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
}
function IconWifi(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>;
}
function IconWifiOff(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.64"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 2.68"/><path d="M5.26 17.89a10 10 0 0 1 1.64-2.11"/><circle cx="12" cy="20" r="1"/></svg>;
}
function IconAlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>;
}
function IconBookmark(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>;
}
function IconExternalLink(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>;
}
function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
}
function IconSmartphone(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>;
}

// ─── Types ─────────────────────────────────────────────────────────────────

interface Bookmark {
  id: number;
  name: string;
  url: string;
}

// ─── M3U Parser ────────────────────────────────────────────────────────────────

function parseM3U(text: string): Channel[] {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const parsed: Channel[] = [];
  let current: Partial<Channel> | null = null;
  let nextId = 1000;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:')) {
      current = {};
      const logoMatch = line.match(/tvg-logo="([^"]*)"/);
      const groupMatch = line.match(/group-title="([^"]*)"/);
      const nameMatch = line.match(/,(.+)$/);
      if (logoMatch) current.logo = logoMatch[1];
      if (groupMatch) current.category = groupMatch[1];
      if (nameMatch) current.name = nameMatch[1].trim();
    } else if (line.startsWith('#')) {
      continue;
    } else if (current) {
      current.url = line;
      current.id = nextId++;
      if (!current.category) current.category = 'Imported';
      if (!current.name) current.name = `Channel ${current.id}`;
      if (!current.logo) current.logo = '';
      parsed.push(current as Channel);
      current = null;
    }
  }
  return parsed;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>(defaultChannels);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>(defaultChannels);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('iptv_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [volume, setVolume] = useState(() => {
    if (typeof window === 'undefined') return 1;
    const saved = localStorage.getItem('iptv_volume');
    return saved ? parseFloat(saved) : 1;
  });
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamTryCount, setStreamTryCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showOSD, setShowOSD] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [isPiP, setIsPiP] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [clock, setClock] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [newBookmarkName, setNewBookmarkName] = useState('');
  const [newBookmarkUrl, setNewBookmarkUrl] = useState('');
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('iptv_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const osdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const channelListRef = useRef<HTMLDivElement>(null);

  // ─── Dark mode ───────────────────────────────────────────────────────────────

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // ─── Clock ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── Online/Offline ──────────────────────────────────────────────────────────

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // ─── Filter channels ────────────────────────────────────────────────────────

  useEffect(() => {
    const filtered = channels.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesCategory = false;
      if (activeCategory === 'All') {
        matchesCategory = true;
      } else if (activeCategory === 'Favorites') {
        matchesCategory = favorites.includes(channel.id);
      } else {
        matchesCategory = channel.category === activeCategory;
      }
      return matchesSearch && matchesCategory;
    });
    setFilteredChannels(filtered);
  }, [channels, searchQuery, activeCategory, favorites]);

  // ─── Play channel ────────────────────────────────────────────────────────────

  const playChannel = useCallback((channel: Channel, tryIndex = 0) => {
    if (!videoRef.current || !channel.url) return;
    setCurrentChannel(channel);
    setIsLoading(true);
    setError(null);
    setShowOSD(true);
    setStreamTryCount(tryIndex);
    localStorage.setItem('iptv_last_channel', String(channel.id));

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const video = videoRef.current;
    const urls = [channel.url, ...(channel.fallbackUrls || [])];
    const currentUrl = urls[tryIndex] || urls[0];
    const hasNativeHls = video.canPlayType('application/vnd.apple.mpegurl');

    // HTTP HLS streams: blocked as active mixed content on HTTPS pages.
    // Try native HLS (Safari via passive mixed content) or show URL for external player.
    if (currentUrl.startsWith('http:') && currentUrl.includes('.m3u8')) {
      setIsLoading(false);
      setError(null);
      if (hasNativeHls) {
        video.src = currentUrl;
        video.play().catch(() => {});
      } else {
        setError('এই HTTP stream টি আপনার ব্রাউজারে HTTPS সাইট থেকে চালানো যাবে না।');
      }
      if (osdTimeoutRef.current) clearTimeout(osdTimeoutRef.current);
      osdTimeoutRef.current = setTimeout(() => setShowOSD(false), 3000);
      return;
    }

    if (currentUrl.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
        });
        hlsRef.current = hls;
        hls.loadSource(currentUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                const nextTry = tryIndex + 1;
                if (nextTry < urls.length) {
                  playChannel(channel, nextTry);
                } else {
                  hls.startLoad();
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                setError(`Stream load failed: ${data.type}`);
                setIsLoading(false);
                break;
            }
          }
        });
      } else if (hasNativeHls) {
        video.src = currentUrl;
        video.play().catch(() => {});
      }
    } else {
      video.src = currentUrl;
      video.play().catch(() => {});
    }

    if (osdTimeoutRef.current) clearTimeout(osdTimeoutRef.current);
    osdTimeoutRef.current = setTimeout(() => setShowOSD(false), 3000);
  }, []);

  // ─── Video events ────────────────────────────────────────────────────────────

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handlers: Record<string, () => void> = {
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      canplay: () => setIsLoading(false),
      waiting: () => setIsLoading(true),
      playing: () => setIsLoading(false),
      error: () => { setError('Stream playback failed'); setIsLoading(false); },
    };
    Object.entries(handlers).forEach(([event, handler]) => video.addEventListener(event, handler));
    return () => { Object.entries(handlers).forEach(([event, handler]) => video.removeEventListener(event, handler)); };
  }, []);

  // ─── Volume sync ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
    }
    localStorage.setItem('iptv_volume', String(volume));
  }, [volume, muted]);

  // ─── Loading timeout (prevents infinite spinner on proxy/SW issues) ────────

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setError('Stream is taking too long to load. Try refreshing the page or using a different channel.');
        setIsLoading(false);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // ─── Auto-play last channel ─────────────────────────────────────────────────

  useEffect(() => {
    const lastId = localStorage.getItem('iptv_last_channel');
    if (lastId) {
      const ch = channels.find(c => c.id === parseInt(lastId, 10));
      if (ch) playChannel(ch);
    }
  }, [channels, playChannel]);

  // ─── Toggle favorite ────────────────────────────────────────────────────────

  const toggleFavorite = useCallback((channelId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const updated = prev.includes(channelId) ? prev.filter(id => id !== channelId) : [...prev, channelId];
      localStorage.setItem('iptv_favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ─── Prev/Next ──────────────────────────────────────────────────────────────

  const prevChannel = useCallback(() => {
    if (!currentChannel) return;
    const idx = filteredChannels.findIndex(c => c.id === currentChannel.id);
    if (idx > 0) playChannel(filteredChannels[idx - 1]);
    else if (filteredChannels.length > 0) playChannel(filteredChannels[filteredChannels.length - 1]);
  }, [currentChannel, filteredChannels, playChannel]);

  const nextChannel = useCallback(() => {
    if (!currentChannel) return;
    const idx = filteredChannels.findIndex(c => c.id === currentChannel.id);
    if (idx < filteredChannels.length - 1) playChannel(filteredChannels[idx + 1]);
    else if (filteredChannels.length > 0) playChannel(filteredChannels[0]);
  }, [currentChannel, filteredChannels, playChannel]);

  const retryChannel = useCallback(() => {
    if (currentChannel) playChannel(currentChannel);
  }, [currentChannel, playChannel]);

  // ─── Fullscreen ─────────────────────────────────────────────────────────────

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // ─── PiP ────────────────────────────────────────────────────────────────────

  const togglePiP = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await video.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch { /* PiP not supported */ }
  }, []);

  // ─── Keyboard shortcuts ────────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showHelp || showImport || showBookmarks || showAddBookmark) {
        if (e.key === 'Escape') { setShowHelp(false); setShowImport(false); setShowBookmarks(false); setShowAddBookmark(false); }
        return;
      }
      if (e.target instanceof HTMLInputElement) return;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (videoRef.current) videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
          break;
        case 'm': case 'M': setMuted(p => !p); break;
        case 'f': case 'F': toggleFullscreen(); break;
        case 'ArrowUp': e.preventDefault(); setVolume(v => Math.min(1, v + 0.1)); break;
        case 'ArrowDown': e.preventDefault(); setVolume(v => Math.max(0, v - 0.1)); break;
        case 'ArrowLeft': if (!sidebarOpen && videoRef.current) videoRef.current.currentTime -= 10; break;
        case 'ArrowRight': if (!sidebarOpen && videoRef.current) videoRef.current.currentTime += 10; break;
        case 'p': case 'P': prevChannel(); break;
        case 'n': case 'N': nextChannel(); break;
        case 'r': case 'R': retryChannel(); break;
        case 'Escape': setSidebarOpen(false); break;
        case 'h': case 'H': setShowHelp(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp, showImport, showBookmarks, showAddBookmark, sidebarOpen, toggleFullscreen, prevChannel, nextChannel, retryChannel]);

  // ─── PWA Install Prompt ──────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // ─── Persist bookmarks ───────────────────────────────────────────────────

  useEffect(() => {
    localStorage.setItem('iptv_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // ─── Handle install ──────────────────────────────────────────────────────

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    const result = await (installPrompt as any).userChoice;
    if (result.outcome === 'accepted') setInstallPrompt(null);
  }, [installPrompt]);

  // ─── Add bookmark ────────────────────────────────────────────────────────

  const handleAddBookmark = useCallback(() => {
    if (!newBookmarkName.trim() || !newBookmarkUrl.trim()) return;
    let url = newBookmarkUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const newBm: Bookmark = {
      id: Date.now(),
      name: newBookmarkName.trim(),
      url,
    };
    setBookmarks(prev => [...prev, newBm]);
    setNewBookmarkName('');
    setNewBookmarkUrl('');
    setShowAddBookmark(false);
  }, [newBookmarkName, newBookmarkUrl]);

  // ─── Remove bookmark ─────────────────────────────────────────────────────

  const handleRemoveBookmark = useCallback((id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  // ─── Default bookmark ────────────────────────────────────────────────────

  useEffect(() => {
    if (bookmarks.length === 0) {
      const defaultBm: Bookmark = {
        id: Date.now(),
        name: 'StreamVault TV',
        url: 'https://jonyspeednet-alt.github.io/iptv/',
      };
      setBookmarks([defaultBm]);
    }
  }, []); // only on mount

  // ─── Auto-hide controls ────────────────────────────────────────────────────

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying && !sidebarOpen) setShowControls(false);
      }, 3000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('mousemove', handleMouseMove); if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); };
  }, [isPlaying, sidebarOpen]);

  // ─── M3U Import ─────────────────────────────────────────────────────────────

  const handleM3UImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const imported = parseM3U(text);
      if (imported.length > 0) {
        setChannels(prev => [...prev, ...imported]);
      }
    };
    reader.readAsText(file);
    setShowImport(false);
    e.target.value = '';
  }, []);

  // ─── Category icon map ──────────────────────────────────────────────────────

  const getCategoryIcon = (cat: string) => {
    const map: Record<string, string> = {
      'Bangla News': '📰', 'Bangla TV': '📺', 'Indian': '🇮🇳',
      'Sports': '⚽', 'Music': '🎵', 'International': '🌍',
      'Kids': '👶', 'Religious': '🕌', 'Test': '🧪', 'All': '🗂️', 'Favorites': '⭐',
    };
    return map[cat] || '📺';
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return channels.length;
    if (cat === 'Favorites') return favorites.length;
    return channels.filter(c => c.category === cat).length;
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain bg-black"
        playsInline
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 gap-4 px-6">
          <IconAlertCircle className="text-red-400" />
          <p className="text-red-300 text-lg font-medium text-center">{error}</p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {currentChannel?.url.startsWith('http:') && (
              <>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentChannel.url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {copied ? '✓ Copied!' : '📋 Copy URL'}
                </button>
                <button
                  onClick={() => window.open(currentChannel.url, '_blank')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  ↗ Open in New Tab
                </button>
              </>
            )}
            <button
              onClick={retryChannel}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <IconRefresh /> Retry
            </button>
          </div>
          <p className="text-white/50 text-xs text-center mt-2">
            VLC/media player দিয়ে খুলতে URL টি Copy করে File → Open Network প্রবেশ করুন
          </p>
        </div>
      )}

      {/* OSD */}
      {showOSD && currentChannel && (
        <div className="absolute top-16 left-4 z-30 flex items-center gap-3 bg-black/70 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10 transition-opacity duration-500">
          {currentChannel.logo && (
            <img src={currentChannel.logo} alt="" className="w-10 h-10 object-contain rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
          <div>
            <p className="text-white font-semibold text-sm">{currentChannel.name}</p>
            <p className="text-cyan-300 text-xs">{currentChannel.category}</p>
          </div>
        </div>
      )}

      {/* No channel placeholder */}
      {!currentChannel && !isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <IconTv className="text-white/10 mb-4" width={80} height={80} />
          <p className="text-white/20 text-xl font-medium">Select a channel to watch</p>
          <p className="text-white/10 text-sm mt-2">Press H for keyboard shortcuts</p>
        </div>
      )}

      {/* ─── Top Bar ──────────────────────────────────────────────────────────── */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 transition-all duration-300 ${
          showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              aria-label="Toggle sidebar"
            >
              <IconMenu />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <IconTv width={16} height={16} className="text-white" />
              </div>
              <h1 className="text-white font-bold text-lg tracking-tight hidden sm:block">
                StreamVault <span className="text-cyan-400">TV</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium"><IconWifi /> Online</span>
            ) : (
              <span className="flex items-center gap-1 text-red-400 text-xs font-medium"><IconWifiOff /> Offline</span>
            )}
            <span className="text-white/60 text-sm font-mono ml-2">{clock}</span>
            <button onClick={() => setIsDark(p => !p)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Toggle theme">
              {isDark ? <IconSun /> : <IconMoon />}
            </button>
            {installPrompt && (
              <button onClick={handleInstall} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-500/40 text-cyan-300 transition-colors text-xs font-medium" aria-label="Install app">
                <IconSmartphone /> Install
              </button>
            )}
            <button onClick={() => setShowBookmarks(p => !p)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Bookmarks">
              <IconBookmark />
            </button>
            <button onClick={() => setShowImport(true)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Import M3U">
              <IconUpload />
            </button>
            <button onClick={() => setShowHelp(true)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" aria-label="Help">
              ?
            </button>
          </div>
        </div>
      </div>

      {/* ─── Bottom Controls ────────────────────────────────────────────────── */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${
          showControls || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <button onClick={prevChannel} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white" aria-label="Previous channel">
                <IconSkipBack />
              </button>
              <button
                onClick={() => { if (videoRef.current) videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause(); }}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label="Play/Pause"
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>
              <button onClick={nextChannel} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white" aria-label="Next channel">
                <IconSkipForward />
              </button>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
              {currentChannel?.logo && (
                <img src={currentChannel.logo} alt="" className="w-8 h-8 object-contain rounded shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div className="text-center min-w-0">
                <p className="text-white font-medium text-sm truncate">{currentChannel?.name || 'No Channel'}</p>
                <p className="text-cyan-300 text-xs">{currentChannel?.category || ''}</p>
              </div>
              {currentChannel && (
                <button
                  onClick={(e) => toggleFavorite(currentChannel.id, e)}
                  className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 ${
                    favorites.includes(currentChannel.id) ? 'text-yellow-400' : 'text-white/40 hover:text-white/70'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <IconStar />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setMuted(p => !p)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white" aria-label="Toggle mute">
                {muted || volume === 0 ? <IconVolumeX /> : <IconVolume2 />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-cyan-400 cursor-pointer"
                aria-label="Volume"
              />
              <button onClick={togglePiP} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white" aria-label="Picture in Picture">
                <IconPiP />
              </button>
              <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white" aria-label="Fullscreen">
                {isFullscreen ? <IconMinimize /> : <IconMaximize />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Sidebar ──────────────────────────────────────────────────────── */}
      <div
        className={`absolute top-0 left-0 bottom-0 z-40 w-80 max-w-[85vw] transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col bg-gray-950/95 dark:bg-gray-950/95 backdrop-blur-xl border-r border-white/5">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                <IconTv width={16} height={16} className="text-white" />
              </div>
              <h2 className="text-white font-bold text-lg">Channels</h2>
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-medium">
                {filteredChannels.length}
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
              <IconX />
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-2">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search channels..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="px-3 py-1">
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  <span>{getCategoryIcon(cat)}</span>
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-60">({getCategoryCount(cat)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Channel list */}
          <div ref={channelListRef} className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
            {filteredChannels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <IconTv className="text-white/10 mb-3" width={40} height={40} />
                <p className="text-white/30 text-sm font-medium">No channels found</p>
                <p className="text-white/15 text-xs mt-1">
                  {activeCategory === 'Favorites' ? 'Add channels to favorites by tapping the star' : 'Try a different search or category'}
                </p>
              </div>
            ) : (
              filteredChannels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => playChannel(channel)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                    currentChannel?.id === channel.id
                      ? 'bg-cyan-500/15 border border-cyan-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-xs text-white/20 font-mono w-6 text-right shrink-0">{channel.id}</span>
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt=""
                      className="w-9 h-9 object-contain rounded-lg bg-white/5 shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                    />
                  ) : null}
                  {!channel.logo && (
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/20 text-xs font-bold shrink-0">
                      {channel.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`text-sm font-medium truncate ${
                      currentChannel?.id === channel.id ? 'text-cyan-300' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {channel.name}
                    </p>
                    <p className="text-xs text-white/30">{channel.category}</p>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(channel.id, e)}
                    className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0 ${
                      favorites.includes(channel.id) ? 'text-yellow-400' : 'text-white/20 hover:text-white/50'
                    }`}
                    aria-label={favorites.includes(channel.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <IconStar />
                  </button>
                </button>
              ))
            )}
          </div>

          {/* Sidebar footer */}
          <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-white/20 text-xs">StreamVault TV v3.0</span>
            <span className="text-white/20 text-xs">{channels.length} channels</span>
          </div>
        </div>
      </div>

      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="absolute inset-0 z-35 bg-black/40 md:bg-black/20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Bookmarks Panel ──────────────────────────────────────────────── */}
      {showBookmarks && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowBookmarks(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2"><IconBookmark /> Quick Launch</h3>
              <button onClick={() => setShowBookmarks(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"><IconX /></button>
            </div>
            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <IconBookmark className="text-white/10 mb-3" width={40} height={40} />
                <p className="text-white/30 text-sm">No bookmarks yet</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-1.5 mb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                {bookmarks.map(bm => (
                  <div key={bm.id} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2.5 group transition-colors">
                    <IconExternalLink className="text-cyan-400 shrink-0" />
                    <a
                      href={bm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-0 text-white/80 hover:text-cyan-300 text-sm font-medium truncate transition-colors"
                    >
                      {bm.name}
                    </a>
                    <span className="text-white/20 text-[10px] truncate max-w-[100px] hidden sm:block">{bm.url}</span>
                    <button
                      onClick={(e) => handleRemoveBookmark(bm.id, e)}
                      className="p-1 rounded hover:bg-red-500/20 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                      aria-label={`Remove ${bm.name}`}
                    >
                      <IconX />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowAddBookmark(true)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-cyan-600/20 hover:bg-cyan-500/30 text-cyan-300 rounded-xl transition-colors text-sm font-medium border border-cyan-500/20"
            >
              <IconPlus /> Add Bookmark
            </button>
            <p className="text-white/20 text-[10px] text-center mt-2">
              Smart TV browser e site open korar por save kore rakhte add bookmark korun
            </p>
          </div>
        </div>
      )}

      {/* ─── Add Bookmark Modal ────────────────────────────────────────────── */}
      {showAddBookmark && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowAddBookmark(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Add Bookmark</h3>
              <button onClick={() => setShowAddBookmark(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"><IconX /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Name</label>
                <input
                  type="text"
                  value={newBookmarkName}
                  onChange={(e) => setNewBookmarkName(e.target.value)}
                  placeholder="My Site"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBookmark()}
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">URL</label>
                <input
                  type="url"
                  value={newBookmarkUrl}
                  onChange={(e) => setNewBookmarkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddBookmark()}
                />
              </div>
              <button
                onClick={handleAddBookmark}
                disabled={!newBookmarkName.trim() || !newBookmarkUrl.trim()}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/10 disabled:text-white/30 text-white rounded-xl transition-colors text-sm font-medium"
              >
                Save Bookmark
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Import Modal ──────────────────────────────────────────────────── */}
      {showImport && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowImport(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Import Playlist</h3>
              <button onClick={() => setShowImport(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"><IconX /></button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-white/50 text-sm mb-2">Import channels from an M3U/M3U8 playlist file</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".m3u,.m3u8,.txt"
                  onChange={handleM3UImport}
                  className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 file:cursor-pointer file:transition-colors"
                />
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/30 text-xs">Supported formats: .m3u, .m3u8, .txt</p>
                <p className="text-white/30 text-xs mt-1">Imported channels will be added to your channel list</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Help Modal ────────────────────────────────────────────────────── */}
      {showHelp && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowHelp(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-[480px] max-w-[90vw] max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Keyboard Shortcuts</h3>
              <button onClick={() => setShowHelp(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white"><IconX /></button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-400 font-semibold text-sm mb-2">Playback</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ['Space', 'Play / Pause'], ['M', 'Toggle mute'], ['F', 'Fullscreen'],
                    ['P', 'Previous channel'], ['N', 'Next channel'], ['R', 'Retry stream'],
                  ].map(([key, desc]) => (
                    <div key={key} className="flex items-center gap-2">
                      <kbd className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs font-mono">{key}</kbd>
                      <span className="text-white/50 text-xs">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold text-sm mb-2">Navigation</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ['Up/Down', 'Volume'], ['Left/Right', 'Seek 10s'],
                    ['Esc', 'Close sidebar'], ['H', 'Toggle help'],
                  ].map(([key, desc]) => (
                    <div key={key} className="flex items-center gap-2">
                      <kbd className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs font-mono">{key}</kbd>
                      <span className="text-white/50 text-xs">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold text-sm mb-2">Touch Gestures (Mobile)</h4>
                <div className="space-y-1 text-sm">
                  {[
                    'Swipe Left/Right: Next/Previous channel',
                    'Swipe Up/Down: Volume up/down',
                    'Double Tap: Toggle fullscreen',
                  ].map(desc => (
                    <p key={desc} className="text-white/50 text-xs">{desc}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
