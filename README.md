# 🔇 FakeMute — BetterDiscord

```
███████╗ █████╗ ██╗  ██╗███████╗    ██████╗ ███████╗ █████╗ ███████╗███████╗███╗   ██╗
██╔════╝██╔══██╗██║ ██╔╝██╔════╝    ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝████╗  ██║
█████╗  ███████║█████╔╝ █████╗      ██║  ██║█████╗  ███████║█████╗  █████╗  ██╔██╗ ██║
██╔══╝  ██╔══██║██╔═██╗ ██╔══╝      ██║  ██║██╔══╝  ██╔══██║██╔══╝  ██╔══╝  ██║╚██╗██║
██║     ██║  ██║██║  ██╗███████╗    ██████╔╝███████╗██║  ██║██║     ███████╗██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═══╝
```

> **Fake Deafen & Mute for BetterDiscord — No ZeresPluginLibrary required. Fixed & Updated for 2026.**

---

## ✦ What is it ?

**FakeMute** is a [BetterDiscord](https://betterdiscord.app/) plugin that lets you appear **muted or deafened** to others while still being able to **hear and speak** normally in voice channels.

Completely standalone — **no ZeresPluginLibrary dependency**, no extra downloads, no setup hassle.

---

## ⚡ Features

- 🔇 **Fake Deafen** — appear deafened to others while hearing everything
- 🎙️ **Fake Mute** — appear muted while still being able to speak
- 🖱️ **Toggle button** — dedicated button injected next to your Mute/Deafen buttons
- 🔊 **Sound feedback** — PTT sounds play when toggling on/off
- 🖱️ **Context menu toggle** — accessible from the audio device context menu
- ⚙️ **Settings panel** — customize behavior directly from BetterDiscord settings
- 📦 **Zero dependencies** — no ZeresPluginLibrary or any external library needed
- 🔄 **Auto-update** — always stays up to date via GitHub

---

## 📦 Installation

1. Make sure [BetterDiscord](https://betterdiscord.app/) is installed
2. Download [`FakeMute.plugin.js`](https://raw.githubusercontent.com/Keeplus/FakeMute/main/FakeMute.plugin.js)
3. Move it to your BetterDiscord plugins folder :

```
%appdata%\BetterDiscord\plugins\
```

4. Open Discord → Settings → Plugins → Enable **FakeMute by Keeplus** ✅

> ⚠️ **No need to install ZeresPluginLibrary** — this version is fully standalone.

---

## 🚀 Usage

1. **Join a voice channel**
2. **Mute or Deafen yourself** normally in Discord
3. Click the **🔇 button** that appears next to your Mute/Deafen buttons to activate Fake Mute/Deafen
4. You will now appear muted/deafened to others — but you can still hear and talk normally
5. Click the button again to **disable** it

You can also toggle it from the **audio device context menu** (right-click the sound icon).

---

## ⚙️ Settings

| Setting | Description |
|---|---|
| **Enable toggle button** | Shows/hides the button near Mute & Deafen buttons |
| **Enable toggle sounds** | Plays a sound when Fake Mute/Deafen is toggled |
| **Use DOM fallback** | Injects the button directly into the DOM if React patching fails |

---

## 🔄 Auto-Update

This plugin supports **automatic updates** via BetterDiscord's built-in updater.

Whenever a new version is pushed to this repo, BetterDiscord will notify you and offer to update automatically. No manual download needed.

---

## 🛡️ Compatibility

| | Status |
|---|---|
| Discord Latest (2026) | ✅ Working |
| ZeresPluginLibrary | ❌ Not required |
| BetterDiscord 1.x | ✅ Supported |
| Custom Discord modules | ✅ Compatible |

---

## 📝 Changelog

### v3.0.0 — 2026
- ✅ Full rewrite — completely standalone, no ZeresPluginLibrary
- ✅ WebSocket patching for reliable fake mute/deafen
- ✅ DOM button injection with MutationObserver fallback
- ✅ Context menu toggle added
- ✅ Settings panel built-in
- ✅ Auto-update support

---

## 👤 Author

Made with ❤️ by **[Keeplus](https://github.com/Keeplus)**

---

## ⚠️ Disclaimer

This plugin is intended for personal use only.  
Use responsibly and respect server rules and other users.
