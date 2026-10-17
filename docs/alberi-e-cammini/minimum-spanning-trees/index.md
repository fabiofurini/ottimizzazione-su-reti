---
title: "Alberi ricoprenti di costo minimo"
---

# Alberi ricoprenti di costo minimo

<div class="info-capitolo" markdown>

**Parte 2 · Alberi e cammini · Capitolo 2** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-alberi-e-cammini.pdf) · [:material-presentation: Slide](../../pdf/slide-minimum-spanning-trees.pdf) · [:material-pencil: Esercizi: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md) · [:material-gesture-tap: App: Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **2.1 Il problema dell'albero ricoprente di costo minimo**

    [:octicons-arrow-right-24: Apri](il-problema-dell-albero-ricoprente-di-costo-minimo.md)

-   **2.2 Tagli e cicli**

    [:octicons-arrow-right-24: Apri](tagli-e-cicli.md)

-   **2.3 La proprietà del taglio e la proprietà del ciclo**

    [:octicons-arrow-right-24: Apri](la-proprieta-del-taglio-e-la-proprieta-del-ciclo.md)

-   **2.4 L'algoritmo greedy generico**

    [:octicons-arrow-right-24: Apri](l-algoritmo-greedy-generico.md)

-   **2.5 Algoritmo di Kruskal**

    Algoritmo di Kruskal sul grafo di riferimento

    [:octicons-arrow-right-24: Apri](algoritmo-di-kruskal.md)

-   **2.6 Algoritmo di Prim**

    [:octicons-arrow-right-24: Apri](algoritmo-di-prim.md)

-   **2.7 Unicità dell'albero ricoprente di costo minimo**

    Pesi uguali

    [:octicons-arrow-right-24: Apri](unicita-dell-albero-ricoprente-di-costo-minimo.md)

</div>

!!! nota "Prerequisiti"

    - Il capitolo [<u>«Grafi»</u>](../../grafi/graphs/index.md): cammini e cicli, componenti connesse, le caratterizzazioni di un albero e i cicli fondamentali.

    - La notazione $O(\cdot)$ per il tempo di esecuzione di un algoritmo, e l'ordinamento di $m$ numeri in tempo $O(m\log m)$.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - enunciare il problema dell'albero ricoprente di costo minimo e riconoscerlo nelle applicazioni;

    - dimostrare la proprietà del taglio e la proprietà del ciclo, e usarle per certificare che un albero ricoprente è ottimo;

    - eseguire gli algoritmi di Kruskal e di Prim, dimostrarne la correttezza e analizzarne il tempo di esecuzione;

    - stabilire se l'albero ricoprente di costo minimo è unico, e trovare gli spigoli che appartengono a ogni albero ottimo.

---

**Avanti:** [2.1 Il problema dell'albero ricoprente di costo minimo](il-problema-dell-albero-ricoprente-di-costo-minimo.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Alberi ricoprenti](../../esercizi/minimum-spanning-trees.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Alberi ricoprenti minimi: Kruskal e Prim](../../laboratorio/albero-ricoprente-minimo-kruskal-prim.md).