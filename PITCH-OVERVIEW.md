# Restaurant Review Autopilot - Komplett Oversikt
> Produksjonsklar AI-system for Anmeldelsessvar

---

## 📊 Komplett Datasett (555+ Anmeldelser)

### Google Reviews (Primær Fokus)
| Bedrift | Anmeldelser | Snitt ⭐ | 5⭐ | 4⭐ | 3⭐ | 2⭐ | 1⭐ | Svar-rate | Periode |
|---------|-------------|----------|-----|-----|-----|-----|-----|-----------|---------|
| **Vespa & Humla** 🐝 | **434** | **4.1** | 209 | 136 | 37 | 26 | 26 | **2%** ⚠️ | 2021-2026 |
| **ESSA** | **118** | **4.4** | 84 | 16 | 8 | 4 | 6 | **30%** ✅ | 2022-2026 |
| **Smash House** | **2** | **5.0** | 2 | 0 | 0 | 0 | 0 | **0%** | 2024-2025 |
| **BLOKK Asker** | **1** | **5.0** | 1 | 0 | 0 | 0 | 0 | **0%** | 2026 |
| **TOTALT** | **555** | **4.2** | 296 | 152 | 45 | 30 | 32 | **7%** | |

### Facebook Reviews (Bonus)
| Bedrift | Status | Followers |
|---------|--------|-----------|
| **Vespa & Humla** | 84% recommend | 5.1K FB / 3.9K IG |
| **ESSA** | 29 reviews (100% ✅) | 2.8K FB / 2.2K IG |
| **Smash House** | Ukjent | N/A |
| **BLOKK Asker** | Ukjent | N/A |

---

## 🎯 Hovedfunn

### 1. **Vespa & Humla - Største Mulighet**
- **434 anmeldelser** (78% av total)
- Bare **2% svar-rate** ⚠️ (422 ubesvarte anmeldelser!)
- **49% har skrevet kommentarer** (213 anmeldelser)
- Utmerket 4.1⭐ rating til tross for lav respons

**Potensiell Effekt:**
- 422 ubesvarte anmeldelser × automatisk svar = **massiv engasjement-boost**
- Lar for øyeblikket 98% av anmeldelser stå ubesvart

### 2. **ESSA - Allerede Engasjert**
- **118 anmeldelser**
- **30% svar-rate** (god manuell innsats)
- **85% har kommentarer** (100/118)
- Sterk 4.4⭐ rating

**Potensiell Effekt:**
- 82 ubesvarte anmeldelser (70%)
- Kan opprettholde kvalitet mens svar-rate økes til 90%+

### 3. **Smash House & BLOKK - Nye/Små**
- Svært få anmeldelser
- Ingen respons i dag
- Trenger grunnleggende svarsystem

---

## 💡 Løsningen: AI Review Autopilot

### Slik Fungerer Det
```
Google Review → n8n Deteksjon → AI-Analyse → Utkast Svar → Manuell Godkjenning → Auto-Post
     ↓              ↓               ↓              ↓                ↓                 ↓
  Ny 4⭐        Hver 6. time    GPT-4o-mini    Kø/Slack         Klikk ✓         Google API
```

### Funksjoner
1. **Auto-Deteksjon** - Sjekker Google hver 6. time for nye anmeldelser
2. **AI Svar-Generator** - Bruker hvert brands autentiske stemme
3. **Sentimentanalyse** - Prioriterer negative anmeldelser
4. **Human-in-Loop** - Godkjenning kreves for negative/komplekse svar
5. **Auto-Svar** - Poster godkjente svar via Google API

### Stemmeprofiler (Allerede Bygget)
- ✅ **ESSA** - Varm, direkte, nabolagsfokusert
- ⏳ **Vespa & Humla** - Må ekstraheres fra 434 anmeldelser
- ⏳ **Smash House** - Minimal data
- ⏳ **BLOKK** - Minimal data

---

