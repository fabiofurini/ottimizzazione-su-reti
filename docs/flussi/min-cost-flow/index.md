---
title: "Flusso di costo minimo"
---

# Flusso di costo minimo

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **6.1 La rete residua con i costi**

    [:octicons-arrow-right-24: Apri](la-rete-residua-con-i-costi.md)

-   **6.2 Circolazioni e loro scomposizione**

    [:octicons-arrow-right-24: Apri](circolazioni-e-loro-scomposizione.md)

-   **6.3 Condizioni di ottimalità del ciclo negativo**

    [:octicons-arrow-right-24: Apri](condizioni-di-ottimalita-del-ciclo-negativo.md)

-   **6.4 Condizioni di ottimalità con potenziali**

    [:octicons-arrow-right-24: Apri](condizioni-di-ottimalita-con-potenziali.md)

-   **6.5 Un primo flusso fattibile**

    [:octicons-arrow-right-24: Apri](un-primo-flusso-fattibile.md)

-   **6.6 L'algoritmo di annullamento del ciclo**

    L'algoritmo · Annullamento ciclo sulla rete di riferimento

    [:octicons-arrow-right-24: Apri](l-algoritmo-di-annullamento-del-ciclo.md)

-   **6.7 L'algoritmo del percorso più breve successivo**

    Percorsi più brevi successivi sulla rete di riferimento

    [:octicons-arrow-right-24: Apri](l-algoritmo-del-percorso-piu-breve-successivo.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 3 «Percorsi più brevi»](../../alberi-e-cammini/shortest-paths/index.md): l'algoritmo di Bellman–Ford con la rilevazione di un ciclo negativo, l'algoritmo di Dijkstra e il potenziali $\pi_i=-\tilde{d}(i)$ come certificato.

    - [Capitolo 4 «Flusso di rete modelli»](../network-flow-models/index.md): il modello di flusso a costo minimo, il flusso attraverso un taglio, la sostituzione dei limiti inferiori, i potenziali e i costi ridotti.

    - [Capitolo 5 «Portata massima»](../maximum-flow/index.md): il rete residua $G(\vet{x})$, percorsi aumentanti e algoritmo di Edmonds–Karp.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - costruire la rete residua di un flusso con capacità e costi residui, calcolare il costo di uno dei suoi cicli, e aumentare il flusso lungo di esso;

    - decompone una circolazione, e la differenza di due flussi ammissibili, in cicli;

    - dimostrare che un flusso ammissibile è ottimale se e solo se la sua rete residua non ha ciclo negativo, e se e solo se esistono potenziali con costi ridotti non negativi, e riconoscono un'istanza illimitata;

    - trovare una prima portata ammissibile con portata massima;

    - esegue l'algoritmo di annullamento del ciclo e il successivo algoritmo del percorso più breve e ne dimostra la correttezza.

!!! nota "Dove eravamo"

    - In [Capitolo 4 «Rete modelli di flusso»](../network-flow-models/index.md) il problema del flusso di costo minimo è il LP $\min\{\vet{c}'\vet{x} : \mat{B}\vet{x}=\vet{b},~\vet{l} \le \vet{x} \le \vet{u}\}$. Potentials $\pi_i$ whose reduced costs $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ sono positivi solo su archi vuoti e negativi solo su archi saturi certificano che un flusso è ottimale.

    - Sulla rete di riferimento il flusso ottimale $\tilde{\vet{x}}$ costa $60$ e $\vet{\pi}=(15,13,13,5,10,0)$ lo certifica.

    - In [Capitolo 5 «Portata massima»](../maximum-flow/index.md) a il flusso cresce lungo percorsi aumentanti della rete residua $G(\vet{x})$.

    - In questo capitolo il certificato diventa un algoritmo: abbassiamo il costo di un flusso realizzabile lungo cicli di $G(\vet{x})$, oppure costruiamo il flusso lungo i percorsi più brevi di $G(\vet{x})$ mantenendo vero il certificato.

---

**Avanti:** [6.1 La rete residua con i costi](la-rete-residua-con-i-costi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Flusso di costo minimo](../../esercizi/min-cost-flow.md)
