// Global Filters
Vue.filter('currency', function (value) {
    if (typeof value !== "number") return value;
    return 'Rp ' + value.toLocaleString('id-ID');
});

Vue.filter('unitPieces', function (value) {
    if (value === undefined || value === null) return '';
    return value + ' buah';
});

// Inisialisasi Aplikasi Utama
const app = new Vue({
    el: '#app',
    data: {
        loading: true,
        error: '',
        currentTab: 'stok', // stok, tracking, order
        appData: {
            stok: [],
            upbjjList: [],
            kategoriList: [],
            pengirimanList: [],
            paket: [],
            tracking: [] // Array of Objects
        }
    },
    computed: {
        latestDONumber() {
            // Generate sequence based on year and array length
            const year = new Date().getFullYear(); // e.g., 2025
            const totalTracking = this.appData.tracking ? this.appData.tracking.length : 0;
            const nextSequence = totalTracking + 1;
            // Pad sequence with leading zeros (e.g., 001)
            const paddedSequence = String(nextSequence).padStart(3, '0');
            return `DO${year}-${paddedSequence}`;
        }
    },
    methods: {
        async initData() {
            try {
                this.loading = true;
                const data = await ApiService.fetchBahanAjar();
                this.appData = data;
                
                // Normalisasi tracking JSON. JSON yang diberikan formatnya sedikit unik:
                // array dari objek { "DO_KEY": { details } }
                // Pastikan tracking terinisialisasi
                if (!this.appData.tracking) {
                    this.$set(this.appData, 'tracking', []);
                }

                this.loading = false;
            } catch (err) {
                this.error = err.message;
                this.loading = false;
            }
        },
        handleUpdateStok(payload) {
            const { action, data, kode } = payload;
            if (action === 'add') {
                this.appData.stok.push(data);
            } else if (action === 'edit') {
                const idx = this.appData.stok.findIndex(item => item.kode === data.kode);
                if (idx !== -1) {
                    this.$set(this.appData.stok, idx, data);
                }
            } else if (action === 'delete') {
                const idx = this.appData.stok.findIndex(item => item.kode === kode);
                if (idx !== -1) {
                    this.appData.stok.splice(idx, 1);
                }
            }
        },
        handleUpdateTracking(payload) {
            const { id, log } = payload;
            // Cari DO di array tracking
            const doItem = this.appData.tracking.find(item => item[id] !== undefined);
            if (doItem) {
                // Di dalam do-tracking.js sebenarnya kita me-mutate data by reference,
                // tapi ini adalah bentuk formal re-assignment jika dibutuhkan (meski Vue object tracking reference).
                // doItem[id].perjalanan.push(log); // (already pushed di child component karena pass by reference)
            }
        },
        handleSaveOrder(payload) {
            const { id, data } = payload;
            // Struktur tracking array of objects dengan key nomor DO
            const newTrackingObj = {};
            newTrackingObj[id] = data;
            this.appData.tracking.push(newTrackingObj);
            
            // Pindahkan tab kembali ke tracking
            this.currentTab = 'tracking';
        }
    },
    mounted() {
        // Panggil initData saat komponen dimuat
        this.initData();
    }
});
