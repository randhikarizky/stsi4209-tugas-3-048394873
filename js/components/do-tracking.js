Vue.component('do-tracking', {
    template: '#tpl-do-tracking',
    props: {
        trackingData: { type: Array, required: true }
    },
    data() {
        return {
            searchQuery: '',
            searchResult: null,
            hasSearched: false,
            newProgress: ''
        };
    },
    methods: {
        searchDO() {
            if (!this.searchQuery.trim()) return;
            const query = this.searchQuery.trim().toLowerCase();
            this.hasSearched = true;
            this.searchResult = null;

            // Cari di array trackingData
            // Struktur data: [ { "DO2025-0001": { nim: "...", nama: "..." } } ]
            for (let i = 0; i < this.trackingData.length; i++) {
                const item = this.trackingData[i];
                const key = Object.keys(item)[0]; // ambil key DO
                const dataDO = item[key];
                
                if (key.toLowerCase() === query || dataDO.nim.toLowerCase() === query) {
                    this.searchResult = {
                        id: key,
                        ...dataDO
                    };
                    break;
                }
            }
        },
        clearSearch() {
            this.searchQuery = '';
            this.searchResult = null;
            this.hasSearched = false;
        },
        addProgress() {
            if (!this.newProgress.trim() || !this.searchResult) return;
            
            // Format waktu (contoh: 2025-08-25 15:30:00)
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, '0');
            const timeStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            
            const newLog = {
                waktu: timeStr,
                keterangan: this.newProgress
            };

            // Update secara lokal di searchResult
            this.searchResult.perjalanan.push(newLog);
            
            // Emit ke parent untuk update root state
            this.$emit('update-tracking', {
                id: this.searchResult.id,
                log: newLog
            });

            this.newProgress = '';
        }
    }
});
