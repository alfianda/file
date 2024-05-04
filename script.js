if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('Service Worker registered!');
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

const container = document.querySelector('.container');
const searchBar = document.getElementById('search-bar');

const data = [
    { text: "kms", file: "isi/officialkmspico.com-KMSpico-setup.zip" },
    { text: "aplkasi Atlas", file: "isi/Aplikasi ATLAS.xlsx" },
    { text: "LKP Dagang", file: "isi/Excel Laporan Keuangan Perusahaan Dagang Otomatis Ver 2 @HikmahSarjana BLANKO.xlsb" },
    // Tambahkan item lainnya sesuai dengan struktur folder dan nama filenya
];

function createSquare(item) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.textContent = item.text;
    square.addEventListener('click', () => {
        handleFile(item.file);
    });
    container.appendChild(square);
}

function handleFile(file) {
    const extension = file.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
        viewPDF(file);
    } else {
        downloadFile(file);
    }
}

function viewPDF(file) {
    // Buka file PDF dalam tab baru
    window.open(file, '_blank');
}

function downloadFile(file) {
    // Unduh file
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop();
    link.target = '_blank';
    link.click();

    // Munculkan notifikasi progres download
    if ('serviceWorker' in navigator && 'Notification' in window) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Download in progress', {
                body: 'File is being downloaded',
                icon: 'download-icon.png' // Ganti dengan ikon yang sesuai
            });
        });
    }
}

function showNotFoundMessage() {
    const message = document.createElement('div');
    message.textContent = "File tidak ditemukan";
    message.classList.add('not-found');
    container.appendChild(message);
}

function clearContainer() {
    container.innerHTML = ''; // Hapus persegi atau pesan yang ada
}

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredData = data.filter(item => item.text.toLowerCase().includes(searchTerm));

    clearContainer();

    if (filteredData.length === 0) {
        showNotFoundMessage();
    } else {
        filteredData.forEach(createSquare);
    }
});
