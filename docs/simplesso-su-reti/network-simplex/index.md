---
title: "Il simplesso su reti"
---

# Il simplesso su reti

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-presentation: Slide](../../pdf/slide-network-simplex.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md) · [:material-gesture-tap: App: Il simplesso su reti, pivot per pivot](../../laboratorio/simplesso-su-reti.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **8.1 L'algoritmo del simplesso sul modello di flusso di costo minimo**

    [:octicons-arrow-right-24: Apri](l-algoritmo-del-simplesso-sul-modello-di-flusso-di-costo-min.md)

-   **8.2 Basi e alberi ricoprenti**

    [:octicons-arrow-right-24: Apri](basi-e-alberi-ricoprenti.md)

-   **8.3 Potenziali e ottimalità**

    [:octicons-arrow-right-24: Apri](potenziali-e-ottimalita.md)

-   **8.4 Il pivot**

    [:octicons-arrow-right-24: Apri](il-pivot.md)

-   **8.5 L'algoritmo del simplesso su reti**

    [:octicons-arrow-right-24: Apri](l-algoritmo-del-simplesso-su-reti.md)

-   **8.6 Un esempio senza capacità**

    [:octicons-arrow-right-24: Apri](un-esempio-senza-capacita.md)

-   **8.7 Degenerazione e alberi fortemente ammissibili**

    [:octicons-arrow-right-24: Apri](degenerazione-e-alberi-fortemente-ammissibili.md)

-   **8.8 Un esempio con capacità e un pivot degenere**

    [:octicons-arrow-right-24: Apri](un-esempio-con-capacita-e-un-pivot-degenere.md)

-   **8.9 L'albero iniziale: la Fase 0**

    Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](l-albero-iniziale-la-fase-0.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): alberi ricoprenti, foglie, cicli fondamentali e rango della matrice di incidenza nodo-arco.

    - Da questo modulo, [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md): il modello di flusso di costo minimo, la rimozione dei limiti inferiori, i potenziali, i costi ridotti e l'istanza di trasbordo sulla rete di riferimento.

    - Dal modulo Programmazione lineare, [Capitolo 6 «Algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/06-simplesso/), [Capitolo 7 «Condizioni di ottimalità e regole di pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/), [Capitolo 8 «Fase 0 dell'algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/08-fase-zero/) e [Capitolo 11 «Algoritmo del simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/): basi, soluzioni di base, costi ridotti, operazioni di pivot, degenerazione e Fase 0.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - dimostrare che le basi del modello di flusso di costo minimo sono gli alberi ricoprenti, e calcolare una soluzione ad albero eliminando le foglie;

    - calcolare i potenziali di un albero ricoprente e i costi ridotti, e verificare l'ottimalità di una soluzione ad albero con archi al limite inferiore e al limite superiore;

    - eseguire un pivot: arco entrante, ciclo orientato, passo, arco uscente, e aggiornamento dei flussi, dell'albero e dei potenziali;

    - riconoscere un pivot degenere, verificare se una struttura ad albero è fortemente ammissibile e applicare la regola dell'arco uscente che la mantiene fortemente ammissibile e impedisce il ciclaggio;

    - trovare una struttura ad albero iniziale con la Fase 0 sulla rete ausiliaria, oppure dimostrare che non esiste un flusso ammissibile.

---

**Avanti:** [8.1 L'algoritmo del simplesso sul modello di flusso di costo minimo](l-algoritmo-del-simplesso-sul-modello-di-flusso-di-costo-min.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Simplesso su reti](../../esercizi/network-simplex.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Il simplesso su reti, pivot per pivot](../../laboratorio/simplesso-su-reti.md).