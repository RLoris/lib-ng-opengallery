# Opengallery

Opengallery is an Angular library component for efficient gallery rendering and interactions (images & videos). The gallery layout is responsive for all devices and loads the content only if it's in the viewport. A media viewer is shipped and included with this library. You can configure the component the way you want.

# Demo

Try it out here: [DEMO](https://rloris.github.io/lib-ng-opengallery/) or clone this [repo](https://github.com/RLoris/lib-ng-opengallery) and run `ng serve` for a full demo of opengallery. Built with angular version 9.

# Features

* Fast & efficient gallery rendering
* Loads content when they enter the viewport
* Supports video/image mixed in the gallery
* Play/Pause the video when the enter/exit the viewport (some browser block autoplay)
* Different layouts to choose from and customise the way you want it (simple, catalog, carousel, masonry)
* Include a media viewer modal to click and view the media (diaporama support, keystroke support)
* Automatically hides media when they cannot be loaded

# How to use

  First install the package with the command `npm i ng-opengallery`

  Then, in your module.ts, import the library module

```
import { NgOpengalleryModule } from 'ng-opengallery';
```

  And add it to your imports modules, then you can use it in any component.html

```
<ng-opengallery
    [datasource]='this.data'
    [config]='this.config'
    (change)='onChange($event)'
    (error)='onError($event)'
    (selection)='onSelection($event)'
    (open)='onOpen($event)'>
</ng-opengallery>
```

If you want a full code demo, check out the repository on github [here](https://github.com/RLoris/lib-ng-opengallery)

## Inputs
| Property | Type | Note |
| -------- | ---- | ---- |
| [datasource] | Array(Media) | Media datasource with data |
| [config] | Config | Configuration of the gallery (prefMediaHeight,spacing,layout,viewerEnabled,diaporamaDuration) |

## Outputs
| Event | Type | Note |
| -------- | ---- | ---- |
| (change) | Media | Emits the current media when the diaporama changes automatically or by the user (carousel,media viewer) |
| (error) | Media | Emits the media that caused an error (could not be loaded) |
| (selection) | Media | Emits the media that was selected by the user |
| (open) | boolean | Emits a boolean when the media viewer is opened or closed |

# To-Do / Improvements

-   Add Squared layout
-   Add animations support
-   Add Iframe support

# NPM

  This package is on `npm` https://www.npmjs.com/package/ng-opengallery

# License

  This package is under the MIT license
