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
	
