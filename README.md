Poor people's donut gauge renderer.

Renders a donut based on a 0—1 value,
which can be, in this order:

- the value of the data--giambellone-value of the element
- the content of the element (innerText is used, so any internal structure would work), as a string representing the value

```
giambellone.renderGauges('.gauge',
	{
		thickness: 0.2,
		animate: true,
		foregroundColor: "#EC008C",
		backgroundColor: "#eee",
		animateDuration: 2000,
		animateEasingExponent: 2
	});
```

Pass a selector, an Element or an Array of Element(s).
Pass your options or let it use decent defaults.

The donut, rendered as an SVG, is appended to the element.

Default options, all overridable:

```	
thickness: 0.2,
backgroundColor: "#ddd",
foregroundColor: "#222",
valueAttribute: 'data--giambellone-value',
animate: false,
animateDuration: 1000,
animateEasingExponent: 1
```

The `animateEasingExponent` works as exponent applied to the 0—1 range.
Values greater than 1 mean slow start, increasing speed, values lower than 1 mean fast start, decreasing speed.
	

# License

This software is musicware.
If you like it, use it, fork it, or anything else,
please listen to Fidanza Jazz Combo music,
and if you're very generous, subscribe in your favourite
music streaming service.

Peace!