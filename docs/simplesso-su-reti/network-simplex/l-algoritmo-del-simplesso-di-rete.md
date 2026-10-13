---
title: "L'algoritmo del simplesso di rete"
---

# 8.5 L'algoritmo del simplesso di rete { #sez-sec-ns-algorithm }

<div class="info-capitolo" markdown>

**Parte 4 · Il simplesso su reti · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Simplesso su reti](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-simplesso-su-reti.pdf) · [:material-pencil: Esercizi: Simplesso su reti](../../esercizi/network-simplex.md)

</div>

!!! algoritmo "Algoritmo: Algoritmo del simplesso su reti"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una rete <span class="arithmatex">\(G=(N,A)\)</span> con una struttura ad albero realizzabile <span class="arithmatex">\((T,L,U)\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> una soluzione ottimale dell'albero, o un ciclo che dimostra che il problema non ha limiti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Passaggio 0 (inizializzazione).</strong> Calcola la soluzione dell'albero <span class="arithmatex">\(\vet{x}\)</span> dalle foglie,</div><div class="pc" style="--liv:0"><span class="pc-n">2</span>  e i potenziali <span class="arithmatex">\(\vet{\pi}\)</span> dalla radice <span class="arithmatex">\(n\)</span>, con <span class="arithmatex">\(\pi_n=0\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">3</span><strong>Passaggio 1 (controllo dell'ottimalità).</strong> Calcola i costi ridotti <span class="arithmatex">\(\bar{c}_{ij}=c_{ij}-\pi_i+\pi_j\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">4</span>  Se <span class="arithmatex">\(\bar{c}_{ij} \ge 0\)</span> su <span class="arithmatex">\(L\)</span> e <span class="arithmatex">\(\bar{c}_{ij} \le 0\)</span> su <span class="arithmatex">\(U\)</span>, <code>STOP</code>: <span class="arithmatex">\(\vet{x}\)</span> è ottimale.</div><div class="pc" style="--liv:0"><span class="pc-n">5</span><strong>Passaggio 2 (inserimento dell'arco).</strong> Scegli l'arco idoneo <span class="arithmatex">\(e\)</span> con il più grande <span class="arithmatex">\(|\bar{c}_{ij}|\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">6</span>  Orienta il suo ciclo <span class="arithmatex">\(C\)</span> come <span class="arithmatex">\(e\)</span> se <span class="arithmatex">\(e \in L\)</span>, e contro <span class="arithmatex">\(e\)</span> se <span class="arithmatex">\(e \in U\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">7</span><strong>Passaggio 3 (test del rapporto).</strong> Calcola <span class="arithmatex">\(\theta\)</span>, la capacità residua minima lungo <span class="arithmatex">\(C\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">8</span>  Se <span class="arithmatex">\(\theta=+\infty\)</span>, <code>STOP</code>: il problema non è limitato.</div><div class="pc" style="--liv:0"><span class="pc-n">9</span>  Altrimenti l'arco in uscita <span class="arithmatex">\(f\)</span> è l'ultimo arco bloccante lungo <span class="arithmatex">\(C\)</span> dall'apice.</div><div class="pc" style="--liv:0"><span class="pc-n">10</span><strong>Passaggio 4 (aggiornamento).</strong> Invia le unità <span class="arithmatex">\(\theta\)</span> lungo <span class="arithmatex">\(C\)</span> e imposta <span class="arithmatex">\(T:=T \cup \{e\} \setminus \{f\}\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">11</span>  L'arco <span class="arithmatex">\(f\)</span> va a <span class="arithmatex">\(U\)</span> o a <span class="arithmatex">\(L\)</span>.</div><div class="pc" style="--liv:0"><span class="pc-n">12</span>  Aggiorna i potenziali del sottoalbero tagliato da <span class="arithmatex">\(f\)</span> e vai al passo 1.</div></div>

- Nel Passaggio 2 risolviamo le parità scegliendo gli archi in ordine lessicografico. Nel Passaggio 0 calcoliamo la soluzione ad albero con la <span style="color:#1971c2">[Proposizione 8.6](basi-e-alberi-ricoprenti.md#box-7-ns-prop-leaves)</span>; nel Passaggio 4 aggiorniamo flussi e albero con la <span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span> e i potenziali con la <span style="color:#1971c2">[Proposizione 8.13](il-perno.md#box-16-ns-prop-update)</span>.

- L'arresto al Passaggio 1 è corretto per il <span style="color:#1971c2">[Teorema 8.10](potenziali-e-ottimalita.md#box-12-ns-th-optimality)</span>; l'arresto al Passaggio 3 è corretto per la <span style="color:#1971c2">[Proposizione 8.14](il-perno.md#box-17-ns-prop-unbounded)</span>.

- Ogni struttura incontrata è ammissibile per la <span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span>. Se i saldi e le capacità sono interi, tutti i flussi sono interi per il <span style="color:#1971c2">[Corollario 8.4](basi-e-alberi-ricoprenti.md#box-5-ns-cor-integer)</span>; se anche i costi sono interi, lo sono anche i potenziali.

<a id="box-19-ns-prop-finite"></a>

!!! teorema "Proposizione 8.15: terminazione senza pivot degenerati"

    Se ogni pivot dell'algoritmo ha $\theta>0$, l'algoritmo si ferma dopo un numero finito di pivot.

??? dimostrazione "Dimostrazione"

    Una struttura ad albero determina univocamente la soluzione ad albero e il relativo costo. Per la <span style="color:#1971c2">[Proposizione 8.12](il-perno.md#box-15-ns-prop-pivot)</span>, ogni pivot con $\theta>0$ riduce il costo di $\theta|\bar{c}_{kl}|>0$; quindi nessuna struttura può ripetersi. Le strutture sono in numero finito: ci sono al più $\binom{m}{n-1}$ possibili alberi e, per ciascuno, al più $2^{m-n+1}$ assegnazioni dei limiti. <span class="qed">□</span>

## 8.5.1 L'algebra del pivot

- Nella terminologia del [Capitolo 11 «Simplesso rivisto»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/11-simplesso-rivisto/), i potenziali risolvono il primo sistema $\vet{\pi}'\mat{M}_T=\vet{c}_T'$.

- Il secondo sistema, $\mat{M}_T\vet{d}=\mat{M}_e$, si risolve usando il cammino nell'albero da $k$ a $l$. Per il [Lemma «Colonne di un ciclo» del Capitolo 1](../../grafi/graphs/il-rango-della-matrice-di-incidenza.md), poniamo $d_a=+1$ sugli archi del cammino percorsi dalla coda alla testa, $d_a=-1$ sugli altri archi del cammino e $d_a=0$ fuori dal cammino. Se aumentiamo $x_e$ di $t$, le variabili di base cambiano di $-t\,\vet{d}$: è l'aumento di flusso lungo il ciclo fondamentale.

- Il metodo dei potenziali per il problema di trasporto del [Capitolo 7 «Trasporto e assegnamento»](../../flussi/transportation-and-assignment/index.md) è un algoritmo del simplesso su reti applicato al grafo bipartito di origini e destinazioni: le celle di base formano un albero ricoprente, i potenziali e i costi ridotti sono quelli definiti in questo capitolo.

!!! chiave ""

    L'algoritmo del simplesso su reti passa da un albero ricoprente al successivo: calcola i potenziali e i costi ridotti, sceglie l'arco entrante, determina il ciclo e il passo, quindi aggiorna l'albero. Se non si verificano pivot degeneri, il costo diminuisce a ogni iterazione e l'algoritmo termina.

---

**Avanti:** [8.6 Un esempio senza capacità](un-esempio-senza-capacita.md)
