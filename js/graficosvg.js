const pieChart = (options) => {
	let { width, height, cx, cy, r, lx, ly, data } = options;
	let svg = "http://www.w3.org/2000/svg";

	let chart = document.createElementNS(svg, "svg");
	chart.setAttribute("width", width);
	chart.setAttribute("height", height);
	chart.setAttribute("viewBox", `0 0 ${width} ${height}`);
	chart.setAttribute("font-family", "sans-serif");
	chart.setAttribute("font-size", "18");

	let labels = Object.keys(data);
	let values = Object.values(data);
	let total = values.reduce((x, y) => x + y);

	let angles = [0];
	values.forEach((x, i) => angles.push(angles[i] + x / total * 2 * Math.PI));
	values.forEach((values, i) => {
		let x1 = cx + r * Math.sin(angles[i]);
		let y1 = cy - r * Math.cos(angles[i]);
		let x2 = cx + r * Math.sin(angles[i + 1]);
		let y2 = cy - r * Math.cos(angles[i + 1]);
		let big = (angles[i + 1] - angles[i] > Math.PI) ? 1 : 0;
		let path = `M${cx},${cy}L${x1},${y1}A${r},${r} 0 ${big} 1${x2},${y2}Z`;
		let color =
	});


	return chart;
}

document.querySelector("#chart").append(pieChart({
	width: 640, height: 400,
	cx: 200, cy: 200, r: 180,
	lx: 400, ly: 10,
	data: {
		"Comercial": 71.5,
		"Portaria": 45.4,
		"Armazém": 40.4,
		"Administração": 25.5,
		"Gerenciador": 22.1,
	}
}));