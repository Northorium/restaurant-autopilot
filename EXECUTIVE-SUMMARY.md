# Executive Summary - Restaurant Review Autopilot
> **TL;DR:** 555+ Google-anmeldelser. 516 ubesvart. AI kan fikse dette på 1 uke.

---

## 🎯 Problemet

Du har **555 Google-anmeldelser** på tvers av 4 restauranter.  
Bare **39 er besvart** (7% svar-rate).  
**516 anmeldelser** står ubesvart og mister engasjement.

### Breakdown per Bedrift

| Bedrift | Anmeldelser | Besvarte | Ubesvarte | Svar-Rate |
|---------|-------------|----------|-----------|-----------|
| **Vespa & Humla** | 434 | **8** | **426** | **2%** ⚠️ |
| **ESSA** | 118 | 36 | 82 | 30% ✅ |
| **Smash House** | 2 | 0 | 2 | 0% |
| **BLOKK Asker** | 1 | 0 | 1 | 0% |
| **TOTALT** | **555** | **39** | **516** | **7%** |

**Største Mulighet:** Vespa & Humla (434 anmeldelser, 98% ubesvart)

**Bonus - Facebook Reviews:**
- ESSA: 29 reviews (100% recommend, 5.0⭐)
- Vespa & Humla: 84% recommend (5.1K followers)

**Fokus:** Google er prioritet #1 (555 anmeldelser, størst SEO-effekt)

---

## 💡 Løsningen

**AI Review Autopilot** – automatisk svar på Google-anmeldelser med din autentiske stemme.

### Slik Fungerer Det (Enkel Versjon)
1. **Google får ny anmeldelse** (4⭐ review fra kunde)
2. **n8n detekterer den** (hver 6. time)
3. **AI genererer svar** (basert på din stemme-profil)
4. **Du godkjenner i Slack** (30 sekunder, klikk ✓)
5. **Autopilot poster svaret** (via Google API)

### Hva Du Får
- ✅ **Auto-deteksjon** av nye anmeldelser
- ✅ **AI-genererte svar** i din stemme
- ✅ **Manuell godkjenning** for kvalitetskontroll
- ✅ **Auto-posting** til Google
- ✅ **Sentiment-analyse** (prioriterer negative)

---

## 📈 Effekt

### Før Autopilot
- 555 anmeldelser
- 39 svar (7%)
- 516 ubesvart
- ~20 timer manuelt arbeid brukt

### Etter Autopilot (90% svar-rate)
- 555 anmeldelser
- **500+ svar** (90%)
- 55 ubesvart
- **~4 timer arbeid** (kun godkjenning)

**Resultat:**
- 10x flere besvarte anmeldelser
- 80% mindre tid brukt
- Bedre SEO (Google belønner svar)
- Sterkere kunderelasjon

---

## 🚀 Implementering

### Fase 1: Vespa & Humla (1-2 uker)
**Hvorfor først?** 434 anmeldelser, 98% ubesvart = størst ROI

**Hva vi gjør:**
1. Ekstraherer språkmønster fra dine 8 eksisterende svar
2. Bygger AI stemmeprofil (varm, personlig, profesjonell)
3. Setter opp n8n arbeidsflyt med Slack-godkjenning
4. Prosesserer 426 backlog-anmeldelser

**Tid:** 1-2 uker  
**Resultat:** 426 nye svar, 95%+ svar-rate

### Fase 2-3: ESSA, Smash House, BLOKK (1 uke)
- Deploy samme system
- Prosesser backlog
- Auto-svar på fremtidige anmeldelser

**Total Tid til Produksjon:** 2-3 uker for alle 4

---

## 💰 Kostnad

### Anbefalt: Bedriftspakke
**8.999 kr/måned** for alle 4 bedrifter

**Inkludert:**
- Ubegrensede anmeldelser
- AI-genererte svar
- Manuell godkjenning
- Tilpasset stemme-tuning per bedrift
- Prioritert support

**Alternativt:**
- Per-bedrift: 2.999 kr/måned (11.996 kr for alle 4)
- Rev-share: 15% av økt omsetning (ingen forhåndskostnad)

---

## ⏱️ Tid Spart

**Manuelt svar:**
- 5 min per anmeldelse
- 516 ubesvart × 5 min = **43 timer arbeid**

**Med Autopilot:**
- 30 sek godkjenning per anmeldelse
- 516 × 0.5 min = **4.3 timer arbeid**

**Spart:** 38.7 timer (90% reduksjon)

---

## 📊 Hva Er Allerede Ferdig?

**Bygget & Testet:**
- ✅ 555 anmeldelser ekstrahert og analysert
- ✅ ESSA stemmeprofil ferdig
- ✅ Prototype UI
- ✅ Språkmønster-analyse

**Gjenstår (1-2 uker):**
- ⏳ n8n automatisering
- ⏳ Vespa stemmeprofil
- ⏳ Google API-integrasjon
- ⏳ Godkjenningsdashboard

---

## 🎯 Anbefaling

**Start med Vespa & Humla.**

**Hvorfor?**
1. **Størst ROI** (426 ubesvarte anmeldelser)
2. **Mest data** (434 reviews = best AI-trening)
3. **Lavest svar-rate** (2% = mest å hente)

**Timeline:**
- Uke 1-2: Bygg & test på Vespa
- Uke 3: Deploy til ESSA
- Uke 4: Deploy til Smash House + BLOKK

**Resultat etter 4 uker:**
- 500+ nye svar
- 90%+ svar-rate på alle bedrifter
- Bedre Google-ranking
- Fornøyde kunder

---

## ❓ Spørsmål & Svar

**Q: Låter svarene robotiske?**  
A: Nei. Vi bygger stemme-profil fra dine eksisterende svar. AI kopierer din tone, språk og stil.

**Q: Hva med negative anmeldelser?**  
A: Negative anmeldelser krever alltid manuell godkjenning. Du ser utkastet i Slack, redigerer om nødvendig, godkjenner.

**Q: Kan jeg redigere svarene?**  
A: Ja. Alle svar går via godkjenningskø. Du kan redigere, avvise eller godkjenne.

**Q: Hvor lang tid tar det?**  
A: 30 sekunder per anmeldelse (vs 5 min manuelt).

**Q: Hva om AI lager feil?**  
A: Human-in-loop. Ingenting postes uten din godkjenning.

---

## 📞 Neste Steg

1. **Godkjenn konsept** (denne pitchen)
2. **Velg startpunkt** (anbefaler: Vespa & Humla)
3. **Se gjennom stemme-eksempler** (ESSA-profil allerede klar)
4. **Bestem godkjenningsflyt** (Slack, Telegram, eller eget dashboard?)
5. **Launch produksjon** (1-2 uker)

---

**Klar til å svare 500+ anmeldelser?** 🚀

**Datakilde:** Google Business Profile Takeout (2026-02-01)  
**Laget av:** Leon 🦁
