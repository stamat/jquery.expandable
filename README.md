# jquery.expandable

Simple jQuery plugin that creates expandable / collapsable content, fully responsive of course.

Just target an element `$('.your-expandable-element').expandable();` and you are set out of the box.

Add some styles to it and ta f**king da!

Never again will you have to write this trivial code. (For the duration of my career, till now, about 12 years, I've been writing this code every time from point zero... Retarded? My mom always said I was special...)

## Options

* **height** (int) [default: 200]               - set the height of the expandable element, if targeted content height is larger everything below this value will be hidden and "show more" button will appear. This code hooks onto window resize event so it will be responsively calculated.
* **offset** (int) [default: 0]                 - if you don't want expandable functionality on 1px of content exceeding the set *height* you can give it a bit more breathing space via this value.
* **expand_responsive** (int) [default: 0]      - if you want to remove the expandable functionality on mobile, you can set this field with the width threshold for mobile, for instance: 960
* **no_less** (bool) [default: false]           - if you set this to true, after clicking "show more", expand button will disappear preventing the user to collapse the content back. This will also unbind the element from responsive events.
* **animation_duration** (int) [default: 250]   - expandable content has automatically set transition of 250ms for the fanciness sake. If you override this transition please be sure to update this field accordingly for the code to function as intended.
* **more** (str) [default: "Show more"]         - show more message
* **less** (str) [default: "Show less"]         - show less message

Options are passed as a JSON object, the same way you would do with other plugins.

#### Example:

```
    $('.your-expandable-element').expandable({
        height: 300,
        offset: 10,
        expand_responsive: 960,
        no_less: true,
        more: "MOAR!"
    });
```

THE END.
