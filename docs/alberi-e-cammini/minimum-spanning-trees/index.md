---
title: "Alberi ricoprenti di costo minimo"
---

# Alberi ricoprenti di costo minimo

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **2.1 Il problema dell'albero di copertura minimo**

    [:octicons-arrow-right-24: Apri](il-problema-dell-albero-di-copertura-minimo.md)

-   **2.2 Tagli e cicli**

    [:octicons-arrow-right-24: Apri](tagli-e-cicli.md)

-   **2.3 La proprietà di taglio e la proprietà di ciclo**

    [:octicons-arrow-right-24: Apri](la-proprieta-di-taglio-e-la-proprieta-di-ciclo.md)

-   **2.4 L'algoritmo greedy generico**

    [:octicons-arrow-right-24: Apri](l-algoritmo-greedy-generico.md)

-   **2.5 Algoritmo di Kruskal**

    Algoritmo di Kruskal sul grafo di riferimento

    [:octicons-arrow-right-24: Apri](algoritmo-di-kruskal.md)

-   **2.6 Algoritmo di Prim**

    [:octicons-arrow-right-24: Apri](algoritmo-di-prim.md)

-   **2.7 Unicità dell'albero di copertura minimo**

    Pesi con valori di parità

    [:octicons-arrow-right-24: Apri](unicita-dell-albero-di-copertura-minimo.md)

</div>

!!! nota "Prerequisiti"

    - Il capitolo [<u>«Grafi»</u>](../../grafi/graphs/index.md): percorsi e cicli, componenti connesse, le caratterizzazioni di un albero e i cicli fondamentali.

    - La notazione $O(\cdot)$ per il tempo di esecuzione di un algoritmo e l'ordinamento dei numeri $m$ nel tempo $O(m\log m)$.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - indica il problema dell'albero ricoprente minimo e lo riconosce nelle applicazioni;

    - dimostrare la proprietà di taglio e la proprietà di ciclo e utilizzarle per certificare che uno albero ricoprente è ottimale;

    - esegue gli algoritmi di Kruskal e di Prim, dimostra che sono corretti e analizza il loro tempo di esecuzione;

    - decide se l'albero ricoprente minimo è unico e trova gli archi che appartengono a ogni albero ottimale.

---

**Avanti:** [2.1 Il problema dell'albero di copertura minimo](il-problema-dell-albero-di-copertura-minimo.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md).
