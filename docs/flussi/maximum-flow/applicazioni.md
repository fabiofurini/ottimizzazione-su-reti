---
title: "Applicazioni"
---

# 5.7 Applicazioni

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<a id="sez-sec-mf-applications"></a>
### 5.7.1 Corrispondenza massima in un grafo bipartito

<a id="box-24-mf-def-matching"></a>

!!! definizione "Definizione 5.16: grafo bipartito e corrispondenza"

    Un grafo non orientato $H=(V_1 \cup V_2,E)$ è <strong>bipartito</strong> se $V_1$ e $V_2$ sono disgiunti e ogni lato ne ha uno estremo in $V_1$ e uno in $V_2$; scriviamo i lati come $\{i,j\}$ con $i \in V_1$ e $j \in V_2$.

    - A <strong>matching</strong> è un insieme $M \subseteq E$ di lati, nessuno dei quali ha un punto finale comune.

    - Il <strong>problema di corrispondenza massima</strong> richiede una corrispondenza con il maggior numero di lati.

    La <strong>rete di $H$</strong> ha i nodi $\{s\} \cup V_1 \cup V_2 \cup \{t\}$, gli archi $(s,i)$ per $i \in V_1$, $(i,j)$ per ogni lato $\{i,j\} \in E$, $(j,t)$ per $j \in V_2$ e tutte le capacità uguali a $1$.

- Con $V_1$ un insieme di lavoratori, $V_2$ un insieme di lavori e un margine in cui un lavoratore può svolgere un lavoro, viene assegnata una corrispondenza posti di lavoro ai lavoratori, al massimo un posto di lavoro per lavoratore e un lavoratore per posto di lavoro.

- Nell'ordine dei nodi, $s$ viene per primo e $t$ per ultimo; gli altri nodi mantengono i loro indici.

<a id="box-25-mf-prop-matching"></a>

!!! teorema "Proposizione 5.17: corrispondenze e flussi"

    Il numero massimo di fronti di una corrispondenza di $H$ equivale al valore massimo $\tilde{v}$ di un flusso nella rete di $H$. Se $\tilde{\vet{x}}$ è un flusso massimo intero, allora $M=\{\{i,j\} \in E : \tilde{x}_{ij}=1\}$ è una corrispondenza massima.

