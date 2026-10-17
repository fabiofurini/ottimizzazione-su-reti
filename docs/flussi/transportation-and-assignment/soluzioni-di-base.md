---
title: "Soluzioni di base"
---

# 7.2 Soluzioni di base { #sez-ta-sec-basic }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 7** · [:material-book-open-variant: Capitolo 7: Trasporto e assegnamento](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-transportation-and-assignment.pdf) · [:material-pencil: Esercizi: Trasporto e assegnamento](../../esercizi/transportation-and-assignment.md) · [:material-gesture-tap: App: Trasporto: soluzione iniziale e metodo dei potenziali](../../laboratorio/trasporto-metodo-dei-potenziali.md) · [:material-gesture-tap: App: Assegnamento: l'algoritmo ungherese](../../laboratorio/assegnamento-algoritmo-ungherese.md)

</div>

- La colonna di $x_{ij}$ nei vincoli del modello $\mathrm{TP}$ ha due elementi uguali a $1$, nella riga dell'offerta di $i$ e nella riga della domanda di $j$. Cambiando il segno delle righe di domanda si ottiene la matrice di incidenza $\mat{B}$ della rete bipartita completa, e non cambiano né il rango né le dipendenze lineari delle colonne.

<a id="box-7-ta-prop-rank"></a>

!!! teorema "Proposizione 7.4: rango del modello di trasporto"

    Gli $m+n$ vincoli del modello $\mathrm{TP}$ hanno rango $m+n-1$. In un'istanza bilanciata ogni vincolo è implicato dagli altri.

??? dimostrazione "Dimostrazione"

    Ogni origine è collegata a ogni destinazione, quindi la rete bipartita completa è connessa, e la sua matrice di incidenza ha rango $m+n-1$ per il Teorema «rango della matrice di incidenza» del [Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md). La somma delle righe di offerta meno la somma delle righe di domanda è nulla, perché entrambe le somme contengono ogni variabile una volta, e la stessa combinazione dei termini noti è $\sum_{i \in P} a_i-\sum_{j \in D} d_j=0$: ogni vincolo è combinazione degli altri. <span class="qed">□</span>

<a id="box-8-ta-def-basis"></a>

