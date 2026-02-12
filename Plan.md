# 🚀 Google Sign-In Integrācijas Plāns

Šis plāns ir izstrādāts "Life Cockpit" projektam, lai ieviestu lietotāju autentifikāciju, izmantojot **Google Identity Services SDK**.

---

## 📅 Darbu sadalījums pa fāzēm un zariem (Branches)

### Fāze 0: Sagatavošanās (Kopīgs sākums uz `main`)
*Šo veic viens no komandas biedriem pirms paralēlā darba uzsākšanas.*
- [ ] Izveidot projektu [Google Cloud Console](https://console.cloud.google.com/).
- [ ] Iegūt **OAuth 2.0 Client ID** (Authorized origin: `http://localhost:8080`).
- [x] Instalēt bibliotēkas: `npm install @react-oauth/google jwt-decode`.
- [x] Ietīt lietotni `GoogleOAuthProvider` komponentē (`src/main.tsx` vai `src/App.tsx`).

---

### Fāze 1: Paralēlais darbs (Atsevišķi zari)

#### 👤 Branch: `feat/auth-context-system` (Loģikas izstrāde)
**Atbildība:** Autentifikācijas sistēmas "smadzenes".
- [ ] **AuthContext**: Izveidot `src/contexts/AuthContext.tsx` sesijas pārvaldībai.
- [ ] **Persistence**: Ieviest `localStorage` sesijas saglabāšanai pēc lapas pārlādes.
- [ ] **ProtectedRoute**: Izveidot `src/components/auth/ProtectedRoute.tsx` maršrutu aizsardzībai.
- [ ] **JWT Decoder**: Izveidot utilītu Google tokenu atkodēšanai.

#### 🎨 Branch: `feat/auth-ui-views` (Saskarnes izstrāde)
**Atbildība:** Ko lietotājs redz un kā mijiedarbojas.
- [ ] **Login lapa**: Izveidot `src/pages/Login.tsx` ar "Life Cockpit" vizuālo stilu.
- [ ] **Google Login poga**: Integrēt un stilizēt Google autorizācijas pogu.
- [ ] **UserProfile komponente**: Izveidot elementu lietotāja info attēlošanai un pogu "Sign Out".
- [ ] **Loading stāvokļi**: Izveidot vizuālo "ielādes" ekrānu sesijas pārbaudei.

---

### Fāze 2: Integrācija (Merge & Connect)
- [ ] Apvienot (Merge) abus zarus uz `main`.
- [ ] Failā `App.tsx` pieslēgt `Login` lapu un `ProtectedRoute` pie maršrutiem.
- [ ] Pieslēgt `UserProfile` komponenti pie reālajiem datiem no `AuthContext`.
- [ ] Pārbaudīt "Sign Out" funkcionalitāti.

---

### Fāze 3: Testēšana un Pulēšana
- [ ] Pārbaudīt drošību (vai nevar tikt klāt Dashboard bez autorizācijas).
- [ ] Nopulēt pārejas animācijas starp Login un Dashboard.
- [ ] Pārliecināties par responsīvu dizainu visos ekrānos.

---

## 💡 Tehniskie padomi paralēlam darbam
1. **Zaru saukšana**: Izmantojiet precīzus nosaukumus, kā norādīts augstāk.
2. **Mock dati**: UI izstrādātājs var izmantot pagaidu lietotāja objektu, līdz loģika ir pabeigta.
3. **Pull Request**: Pirms sapludināšanas uz `main`, veiciet koda apskati (Code Review) viens otram.
