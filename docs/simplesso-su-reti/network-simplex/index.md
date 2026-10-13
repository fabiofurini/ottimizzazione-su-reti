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

    - Da questo modulo, [Capitolo 4 «Modelli di flusso di rete»](../../flussi/network-flow-models/index.md): il modello di flusso a costo minimo, la rimozione dei lower bound, le potenzialità, la riduzione dei costi e l'istanza di traslato sulla rete di riferimento.

    - Dal modulo Programmazione lineare, [Capitolo 6 «Algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/06-simplesso/), [Capitolo 7 «Condizioni di ottimalità e regole pivot»](https://fabiofurini.github.io/programmazione-lineare/simplesso/07-ottimalita-pivot/), [Capitolo 8 «Fase 0 dell'algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/simplesso/08-fase-zero/) e [Capitolo 11 «Revisionato Algoritmo del simplesso»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/): basi, soluzioni di base, costi ridotti, operazioni pivotanti, degenerazione e Fase 0.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - dimostrare che le basi del modello di flusso di costo minimo sono gli albero ricoprente e calcolare una soluzione ad albero da le foglie;

    - calcola i potenziali di uno albero ricoprente e i costi ridotti e testa l'ottimalità di una soluzione ad albero con archi al limite inferiore e superiore;

    - esegue un pivot: arco di entrata, ciclo orientato, passo, arco di uscita e l'aggiornamento dei flussi, dell'albero e dei potenziali;

    - riconosce un perno degenere, controlla se una struttura ad albero è fortemente ammissibile e applica l'arco uscente regola che lo mantiene fortemente fattibile e impedisce il ciclismo;

    - trovare una struttura ad albero iniziale con Fase 0 sulla rete ausiliaria o dimostrare che non esiste un flusso fattibile.

---

**Avanti:** [8.1 L'algoritmo del simplesso sul modello del flusso di costo minimo](l-algoritmo-del-simplesso-sul-modello-del-flusso-di-costo-mi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Simplesso su reti](../../esercizi/network-simplex.md)