!!! definizione "Definizione 7.5: base e soluzione di base"

    Una <strong>base</strong> del modello $\mathrm{TP}$ è un insieme $T$ di $m+n-1$ celle i cui archi formano un albero ricoprente della rete bipartita completa; le sue celle sono le <strong>celle di base</strong>. Una <strong>soluzione di base</strong> di $T$ è una soluzione dei vincoli [(7.1b)](il-problema-di-trasporto.md#mjx-eqn:ta:supply) e [(7.1c)](il-problema-di-trasporto.md#mjx-eqn:ta:demand) con $x_{ij}=0$ per ogni cella fuori da $T$. È una <strong>soluzione ammissibile di base</strong> se $\vet{x} \ge \vet{0}$, ed è <strong>degenere</strong> se qualche cella di base ha $x_{ij}=0$.

<a id="box-9-ta-th-basis"></a>

!!! teorema "Teorema 7.6: le basi sono alberi ricoprenti"

    - **(a)** Un insieme di $m+n-1$ celle ha colonne linearmente indipendenti se e solo se i suoi archi formano un albero ricoprente.

    - **(b)** In un'istanza bilanciata, ogni base $T$ ha esattamente una soluzione di base. Si trova fissando, una dopo l'altra, la cella di una foglia dell'albero, ed è intera quando le offerte e le domande sono intere.

??? dimostrazione "Dimostrazione"

    La parte (a) è il Corollario «basi della matrice di incidenza» del [Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md), perché il segno delle righe di domanda non cambia le dipendenze delle colonne. Per la parte (b):

    1. <em>Unicità.</em> Due soluzioni di base di $T$ differiscono per un vettore $\vet{y}$ nullo fuori da $T$ che soddisfa i vincoli con termini noti nulli; le colonne di $T$ sono indipendenti per (a), quindi $\vet{y}=\vet{0}$.

    2. <em>Costruzione.</em> L'albero ha una foglia $v$ (Lemma «foglie» del [Capitolo 1](../../grafi/graphs/alberi-e-foreste.md)), con una sola cella $e$ di $T$. Il vincolo di $v$ non contiene altre celle di base, quindi $x_e$ è uguale all'offerta o alla domanda di $v$.

    3. Togliamo $v$ ed $e$, e sottraiamo $x_e$ dall'offerta o dalla domanda dell'altro estremo di $e$. Le celle rimaste formano un albero ricoprente dei nodi rimasti, e le offerte e le domande rimaste hanno ancora somme uguali.

    4. Quando resta una sola cella, entrambi i suoi estremi sono foglie, e le somme uguali danno lo stesso valore per i due vincoli. Ogni valore si ottiene con somme e differenze dei dati, quindi è intero per dati interi. <span class="qed">□</span>

<a id="box-10-ta-prop-vertex"></a>

!!! teorema "Proposizione 7.7: i vertici sono soluzioni di base"

    Ogni vertice $\bar{\vet{x}}$ della regione ammissibile del modello $\mathrm{TP}$ è una soluzione ammissibile di base: le sue celle con $\bar{x}_{ij}>0$ formano una foresta, contenuta in una base $T$, e $\bar{\vet{x}}$ è la soluzione di base di $T$.

??? dimostrazione "Dimostrazione"

    Sia $F$ l'insieme delle celle con $\bar{x}_{ij}>0$.

    1. Le colonne di $F$ sono linearmente indipendenti, per il primo passo della dimostrazione del Teorema «vertici interi» del [Capitolo 4](../network-flow-models/totale-unimodularita-e-integralita.md): qui le celle strettamente comprese fra i loro limiti sono quelle di $F$. Un ciclo ha colonne dipendenti (Lemma «colonne di un ciclo» del Capitolo 1), quindi $F$ è una foresta.

    2. La rete è connessa: finché la foresta ha due o più componenti, qualche arco ne collega una a un'altra, e aggiungerlo non crea cicli (Lemma «aggiungere uno spigolo» del Capitolo 1). Si arriva a un albero ricoprente $T \supseteq F$.

    3. $\bar{\vet{x}}$ è nullo fuori da $F \subseteq T$, quindi è la soluzione di base di $T$, unica per il <span style="color:#1971c2">[Teorema 7.6](#box-9-ta-th-basis)</span>. <span class="qed">□</span>

- Un ciclo della rete bipartita alterna origini e destinazioni. Nella tabella è un cammino chiuso fra celle dell'insieme, che si muove alternativamente lungo una riga e lungo una colonna: un insieme di celle è una base se ha $m+n-1$ celle e nessun cammino chiuso di questo tipo.

- Una soluzione ammissibile di base ha al più $m+n-1$ quantità positive; ne ha di meno quando è degenere.

<a id="box-11-ta-ex-bases"></a>

!!! esempio "Esempio 7.4: basi dell'istanza di trasporto"

    Nell'<span style="color:#1971c2">[Esempio 7.1](il-problema-di-trasporto.md#box-3-ta-ex-tp)</span> una base ha $m+n-1=3+4-1=6$ celle.

    - Le celle $(1,4)$, $(1,5)$, $(2,4)$, $(2,5)$, $(3,6)$, $(3,7)$ non sono una base: $(1,4)$, $(2,4)$, $(2,5)$, $(1,5)$ formano il ciclo $1,4,2,5,1$, e infatti $\mat{A}_{14}-\mat{A}_{24}+\mat{A}_{25}-\mat{A}_{15}=\vet{0}$ per le loro colonne $\mat{A}_{ij}$.

    - Le celle $(1,4)$, $(1,5)$, $(1,6)$, $(1,7)$, $(2,7)$, $(3,7)$ formano un albero ricoprente. Le sue foglie $2,3,4,5,6$ fissano $x_{27}=30$, $x_{37}=30$, $x_{14}=10$, $x_{15}=25$, $x_{16}=15$; poi la riga dell'origine $1$ dà

        $$
        x_{17}=30-10-25-15=-20 .
        $$

        La soluzione di base esiste, ma non è ammissibile.

!!! chiave ""

    I vincoli del modello $\mathrm{TP}$ hanno rango $m+n-1$. Una base è un albero ricoprente della rete bipartita, con $m+n-1$ celle; la sua soluzione di base si trova foglia per foglia, è intera per dati interi, e ogni vertice è una soluzione ammissibile di base.

---

**Avanti:** [7.3 Soluzioni ammissibili di base iniziali](soluzioni-ammissibili-di-base-iniziali.md)
