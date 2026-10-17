---
title: "Flusso massimo"
---

# Flusso massimo

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-maximum-flow.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **5.1 Il problema del flusso massimo**

    [:octicons-arrow-right-24: Apri](il-problema-del-flusso-massimo.md)

-   **5.2 Tagli**

    [:octicons-arrow-right-24: Apri](tagli.md)

-   **5.3 La rete residua**

    [:octicons-arrow-right-24: Apri](la-rete-residua.md)

-   **5.4 Il teorema flusso massimo-taglio minimo**

    [:octicons-arrow-right-24: Apri](il-teorema-flusso-massimo-taglio-minimo.md)

-   **5.5 L'algoritmo di Ford–Fulkerson**

    Il numero di aumenti

    [:octicons-arrow-right-24: Apri](l-algoritmo-di-fordfulkerson.md)

-   **5.6 L'algoritmo di Edmonds–Karp**

    [:octicons-arrow-right-24: Apri](l-algoritmo-di-edmondskarp.md)

-   **5.7 Applicazioni**

    Accoppiamento massimo in un grafo bipartito · Cammini arco-disgiunti

    [:octicons-arrow-right-24: Apri](applicazioni.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): cammini orientati, la visita in ampiezza e la visita in profondità.

    - Da questo modulo, [Capitolo 4 «Modelli di flusso su reti»](../network-flow-models/index.md): la conservazione del flusso, il flusso attraverso un taglio, il modello di flusso di costo minimo e i suoi vertici interi.

    - Dal modulo Programmazione lineare, [Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/): una funzione lineare raggiunge il massimo su un poliedro limitato non vuoto.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - formulare il problema del flusso massimo e scriverne il modello LP;

    - calcolare la capacità di un taglio $s$–$t$ e usare i tagli come limiti superiori del valore di ogni flusso;

    - costruire la rete residua di un flusso, trovare un cammino aumentante e il suo collo di bottiglia, e aumentare il flusso;

    - dimostrare il teorema flusso massimo-taglio minimo e il teorema di integralità;

    - eseguire gli algoritmi di Ford–Fulkerson e di Edmonds–Karp, leggere un taglio minimo all'arresto e darne i tempi di esecuzione;

    - calcolare un accoppiamento massimo in un grafo bipartito e un insieme massimo di cammini arco-disgiunti come flussi massimi.

---

**Avanti:** [5.1 Il problema del flusso massimo](il-problema-del-flusso-massimo.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Flusso massimo](../../esercizi/maximum-flow.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md).