# 🦁 Restaurant Review Autopilot

> AI-drevet system for automatisk svar på Google-anmeldelser. Svar på 500+ anmeldelser med din autentiske stemme.

---

## 📊 Datasett

**555+ anmeldelser** ekstrahert og analysert:

### Google Reviews (Primær Fokus)

| Bedrift | Anmeldelser | Snitt ⭐ | Svar-Rate | Ubesvart |
|---------|-------------|----------|-----------|----------|
| **Vespa & Humla** 🐝 | 434 | 4.1 | 2% | **426** |
| **ESSA** | 118 | 4.4 | 30% | 82 |
| **Smash House** | 2 | 5.0 | 0% | 2 |
| **BLOKK Asker** | 1 | 5.0 | 0% | 1 |
| **TOTALT** | **555** | **4.2** | **7%** | **511** |

### Facebook Reviews (Bonus)
- **ESSA:** 29 reviews (100% recommend, 2.8K followers)
- **Vespa & Humla:** 84% recommend (5.1K followers)

**Største mulighet:** Vespa & Humla (426 ubesvarte Google-anmeldelser)

---

## 💡 Hva Er Dette?

AI-system som:
1. ✅ **Detekterer** nye anmeldelser automatisk (Google + Facebook)
2. ✅ **Genererer** svar i din autentiske stemme
3. ✅ **Analyserer** sentiment (positiv/negativ/nøytral)
4. ✅ **Sender** til godkjenningskø (Slack/Telegram/Dashboard)
5. ✅ **Poster** godkjente svar automatisk

**Fokus:** Google Reviews (størst SEO-effekt + 555 anmeldelser)  
**Bonus:** Facebook support kan legges til senere

**Resultat:** 90%+ svar-rate, bedre SEO, fornøyde kunder, 80% mindre tid brukt.

---

## 🚀 Slik Fungerer Det

```
┌─────────────────┐
│ Google Review   │ Ny 4⭐ anmeldelse fra kunde
└────────┬────────┘
         ↓
┌─────────────────┐
│ n8n Deteksjon   │ Sjekker hver 6. time
└────────┬────────┘
         ↓
┌─────────────────┐
│ AI Analyse      │ GPT-4o-mini genererer svar
└────────┬────────┘
         ↓
┌─────────────────┐
│ Godkjenningskø  │ Slack/Telegram/Dashboard
└────────┬────────┘
         ↓
┌─────────────────┐
│ Manuell Review  │ Du godkjenner (30 sek)
└────────┬────────┘
         ↓
┌─────────────────┐
│ Auto-Post       │ Poster til Google API
└─────────────────┘
```

---

## 📂 Prosjektstruktur

```
restaurant-autopilot/
├── README.md                    # Denne filen
├── PITCH-OVERVIEW.md            # Komplett pitch-dokument
├── EXECUTIVE-SUMMARY.md         # TL;DR versjon
├── COMPLETE-REVIEW-DATA.md      # Alle 555 anmeldelser
│
├── clients/
│   ├── Vespa-Humla/
│   │   ├── BUSINESS-PROFILE.md  # Bedriftsprofil
│   │   └── REVIEW-STATS.md      # 434 anmeldelser
│   ├── essa/
│   │   ├── BUSINESS-PROFILE.md  
│   │   ├── REVIEW-STATS.md      # 118 anmeldelser
│   │   └── VOICE-PROFILE.md     # AI stemme-profil ✅
│   ├── Smash-House/
│   │   ├── BUSINESS-PROFILE.md
│   │   └── REVIEW-STATS.md      # 2 anmeldelser
│   └── BLOKK-Asker/
│       ├── BUSINESS-PROFILE.md
│       └── REVIEW-STATS.md      # 1 anmeldelse
│
└── ui/
    └── dashboard.html           # Godkjenningsdashboard UI ✅
```

---

## 🛠️ Teknisk Stack

### Allerede Bygget ✅
- **Data-ekstraksjon:** 555 anmeldelser fra Google Takeout
- **Analyse:** Sentiment, språkmønster, svar-rate
- **ESSA stemmeprofil:** Varm, direkte, nabolagsfokusert
- **Dashboard UI:** HTML/CSS prototype

### Gjenstår (1-2 uker)
- **n8n arbeidsflyt:** Auto-deteksjon + AI-generering + godkjenning
- **Vespa stemmeprofil:** Ekstraheres fra 434 anmeldelser
- **Google My Business API:** OAuth + post-integrasjon
- **Godkjenningskø:** Slack/Telegram bot

---

## 📈 ROI

### Før Autopilot
- 555 anmeldelser
- 39 svar (7% svar-rate)
- ~20 timer manuelt arbeid

### Etter Autopilot (90% svar-rate)
- 555 anmeldelser
- **500+ svar** (90% svar-rate)
- **~4 timer arbeid** (kun godkjenning)

**Effekt:**
- 10x flere besvarte anmeldelser
- 80% mindre tid brukt
- Bedre Google-ranking (SEO boost)
- Sterkere kunderelasjon

---

## 💰 Prismodeller

### Anbefalt: Bedriftspakke
**8.999 kr/måned** for alle 4 bedrifter

**Inkludert:**
- Ubegrensede anmeldelser
- AI-genererte svar i din stemme
- Manuell godkjenningskø
- Tilpasset stemme-tuning per bedrift
- Prioritert support

