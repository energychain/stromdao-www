---yaml
title: Abrechnung Zählersta ndsgang mit dem STROMDAO Business Object
category: news
date: 2017-06-16 09:16:49
tags:
  - zählerstandsgang
  - smartmeter
  - blockchain
  - businessobject
  - abrechnung
---
Technisch handelt es sich bei der Zählerstandsgangmessung um die kontinuierliche Erfassung von tatsächlichen Zählerständen, aus denen durch einfache Umrechnung eine zeitnahe Bilanzierung und Abrechnung von Strommengen erfolgen kann. Regulatorisch ist die Zählerstandsgangsmessung in der Stromnetzzugangsverordnung (StromNZV) geregelt.

## Ablauf
[StromDAO-BO-Commissioning](https://github.com/energychain/StromDAO-BusinessObject/blob/master/smart_contracts/StromDAO-BO-SC-Commissioning.sol)

### Ablesung (kontinuierlich)
_SmartContract: MPRset_

Die Messpunkte schreiben fortlaufend ihre Messwerte in den für die Messdienstleistung bereitgestellten Vertrag. Zum Zeitpunkt einer Abrechnung wird ein Snapshot erzeugt über den letzten gültigen Zählerstand. 

Fehlende Werte durch eine gestörte Übertragung müssen nicht berücksichtig werden, da der [Messdienstleistungsvertrag](http://127.0.0.1:8180/#/contracts/0x0000000000000000000000000000000000000008) regelt, welche Aktualität notwendig ist. In der Praxis können kurzzeitige Ausfälle der Kommunikation so kompensiert werden. 

**cli 1337 --snapshota**
```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

```

Starting as 1337 0x9eB63DF62a2286aD2547E4c48157198EdfC5d470
- MPSet: 0xd67F88A53B89db90665f5696EF29cc84D56a2c3A
- Stromkonto: 0x90d357D6B3Bd9F0C99f93Ab171FF6aD41BBC5e87
- Clearing: 0x1820eED77540f2DF6641a9F6a513C33b2E27C2CF

=>Store Reading
Snapshot: 0x2AE937deE61A18Effb0E46978c27c7AA04280491
...
Snapshot: 0x45eDd1fd0d012D38632AA4457cE90B5B45c21382
```

### Differenzbildung
_SmartContract: MPRdecorate.  _

Aus zwei _MPRset_ Verträgen wird eine Differenzablesung ermittelt. Dabei wird der jeweils niedrigere Zählerstand vom höheren Zählerstand subtrahiert und anschließend als neuer Zählerstand gepeischert. Nach Ausübung dieses Vertrages entsteht ein neues _MPRset_. 

Für nicht saldierende Zähler kann die Differenzbildung mittels _MPRdecorate_ entfallen.

**cli 1337 --delta --address 0x2AE937deE61A18Effb0E46978c27c7AA04280491 --bravo 0x45eDd1fd0d012D38632AA4457cE90B5B45c21382**
```

...
=> Delta
Decorator: 0x22d37456F26c8a6761D1b0653390Fa2711185cdB
...
```


### Ermittlung: Kosten
_SmartContract: MPRdecorate_

Bei den Kosten wird unterschieden zwischen Fixkosten, welche je Zeiteinheit anfallen, und variablen Kosten, welche nach Energiemenge berechnet werden. 

**cli 1337 --comenergy 5**
```cli

...
=>Delta
Decorator: 0x22d37456F26c8a6761D1b0653390Fa2711185cdB

Settlement: 0xcDe03Dfcd3D515b043d926Ad615f7e3253b4A13e
...
```

### Settlement
_SmartContract: Settlement_

Nach dem Abschluss der Kostenberechnung für mittels _MPRdecorate_ wird eine Verbuchung mittels _Settlement_ vorbereitet.

**cli 1337 --settle 0xcDe03Dfcd3D515b043d926Ad615f7e3253b4A13e --address 0x22d37456F26c8a6761D1b0653390Fa2711185cdB**
```

...
Settlement: 0xcDe03Dfcd3D515b043d926Ad615f7e3253b4A13e

=>Delta
Decorator: 0x22d37456F26c8a6761D1b0653390Fa2711185cdB
...
```


### Buchungsvorlauf
_SmartContract: TXCache_

Ergebnis des _Settlement_ ist eine Liste von Transaktionen (Buchungen), die im Zuge des _Clearing_ auf einen Stromkonto-Vertrag angewendet werden können. 

Das _Clearing_ kann zu einem beliebigen Zeitpunkt nach dem _Settlement_ erfolgen.

### Clearing
_SmartContract: Clearing_

**cli 1337 --clearing 0x0d14AB3d3aCD0C925C41D31e061b83B5B55A64B5**
