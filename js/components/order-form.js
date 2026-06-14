Vue.component('order-form', {
    template: '#tpl-order-form',
    props: {
        paketList: { type: Array, required: true },
        pengirimanList: { type: Array, required: true },
        latestDo: { type: String, required: true } // format: DO2025-001
    },
    data() {
        return {
            form: {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: this.getTodayDate() // auto local date
            },
            formError: ''
        };
    },
    computed: {
        selectedPaketDetail() {
            if (!this.form.paket) return null;
            return this.paketList.find(p => p.kode === this.form.paket);
        },
        isFormValid() {
            return this.form.nim && this.form.nama && this.form.ekspedisi && this.form.paket && this.form.tanggalKirim;
        }
    },
    methods: {
        getTodayDate() {
            const d = new Date();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // format YYYY-MM-DD untuk input type date
        },
        formatTanggal(dateString) {
            // Ubah format ke "tanggal bulan tahun" (misal 25 Agustus 2025)
            const date = new Date(dateString);
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        },
        submitOrder() {
            if (!this.isFormValid) {
                this.formError = 'Lengkapi semua data!';
                return;
            }

            const pkg = this.selectedPaketDetail;
            const newOrder = {
                nim: this.form.nim,
                nama: this.form.nama,
                status: "Proses Ekspedisi",
                ekspedisi: this.pengirimanList.find(e => e.kode === this.form.ekspedisi).nama,
                tanggalKirim: this.formatTanggal(this.form.tanggalKirim),
                paket: pkg.kode,
                total: pkg.harga,
                perjalanan: [
                    {
                        waktu: new Date().toLocaleString('id-ID'), // local time for creation
                        keterangan: "DO Dibuat"
                    }
                ]
            };

            // Emit data to root
            this.$emit('save-order', { id: this.latestDo, data: newOrder });

            // Reset form
            this.form.nim = '';
            this.form.nama = '';
            this.form.ekspedisi = '';
            this.form.paket = '';
            this.form.tanggalKirim = this.getTodayDate();
            this.formError = '';
            alert(`Berhasil membuat DO Baru: ${this.latestDo}`);
        }
    }
});
