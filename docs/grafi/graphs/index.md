---
title: "Grafi"
---

# Grafi

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-presentation: Slide](../../pdf/slide-graphs.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **1.1 Grafi non orientati e orientati**

    Grafi semplici e multigrafi

    [:octicons-arrow-right-24: Apri](grafi-non-orientati-e-orientati.md)

-   **1.2 Rappresentazioni di un grafo**

    La matrice di incidenza e la conservazione del flusso

    [:octicons-arrow-right-24: Apri](rappresentazioni-di-un-grafo.md)

-   **1.3 Connettività**

    [:octicons-arrow-right-24: Apri](connettivita.md)

-   **1.4 Alberi e foreste**

    [:octicons-arrow-right-24: Apri](alberi-e-foreste.md)

-   **1.5 Il rango della matrice di incidenza**

    [:octicons-arrow-right-24: Apri](il-rango-della-matrice-di-incidenza.md)

-   **1.6 Visita di un grafo**

    L'albero dei predecessori · La visita in ampiezza sul grafo di riferimento · La visita in profondità sul grafo di riferimento · Usare la visita

    [:octicons-arrow-right-24: Apri](visita-di-un-grafo.md)

</div>

!!! nota "Prerequisiti"

    - Algebra lineare: matrici, combinazioni lineari, vettori linearmente indipendenti e rango di una matrice.

    - Insiemi, relazioni e classi di equivalenza; la notazione $O(\cdot)$ per il tempo di esecuzione di un algoritmo.

    - Non serve alcuna conoscenza di teoria dei grafi: ogni nozione è definita in questo capitolo.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - usare le nozioni di base sui grafi non orientati e orientati: adiacenza, grado, passeggiate, cammini e cicli;

    - rappresentare un grafo con una matrice di adiacenza, con liste di adiacenza, con una lista degli archi e con una matrice di incidenza nodo–arco, e confrontare lo spazio che richiedono;

    - trovare le componenti connesse e le componenti fortemente connesse di un grafo;

    - riconoscere un albero con le caratterizzazioni equivalenti, e calcolare il rango della matrice di incidenza;

    - eseguire la visita in ampiezza e la visita in profondità, disegnare l'albero dei predecessori e dimostrare che la visita trova i nodi raggiungibili in tempo $O(|N|+|A|)$.

---

**Avanti:** [1.1 Grafi non orientati e orientati](grafi-non-orientati-e-orientati.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Grafi](../../esercizi/graphs.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md).