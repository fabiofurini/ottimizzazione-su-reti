---
title: "Cammini minimi"
---

# Cammini minimi

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 3** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-shortest-paths.pdf) · [:material-pencil: Esercizi: Cammini minimi](../../esercizi/shortest-paths.md) · [:material-gesture-tap: App: Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **3.1 Problemi di cammino minimo**

    Ottimalità dei sottocammini

    [:octicons-arrow-right-24: Apri](problemi-di-cammino-minimo.md)

-   **3.2 Condizioni di ottimalità e potenziali**

    [:octicons-arrow-right-24: Apri](condizioni-di-ottimalita-e-potenziali.md)

-   **3.3 La formulazione di programmazione lineare**

    Il modello a sorgente singola

    [:octicons-arrow-right-24: Apri](la-formulazione-di-programmazione-lineare.md)

-   **3.4 Cammini minimi nei grafi aciclici**

    [:octicons-arrow-right-24: Apri](cammini-minimi-nei-grafi-aciclici.md)

-   **3.5 L'algoritmo di Bellman–Ford**

    [:octicons-arrow-right-24: Apri](l-algoritmo-di-bellmanford.md)

-   **3.6 L'algoritmo di Dijkstra**

    L'algoritmo di Dijkstra sul grafo di riferimento · Lunghezze negative

    [:octicons-arrow-right-24: Apri](l-algoritmo-di-dijkstra.md)

</div>

!!! nota "Prerequisiti"

    - Dal [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): passeggiate, cammini e cicli orientati, la matrice di incidenza nodo-arco, gli alberi e il grafo di riferimento.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un modello LP e il teorema della dualità debole.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - enunciare il problema del cammino minimo $s$–$t$ e quello a sorgente singola, e riconoscere quando un ciclo negativo li rende mal posti;

    - usare l'ottimalità dei sottocammini, le equazioni di Bellman e l'albero dei cammini minimi;

    - scrivere il modello LP di un cammino minimo come flusso unitario, scriverne il duale con i potenziali $\pi_i$ e usare potenziali ammissibili come certificato di ottimalità;

    - eseguire l'algoritmo per i grafi aciclici, l'algoritmo di Bellman–Ford (con il rilevamento di un ciclo negativo) e l'algoritmo di Dijkstra, dimostrarne la correttezza e darne il tempo di esecuzione.

---

**Avanti:** [3.1 Problemi di cammino minimo](problemi-di-cammino-minimo.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Cammini minimi](../../esercizi/shortest-paths.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Cammini minimi: Dijkstra, Bellman–Ford, grafi aciclici](../../laboratorio/cammini-minimi-dijkstra-bellman-ford.md).