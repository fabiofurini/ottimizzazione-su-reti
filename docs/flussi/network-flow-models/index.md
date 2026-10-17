---
title: "Modelli di flusso su reti"
---

# Modelli di flusso su reti

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **4.1 Reti e flussi**

    [:octicons-arrow-right-24: Apri](reti-e-flussi.md)

-   **4.2 Il modello di flusso di costo minimo**

    [:octicons-arrow-right-24: Apri](il-modello-di-flusso-di-costo-minimo.md)

-   **4.3 Condizioni di ammissibilità**

    [:octicons-arrow-right-24: Apri](condizioni-di-ammissibilita.md)

-   **4.4 Rimozione dei limiti inferiori**

    [:octicons-arrow-right-24: Apri](rimozione-dei-limiti-inferiori.md)

-   **4.5 Istanze non bilanciate**

    [:octicons-arrow-right-24: Apri](istanze-non-bilanciate.md)

-   **4.6 Totale unimodularità e integralità**

    [:octicons-arrow-right-24: Apri](totale-unimodularita-e-integralita.md)

-   **4.7 Il modello duale e i costi ridotti**

    [:octicons-arrow-right-24: Apri](il-modello-duale-e-i-costi-ridotti.md)

-   **4.8 Casi speciali**

    [:octicons-arrow-right-24: Apri](casi-speciali.md)

-   **4.9 Un'istanza di trasbordo**

    Il certificato di ottimalità

    [:octicons-arrow-right-24: Apri](un-istanza-di-trasbordo.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): grafi orientati, matrice di incidenza nodo–arco, alberi ricoprenti e rango della matrice di incidenza.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/) e [Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/): il duale di un problema LP, dualità debole e forte, vertici di un poliedro.

    - Determinanti: lo sviluppo di Laplace lungo una colonna e la regola di Cramer.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - descrivere una rete con bilanci, limiti inferiori, capacità e costi, e scrivere il modello di flusso di costo minimo, anche in forma matriciale con la matrice di incidenza;

    - verificare le condizioni necessarie per l'esistenza di un flusso ammissibile, e costruire controesempi;

    - rimuovere i limiti inferiori con una sostituzione, e bilanciare un'istanza con un nodo fittizio;

    - dimostrare che la matrice di incidenza è totalmente unimodulare, e dedurne che il modello ha soluzioni ottime intere quando i dati sono interi;

    - scrivere il duale con i potenziali $\pi_i$, calcolare i costi ridotti e certificare l'ottimalità di un flusso;

    - riconoscere i problemi di cammino minimo, di flusso massimo, di trasporto e di assegnamento come modelli di flusso di costo minimo.

---

**Avanti:** [4.1 Reti e flussi](reti-e-flussi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Modelli di flusso](../../esercizi/network-flow-models.md)
