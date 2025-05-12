# Uploadify

[Vezi repository-ul backend aici](https://github.com/top-dev-bln/server-upldfy)

Uploadify este o aplicație SaaS de partajare securizată a fișierelor. Aplicația permite utilizatorilor autentificați prin Google să încarce, să gestioneze și să distribuie fișiere rapid și în siguranță.



## 📦 Tehnologii folosite

- **Node.js**
- **Express**
- **Multer** (pentru upload de fișiere)
- **Supabase** (gestionare utilizatori și baze de date)
- **Google OAuth 2.0**
- **JWT** (pentru token-uri de acces)
- **dotenv** (pentru variabile de mediu)
- **Google APIs** (pentru autentificare)

## ✨ Funcționalități

- Autentificare cu Google OAuth 2.0
- Upload de fișiere securizat
- Generare link unic de descărcare cu token de securitate
- Stocare metadate fișiere în Supabase
- Export informații fișiere în format JSON
- Ștergere fișiere de pe server după descărcare
- Gestionare credentiale securizate prin `.env`

## 🔒 Securitate

- Toate fișierele sunt accesibile doar prin link-uri unice generate cu token JWT.
- Credentialele de autentificare și cheile API sunt gestionate în fișiere `.env`.
- Fişierele sunt șterse automat de pe server după descărcare, pentru a reduce riscul de acces neautorizat.

## 📄 Configurare proiect

1. Clonează repository-ul:
   ```bash
   git clone https://github.com/utilizator/uploadify.git
   cd uploadify