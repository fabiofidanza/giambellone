"use strict";

const giambellone = (() => {

	let options = {
		thickness: 0.2,
		backgroundColor: "#ddd",
		foregroundColor: "#EC008C",
		valueAttribute: 'data--giambellone-value',
		animate: true,
		animateDuration: 1000
	} 

	function _init(customOptions = {}) {

		options = {	...options,
					...customOptions};
	
	}

	function _createProgressGauge(thickness, bgColor, fgColor) {

		const svgns = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(svgns,'svg');

		const width = 200;
		const strokeWidth = width * thickness;
		const height = width;
		const viewBoxTop = -strokeWidth / 2;
		const viewBoxBottom = width+strokeWidth;

		svg.setAttribute('width',width);
		svg.setAttribute('height',height);
		svg.setAttribute('viewBox',`${viewBoxTop} ${viewBoxTop} ${viewBoxBottom} ${viewBoxBottom}`);
		svg.setAttribute('style','transform: rotate(-90deg)');
		
		const underCircle = document.createElementNS(svgns,'circle');

		underCircle.setAttribute('r',width / 2);
		underCircle.setAttribute('cx',width / 2);
		underCircle.setAttribute('cy',width / 2);
		underCircle.setAttribute('fill','transparent');
		underCircle.setAttribute('stroke',bgColor);
		underCircle.setAttribute('stroke-width',`${strokeWidth}px`);
		underCircle.setAttribute('class','under');
		
		svg.appendChild(underCircle);
	
		const overCircle = document.createElementNS(svgns,'circle');

		overCircle.setAttribute('r',width / 2);
		overCircle.setAttribute('cx',width / 2);
		overCircle.setAttribute('cy',width / 2);
		overCircle.setAttribute('fill','transparent');
		overCircle.setAttribute('stroke',fgColor);
		overCircle.setAttribute('stroke-width',`${strokeWidth}px`);
		overCircle.setAttribute('stroke-linecap',`butt`);
		overCircle.setAttribute('class','over');
		
		svg.appendChild(overCircle);

		return svg;

	}

	function _setProgress(svg, fraction = 0) {

		const under = svg.querySelector('.under');
		const over = svg.querySelector('.over');

		const lineLength = under.getTotalLength();
		const offset = lineLength * (1-fraction);
	
		over.setAttribute('stroke-dasharray',`${lineLength}px`);
		over.setAttribute('stroke-dashoffset',`${offset}px`);
		
	}

	function _animateProgress(gauge,progress) {

		let startTime = performance.now();

		function step() {

			const currentProgress = Math.min((performance.now() - startTime) / options.animateDuration, 1) * progress;

			if(currentProgress < 1) {
				_setProgress(gauge,currentProgress);
				requestAnimationFrame(step);
			}

		}

		requestAnimationFrame(step);

	}

	function _renderGauge(element, customOptions = {}) {

		const gaugeOptions = {
			...options,
			...customOptions
		};

		const gauge = _createProgressGauge(
			gaugeOptions.thickness,
			gaugeOptions.backgroundColor,
			gaugeOptions.foregroundColor);
			                
		let progress;

		if(element.hasAttribute(options.valueAttribute)) {
			progress = element.getAttribute(options.valueAttribute)
		} else {
			progress = parseFloat(element.innerText);
		}
		 
		element.appendChild(gauge);

		if(options.animate) {
			_animateProgress(gauge,progress);		
		} else {
			_setProgress(gauge,progress);
		}

	}

	function _renderGauges(elements, customOptions = {}) {

		const gaugeOptions = {
			...options,
			...customOptions
		};

		let gaugeElements;

		if(typeof elements === "string") {
			gaugeElements = document.querySelectorAll(elements);
		} else if(elements instanceof Element) {
			gaugeElements = [elements]; 
		} else {
			gaugeElements = elements;
		}

		gaugeElements.forEach( (element) => {
			_renderGauge(element,gaugeOptions);
		})

	}

	return {
		init: _init,
		renderGauges: _renderGauges
	}

})();

window.addEventListener('load',() => {
	giambellone.init();
	giambellone.renderGauges('.gauge',
{
	thickness: 0.5
});
}
);

