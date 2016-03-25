# Heritago
A Heritage Advanture App.
Aplikasi Petualang Situs Peninggalan Bersejarah.

## Cara Install
### Browser
Untuk menjalankan aplikasi di browser, ikuti langkah berikut.
* Install [nodejs](https://nodejs.org), ikuti tutorial di [sini]()
* Buka CommandPrompt.exe dan lakukan perpindahan direktori ke folder ini (Heritago App)

        prompt> E:/direktori/folder/heritago

* Lalu lakukan instalasi package dengan Node Package Manager (NPM) dengan perintah

        folder/heritago> npm install

* Kemudian lakukan instalasi beberapa package khusus untuk digunakan sebagai perintah.
  Ikuti tutorial di [sini]().

        folder/heritago> npm install -g gulp bower

* Jalankan perintah untuk mendownload library yang digunakan pada aplikasi Heritago.

        folder/heritago> bower install

* Setelah itu, jalankan perintah untuk mempublikasikan aplikasi sehingga dapat dilihat di
  browser dengan URL [http://localhost:3000/]().

        folder/heritago> gulp

* Pastikan CommandPrompt.exe tetap berjalan. Buka browser pada alamat di atas.

## Cara Pengembangan
### Apa itu AngularJs?
Sebuah framework javascript yang menggunakan konsep Scoped Controller, Service,
dan Directive.

Nah, berikut adalah sebuah analogi yang bertema kerajaan.

#### Scoped Controller
AngularJs diumpamakan seperti negara dengan struktur pemerintahan yang rapi dan pejabat
memiliki daerah tanggung jawab masing-masing. Pejabat adalah perumpamaan Scoped Controller
atau Pengendali/Penguasa dengan ruang lingkup tertentu. Sedangkan daerah tanggung jawab
(scope) adalah perumpamaan element HTML. Ketika semakin tinggi pejabat, daerah kekuasaan
semakin luas (bayangkan elemen `<html>` atau `<body>`). Pejabat lain yang lebih rendah
memiliki kekuasaan yang lebih kecil (bayangkan elemen `<div>`, `<nav>`, `<ul>`, dll).

Setiap pejabat akan mengurusi daerah masing-masing. Pejabat yang lebih rendah memiliki
otonomi terhadap daerahnya dan pejabat yang lebih tinggi tidak terlalu terlibat, tapi
dapat menentukan.

Katakanlah yang tertinggi adalah raja, agar pas karena ini aplikasi situs peninggalan.
Dan @Abdillah suka tentang kerajaan :smile:. Pada AngularJs, raja adalah aplikasi
(`ng-app` atau modul angular app).

        var raja = angular.module('HeritagoApp', []);

Ia yang menentukan siapa saja bawahannya dan apa saja yang dilakukan.

        raja.controller('GubernurTanahBaca', ['$scope', function($scope) {
            // Setelah menyerahkan sebagian daerah kekuasaannya $scope
            // raja memberikan beberapa perintah di sini.
        }]);

Raja dapat memerintahkan banyak hal, beberapa diantaranya,
1. Memberikan target produksi padi pada daerah subur

        raja.controller('GubernurTanahBaca', ['$scope', function($scope) {
            $scope.produksiPadi = 3000;  // ton
            $scope.periodeTarget = 365;  // hari atau satu tahun

            // Perincian
            $scope.produksiPadiPerHari = $scope.produksiPadi / $scope.periodeTarget;
        }]);

   Lalu gubernur akan menjalankan tugasnya dengan cara membuat program realisasi,

        <div ng-controller="GubernurTanahBaca">
          <program>Peningkatan produksi padi hingga {{produksiPadi}} dalam masa {{periodeTarget}}</program>
          <produksipadi ng-repeat="i to periodeTarget">
            <petani>Produksi hari ke {{i}} adalah {{produksiPadiPerHari}}</petani>
          </produksipadi>
        </div>

   Sehingga program benar-benar terealisasi.

2. Melakukan mitigasi bencana

        raja.controller('GubernurTanahBaca', ['$scope', function($scope) {
            // ...

            // jenis bencana
            var jenisBencana = ['banjir', 'longsor', 'gempa'];
            // Ada bencana longsor
            var bencana = 1;

            $scope.terjadiBencana = jenisBencana[bencana];
            $scope.penanganan = "Kerahkan Tim SAR, Tim Penggali, Ambulan";
        }]);

   Program mitigasi juga dijalankan

        <div ng-controller="GubernurTanahBaca">
          <program>Mitigasi bencana</program>
          <div ng-if="terjadiBencana == 'longsor'">
            <mitigasi>{{penanganan}}</mitigasi>
          </div>
        </div>

   Agar daerah siap menghadapi bencana.

#### Service
Ketika bercerita mengenai kerajaan, tentu lebih seru jika tidak hanya ada raja melulu.
Agar terkesan realistis, di dalam cerita ini, kita sertakan menteri atau patih raja.
Nah, patih raja dalam Kerajaan AngularJs, berperan sebagai pembantu dalam hal
menyimpan dan mengumpulkan data mengenai kerajaan dan kondisi yang ada.

Coba perhatikan bahwa raja dapat menunjuk seorang menteri pertanahan dan memberinya
wewenang mencatat tanah.

        raja.service('MenteriPertanahan', [function() {
            // Menteri pertanahan mengurusi data pertanahan
            // mencatat luas tanah dan pemiliknya, misal
            var bukuTanah = [{
                pemilik: 'Sa Mio',
                luas: 200,
                letah: '20.0;39.12'
            },
            {
                pemilik: 'Bi Son Ri No',
                luas: 1290,
                letak: '12.3;20.10'
            }];

            return {
                getBukuTanah: function() {
                    return bukuTanah;
                }
            };
        }]);

Menteri yang telah ditunjuk tidak hanya membantu presiden juga, namun dapat membantu
pejabat lain. Seorang gubernur, misalnya, ingin mempublikasikan data tanah yang
ada kepada masyarakat. Ia meminta bantuan kepada MenteriPertanahan. Dalam satu kerajaan,
setiap menteri hanyalah satu orang. Ketika menteri dibutuhkan oleh pejabat, untuk
mencatat data tanah, misalnya. Maka data tanah tersebut akan tersedia untuk pejabat
yang lain. Inilah kelebihan menteri, dengan nama lain Service.

        raja.controller('GubernurTanahBaca', ['$scope', 'MenteriPertanahan', function($scope, MenteriPertanahan) {
            // ...

            var bukuTanah = MenteriPertanahan.getBukuTanah();
        }]);

... to be continued


