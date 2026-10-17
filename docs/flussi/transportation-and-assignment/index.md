---
title: "Trasporto e assegnamento"
---

# Trasporto e assegnamento

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-transportation-and-assignment.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md) · [:material-gesture-tap: App: Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md) · [:material-gesture-tap: App: Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **7.1 Il problema di trasporto**

    Istanze non bilanciate · Il trasbordo come trasporto

    [:octicons-arrow-right-24: Apri](il-problema-di-trasporto.md)

-   **7.2 Soluzioni di base**

    [:octicons-arrow-right-24: Apri](soluzioni-di-base.md)

-   **7.3 Soluzioni ammissibili di base iniziali**

    La regola del costo minimo

    [:octicons-arrow-right-24: Apri](soluzioni-ammissibili-di-base-iniziali.md)

-   **7.4 Il metodo dei potenziali**

    Il metodo dei potenziali sull'istanza di trasporto · Degenerazione

    [:octicons-arrow-right-24: Apri](il-metodo-dei-potenziali.md)

-   **7.5 Il problema di assegnamento**

    Degenerazione del metodo dei potenziali · Riduzioni e potenziali · Zeri indipendenti e linee · L'algoritmo ungherese · L'algoritmo ungherese sull'esempio

    [:octicons-arrow-right-24: Apri](il-problema-di-assegnamento.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): alberi, foglie, cicli fondamentali e rango della matrice di incidenza nodo-arco.

    - Da questo modulo, [Capitolo 3 «Cammini minimi»](../../alberi-e-cammini/shortest-paths/index.md): distanze, e [Capitolo 4 «Modelli di flusso su reti»](../network-flow-models/index.md): il modello di flusso di costo minimo, il nodo fittizio, i vertici interi, i potenziali e i costi ridotti.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un modello LP e i teoremi della dualità debole e forte.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - scrivere il modello di trasporto e la sua tabella, bilanciare un'istanza con un'origine o una destinazione fittizia e ridurre un'istanza di trasbordo senza capacità a un'istanza di trasporto;

    - riconoscere nelle basi del modello di trasporto gli alberi ricoprenti di una rete bipartita, calcolare una soluzione di base e riconoscere una soluzione degenere;

    - costruire una soluzione ammissibile di base iniziale con la regola dell'angolo nord-ovest e con la regola del costo minimo;

    - eseguire il metodo dei potenziali, con potenziali, costi ridotti, cicli e pivot, e certificare l'ottimalità di una soluzione con il modello duale;

    - scrivere il modello di assegnamento, dimostrare il teorema di König ed Egerváry ed eseguire l'algoritmo ungherese, leggendo i suoi potenziali come una soluzione duale ottima.

---

**Avanti:** [7.1 Il problema di trasporto](il-problema-di-trasporto.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md), [Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md).