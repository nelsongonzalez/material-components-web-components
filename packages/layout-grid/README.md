# Grid

> Simple component that implements Material Design grid

```html
<mwc-grid>
    <mwc-grid-cell desktop="6">
        <p>some content</p>
    </mwc-grid-cell>
    <mwc-grid-cell desktop="6">
        <mwc-grid-inner>
            <mwc-grid-cell span="8">
                <p>some other content</p>
            </mwc-grid-cell>
        </mwc-grid-inner>
    </mwc-grid-cell>
</mwc-grid>
```

## Components

### mwc-grid
|Property|Description|Value|
|:-------|:----------|:----|
|align| alignment of container | left, right |

### mwc-grid-inner
This element is append before content slot of grid

> To nest layout grid, add **mwc-grid-inner** to wrap around nested **mwc-grid-cell** within an existing **mwc-grid-cell**.
*However, the Material Design guidelines do not recommend having a deeply nested grid as it might mean an over complicated UX.*

### mwc-grid-element
|Property|Description|Value|
|:-------|:----------|:----|
|span|grid span|1-12 (default: 12)|
|mobile|grid span @mobile|1-4|
|tablet|grid span @tablet|1-8|
|desktop|grid span @desktop|1-12|
|order|order of cell|number|
|align|alignment of cell|top, middle, bottom|


see [material.io](https://material.io/develop/web/components/layout-grid/)