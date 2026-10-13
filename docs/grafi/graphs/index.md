---
title: "Grafi"
---

# Grafi

<div class="info-capitolo" markdown>

**Parte 1 · Grafi · Capitolo 1** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-grafi.pdf) · [:material-pencil: Esercizi: Grafi](../../esercizi/graphs.md) · [:material-gesture-tap: App: Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md)

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

-   **1.6 Ricerca su grafi**

    L'albero predecessore · La visita in ampiezza sul grafo di riferimento · La ricerca approfondita sul grafo di riferimento · Utilizzo della ricerca

    [:octicons-arrow-right-24: Apri](ricerca-su-grafi.md)

</div>

!!! nota "Prerequisiti"

    - Algebra lineare: matrici, combinazioni lineari, vettori linearmente indipendenti e rango di una matrice.

    - Insiemi, relazioni e classi di equivalenza; la notazione $O(\cdot)$ per il tempo di esecuzione di un algoritmo.

    - Non è necessaria alcuna conoscenza della teoria dei grafi: ogni nozione è definita in questo capitolo.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - usare le nozioni di base dei grafi orientati e non orientati: adiacenza, grado, passeggiate, cammini e cicli;

    - rappresentare un grafo mediante una matrice di adiacenza, liste di adiacenza, una lista di archi o una matrice di incidenza nodo-arco, e confrontare lo spazio richiesto da ciascuna rappresentazione;

    - trovare le componenti connesse e le componenti fortemente connesse di un grafo;

    - riconoscere un albero attraverso caratterizzazioni equivalenti e calcolare il rango della matrice di incidenza;

    - eseguire la ricerca in ampiezza e in profondità, costruire l'albero dei predecessori e dimostrare che la ricerca individua i nodi raggiungibili in tempo $O(|N|+|A|)$.

---

**Avanti:** [1.1 Grafi non orientati e orientati](grafi-non-orientati-e-orientati.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Grafi](../../esercizi/graphs.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Ricerca su grafo: BFS e DFS](../../laboratorio/ricerca-bfs-dfs.md).
