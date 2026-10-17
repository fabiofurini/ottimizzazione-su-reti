---
title: "Casi speciali"
---

# 4.8 Casi speciali { #sez-sec-nf-special }

<div class="info-capitolo" markdown>

**Parte 3 · Flussi · Capitolo 4** · [:material-book-open-variant: Capitolo 4: Modelli di flusso](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-flussi.pdf) · [:material-presentation: Slide](../../pdf/slide-network-flow-models.pdf) · [:material-pencil: Esercizi: Modelli di flusso](../../esercizi/network-flow-models.md)

</div>

- Diversi problemi classici sono modelli $\mathrm{MCF}$ con dati speciali; tutti i limiti inferiori sono nulli.

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>il modello <span class="arithmatex">\(\mathrm{MCF}\)</span></th>
</tr>
<tr>
<td><strong>Cammino<br> minimo</strong></td>
<td><span class="arithmatex">\(b_s=1\)</span>, <span class="arithmatex">\(b_t=-1\)</span>, <span class="arithmatex">\(b_i=0\)</span> altrimenti; <span class="arithmatex">\(u_{ij}=+\infty\)</span>, <span class="arithmatex">\(c_{ij}\)</span> la lunghezza dell'arco: l'unità di flusso viaggia da <span class="arithmatex">\(s\)</span> a <span class="arithmatex">\(t\)</span>.</td>
</tr>
<tr>
<td><strong>Flusso massimo</strong></td>
<td><span class="arithmatex">\(b_i=0\)</span> per ogni nodo e <span class="arithmatex">\(c_{ij}=0\)</span> per ogni arco, più l'arco <span class="arithmatex">\((t,s)\)</span> con <span class="arithmatex">\(c_{ts}=-1\)</span> e <span class="arithmatex">\(u_{ts}=+\infty\)</span>: il flusso su <span class="arithmatex">\((t,s)\)</span> è il valore inviato da <span class="arithmatex">\(s\)</span> a <span class="arithmatex">\(t\)</span>.</td>
</tr>
<tr>
<td><strong>Trasporto</strong></td>
<td><span class="arithmatex">\(N=P \cup D\)</span> con archi dalle origini <span class="arithmatex">\(P\)</span> alle destinazioni <span class="arithmatex">\(D\)</span>; <span class="arithmatex">\(b_i\)</span> l'offerta di <span class="arithmatex">\(i \in P\)</span>, <span class="arithmatex">\(-b_j\)</span> la domanda di <span class="arithmatex">\(j \in D\)</span>, <span class="arithmatex">\(u_{ij}=+\infty\)</span>.</td>
</tr>
<tr>
<td><strong>Assegnamento</strong></td>
<td>un modello di trasporto con <span class="arithmatex">\(|P|=|D|\)</span>, <span class="arithmatex">\(b_i=1\)</span> per <span class="arithmatex">\(i \in P\)</span> e <span class="arithmatex">\(b_j=-1\)</span> per <span class="arithmatex">\(j \in D\)</span>.</td>
</tr>
</table></div>

- Nei quattro modelli i bilanci e i limiti sono interi, quindi i vertici interi del <span style="color:#1971c2">[Teorema 4.15](totale-unimodularita-e-integralita.md#box-21-nf-th-vertices)</span> sono cammini, flussi interi e assegnamenti.

!!! chiave ""

    Cammino minimo, flusso massimo, trasporto e assegnamento sono modelli di flusso di costo minimo con bilanci, capacità e costi speciali.

---

**Avanti:** [4.9 Un'istanza di trasbordo](un-istanza-di-trasbordo.md)
