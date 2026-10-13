---
title: "Flusso massimo"
---

# Flusso massimo

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **5.1 Il problema del flusso massimo**

    [:octicons-arrow-right-24: Apri](il-problema-del-flusso-massimo.md)

-   **5.2 Tagli**

    [:octicons-arrow-right-24: Apri](tagli.md)

-   **5.3 La rete residua**

    [:octicons-arrow-right-24: Apri](la-rete-residua.md)

-   **5.4 Il teorema del taglio minimo del flusso massimo**

    [:octicons-arrow-right-24: Apri](il-teorema-del-taglio-minimo-del-flusso-massimo.md)

-   **5.5 L'algoritmo Ford-Fulkerson**

    Il numero di aumenti

    [:octicons-arrow-right-24: Apri](l-algoritmo-ford-fulkerson.md)

-   **5.6 L'algoritmo Edmonds–Karp**

    [:octicons-arrow-right-24: Apri](l-algoritmo-edmondskarp.md)

-   **5.7 Applicazioni**

    Corrispondenza massima in un grafo bipartito · Percorsi arcodisgiunti

    [:octicons-arrow-right-24: Apri](applicazioni.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): percorsi orientati, la ricerca in ampiezza e la ricerca in profondità.

    - Da questo modulo, [Capitolo 4 «Modelli di flusso di rete»](../network-flow-models/index.md): conservazione del flusso, flusso attraverso un taglio, modello di flusso a costo minimo e suo intero vertici.

    - Dal modulo Programmazione lineare, [Capitolo 15 «La geometria di Programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/): una funzione lineare raggiunge il suo massimo su un poliedro limitato non vuoto.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - formula il problema del flusso massimo e scrive il suo modello LP;

    - calcola la capacità di un taglio $s$–$t$ e utilizza i tagli come limite superiore del valore di ogni flusso;

    - costruisce la rete residua di un flusso, trova un percorso aumentante e il suo collo di bottiglia e aumenta il flusso;

    - dimostrare il teorema del taglio minimo del flusso massimo e il teorema dell'integralità;

    - esegue gli algoritmi Ford–Fulkerson e Edmonds–Karp, legge un taglio minimo alla fermata e fornisce i propri dati tempi di esecuzione;

    - calcola una corrispondenza massima in un grafo bipartito e un insieme massimo di percorsi arcodisgiunti come flussi massimi.

---

**Avanti:** [5.1 Il problema del flusso massimo](il-problema-del-flusso-massimo.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Flusso massimo](../../esercizi/maximum-flow.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md).