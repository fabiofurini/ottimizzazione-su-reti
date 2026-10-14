---
title: "Il metodo del percorso critico"
---

# 9.6 Il metodo del percorso critico { #sez-pm-sec-cpm }

<div class="info-capitolo" markdown>

**Parte 5 · Gestione dei progetti · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Gestione dei progetti](index.md) · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../../pdf/dispensa-5-gestione-dei-progetti.pdf) · [:material-pencil: Esercizi: Gestione dei progetti](../../esercizi/project-management.md)

</div>

!!! algoritmo "Algoritmo: Metodo del percorso critico (CPM)"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un progetto con attività <span class="arithmatex">\(1,2,\dots,n\)</span>, durate <span class="arithmatex">\(d_j>0\)</span> e precedenze</div><div class="pc" style="--liv:0"><strong>Output:</strong> i tempi <span class="arithmatex">\(\mathit{ES}_j\)</span>, <span class="arithmatex">\(\mathit{EF}_j\)</span>, <span class="arithmatex">\(\mathit{LS}_j\)</span>, <span class="arithmatex">\(\mathit{LF}_j\)</span>, i margini, la durata minima del progetto <span class="arithmatex">\(T\)</span> e gli archi stretti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (rete).</strong> Costruisci la rete del progetto <span class="arithmatex">\(G=(N,A)\)</span> e un ordine topologico: rimuovi ripetutamente un nodo
    senza inserire archi (l'indice più piccolo, se più di uno).</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  Se i nodi vengono lasciati e tutti hanno archi entranti, <code>STOP</code>: le precedenze contengono un ciclo.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passaggio 1 (passaggio in avanti).</strong> Imposta <span class="arithmatex">\(\mathit{ES}_0:=0\)</span>. Per ogni nodo <span class="arithmatex">\(j \neq 0\)</span> in ordine topologico, impostare
    <span class="arithmatex">\(\mathit{ES}_j:=\max_{(i,j) \in \delta^-(j)} \mathit{EF}_i\)</span>; impostare <span class="arithmatex">\(\mathit{EF}_j:=\mathit{ES}_j+d_j\)</span> per ogni <span class="arithmatex">\(j\)</span> e <span class="arithmatex">\(T:=\mathit{ES}_{n+1}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span><strong>Passaggio 2 (passaggio all'indietro).</strong> Imposta <span class="arithmatex">\(\mathit{LF}_{n+1}:=T\)</span>. Per ciascun nodo <span class="arithmatex">\(j \neq n+1\)</span> in ordine topologico inverso, impostare
    <span class="arithmatex">\(\mathit{LF}_j:=\min_{(j,k) \in \delta^+(j)} \mathit{LS}_k\)</span>; impostare <span class="arithmatex">\(\mathit{LS}_j:=\mathit{LF}_j-d_j\)</span> per ogni <span class="arithmatex">\(j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 3 (pantaloni).</strong> Per ogni attività <span class="arithmatex">\(j\)</span>, impostare <span class="arithmatex">\(\mathit{TS}_j:=\mathit{LS}_j-\mathit{ES}_j\)</span> e <span class="arithmatex">\(\mathit{FS}_j:=\min_{(j,k) \in \delta^+(j)} \mathit{ES}_k-\mathit{EF}_j\)</span>; mark the tight arcs, <span class="arithmatex">\(\mathit{ES}_j=\mathit{EF}_i\)</span>. I percorsi critici sono i percorsi di archi stretti da START a
    FINE.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span><code>STOP</code>.</div></div>

<a id="box-21-pm-th-time"></a>

!!! teorema "Teorema 9.16: tempo di esecuzione del metodo del percorso critico"

    Il metodo del percorso critico viene eseguito nel tempo $O(n+m)$, dove $m=|A|$.

??? dimostrazione "Dimostrazione"

    1. Passo 0 crea gli archi dagli elenchi dei predecessori immediati, più al massimo gli archi $2n$ di INIZIO e FINE. L'ordine topologico richiede tempo $O(n+m)$, con un contatore degli archi entranti di ogni nodo, come in [Capitolo 3](../../alberi-e-cammini/shortest-paths/percorsi-piu-brevi-nei-grafici-aciclici.md).

    2. Il passo 1 scansiona ogni arco una volta, come un arco entrante della sua testa; Il passo 2 scansiona ogni arco una volta, come arco uscente la sua coda.

    3. Il passo 3 scansiona ancora una volta gli archi uscenti di ogni attività e contrassegna gli archi stretti con un confronto per arco. <span class="qed">□</span>

- L'output fornisce il sottografo degli archi stretti e i suoi percorsi da INIZIO a FINE sono i percorsi critici (<span style="color:#1971c2">[Teorema 9.15](margini-e-attivita-critiche.md#box-19-pm-th-tight)</span>). Elencarli uno per uno può richiedere più tempo, quando sono molti.

## 9.6.1 Il diagramma di Gantt

<a id="box-22-pm-def-gantt"></a>

!!! definizione "Definizione 9.17: diagramma di Gantt"

    Il <strong>diagramma di Gantt</strong> di una pianificazione $\vet{t}$ ha un asse temporale e una riga per ogni attività: la riga dell'attività $j$ ha una barra da $t_j$ a $t_j+d_j$.

- Il grafo mostra a colpo d'occhio quali attività sono in corso in ogni momento. Disegniamo il primo programma $\mathit{ES}$, con le barre delle attività critiche in blu, e un riquadro tratteggiato da $\mathit{EF}_j$ a $\mathit{LF}_j$ che mostra le rallentamento totale di ciascuna attività non critica.

<a id="box-23-pm-ex-gantt"></a>

!!! esempio "Esempio 9.6: il diagramma di Gantt del caso di studio"

    Il diagramma di Gantt della prima pianificazione del caso studio, in settimane:

    ![Figura 6](../../img/project-management/fig06.svg){ .fig loading=lazy  }

    - Le barre blu delle attività critiche si susseguono senza interruzioni dalla settimana $0$ alla settimana $44$: un ritardo su nessuno di loro ritarda il progetto.

    - Nella settimana $16$ iniziano insieme le attività $4$, $5$ e $9$: da (H2), tre squadre lavorano in parallelo.

    - Le caselle tratteggiate della catena $4,7,8,13$ sono tutte $4$ lunghe settimane, ma le barre della catena si susseguono: le settimane di rallentamento $4$ sono condivise.

!!! chiave ""

    Il metodo del percorso critico costruisce la rete e un ordine topologico, esegue i passaggi in avanti e all'indietro e calcola i margini in tempo $O(n+m)$. Il diagramma di Gantt mostra le attività in corso in ogni istante e mette in evidenza il percorso critico.

---

**Avanti:** [9.7 Il modello di programmazione lineare](il-modello-di-programmazione-lineare.md)
