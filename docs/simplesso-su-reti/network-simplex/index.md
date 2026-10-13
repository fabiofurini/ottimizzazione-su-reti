---
title: "Il simplesso su reti"
---

# Il simplesso su reti

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **8.1 L'algoritmo del simplesso sul modello del flusso di costo minimo**

    [:octicons-arrow-right-24: Apri](l-algoritmo-del-simplesso-sul-modello-del-flusso-di-costo-mi.md)

-   **8.2 Basi e alberi ricoprenti**

    [:octicons-arrow-right-24: Apri](basi-e-alberi-ricoprenti.md)

-   **8.3 Potenziali e ottimalità**

    [:octicons-arrow-right-24: Apri](potenziali-e-ottimalita.md)

-   **8.4 Il perno**

    [:octicons-arrow-right-24: Apri](il-perno.md)

-   **8.5 L'algoritmo del simplesso di rete**

    [:octicons-arrow-right-24: Apri](l-algoritmo-del-simplesso-di-rete.md)

-   **8.6 Un esempio senza capacità**

    [:octicons-arrow-right-24: Apri](un-esempio-senza-capacita.md)

-   **8.7 Degenerazione e alberi fortemente fattibili**

    [:octicons-arrow-right-24: Apri](degenerazione-e-alberi-fortemente-fattibili.md)

-   **8.8 Un esempio capacitato con un perno degenere**

    [:octicons-arrow-right-24: Apri](un-esempio-capacitato-con-un-perno-degenere.md)

-   **8.9 L'albero iniziale: Fase 0**

    Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](l-albero-iniziale-fase-0.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): alberi di copertura, foglie, cicli fondamentali e rango della matrice di incidenza nodo-arco.

    - Da questo modulo, [Capitolo 4 «Modelli di flusso su reti»](../../flussi/network-flow-models/index.md): il modello di flusso di costo minimo, la rimozione dei limiti inferiori, i potenziali, i costi ridotti e l'istanza di trasbordo sulla rete di riferimento.

    - Dal modulo Programmazione lineare, [Capitolo 6 «Algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/06-simplesso/), [Capitolo 7 «Condizioni di ottimalità e regole pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/), [Capitolo 8 «Fase 0 dell'algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/08-fase-zero/) e [Capitolo 11 «Simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/): basi, soluzioni di base, costi ridotti, pivot, degenerazione e Fase 0.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - dimostrare che le basi del modello di flusso di costo minimo corrispondono agli alberi ricoprenti e calcolare una soluzione associata a un albero eliminando le foglie;

    - calcolare i potenziali di un albero ricoprente e i costi ridotti, e verificare l'ottimalità di una soluzione ad albero con archi ai limiti inferiori o superiori;

    - eseguire un pivot, individuando l'arco entrante, il ciclo orientato, il passo e l'arco uscente, e aggiornare flussi, albero e potenziali;

    - riconoscere un pivot degenere, verificare la forte ammissibilità di una struttura ad albero e applicare la regola dell'arco uscente che la preserva e impedisce cicli;

    - trovare una struttura ad albero iniziale con la Fase 0 sulla rete ausiliaria oppure dimostrare che non esistono flussi ammissibili.

---

**Avanti:** [8.1 L'algoritmo del simplesso sul modello del flusso di costo minimo](l-algoritmo-del-simplesso-sul-modello-del-flusso-di-costo-mi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Simplesso su reti](../../esercizi/network-simplex.md)
