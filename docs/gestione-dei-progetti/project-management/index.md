---
title: "Gestione dei progetti"
---

# Gestione dei progetti

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-presentation: Slide](../../pdf/slide-project-management.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md) · [:material-gesture-tap: App: Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **9.1 Progetti e reti delle attività**

    [:octicons-arrow-right-24: Apri](progetti-e-reti-delle-attivita.md)

-   **9.2 Cammini e cammini critici**

    [:octicons-arrow-right-24: Apri](cammini-e-cammini-critici.md)

-   **9.3 La passata in avanti: i tempi al più presto**

    [:octicons-arrow-right-24: Apri](la-passata-in-avanti-i-tempi-al-piu-presto.md)

-   **9.4 La passata all'indietro: i tempi al più tardi**

    [:octicons-arrow-right-24: Apri](la-passata-all-indietro-i-tempi-al-piu-tardi.md)

-   **9.5 Scorte e attività critiche**

    [:octicons-arrow-right-24: Apri](scorte-e-attivita-critiche.md)

-   **9.6 Il metodo del cammino critico**

    [:octicons-arrow-right-24: Apri](il-metodo-del-cammino-critico.md)

-   **9.7 Il modello di programmazione lineare**

    [:octicons-arrow-right-24: Apri](il-modello-di-programmazione-lineare.md)

-   **9.8 Due cammini critici e variazioni delle durate**

    Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](due-cammini-critici-e-variazioni-delle-durate.md)

</div>

!!! nota "Prerequisiti"

    - Dal [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): grafi orientati, cammini e cicli orientati.

    - Dal [Capitolo 3 «Cammini minimi»](../../alberi-e-cammini/shortest-paths/index.md): l'ordine topologico di un grafo aciclico, l'algoritmo per i grafi aciclici e i cammini massimi, i potenziali e i costi ridotti, il modello LP del cammino minimo e il suo duale.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un modello LP e il teorema della dualità debole.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - descrivere un progetto con le sue attività, durate e precedenze, e disegnarne la rete delle attività con i nodi START e FINISH;

    - calcolare i tempi di inizio e di fine al più presto e al più tardi con la passata in avanti e la passata all'indietro, e dimostrare che la durata minima del progetto è la lunghezza di un cammino critico;

    - calcolare le scorte totali e le scorte libere, e trovare le attività critiche e tutti i cammini critici;

    - disegnare il diagramma di Gantt di un calendario;

    - scrivere il modello LP della durata del progetto e il suo duale, un modello di cammino massimo;

    - prevedere l'effetto della variazione di una durata sulla durata del progetto.

---

**Avanti:** [9.1 Progetti e reti delle attività](progetti-e-reti-delle-attivita.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Gestione dei progetti](../../esercizi/project-management.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Il metodo del cammino critico (CPM)](../../laboratorio/cammino-critico-cpm.md).