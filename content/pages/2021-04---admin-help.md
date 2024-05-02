---
title: Hilfe für die Erstellung von Artikeln
subTitle: Spickzettel
slug: admin-help
path: '/admin-help/'
description: Alles Wissenswerte zum Erstellen neuer Artikel
date: 2021-04-23T07:33:21.000+00:00
status: publish
---

## Localhost Admin

Die Applikation muss lokal in **VS Code** gestartet werden mit

```bash
yarn work
```

Danach startet die Applikation und ist hier erreichbar:

[➡ Hier geht's zur Admin-Seite](http://localhost:3334)

## Markdown

### Einfache Markdown-Auszeichnungen

Auszeichnung Fett: **fetter text**

```md
**fetter text**
```

Auszeichnung kursiv wird nicht unterstützt

Interner Link: [Link-Text](/admin-help/)

```md
[Link-Text](/linkziel/)
```

Externer Link (genauso): [Link-Text](https://www.google.de)

```md
[Link-Text](https://www.google.de)
```

Externer Link mit Do-Follow Policy: [Link-Text](https://www.google.de 'follow')

```md
[Link-Text](https://www.google.de 'follow')
```

### Absätze

Einfache Zeilenschaltung wird ignoriert. Absätze erstellt man immer mit doppelter Zeilenschaltung. D.h. ein Absatz darf gerne über mehrere Zeilen gehen.

    Absatz 1

    Absatz 2

### Überschriften

bitte mit H2 beginnen - möglichst keine H1 verwenden:

```md
## Überschrift 2

### Überschrift 3

#### Überschrift 4
```

### Bilder

Bilder werden ähnlich ausgezeichnet, wie Links. Am einfachsten geht es aber, wenn Du den Editor im CMS verwendest.

    ![Alt-Text](/img/bild.jpg 'Caption unter dem Bild')

Bilder werden per Default rechts ausgerückt neben dem Text dargestellt. Willst Du ein Bild über die volle Textbreite behen lassen, kann man dem Alt Text die Style-Variante `large` anhängen.

    ![Alt-Text | large](/img/bild.jpg 'Caption unter dem Bild')

### Kleine Bilder

Hinter dem Bild title `| small` einfügen

### Große Bilder

Hinter dem Bild title `| large` einfügen

### Zitate und Anmerkungen

> Dies ist ein Zitatbeispiel. Es wird als Einschub wahrgenommen und enthält als einziges noch kursiven Text.

Jede neue Zeile muss wieder mit `>` eingeleitet werden.

```md
> Dies ist ein Zitatbeispiel. Es wird als Einschub wahrgenommen und enthält als einziges noch kursiven Text.
```

### Listen und Aufzählungen

Listen werden mit `-` oder `1.` gebildet. Bitte nach möglichkeit immer nur für kurze Statements verwenden, obwohl auch listen mit mehreren Absätzen unterstützt werden.

```md
- eine
- ungeordnete
- liste

1. eine
2. geordnete
3. Liste
```

## Shortcodes

Es gibt zahlreiche Shortcodes, die es ermöglichn, komplexere Komponenten auf der Seite anzuzeigen. Alle Shortcodes folgen einem ähnlichen Aufbau:

```jsx
<ShortCode parameter="wert" />
```

> **Wichtig**: das `/` am Ende nicht vergessen. Shortcodes müssen syntaktisch immer korrekt sein, sonst funktioniert die Seite möglicherweise nicht.

### Videos

Wir unterstützen derzeit **Vimeo** und **YouTube**. Beide werden in ähnlicher Form angelegt.

```jsx
<YouTube id="6dBt3mJtgJc" />
<Vimeo id="15886860" />
```

<YouTube id="6dBt3mJtgJc" />

Es ist auch möglich, mit `caption` eine Beschriftung unter dem Video einzublenden.

    <Vimeo id="15886860" caption="© A.M. Reis" />

<Vimeo id="15886860" caption="© A.M. Reis" />

### Galerien

Galerien werden nach wie vor bei Google gehostet und müssend aher vorher hochgeladen werden. Der vergebene Name wird benötigt. Dann kann man sie so benutzen:

    <Gallery name="Vergebener Name" />

### Playlisten

Aktuell werden Playlisten von Sptify und Apple unterstützt. Man kann auch beide gleichzeitig angeben. Dann werde sie nebeneinander dargestellt. Anhand der Beispiele siest Du, welche Teile des Embed-Codes zu verwenden sind.

```jsx
<Playlist spotify="2gG0GNALKrYwbNhkxx8Q3R" />

<Playlist
  itunes="let-england-shake-this-is-not-america/pl.u-krLLtv3dBdD"
/>

<Playlist
  spotify="2gG0GNALKrYwbNhkxx8Q3R"
  itunes="let-england-shake-this-is-not-america/pl.u-krLLtv3dBdD"
/>
```

<Playlist
  spotify="2gG0GNALKrYwbNhkxx8Q3R"
  itunes="let-england-shake-this-is-not-america/pl.u-krLLtv3dBdD"
/>

**YouTube iframe immer so wie hier einbinden**

<iframe
  style="width: 100%; aspect-ratio: 16 / 9"
  src="https://www.youtube.com/embed/videoseries?list=PLGfxe66d_oUJYtj4Olaj2LyAl0mpJpHxA"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>

### Bedingter Trennstrich

`&shy;` ­

### Fußnoten

Im Text `[^4]`

Unten `- [^4]: Hier kommt der Text hin`

### Festivalliste Banner

<FestivalList />

### PDF hochladen

In Ordner "public" schieben in VSC (im alten System hieß der Ordner noch "static")
