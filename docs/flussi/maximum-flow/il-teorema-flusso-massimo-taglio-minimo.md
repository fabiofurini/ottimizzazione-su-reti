---
title: "Il teorema flusso massimo-taglio minimo"
---

# 5.4 Il teorema flusso massimo-taglio minimo { #sez-sec-mf-theorem }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 5** · [:material-book-open-variant: Capitolo 5: Flusso massimo](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-maximum-flow.pdf) · [:material-pencil: Esercizi: Flusso massimo](../../esercizi/maximum-flow.md) · [:material-gesture-tap: App: Flusso massimo: Ford–Fulkerson ed Edmonds–Karp](../../laboratorio/flusso-massimo-ford-fulkerson-edmonds-karp.md)

</div>

<a id="box-12-mf-th-mfmc"></a>

!!! teorema "Teorema 5.8: flusso massimo-taglio minimo"

    Sia $\vet{x}$ un flusso ammissibile di valore $v$. Le seguenti affermazioni sono equivalenti:

    - **(a)** $\vet{x}$ è un flusso massimo;

    - **(b)** la rete residua $G(\vet{x})$ non ha cammini aumentanti;

    - **(c)** $v=u(S,N \setminus S)$ per qualche taglio $s$–$t$ $(S,N \setminus S)$.

    Inoltre, un flusso massimo esiste, e il valore massimo di un flusso è uguale alla capacità minima di un taglio $s$–$t$:

    $$
    \tilde{v}=\min \big\{\, u(S,N \setminus S) \;:\; S \subseteq N,~ s \in S,~ t \notin S \,\big\}.
    $$

