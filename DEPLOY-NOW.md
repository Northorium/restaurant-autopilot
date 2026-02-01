# 🚀 Deploy Nå - 3 Minutter!

## ✅ Allerede Gjort
- ✅ Prosjekt committed til git
- ✅ .env beskyttet (ikke i git)
- ✅ Railway config klar
- ✅ API server klar

---

## 📝 Steg 1: Lag GitHub Repo (1 min)

**Jeg har åpnet:** https://github.com/new

**Fyll ut:**
```
Repository name: restaurant-autopilot
Description: AI-powered Google Review Response System
✅ Public (eller Private - fungerer begge)
❌ IKKE add README (vi har allerede)
```

**Klikk:** "Create repository"

---

## 📤 Steg 2: Push til GitHub (30 sek)

**GitHub viser kommandoer - IGNORER DEM!**

**Kjør disse i stedet:**

```bash
cd restaurant-autopilot

# Legg til GitHub remote (erstatt USERNAME med ditt brukernavn)
git remote add origin https://github.com/USERNAME/restaurant-autopilot.git

# Push
git push -u origin master
```

---

## 🚂 Steg 3: Deploy til Railway (2 min)

**Jeg har åpnet:** https://railway.app/new

**Gjør dette:**

1. **Login** med GitHub
2. **"Deploy from GitHub repo"**
3. **Velg:** `restaurant-autopilot`
4. **Root Directory:** Klikk "Settings" → endre til `api`
5. **Environment Variables:**
   - Klikk "Variables"
   - Add Variable:
     ```
     ANTHROPIC_API_KEY = sk-ant-ditt-key-her
     ```

**Klikk:** "Deploy"

---

## ✅ Sjekk at Det Fungerer

Railway gir deg en URL (f.eks. `https://restaurant-autopilot-production.up.railway.app`)

**Test:**
```bash
# Erstatt URL med din
curl https://din-url.railway.app/api/reviews/essa
```

**Skal returnere:** Liste med ubesvarte reviews!

---

## 🎉 Ferdig!

Du har nå:
- ✅ Sikker backend deployed
- ✅ Claude AI integration live
- ✅ Klar for demo

**Frontend URL:**
Gå til: `https://din-url.railway.app/`

---

## 🆘 Problemer?

**"Push rejected":**
```bash
git pull origin master --allow-unrelated-histories
git push -u origin master
```

**"Railway build failed":**
- Sjekk at root directory er satt til `api`
- Sjekk at `ANTHROPIC_API_KEY` er satt

**API key feil:**
- Lag ny key på https://console.anthropic.com/
- Sett den i Railway Variables

---

Gi beskjed når deployed! 🦁
