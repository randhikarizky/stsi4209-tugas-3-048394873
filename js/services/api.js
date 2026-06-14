const ApiService = {
    async fetchBahanAjar() {
        try {
            // Kita coba fetch dari root
            const response = await fetch('./data/dataBahanAjar.json');
            if (!response.ok) {
                throw new Error('Gagal mengambil data dari server. Error code: ' + response.status);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
};
