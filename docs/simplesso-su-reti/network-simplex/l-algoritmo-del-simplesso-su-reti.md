---
title: "L'algoritmo del simplesso su reti"
---

# 8.5 L'algoritmo del simplesso su reti { #sez-sec-ns-algorithm }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-presentation: Slide](../../pdf/slide-network-simplex.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md) · [:material-gesture-tap: App: Il simplesso su reti, pivot per pivot](../../laboratorio/simplesso-su-reti.md)

</div>

!!! algoritmo "Algoritmo: Algoritmo del simplesso su reti"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una rete <span class="arithmatex">\(G=(N,A)\)</span> con una struttura ad albero ammissibile <span class="arithmatex">\((T,L,U)\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una soluzione ad albero ottima, oppure un ciclo che dimostra che il problema è illimitato</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passo 0 (inizializzazione).</strong> Calcolare la soluzione ad albero <span class="arithmatex">\(\vet{x}\)</span> dalle foglie,</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  e i potenziali <span class="arithmatex">\(\vet{\pi}\)</span> dalla radice <span class="arithmatex">\(n\)</span>, con <span class="arithmatex">\(\pi_n=0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passo 1 (test di ottimalità).</strong> Calcolare i costi ridotti <span class="arithmatex">\(\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  Se <span class="arithmatex">\(\bar{c}_{ij} \ge 0\)</span> su <span class="arithmatex">\(L\)</span> e <span class="arithmatex">\(\bar{c}_{ij} \le 0\)</span> su <span class="arithmatex">\(U\)</span>, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è ottima.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passo 2 (arco entrante).</strong> Scegliere l'arco ammissibile per l'ingresso <span class="arithmatex">\(e\)</span> con il massimo <span class="arithmatex">\(|\bar{c}_{ij}|\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  Orientare il suo ciclo <span class="arithmatex">\(C\)</span> come <span class="arithmatex">\(e\)</span> se <span class="arithmatex">\(e \in L\)</span>, e contro <span class="arithmatex">\(e\)</span> se <span class="arithmatex">\(e \in U\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span><strong>Passo 3 (test dei rapporti).</strong> Calcolare <span class="arithmatex">\(\theta\)</span>, la minima capacità residua lungo <span class="arithmatex">\(C\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">8</span>  Se <span class="arithmatex">\(\theta=+\infty\)</span>, <code>STOP</code>: il problema è illimitato.</div><div class="pc" style="--liv:0"><span class="pc-n">9</span>  Altrimenti l'arco uscente <span class="arithmatex">\(f\)</span> è l'ultimo arco bloccante lungo <span class="arithmatex">\(C\)</span> a partire dall'apice.</div><div class="pc" style="--liv:0"><span class="pc-n">10</span><strong>Passo 4 (aggiornamento).</strong> Inviare <span class="arithmatex">\(\theta\)</span> unità lungo <span class="arithmatex">\(C\)</span>, e porre <span class="arithmatex">\(T:=T \cup \{e\} \setminus \{f\}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">11</span>  L'arco <span class="arithmatex">\(f\)</span> va in <span class="arithmatex">\(U\)</span> o in <span class="arithmatex">\(L\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">12</span>  Aggiornare i potenziali del sottoalbero staccato da <span class="arithmatex">\(f\)</span>, e andare al Passo 1.</div></div>

- Le parità nel Passo 2 si risolvono con l'ordine lessicografico degli archi. Il Passo 0 usa la procedura della <span style="color:#1971c2">[Proposizione 8.6](basi-e-alberi-ricoprenti.md#box-7-ns-prop-leaves)</span>, il Passo 4 gli aggiornamenti della <span style="color:#1971c2">[Proposizione 8.12](il-pivot.md#box-15-ns-prop-pivot)</span> e della <span style="color:#1971c2">[Proposizione 8.13](il-pivot.md#box-16-ns-prop-update)</span>.

- L'arresto nel Passo 1 è corretto per il <span style="color:#1971c2">[Teorema 8.10](potenziali-e-ottimalita.md#box-12-ns-th-optimality)</span>, l'arresto nel Passo 3 per la <span style="color:#1971c2">[Proposizione 8.14](il-pivot.md#box-17-ns-prop-unbounded)</span>.

- Ogni struttura incontrata è ammissibile per la <span style="color:#1971c2">[Proposizione 8.12](il-pivot.md#box-15-ns-prop-pivot)</span>. Con bilanci e capacità interi tutti i flussi sono interi (<span style="color:#1971c2">[Corollario 8.4](basi-e-alberi-ricoprenti.md#box-5-ns-cor-integer)</span>), e con costi interi tutti i potenziali sono interi.

<a id="box-19-ns-prop-finite"></a>

!!! teorema "Proposizione 8.15: terminazione senza pivot degeneri"

    Se ogni pivot dell'algoritmo ha $\theta>0$, l'algoritmo si ferma dopo un numero finito di pivot.

??? dimostrazione "Dimostrazione"

    Una struttura ad albero determina la sua soluzione ad albero, quindi il suo costo. Per la <span style="color:#1971c2">[Proposizione 8.12](il-pivot.md#box-15-ns-prop-pivot)</span> ogni pivot con $\theta>0$ riduce il costo di $\theta|\bar{c}_{kl}|>0$, quindi nessuna struttura ad albero si ripete. Le strutture ad albero sono in numero finito: al più $\binom{m}{n-1}$ alberi, ciascuno con al più $2^{m-n+1}$ stati dei limiti. <span class="qed">□</span>

## 8.5.1 L'algebra del pivot

- Nel linguaggio del [Capitolo 11 «Algoritmo del simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/), i potenziali risolvono il primo sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$.

- Il secondo sistema $\mat{M}_T\vet{d}=\mat{M}_e$ si risolve con il cammino nell'albero da $k$ a $l$: per il [Lemma «colonne di un ciclo» del Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md), $d_a=+1$ sugli archi del cammino percorsi dalla coda alla testa, $d_a=-1$ sugli altri, e $d_a=0$ fuori dal cammino. Aumentare $x_e$ di $t$ cambia le variabili di base di $-t\,\vet{d}$: è il flusso inviato lungo il ciclo fondamentale.

- Il metodo dei potenziali per il problema di trasporto del [Capitolo 7 «Trasporto e assegnamento»](../../flussi/transportation-and-assignment/index.md) è l'algoritmo del simplesso su reti sul grafo bipartito delle origini e delle destinazioni: le celle di base formano un albero ricoprente, e i potenziali e i costi ridotti sono quelli di questo capitolo.

!!! chiave ""

    L'algoritmo del simplesso su reti passa da un albero all'altro: potenziali dalla radice, costi ridotti, arco entrante, ciclo, passo, arco uscente. Senza pivot degeneri il costo diminuisce a ogni pivot, e l'algoritmo si ferma.

---

**Avanti:** [8.6 Un esempio senza capacità](un-esempio-senza-capacita.md)
