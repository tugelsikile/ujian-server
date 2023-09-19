# MAIN SERVER
### First Run
- `composer install`
- `php artisan migrate`
- `php artisan passport:install`
- `php artisan db:seed --class=UserSeeder`
### Database
- character set `utfmb4`
- collation `utf8mb4_general_ci`

### code of conduct
- selalu buat controller kedalam direktori masing masing sesuai group pada route `api`.
- selalu buat validation dan repository sesuai dengan `controllernya`
- `repository` adalah yang berhubungan dengan model
- `validation` adalah yang berhubungan dengan validasi request
