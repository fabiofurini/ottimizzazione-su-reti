---
title: "L'algoritmo del simplesso di rete"
---

# 8.5 L'algoritmo del simplesso di rete { #sez-sec-ns-algorithm }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

!!! algoritmo "Algoritmo: Algoritmo simplex di rete"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una rete <span class="arithmatex">\(G=(N,A)\)</span> con una struttura ad albero realizzabile <span class="arithmatex">\((T,L,U)\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una soluzione ottimale dell'albero, o un ciclo che dimostra che il problema non ha limiti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Calcola la soluzione dell'albero <span class="arithmatex">\(\vet{x}\)</span> dalle foglie,</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  e i potenziali <span class="arithmatex">\(\vet{\pi}\)</span> dalla radice <span class="arithmatex">\(n\)</span>, con <span class="arithmatex">\(\pi_n=0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passaggio 1 (controllo dell'ottimalità).</strong> Calcola i costi ridotti <span class="arithmatex">\(\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  Se <span class="arithmatex">\(\bar{c}_{ij} \ge 0\)</span> su <span class="arithmatex">\(L\)</span> e <span class="arithmatex">\(\bar{c}_{ij} \le 0\)</span> su <span class="arithmatex">\(U\)</span>, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è ottimale.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 2 (inserimento dell'arco).</strong> Scegli l'arco idoneo <span class="arithmatex">\(e\)</span> con il più grande <span class="arithmatex">\(|\bar{c}_{ij}|\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  Orienta il suo ciclo <span class="arithmatex">\(C\)</span> come <span class="arithmatex">\(e\)</span> se <span class="arithmatex">\(e \in L\)</span>, e contro <span class="arithmatex">\(e\)</span> se <span class="arithmatex">\(e \in U\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span><strong>Passaggio 3 (test del rapporto).</strong> Calcola <span class="arithmatex">\(\theta\)</span>, la capacità residua minima lungo <span class="arithmatex">\(C\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">8</span>  Se <span class="arithmatex">\(\theta=+\infty\)</span>, <code>STOP</code>: il problema non è limitato.</div><div class="pc" style="--liv:0"><span class="pc-n">9</span>  Altrimenti l'arco in uscita <span class="arithmatex">\(f\)</span> è l'ultimo arco bloccante lungo <span class="arithmatex">\(C\)</span> dall'apice.</div><div class="pc" style="--liv:0"><span class="pc-n">10</span><strong>Passaggio 4 (aggiornamento).</strong> Invia le unità <span class="arithmatex">\(\theta\)</span> lungo <span class="arithmatex">\(C\)</span> e imposta <span class="arithmatex">\(T:=T \cup \{e\} \setminus \{f\}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">11</span>  L'arco <span class="arithmatex">\(f\)</span> va a <span class="arithmatex">\(U\)</span> o a <span class="arithmatex">\(L\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">12</span>  Aggiorna i potenziali del sottoalbero tagliato da <span class="arithmatex">\(f\)</span> e vai al passo 1.</div></div>

- Le legature di valore nel passaggio 2 vengono interrotte dall'ordine lessicografo degli archi. Il passaggio 0 utilizza la procedura di <span style="color:#1971c2">[Proposizione 8.6](basi-e-alberi-ricoprenti.md#box-7-ns-prop-leaves)</span>, Passaggio 4 gli aggiornamenti di <span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span> e <span style="color:#1971c2">[Proposizione 8.13](il-perno.md#box-16-ns-prop-update)</span>.

- L'interruzione nel passaggio 1 è corretta secondo <span style="color:#1971c2">[Teorema 8.10](potenziali-e-ottimalita.md#box-12-ns-th-optimality)</span>, l'interruzione nel passaggio 3 secondo <span style="color:#1971c2">[Proposizione 8.14](il-perno.md#box-17-ns-prop-unbounded)</span>.

- Ogni struttura incontrata è realizzabile da <span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span>. Con saldi interi e capacità tutti i flussi sono interi (<span style="color:#1971c2">[Corollario 8.4](basi-e-alberi-ricoprenti.md#box-5-ns-cor-integer)</span>), e con costi interi tutti i i potenziali sono interi

<a id="box-19-ns-prop-finite"></a>

!!! teorema "Proposizione 8.15: terminazione senza pivot degenerati"

    Se ogni pivot dell'algoritmo ha $\theta>0$, l'algoritmo si ferma dopo un numero finito di pivot.

??? dimostrazione "Dimostrazione"

    Una struttura ad albero determina la sua soluzione ad albero, quindi il suo costo. Di <span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span> ogni pivot con $\theta>0$ diminuisce il costo di $\theta|\bar{c}_{kl}|>0$, quindi nessuna struttura ad albero viene soddisfatta due volte. Ci sono un numero finito di strutture ad albero: al massimo alberi $\binom{m}{n-1}$, ciascuno con al massimo stati associati $2^{m-n+1}$. <span class="qed">□</span>

## 8.5.1 L'algebra del pivot

- Nella lingua di [Capitolo 11 «Algoritmo del simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/), i potenziali risolvono il primo sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$.

- Il secondo sistema $\mat{M}_T\vet{d}=\mat{M}_e$ è risolto dal percorso ad albero da $k$ a $l$: da [Capitolo 1, Lemma «colonne di un ciclo»](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md), $d_a=+1$ sugli archi del percorso percorso dalla coda alla testa, $d_a=-1$ sul altri e $d_a=0$ fuori dal percorso. Aumentando $x_e$ di $t$ si modificano le variabili base di $-t\,\vet{d}$: questo è il flusso inviato attorno al ciclo fondamentale.

- Il potenziale metodo per il problema del trasporto in [Capitolo 7 «Trasporto e assegnazione»](../../flussi/transportation-and-assignment/index.md) è l'algoritmo del simplesso di rete sul grafo bipartito delle origini e delle destinazioni: le celle base formano uno albero ricoprente, e le potenzialità ed i costi ridotti sono quelli di questo capitolo.

!!! chiave ""

    L'algoritmo del simplesso di rete si sposta di albero in albero: potenziali dalla radice, costi ridotti, arco entrante, ciclo, passo, lasciando l'arco. Senza pivot degenerati il costo diminuisce ad ogni pivot e l’algoritmo si ferma.

---

**Avanti:** [8.6 Un esempio senza capacità](un-esempio-senza-capacita.md)
