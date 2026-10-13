---
title: "Cammini minimi"
---

# Cammini minimi

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **3.1 Problemi del percorso più breve**

    Ottimità dei sottopercorsi

    [:octicons-arrow-right-24: Apri](problemi-del-percorso-piu-breve.md)

-   **3.2 Condizioni e potenziali di ottimalità**

    [:octicons-arrow-right-24: Apri](condizioni-e-potenziali-di-ottimalita.md)

-   **3.3 La formulazione della programmazione lineare**

    Il modello a fonte unica

    [:octicons-arrow-right-24: Apri](la-formulazione-della-programmazione-lineare.md)

-   **3.4 Percorsi più brevi nei grafici aciclici**

    [:octicons-arrow-right-24: Apri](percorsi-piu-brevi-nei-grafici-aciclici.md)

-   **3.5 L'algoritmo Bellman–Ford**

    [:octicons-arrow-right-24: Apri](l-algoritmo-bellmanford.md)

-   **3.6 Algoritmo di Dijkstra**

    Algoritmo di Dijkstra sul grafo di riferimento · Lunghezze negative

    [:octicons-arrow-right-24: Apri](algoritmo-di-dijkstra.md)

</div>

!!! nota "Prerequisiti"

    - Da [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): cammini orientati, percorsi e cicli, la matrice di incidenza nodo-arco, gli alberi e il grafo di riferimento.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un modello LP e il teorema della dualità debole.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - indica i problemi $s$–$t$ e i problemi del percorso più breve a sorgente singola e riconosce quando si verifica un ciclo negativo loro mal posati;

    - utilizza l'ottimalità dei sottopercorsi, le equazioni di Bellman e l'albero dei percorsi più brevi;

    - scrivi il modello LP di un percorso minimo come flusso unitario, scrivi il suo duale con i potenziali $\pi_i$ e usa potenziali ammissibili come certificato di ottimalità;

    - esegue l'algoritmo per grafi aciclici, l'algoritmo Bellman–Ford (con il rilevamento di un ciclo negativo) e L'algoritmo di Dijkstra dimostra la loro correttezza e fornisce il loro tempo di esecuzione.

---

**Avanti:** [3.1 Problemi del percorso più breve](problemi-del-percorso-piu-breve.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Cammini minimi](../../esercizi/shortest-paths.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md).