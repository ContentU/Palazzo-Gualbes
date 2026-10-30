# Testi del sito e script — promemoria

Come arrivano i testi dal PDF del copywriting fino al sito, a cosa serve ogni script e cosa fare quando arriva un nuovo PDF.

## Dove stanno i testi

| Dove | Cosa contiene | Chi lo usa |
|---|---|---|
| **Sanity (Studio)** | I testi che il sito mostra davvero | Il sito legge **solo** da qui |
| `content/*.ts` | Una copia dei testi in codice, con la stessa struttura di Sanity | Gli script (per scrivere su Sanity e per la verifica) |
| Componenti (`components/`) | Pochi testi di interfaccia: etichette del form, "Leggi l'articolo", "Scroll Down", titoli delle colonne del footer… | Si cambiano solo nel codice |

I PDF dei testi stanno in `../Testi/`.

Quale file di `content/` corrisponde a quale pagina:

| Pagina | File |
|---|---|
| Home | `content/home.ts` |
| Il Palazzo | `content/about.ts` |
| Suite e appartamenti | `content/rooms.ts` |
| Schede suite (Suite, Family Suite) e card delle suite | `content/suites.ts` |
| Servizi, Experience, La Storia | `content/pages.ts` |
| Contatti | `content/contact.ts` |
| Journal (pagina; gli articoli sono demo) | `content/articles.ts` |
| Menu, footer, recapiti, link di prenotazione (`BOOKING_HREF`) | `content/site.ts` |

Regole di scrittura (valgono sia in `content/` sia in Studio):
- Nei testi lunghi **andare a capo = nuovo paragrafo** (in `content/` i paragrafi sono stringhe separate, unite con `\n\n`).
- I titoli su più righe (hero della Home, copertine degli slider) sono **elenchi di righe**. L'effetto rosso/bianco della hero si adatta da solo al numero di righe.

## Gli script

Si lanciano tutti dalla cartella `nextjs-website`.

### `verifica-testi` — il PDF è tutto nel sito?

```sh
npm i -D pdfjs-dist     # solo la prima volta
npm run verifica-testi -- "../Testi/<file>.pdf"
```

- Elenca le frasi del PDF che **non** si trovano in `content/`, `components/` o `app/`.
- `--tutti` mostra anche le frasi trovate. Serve per controllare che lo script stia leggendo tutte le sezioni.
- `--inverso` elenca i testi di `content/` che **non** sono nel PDF, per esempio testi demo rimasti.
- Non scrive niente. Esce con errore se manca qualcosa.
- ⚠️ Legge i file `content/`, **non Sanity**: se un testo è stato cambiato solo in Studio, lo script non lo vede.
- Ignora le parti di sole istruzioni del PDF (mappa del sito, note, Team Web, schede incomplete). Se un nuovo PDF ha una struttura diversa, adatta le **regole in cima allo script** (`scripts/verifica-testi-pdf.mjs`): sono quattro elenchi commentati.

### `testi-v1.ts` — scrive i testi di `content/` su Sanity

```sh
npx -y tsx --env-file=.env.local scripts/testi-v1.ts
```

Il nome viene dalla versione V1 del PDF, ma lo script è generico: copia **tutto** `content/` su Sanity.
- Prima salva una copia di sicurezza in `scripts/backup/`, bozze comprese.
- Sostituisce tutte le pagine e le schede suite, crea quelle che mancano ed elimina le bozze aperte di quei documenti.
- Non tocca gli articoli e le categorie del Journal. L'articolo in evidenza resta quello scelto in Studio.
- ⚠️ **Sovrascrive le modifiche fatte in Studio.** Se qualcuno ha cambiato testi in Studio, prima riportali in `content/`.

### `seed-sanity.ts` — solo per un dataset vuoto

```sh
npx -y tsx --env-file=.env.local scripts/seed-sanity.ts
```

Crea da zero tutti i contenuti, articoli demo compresi. Si rifiuta di partire se il dataset ha già contenuti. Serve per esempio per un nuovo dataset di prova.

`scripts/sanity-utils.ts` contiene le funzioni comuni ai due script Sanity: client, caricamento foto, chiavi degli elenchi.

## Quando arriva un nuovo PDF

1. **Salva il PDF** in `../Testi/`.
2. **Allinea `content/` a Sanity.** Se dall'ultimo aggiornamento qualcuno ha cambiato testi in Studio, riportali nei file `content/`, altrimenti al passo 6 andrebbero persi.
3. **Fai la verifica:**
   ```sh
   npm run verifica-testi -- "../Testi/<nuovo>.pdf" --tutti
   ```
   Controlla prima che tutte le sezioni del PDF compaiano nell'elenco. Se una sezione manca, o compaiono istruzioni scambiate per testo, adatta le regole in cima allo script. Poi rilancia senza `--tutti`: le frasi ✗ sono i testi nuovi o cambiati.
4. **Confronta le sezioni**, non solo le frasi. Ogni pagina del PDF ha lo stesso numero di sezioni del sito? Se il PDF aggiunge o toglie blocchi:
   - usa le sezioni già esistenti, senza inventare nuovi layout. Riferimento: `AboutHero`, `AboutText`, `Leaves`, `Services`, `SuiteIntro`, `InfoBlock`, `SuitesSlider`, `PageTitle`, `RoomBlock`, `Arrive`;
   - aggiorna insieme `content/types.ts`, lo schema (`sanity/schemaTypes/`) e la pagina in `app/`;
   - per una pagina nuova aggiungi anche il documento in `sanity/structure.ts`, la funzione in `lib/content.ts` e la voce nell'elenco di `scripts/testi-v1.ts` (e di `seed-sanity.ts`).
5. **Aggiorna i testi** in `content/*.ts`, e nei componenti per i testi di interfaccia. Rilancia la verifica finché le frasi mancanti sono 0 (o restano solo quelle che hai deciso di non usare).
6. **Controlla il codice:**
   ```sh
   npx tsc --noEmit
   npm run lint
   ```
7. **Scrivi su Sanity** con `testi-v1.ts`.
8. **Fai subito push e deploy.** Se ci sono state modifiche al codice, dati e codice devono andare online insieme: il codice vecchio con i dati nuovi (o il contrario) può dare errore su alcune pagine. Il build di Netlify legge i dati da Sanity, quindi deve partire **dopo** lo script.
9. **Controlla il sito** e lo Studio. Le pagine nuove compaiono in Studio solo dopo il deploy.

Se cambiano solo testi e nessuna sezione, puoi anche correggerli direttamente in Studio e premere Publish. In quel caso ricordati di riportarli in `content/` (passo 2) prima del prossimo uso degli script.

## Cose da sapere

- **Aggiornamento dopo Publish:** il sito si aggiorna da solo solo se su sanity.io (Manage → API → Webhooks) esiste il webhook verso `/api/revalidate`, con la chiave `SANITY_REVALIDATE_SECRET`. Senza webhook serve un nuovo deploy.
- **Studio online:** `palazzogualbes.netlify.app/studio` usa lo schema dell'ultimo deploy. Prima del deploy i campi nuovi compaiono come "Unknown field" e le pagine nuove non sono in elenco.
- **Ripristino:** le copie di `scripts/backup/` sono JSON dei documenti com'erano prima dello script (ignorate da git).
- **Da completare (testi V1):**
  - link del booking engine Beddy (`BOOKING_HREF` in `content/site.ts`);
  - link reali dei social;
  - articoli del Journal (oggi demo);
  - foto definitive;
  - schede di Appartamento 14 e Appartamento 4;
  - verifica storica dei contenuti della pagina La Storia prima della pubblicazione.