??? dimostrazione "Dimostrazione"

    <em>(a) implica (b).</em> Un cammino aumentante darebbe, per il <span style="color:#1971c2">[Lemma 5.7](la-rete-residua.md#box-9-mf-lem-aug)</span>, un flusso ammissibile di valore $v+\delta>v$.

    <em>(b) implica (c).</em> Sia $S$ l'insieme dei nodi raggiungibili da $s$ in $G(\vet{x})$; allora $s \in S$ e, per (b), $t \notin S$.

    1. Se un arco $(i,j) \in \delta^+(S)$ avesse $x_{ij}<u_{ij}$, l'arco in avanti $(i,j)$ sarebbe in $G(\vet{x})$, e $j$ sarebbe raggiungibile: quindi $x_{ij}=u_{ij}$.

    2. Se un arco $(i,j) \in \delta^-(S)$ avesse $x_{ij}>0$, l'arco all'indietro $(j,i)$, con $j \in S$, sarebbe in $G(\vet{x})$, e $i$ sarebbe raggiungibile: quindi $x_{ij}=0$.

    3. Per il <span style="color:#1971c2">[Corollario 5.4](tagli.md#box-5-mf-cor-weak)</span>, $v=u(S,N \setminus S)$.

    <em>(c) implica (a).</em> Per il <span style="color:#1971c2">[Corollario 5.4](tagli.md#box-5-mf-cor-weak)</span>.

    <em>Esistenza e uguaglianza.</em> La regione ammissibile del modello $\mathrm{MF}$ è non vuota ($\vet{x}=\vet{0}$, $v=0$) e limitata ($0 \le x_{ij} \le u_{ij}$ e $|v| \le \sum_{(i,j) \in A} u_{ij}$), quindi il modello ha una soluzione ottima ([Capitolo 15 «La geometria della programmazione lineare»](https://fabiofurini.github.io/programmazione-lineare/metodi-avanzati/15-geometria/)). Per un flusso massimo, (a) implica (c): qualche taglio ha capacità $\tilde{v}$, e per il <span style="color:#1971c2">[Corollario 5.4](tagli.md#box-5-mf-cor-weak)</span> nessun taglio ha capacità minore. <span class="qed">□</span>

- La dimostrazione di (b) implica (c) è costruttiva: in un flusso massimo, i nodi raggiungibili da $s$ nella rete residua formano un taglio minimo.

- Un flusso e un taglio con $v=u(S,N \setminus S)$ si certificano a vicenda: il taglio dimostra che nessun flusso è migliore, e il flusso dimostra che nessun taglio è più piccolo.

<a id="box-13-mf-ex-maxflow"></a>

!!! esempio "Esempio 5.5: il flusso massimo della rete di riferimento"

    Sulla rete di riferimento dell'<span style="color:#1971c2">[Esempio 5.1](il-problema-del-flusso-massimo.md#box-2-mf-ex-ref)</span> il flusso

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>arco</th>
    <th><span class="arithmatex">\((1,2)\)</span></th>
    <th><span class="arithmatex">\((1,3)\)</span></th>
    <th><span class="arithmatex">\((2,4)\)</span></th>
    <th><span class="arithmatex">\((3,2)\)</span></th>
    <th><span class="arithmatex">\((3,5)\)</span></th>
    <th><span class="arithmatex">\((4,3)\)</span></th>
    <th><span class="arithmatex">\((4,6)\)</span></th>
    <th><span class="arithmatex">\((5,4)\)</span></th>
    <th><span class="arithmatex">\((5,6)\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\tilde{x}_{ij}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(u_{ij}\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    </table></div>

    è ammissibile, con valore $\tilde{x}_{12}+\tilde{x}_{13}=7$. Per $S=\{1,2\}$ gli archi in avanti $(1,3)$, $(2,4)$ sono saturi e l'arco all'indietro $(3,2)$ è vuoto, quindi

    $$
    u(S,N \setminus S)=u_{13}+u_{24}=4+3=7=v .
    $$

    Per il <span style="color:#1971c2">[Teorema 5.8](#box-12-mf-th-mfmc)</span>, $\tilde{\vet{x}}$ è un flusso massimo, $\tilde{v}=7$, e $(\{1,2\},\{3,4,5,6\})$ è un taglio minimo. In $G(\tilde{\vet{x}})$ i nodi raggiungibili da $1$ sono esattamente $1$ e $2$. Nella figura, $S$ è ombreggiato e gli archi in avanti del taglio sono verdi.

    ![Figura 4](../../img/maximum-flow/fig04.svg){ .fig loading=lazy  }

- <strong>Unicità.</strong> Per il <span style="color:#1971c2">[Corollario 5.4](tagli.md#box-5-mf-cor-weak)</span>, ogni flusso massimo satura gli archi in avanti e svuota gli archi all'indietro di ciascuno dei tre tagli minimi dell'<span style="color:#1971c2">[Esempio 5.2](tagli.md#box-6-mf-ex-cuts)</span>:

    $$
    \begin{aligned}
    S=\{1,2\}: &\quad x_{13}=4,~ x_{24}=3,~ x_{32}=0,\\
    S=\{1,2,3\}: &\quad x_{35}=4,~ x_{43}=0,\\
    S=\{1,2,3,4,5\}: &\quad x_{46}=4,~ x_{56}=3.
    \end{aligned}
    $$

    La conservazione nei nodi $1$ e $4$ dà allora $x_{12}=7-x_{13}=3$ e $x_{54}=x_{43}+x_{46}-x_{24}=1$: $\tilde{\vet{x}}$ è l'unico flusso massimo, mentre il taglio minimo non è unico.

!!! attenzione "Archi saturi e tagli"

    Gli archi saturi di un flusso massimo in generale non formano un taglio. Con $\tilde{\vet{x}}$ gli archi saturi sono $(1,3)$, $(2,4)$, $(3,5)$, $(4,6)$, $(5,6)$, con capacità totale $18$. Un taglio minimo si legge dai nodi raggiungibili da $s$ nella rete residua.

!!! chiave ""

    Un flusso è massimo se e solo se la sua rete residua non ha cammini aumentanti, se e solo se il suo valore è uguale alla capacità di un taglio. Il valore massimo è uguale alla capacità minima di un taglio, e i nodi raggiungibili da $s$ nella rete residua di un flusso massimo formano un taglio minimo.

---

**Avanti:** [5.5 L'algoritmo di Ford–Fulkerson](l-algoritmo-di-fordfulkerson.md)
