# HACKTIV8 BANK

Kamu akan membuat aplikasi system bank sederhana menggunakan Express dan Sequelize. Baca tiap specification dengan baik, ikuti apa yang diminta.

## Release 0

Install dependencies seperti: express, sequelize, dll. Inisialisasi project kalian menggunakan command yang disediakan oleh sequelize. Isi konfigurasi database, database **HARUS** diberi nama **holidays_challenge**.

## Release 1

Buatlah migration dan model untuk:

- Customer
  - identityNumber (string)
  - fullName (string)
  - address (string)
  - birthDate (date)
  - accountNumber (string)
  - gender (string)

- Account
  - type (string)
  - balance (string)

Relasi antar Model adalah 1 `Customer` dapat memiliki banyak `Account`, 1 `Account` hanya dimiliki oleh 1 `Customer`;

**Kamu boleh menambahkan kolom baru untuk memenuhi requirement relasi diatas**

## Release 2

Buatlah migration untuk requirement dibawah:
- Untuk mengubah type data kolom `balance` menjadi **float** ([HINT](https://github.com/sequelize/sequelize/issues/2471))
- Untuk menambah kolom `accountNumber` bertipe string pada Accounts
- Untuk menghapus kolom `accountNumber` dari Customers


## Release 3

Buat seed untuk mengisi Customers minimal 2 data


## Release 4

Buatlah routing untuk system Bank yang HARUS mengikuti format ketentuan sebagai berikut:

| Method | Route          | Description |
|--------|----------------|-------------|
| GET    | `/customers` | Menampilkan data `Customers`|
| GET & POST  | `/customers/register` | Form untuk menambahkan data `Customer`|
| GET & POST   | `/customers/:idCustomer/editProfile` | Mengupdate data profile `Customer` |
| GET & POST   | `/customers/:idCustomer/accounts` | Menampilkan semua data `Account` yang dibuka oleh `Customer` tersebut dan Form untuk menambah `Account` |
| GET & POST | `/customers/:idCustomer/accounts/:idAccount/transfer` | Menampilkan form untuk transfer ke `Account` lain



## Release 5

Pada routing `/customers` akan menampilkan list `Customers` pada sebuah `Bank`. diurutkan berdasarkan abjad nama `Customers` secara berurutan. Dimana terdapat **link** pada setiap data untuk **Edit Profile** & **View Accounts**

Dihalaman ini juga terdapat link/button untuk menuju halaman registrasi


## Release 6

Pada routing `/customers/register` akan menampilkan halaman untuk registrasi `Customer` dimana:
  - input type `identityNumber` adalah text
  - input type `fullName` adalah text
  - input type `address` adalah text
  - input type `birthDate` adalah picker date, dimana jika picker date tidak diisi maka default Value dari birthDate ini adalah 1 Januari 2000
  - input type `gender` adalah radio dengan value:
    - female
    - male

## Release 7

Pada routing `/customers/:idCustomer/editProfile` halaman untuk edit profile `Customers` dimana semua datanya ter-*populate* sebagai value di masing-masing input-nya.


## Release 8

Pada routing `/customers/:idCustomer/accounts` akan menampilkan menampilkan semua `Accounts` yang dimiliki oleh seorang `Customer`

Pada halaman ini buatlah form untuk menambahkan `Account` dimana terdapat:
  - input type `account type` adalah select option yang berisi pilihan `On Account`, `Xtra Payroll` dan `Tabunganku`
  - input type `balance` adalah input text

Value dari `accountNumber` akan teriisi secara otomatis dan random sebanyak 10 digit. **(Dilarang meng-assign value dari routes/controller. Coba kamu pikirkan apakah harus menggunakan instance method/class method/hooks/helper)**


## Release 9

Buat validation sesuai keterangan berikut:
- `Customer`
  - `identityNumber` harus diisi; minimum karakter 16 digit maksimum 20 digit; dan harus unik
    - Tampilkan pesan **Identity Number must be filled** jika `identityNumber` kosong
    - Tampilkan pesan **Identity Number minimum 16 characters and maximum 20 characters** jika `identityNumber` kurang dari 16 digit
    - Tampilkan pesan **Duplicate Identity Number** (buat custom validation)
  - `fullName` harus diisi
    - Tampilkan pesan **Full name must be filled** jika `fullName` kosong
  - `birthDate` harus diisi
    - Tampilkan pesan **Birth Date must be filled** jika `birthDate` kosong

  **NOTE**
  Pastikan saat melakukan Edit Profile, validation diatas tetap berjalan

- `Account`
  - `balance` minimum 500.000
    - Tampilkan pesan **Minimum balance for new Accout: Rp500.000** jika balance kurang dari 500.000
    - JIKA `balance` kosong/tidak diisi, maka defaultValue adalah 500.000


## Release 10
Buat fungsi untuk menampilkan value `balance` yang tadinya hanya berupa angka menjadi format **IDR X,XXX,XXX** tanpa mengubah controller/routes dan tanpa memasukkan logic proses pada View.

Gunakan fungsi ini pada halaman/form yang menampilkan value `balance`

**HINT**
```
toLocaleString('en-ID', {style: 'currency', currency: 'IDR'});
```


## Release 11
Pada routing `/customers/:idCustomer/accounts/:idAccount/transfer` akan menampilkan data:
  - Transfer From berisi informasi [accountNumber]<space>[type]<space>[balance-yang-telah-diformat]
  - Amount merupakan input text
  - Transfer To berupa select option yang berisi daftar `accountNumber` dan `pemilik accountNumber`

Jika button `TRANSFER` di-klik, maka proses yang terjadi adalah:
  - Jika `balance` kurang dari `amount` maka tampilkan **Insufficient balance** (Proses ini tidak boleh dilakukan di controller, routes dan view. Coba pikirkan apakah harus menggunakan helper atau hooks)
  - Jika `balance` cukup, maka `balance` ybs akan berkurang dan `balance` yang dituju akan bertambah




# DEMO APLIKASI
https://hacktiv8-bank.herokuapp.com/