### Alternativ A: Per-Bedrift
**2.999 kr/måned per lokasjon**
- 4 lokasjoner = 11.996 kr/måned

### Alternativ B: Rev-Share
**15% av økt omsetning** fra forbedret Google-ranking
- Ingen forhåndskostnad
- Sporet via Google Business Insights

---

## 🎯 Implementeringsplan

### Fase 1: Vespa & Humla (Uke 1-2)
**Hvorfor først?** 434 anmeldelser, 98% ubesvart = størst ROI

**Oppgaver:**
1. ✅ Ekstrahert 434 anmeldelser
2. ⏳ Bygg stemmeprofil fra 8 eksisterende svar
3. ⏳ Sett opp n8n arbeidsflyt med godkjenning
4. ⏳ Prosesser 426 backlog-anmeldelser

**Resultat:** 426 nye svar, 95%+ svar-rate

### Fase 2: ESSA (Uke 3)
1. ✅ Stemmeprofil ferdig
2. ⏳ Deploy n8n arbeidsflyt
3. ⏳ Prosesser 82 backlog-anmeldelser

### Fase 3: Smash House + BLOKK (Uke 4)
1. ⏳ Lag grunnleggende stemmeprofiler
2. ⏳ Deploy samme arbeidsflyt
3. ⏳ Auto-svar på fremtidige anmeldelser

**Total Tid til Produksjon:** 3-4 uker for alle 4 bedrifter

---

## 🎨 UI Preview

**Dashboard:** `ui/dashboard.html`

Se godkjenningsdashboard med:
- Live statistikk (venter på godkjenning, godkjent i dag, svar-rate)
- Prioritert kø (negative anmeldelser først)
- AI-genererte svar
- En-klikk godkjenning/redigering/avvisning

Åpne `ui/dashboard.html` i nettleser for å se designet.

---

## 📊 Hva Er Ferdig?

### ✅ Ferdigstilt
- [x] Ekstrahert 555 Google-anmeldelser
- [x] Bygget komplett datasett per bedrift
- [x] Analysert sentiment + språkmønster
- [x] Laget ESSA stemmeprofil
- [x] Designet godkjenningsdashboard
- [x] Skrevet komplett pitch-dokumentasjon
- [x] Identifisert 511 ubesvarte anmeldelser

### ⏳ Gjenstår
- [ ] n8n automatisering (2-3 dager)
- [ ] Vespa stemmeprofil (1 dag)
- [ ] Google My Business API-integrasjon (1 dag)
- [ ] Slack/Telegram godkjenningsbot (2 dager)
- [ ] Testing & QA (2 dager)

---

## 📞 Neste Steg

1. **Gjennomgå pitch** → `EXECUTIVE-SUMMARY.md` (5 min)
2. **Se UI** → `ui/dashboard.html` (2 min)
3. **Sjekk stemmeprofil** → `clients/essa/VOICE-PROFILE.md` (3 min)
4. **Bestem start** → Vespa & Humla (anbefalt)
5. **Launch** → Produksjon på 1-2 uker

---

## 🤖 Tekniske Detaljer

### AI-Modell
**GPT-4o-mini** (OpenAI)
- Rask respons (~2 sek per svar)
- God kvalitet for review-svar
- Kostnadseffektiv (~0.10 kr per review)

### Stemmeprofil-Ekstraksjon
1. Analyserer eksisterende svar
2. Identifiserer tone, språk, fraser
3. Bygger prompt-template
4. Tester med historiske anmeldelser
5. Finjusterer basert på feedback

### Google API-Integrasjon
- OAuth 2.0 autentisering
- Google My Business API v4
- Rate limits: 50 requests/sek
- Auto-retry på feil

---

## ❓ FAQ

**Q: Låter svarene robotiske?**  
A: Nei. Vi bygger stemme-profil fra dine eksisterende svar. AI kopierer din tone, språk og stil.

**Q: Hva med negative anmeldelser?**  
A: Negative anmeldelser krever alltid manuell godkjenning. Du ser utkastet, redigerer om nødvendig, godkjenner.

**Q: Kan jeg redigere svarene?**  
A: Ja. Alle svar går via godkjenningskø. Du kan redigere, avvise eller godkjenne.

**Q: Hvor lang tid tar godkjenning?**  
A: 30 sekunder per anmeldelse (vs 5 min manuelt).

**Q: Hva om AI lager feil?**  
A: Human-in-loop. Ingenting postes uten din godkjenning.

**Q: Fungerer det for Facebook reviews?**  
A: Ja! Facebook-support kan legges til. Google er prioritet #1 (størst SEO-effekt), men Facebook kommer i fase 2.

**Q: Fungerer det for andre plattformer?**  
A: Ja. Kan utvides til TripAdvisor, Trustpilot, Yelp, etc.

---

## 📄 Dokumenter

- **[PITCH-OVERVIEW.md](PITCH-OVERVIEW.md)** - Komplett pitch (5 min)
- **[EXECUTIVE-SUMMARY.md](EXECUTIVE-SUMMARY.md)** - TL;DR versjon (2 min)
- **[COMPLETE-REVIEW-DATA.md](COMPLETE-REVIEW-DATA.md)** - Alle 555 anmeldelser

---

**Klar til å svare 500+ anmeldelser?** 🚀

**Laget av:** Leon 🦁  
**Dato:** 1. februar 2026  
**Datakilde:** Google Business Profile Takeout
