### Kenapa memilih Vue?
Karena Vue stack terakhir yang saya pakai di aplikasi yg pernah saya buat sehingga menurut saya membuat proses aplikasinya pun lebih cepat dibanding React, karena kalo React saya baru belajar, takutnya jadi bottleneck

### Kenapa pake Quasar?
Awalnya saya liat di task tidak ada larangan untuk memakai framework UI, akhirnya saya memilih Quasar karena agar proses developnya tidak terlalu dari 0 atau bisa di bilang tinggal pake componentnya dan tentunya effortnya tidak terlalu besar

### Kenapa bikin table untuk aplikasinya?
Karena menurut saya table itu default bagi orang awam untuk me-list sesuatu yang cukup banyak datanya.

### Kenapa gak di limit ketika get data?
Karena menurut saya datanya tidak terlalu banyak dan menghindari hit terus-terusan ke BE (asumsinya) + mempengarui UX dari user (berat di awal tapi ketika ganti page cukup enteng)

### Kenapa kolom uuid dan timestamp gak di tambahin?
Karena menurut asumsi saya UUID dan timestamp itu di generate di BE jadi gak saya bikin di FE

### Caching, PWA?
Caching saya pake Vuex, mungkin mirip Redux kalo di React. Vuex pun saya jadikan pooling API. Saya tambahkan background process juga agar user selalu update dengan datanya. Kalo untuk PWA tinggal pake, service worker dll udah dibikinin Quasar

### Bottleneck?
Saya gak tau kenapa API-addnya error atau apa, karena setiap saya tambah data, urutan propertiesnya itu berbeda. Sudah saya debug, payload datanya pun persis sesuai dengan dokumentasi di Stein.
Sehingga untuk API edit dan delete saya menggunakan data yg sesuai (semua kolomnya di isi)

### TODO?
Kalo pengen sempurna sih kayanya masih banyak yg harus di bikin tapi setidaknya sudah memenuhi list goals yang diinginkan, belum sempet di bikin, antara lain:
- refactor
- memisahkan component yg di pake bersama e.g: dialog
- verifikasi atau validasi (belum tau bisnis modelnya)
