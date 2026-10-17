---
title: "Flusso di costo minimo"
---

# Flusso di costo minimo

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 6** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-min-cost-flow.pdf) · [:material-pencil: Esercizi: Flusso di costo minimo](../../esercizi/min-cost-flow.md) · [:material-gesture-tap: App: Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **6.1 La rete residua con i costi**

    [:octicons-arrow-right-24: Apri](la-rete-residua-con-i-costi.md)

-   **6.2 Circolazioni e loro scomposizione**

    [:octicons-arrow-right-24: Apri](circolazioni-e-loro-scomposizione.md)

-   **6.3 Condizioni di ottimalità dei cicli negativi**

    [:octicons-arrow-right-24: Apri](condizioni-di-ottimalita-dei-cicli-negativi.md)

-   **6.4 Condizioni di ottimalità con i potenziali**

    [:octicons-arrow-right-24: Apri](condizioni-di-ottimalita-con-i-potenziali.md)

-   **6.5 Un primo flusso ammissibile**

    [:octicons-arrow-right-24: Apri](un-primo-flusso-ammissibile.md)

-   **6.6 L'algoritmo di cancellazione dei cicli**

    L'algoritmo · La cancellazione dei cicli sulla rete di riferimento

    [:octicons-arrow-right-24: Apri](l-algoritmo-di-cancellazione-dei-cicli.md)

-   **6.7 L'algoritmo dei cammini minimi successivi**

    I cammini minimi successivi sulla rete di riferimento

    [:octicons-arrow-right-24: Apri](l-algoritmo-dei-cammini-minimi-successivi.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 3 «Cammini minimi»](../../alberi-e-cammini/shortest-paths/index.md): l'algoritmo di Bellman–Ford con la rilevazione di un ciclo negativo, l'algoritmo di Dijkstra e i potenziali $\pi_i=-\tilde{d}(i)$ come certificato.

    - [Capitolo 4 «Modelli di flusso su reti»](../network-flow-models/index.md): il modello del flusso di costo minimo, il flusso attraverso un taglio, la sostituzione dei limiti inferiori, i potenziali e i costi ridotti.

    - [Capitolo 5 «Flusso massimo»](../maximum-flow/index.md): la rete residua $G(\vet{x})$, i cammini aumentanti e l'algoritmo di Edmonds–Karp.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo sarai in grado di:

    - costruire la rete residua di un flusso con le capacità residue e i costi, calcolare il costo di uno dei suoi cicli e aumentare il flusso lungo di esso;

    - scomporre in cicli una circolazione e la differenza di due flussi ammissibili;

    - dimostrare che un flusso ammissibile è ottimo se e solo se la sua rete residua non ha cicli negativi, e se e solo se esistono potenziali con costi ridotti non negativi, e riconoscere un'istanza illimitata;

    - trovare un primo flusso ammissibile con un flusso massimo;

    - eseguire l'algoritmo di cancellazione dei cicli e l'algoritmo dei cammini minimi successivi, e dimostrarne la correttezza.

!!! nota "Dove eravamo"

    - Nel [Capitolo 4 «Modelli di flusso su reti»](../network-flow-models/index.md) il problema del flusso di costo minimo è il PL $\min\{\vet{c}'\vet{x} : \mat{B}\vet{x}=\vet{b},~\vet{l} \le \vet{x} \le \vet{u}\}$. Potenziali $\pi_i$ i cui costi ridotti $\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j$ sono positivi solo sugli archi vuoti e negativi solo sugli archi saturi certificano che un flusso è ottimo.

    - Sulla rete di riferimento il flusso ottimo $\tilde{\vet{x}}$ costa $60$, e $\vet{\pi}=(15,13,13,5,10,0)$ lo certifica.

    - Nel [Capitolo 5 «Flusso massimo»](../maximum-flow/index.md) un flusso cresce lungo i cammini aumentanti della rete residua $G(\vet{x})$.

    - In questo capitolo il certificato diventa un algoritmo: abbassiamo il costo di un flusso ammissibile lungo cicli di $G(\vet{x})$, oppure costruiamo il flusso lungo cammini minimi di $G(\vet{x})$ mantenendo vero il certificato.

---

**Avanti:** [6.1 La rete residua con i costi](la-rete-residua-con-i-costi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Flusso di costo minimo](../../esercizi/min-cost-flow.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Flusso di costo minimo: cancellazione dei cicli e cammini minimi successivi](../../laboratorio/flusso-di-costo-minimo.md).