??? dimostrazione "Dimostrazione"

    1. <em>Dagli abbinamenti ai flussi.</em> Dato un corrispondente $M$, impostare $x=1$ sugli archi $(s,i)$, $(i,j)$, $(j,t)$ di ogni lato $\{i,j\} \in M$ e $x=0$ altrove. Ogni nodo di $V_1 \cup V_2$ è un punto finale di almeno un lato di $M$, quindi il flusso è fattibile e il suo valore è $|M|$.

    2. <em>Da flussi interi agli abbinamenti.</em> Sia $\vet{x}$ un flusso ammissibile intero, quindi $x_{ij} \in \{0,1\}$. A il nodo $i \in V_1$ ha il singolo arco entrante $(s,i)$, quindi al massimo un arco $(i,j)$ trasporta flusso; ha un nodo $j \in V_2$ l'unico arco uscente $(j,t)$, quindi al massimo un arco $(i,j)$ trasporta il flusso. Quindi $M=\{\{i,j\} : x_{ij}=1\}$ è un corrispondenza. Per $S=\{s\} \cup V_1$, gli archi in avanti sono gli archi $(i,j)$ e non ci sono archi all'indietro: da <span style="color:#1971c2">[Lemma 5.3](tagli.md#box-4-mf-lem-cut)</span>, $v=|M|$.

    3. Per <span style="color:#1971c2">[Corollario 5.10](l-algoritmo-ford-fulkerson.md#box-15-mf-cor-integral)</span> esiste un flusso massimo intero $\tilde{\vet{x}}$. Entro l'1, nessuna corrispondenza ha più di lati $\tilde{v}$ e per 2 la corrispondenza di $\tilde{\vet{x}}$ ha lati $\tilde{v}$. <span class="qed">□</span>

<a id="box-26-mf-ex-matching"></a>

!!! esempio "Esempio 5.9: lavoratori e posti di lavoro"

    Quattro lavoratori $V_1=\{1,2,3,4\}$ e tre lavori $V_2=\{5,6,7\}$ hanno i vantaggi

    $$
    E=\big\{\{1,5\},\{1,6\},\{2,5\},\{3,6\},\{3,7\},\{4,6\}\big\}.
    $$

    L'algoritmo Edmonds–Karp sulla rete di $H$, con i nodi nell'ordine $s,1,2,\dots,7,t$, dà:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>iterazione e percorso aumentante</th>
    <th><span class="arithmatex">\(r_{ij}\)</span> su <span class="arithmatex">\(P\)</span></th>
    <th>archi all'indietro</th>
    <th><span class="arithmatex">\(\delta\)</span></th>
    <th><span class="arithmatex">\(v\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(s,1,5,t\)</span></td>
    <td><span class="arithmatex">\(1,1,1\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(s,3,6,t\)</span></td>
    <td><span class="arithmatex">\(1,1,1\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(s,4,6,3,7,t\)</span></td>
    <td><span class="arithmatex">\(1,1,1,1,1\)</span></td>
    <td><span class="arithmatex">\((6,3)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    </table></div>

    - L'iterazione $3$ utilizza l'arco all'indietro $(6,3)$: il lavoratore $3$ lascia il lavoro $6$ per il lavoro $7$ e il lavoratore $4$ accetta il lavoro $6$.

    - L'abbinamento massimo è $M=\{\{1,5\},\{3,7\},\{4,6\}\}$, con lati $3$; il lavoratore $2$ resta senza lavoro. Dentro nella figura gli archi con flusso $1$ sono blu.

    - Alla fermata cerca le etichette $S=\{s,1,2,4,5,6\}$; gli archi anteriori del taglio sono $(s,3)$, $(5,t)$, $(6,t)$, con capacità $3=|M|$.

    ![Figura 6](../../img/maximum-flow/fig06.svg){ .fig loading=lazy  }

### 5.7.2 Percorsi arcodisgiunti

- Due percorsi diretti sono <strong>arco-disgiunti</strong> se non hanno arco in comune; possono condividere nodi.

<a id="box-27-mf-th-menger"></a>

!!! teorema "Teorema 5.18: Menger, versione ad arco"

    Sia $G=(N,A)$ un grafo diretto e $s \neq t$ due nodi. Il numero massimo di percorsi diretti a coppie di archi disgiunti da $s$ a $t$ è uguale al numero minimo di archi la cui rimozione non lascia alcun percorso diretto da $s$ a $t$.

??? dimostrazione "Dimostrazione"

    Assegna ad ogni arco la capacità $1$ e lascia che $\tilde{v}$ sia il valore massimo di un flusso.

    1. <em>I percorsi danno flussi.</em> La somma dei vettori di incidenza dei percorsi arcodisgiunti $k$ da $s$ a $t$ è un flusso di valore ammissibile $k$: ogni arco porta al massimo $1$, e ogni percorso entra ed esce dai suoi nodi interni. Quindi $k \le \tilde{v}$.

    2. <em>I flussi danno percorsi.</em> Per <span style="color:#1971c2">[Corollario 5.10](l-algoritmo-ford-fulkerson.md#box-15-mf-cor-integral)</span> esiste un flusso $\vet{x}$ con $x_{ij} \in \{0,1\}$ e valore $\tilde{v}$. Se $\tilde{v} \ge 1$, camminare da $s$ lungo gli archi con $x_{ij}=1$, ciascuno utilizzato al massimo una volta, finché non viene raggiunto $t$:

        - in un nodo $i \notin \{s,t\}$ il cammino ha utilizzato un arco in entrata in più rispetto agli archi in uscita, e la conservazione dà un arco di uscita inutilizzato con flusso;

        - a $s$ il cammino ha utilizzato tanti archi in uscita quanti in entrata, mentre gli archi con flusso in uscita da $s$ sono $\tilde{v} \ge 1$ più di quelli che entrano: ne esiste uno inutilizzato.

        La passeggiata termina, in $t$, e contiene un percorso $P$ da $s$ a $t$ ([Capitolo 1, Lemma «una passeggiata contiene un cammino»](../../grafi/graphs/grafi-non-orientati-e-orientati.md)). L'impostazione di $x_{ij}=0$ su $P$ lascia un flusso $0/1$ di valore $\tilde{v}-1$; ripetendo fornisce percorsi $\tilde{v}$ arcodisgiunti.

    3. <em>Rimozione archi.</em> Se la rimozione di un set $F$ di archi non lascia alcun percorso da $s$ a $t$, il set $S$ dei nodi ancora raggiungibile da $s$ ha $t \notin S$ e $\delta^+(S) \subseteq F$, quindi $|F| \ge u(S,N \setminus S) \ge \tilde{v}$. Viceversa, ogni percorso da $s$ a $t$ lascia $S$ attraverso un arco di $\delta^+(S)$: rimozione del $\tilde{v}$ archi in avanti di un taglio minimo (<span style="color:#1971c2">[Teorema 5.8](il-teorema-del-taglio-minimo-del-flusso-massimo.md#box-12-mf-th-mfmc)</span>) non lasciano alcun percorso. <span class="qed">□</span>

<a id="box-28-mf-ex-menger"></a>

!!! esempio "Esempio 5.10: percorsi arcodisgiunti nel grafo di riferimento"

    Sul grafo di riferimento con tutte le capacità $1$, $s=1$ e $t=6$, l'algoritmo Edmonds–Karp trova i percorsi $1,2,4,6$ e $1,3,5,6$ e $\tilde{v}=2$. Questi due percorsi sono archi disgiunti e rimuovendo i due archi $(1,2)$, $(1,3)$ lasciando il nodo $1$ non lascia alcun percorso da $1$ a $6$: entrambi i numeri di <span style="color:#1971c2">[Teorema 5.18](#box-27-mf-th-menger)</span> sono $2$.

!!! chiave ""

    Una corrispondenza massima di un grafo bipartito è un flusso massimo intero in una rete con capacità unitaria, e lo sono anche i percorsi arcodisgiunti da $s$ a $t$; il taglio minimo certifica entrambi.

## 5.8 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Conteggio degli archi all'indietro di un taglio.</strong> La capacità $u(S,N \setminus S)$ somma solo gli archi di $S$ a $N \setminus S$.

    - <strong>Dimenticando gli archi all'indietro della rete residua.</strong> Solo con gli archi in avanti, il metodo può fermarsi a portata non massima, pari al valore $5$ sulla rete di riferimento.

    - <strong>Dando ad un arco all'indietro la capacità $u_{ij}$.</strong> L'arco all'indietro $(j,i)$ ha $r_{ji}=x_{ij}$: solo il il flusso già inviato può essere rinviato.

    - <strong>Prendere il collo di bottiglia dalle capacità.</strong> Il collo di bottiglia è la capacità residua più piccola $r_{ij}$ sul percorso, non il più piccolo $u_{ij}$.

    - <strong>Aggiungendo $\delta$ su un arco all'indietro.</strong> Lungo un arco all'indietro $(j,i)$ il flusso $x_{ij}$ diminuisce di $\delta$.

    - <strong>Lettura del taglio dagli archi saturati.</strong> Il taglio minimo è dato dai nodi raggiungibili da $s$ in la rete residua alla fermata; non è necessario che gli archi saturati formino un taglio.

    - <strong>Chiamata del polinomio Ford–Fulkerson.</strong> Il suo numero di aumenti può crescere con le capacità, come $2M$ in <span style="color:#1971c2">[Esempio 5.7](l-algoritmo-ford-fulkerson.md#box-18-mf-ex-bad)</span>; Edmonds–Karp produce al massimo $n\,m$.

## 5.9 In sintesi

!!! chiave "In sintesi"

    - Un flusso ammissibile rispetta le capacità e si conserva nei nodi diversi da $s$ e $t$; il suo valore è il deflusso netto di $s$ ed è uguale al flusso netto attraverso ogni taglio $s$–$t$.

    - Dualità debole: $v \le u(S,N \setminus S)$ per ogni flusso e ogni taglio.

    - La rete residua ha archi avanti con $r_{ij}=u_{ij}-x_{ij}$ e archi indietro con $r_{ji}=x_{ij}$; un il percorso aumentante aumenta il valore tramite il collo di bottiglia $\delta$.

    - Taglio minimo flusso massimo: un flusso è massimo se e solo se non esiste alcun percorso aumentante e $\tilde{v}$ è uguale al capacità di taglio minima; con capacità intere si ha una portata massima intera.

    - Ford–Fulkerson (ricerca approfondita): con capacità intere al massimo degli aumenti $\tilde{v}$, pseudopolinomiale. Edmonds–Karp (ricerca in ampiezza): al massimo aumenti $n\,m$, tempo $O(n\,m^2)$.

    - Gli abbinamenti massimi nei grafi bipartiti e nei percorsi arcodisgiunti sono flussi massimi interi.

    <strong>La rete di riferimento in sintesi.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <td>capacità, <span class="arithmatex">\(s=1\)</span>, <span class="arithmatex">\(t=6\)</span></td>
    <td><span class="arithmatex">\(\vet{u}=(5,4,3,2,4,2,4,2,3)\)</span></td>
    </tr>
    <tr>
    <td>portata massima (unico)</td>
    <td><span class="arithmatex">\(\tilde{\vet{x}}=(3,4,3,0,4,0,4,1,3)\)</span>, <span class="arithmatex">\(\tilde{v}=7\)</span></td>
    </tr>
    <tr>
    <td>tagli minimi, capacità <span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(S=\{1,2\}\)</span>, <span class="arithmatex">\(\{1,2,3\}\)</span>, <span class="arithmatex">\(\{1,2,3,4,5\}\)</span></td>
    </tr>
    <tr>
    <td>Ford–Fulkerson (DFS) e potenziamenti <span class="arithmatex">\(5\)</span>, <span class="arithmatex">\(\delta=2,1,2,1,1\)</span></td>
    </tr>
    <tr>
    <td>Edmonds–Karp (BFS) e potenziamenti <span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(\delta=3,3,1\)</span></td>
    </tr>
    <tr>
    <td>tutte le capacità <span class="arithmatex">\(1\)</span> e percorsi ad arco disgiunto <span class="arithmatex">\(1,2,4,6\)</span> e <span class="arithmatex">\(1,3,5,6\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Flusso massimo](../../esercizi/maximum-flow.md)
