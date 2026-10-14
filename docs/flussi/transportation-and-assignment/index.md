---
title: "Trasporto e assegnamento"
---

# Trasporto e assegnamento

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **7.1 Il problema dei trasporti**

    Istanze non bilanciate · Trasbordo come problema di trasporto

    [:octicons-arrow-right-24: Apri](il-problema-dei-trasporti.md)

-   **7.2 Soluzioni di base**

    [:octicons-arrow-right-24: Apri](soluzioni-di-base.md)

-   **7.3 Soluzioni iniziali di base fattibili**

    La regola del costo minimo

    [:octicons-arrow-right-24: Apri](soluzioni-iniziali-di-base-fattibili.md)

-   **7.4 Il metodo potenziale**

    Il metodo potenziale sull'istanza di trasporto · Degeneracy

    [:octicons-arrow-right-24: Apri](il-metodo-potenziale.md)

-   **7.5 Il problema dell'assegnazione**

    Degenerazione del metodo potenziale · Riduzioni e potenziali · Zeri indipendenti e righe · L'algoritmo ungherese · L'algoritmo ungherese nell'esempio

    [:octicons-arrow-right-24: Apri](il-problema-dell-assegnazione.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): alberi, foglie, cicli fondamentali e rango della matrice di incidenza nodo-arco.

    - Da questo modulo, [Capitolo 3 «Percorsi più brevi»](../../alberi-e-cammini/shortest-paths/index.md): distanze e [Capitolo 4 «Modelli di flusso di rete»](../network-flow-models/index.md): il modello di flusso a costo minimo, il nodo dummy, vertici interi, potenziali e costi ridotti.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un modello LP e i teoremi della dualità debole e forte.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - formulare il problema di trasporto e rappresentarlo in tabella, bilanciare un'istanza aggiungendo un'origine o una destinazione fittizia e ridurre un problema di trasbordo senza capacità a un problema di trasporto;

    - interpretare le basi del modello di trasporto come alberi ricoprenti di una rete bipartita, calcolare una soluzione di base e riconoscerne la degenerazione;

    - costruire una soluzione ammissibile di base iniziale con la regola dell'angolo nord-ovest o quella del costo minimo;

    - applicare il metodo dei potenziali, calcolare i costi ridotti e i cicli di pivot e certificare l'ottimalità con il modello duale;

    - formulare il problema di assegnamento, dimostrare il teorema di König–Egerváry ed eseguire l'algoritmo ungherese, interpretando i potenziali come una soluzione duale ottimale.

---

**Avanti:** [7.1 Il problema dei trasporti](il-problema-dei-trasporti.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md)
