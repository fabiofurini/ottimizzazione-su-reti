---
title: "Gestione dei progetti"
---

# Gestione dei progetti

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **9.1 Progetti e reti di progetto**

    [:octicons-arrow-right-24: Apri](progetti-e-reti-di-progetto.md)

-   **9.2 Percorsi e percorsi critici**

    [:octicons-arrow-right-24: Apri](percorsi-e-percorsi-critici.md)

-   **9.3 Il passaggio in avanti: i primi tempi**

    [:octicons-arrow-right-24: Apri](il-passaggio-in-avanti-i-primi-tempi.md)

-   **9.4 Il passaggio all'indietro: ultimi tempi**

    [:octicons-arrow-right-24: Apri](il-passaggio-all-indietro-ultimi-tempi.md)

-   **9.5 Margini e attività critiche**

    [:octicons-arrow-right-24: Apri](margini-e-attivita-critiche.md)

-   **9.6 Il metodo del percorso critico**

    [:octicons-arrow-right-24: Apri](il-metodo-del-percorso-critico.md)

-   **9.7 Il modello di programmazione lineare**

    [:octicons-arrow-right-24: Apri](il-modello-di-programmazione-lineare.md)

-   **9.8 Due percorsi critici e cambi di durata**

    Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](due-percorsi-critici-e-cambi-di-durata.md)

</div>

!!! nota "Prerequisiti"

    - Da [Capitolo 1 «Grafi»](../../grafi/graphs/index.md): diretto grafi, cammini diretti e cicli.

    - Da [Capitolo 3 «Percorsi più brevi»](../../alberi-e-cammini/shortest-paths/index.md): l'ordine topologico di un grafo aciclico, l'algoritmo per grafi aciclici e cammini più lunghi, potenzialità e costi ridotti, il modello LP del cammino minimo e il suo duale.

    - Dal modulo Programmazione lineare, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un modello LP e il teorema della dualità debole.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - descrivi un progetto attraverso le sue attività, durate e precedenze e disegna la sua rete di progetti con START e nodi FINITURA;

    - calcola il primo e l'ultimo tempo di inizio e di fine con il passaggio in avanti e all'indietro e dimostra che la durata minima del progetto è la lunghezza di un percorso critico;

    - calcola i giochi totali e liberi e trova le attività critiche e tutti i percorsi critici;

    - disegna il diagramma di Gantt di una pianificazione;

    - scrivere il modello LP della durata del progetto e il suo doppio modello di percorso più lungo;

    - prevede l'effetto di un cambiamento di una durata sulla durata del progetto.

---

**Avanti:** [9.1 Progetti e reti di progetto](progetti-e-reti-di-progetto.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Gestione dei progetti](../../esercizi/project-management.md)