## 📈 ROI-Estimat

### Nåværende Tilstand
- **555 anmeldelser totalt**
- **39 manuelle svar** (7% svar-rate)
- **516 ubesvarte anmeldelser** mister engasjement

### Med Autopilot (90% svar-rate)
- **500+ anmeldelser besvart** (vs 39 i dag)
- **10x økning i engasjement**
- **Forbedret SEO** (Google belønner bedrifter som svarer)
- **Bedre kunderelasjon**

### Tid Spart
- Manuelt svar: ~5 min per anmeldelse
- Med autopilot: ~30 sek godkjenning
- **Sparer ~4 timer per 100 anmeldelser**

---

## 🚀 Implementeringsplan

### Fase 1: Vespa & Humla (Uke 1-2)
**Prioritet: HØYEST** (434 anmeldelser, 98% ubesvart)

1. Ekstraher språkmønster fra eksisterende anmeldelser
2. Bygg stemmeprofil
3. Sett opp n8n arbeidsflyt med manuell godkjenning
4. Prosesser backlog (422 ubesvarte anmeldelser)

**Leveranser:**
- Stemmeprofil-dokument
- n8n arbeidsflyt (auto-detect → utkast → godkjenn → post)
- Dashboard for anmeldelseskø

### Fase 2: ESSA (Uke 3)
**Prioritet: HØY** (118 anmeldelser, 70% ubesvart)

1. Bruk eksisterende stemmeprofil (allerede ferdig!)
2. Deploy n8n arbeidsflyt
3. Prosesser 82 ubesvarte anmeldelser

**Leveranser:**
- Produksjonsarbeidsflyt
- Bibliotek med svarmal

### Fase 3: Smash House & BLOKK (Uke 4)
**Prioritet: MIDDELS** (3 anmeldelser totalt)

1. Lag grunnleggende stemmeprofiler
2. Deploy samme arbeidsflyt
3. Håndter fremtidige anmeldelser automatisk

---

## 💰 Prismodeller

### Alternativ A: Per-Bedrift Lisens
- **2.999 kr/måned per lokasjon**
- Ubegrensede anmeldelser
- Manuell godkjenning inkludert
- 4 lokasjoner = 11.996 kr/måned

### Alternativ B: Bedriftspakke
- **8.999 kr/måned for alle 4 bedrifter**
- Sparer 2.997 kr/måned vs individuell
- Prioritert support
- Tilpasset stemme-tuning

### Alternativ C: Inntekstdeling
- **15% av økt omsetning** fra forbedret Google-ranking
- Ingen forhåndskostnad
- Sporet via Google Business Insights

---

## 🛠️ Teknisk Stack

**Bygget & Klart:**
- ✅ Anmeldelsesdata ekstrahert (555 anmeldelser)
- ✅ ESSA stemmeprofil ferdig
- ✅ Fungerende prototype UI
- ✅ Språkmønster-analyse

**Å Bygge:**
- ⏳ n8n automatiseringsflyt (2-3 dager)
- ⏳ Vespa stemmeprofil (1 dag)
- ⏳ Google My Business API-integrasjon (1 dag)
- ⏳ Godkjenningsdashboard (2 dager)

**Total Tid til Produksjon:** ~1 uke

---

## 📞 Neste Steg

1. **Bestem:** Hvilken bedrift først? (Anbefaler: Vespa & Humla)
2. **Se Gjennom:** Stemmeprofil-eksempler fra ESSA
3. **Godkjenn:** n8n arbeidsflyt-design
4. **Launch:** Prosesser første 50 backlog-anmeldelser

---

**Spørsmål?**
- Hvor hands-on vil du være? (full auto vs godkjenningskø)
- Budsjettpreferanse? (månedlig vs inntekstdeling)
- Tidspress? (produksjon på 1 uke mulig)

---

**Datakilde:** Google Business Profile Takeout (2026-02-01)
**Laget av:** Leon 🦁
