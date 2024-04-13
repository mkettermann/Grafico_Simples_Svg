const pieChart = (options) => {
	let { width, height, cx, cy, r, lx, ly, data } = options;
	let svg = "http://www.w3.org/2000/svg";

	let chart = document.createElementNS(svg, "svg");
	chart.setAttribute("viewBox", `0 0 ${width} ${height}`);

	let labels = Object.keys(data);
	let values = Object.values(data);
	let total = values.reduce((x, y) => x + y);
	let circle = document.createElementNS(svg, "g");
	let legenda = document.createElementNS(svg, "g");
	circle.setAttribute("style", `outline: 5px solid black;	border-radius: 50%; outline-offset: -4px;`);

	let angles = [0];
	values.forEach((v, i) => angles.push(angles[i] + v / total * 2 * Math.PI));
	values.forEach((v, i) => {
		let x1 = cx + r * Math.sin(angles[i]);
		let y1 = cy - r * Math.cos(angles[i]);
		let x2 = cx + r * Math.sin(angles[i + 1]);
		let y2 = cy - r * Math.cos(angles[i + 1]);
		let big = (angles[i + 1] - angles[i] > Math.PI) ? 1 : 0;
		let path = `M${cx},${cy}` +
			`L${x1},${y1}` +
			`A${r},${r} 0 ${big} 1` +
			`${x2},${y2}` +
			`L${cx},${cy}Z`;
		let color = `hsl(${(i * 40) % 360},${90 - 3 * i}%,${50 + 2 * i}%)`;
		let slice = document.createElementNS(svg, "path");
		slice.setAttribute("d", path);
		slice.setAttribute("fill", color);
		slice.setAttribute("stroke", "white");
		slice.setAttribute("stroke-width", "1px");
		circle.append(slice);

		let refCor = document.createElementNS(svg, "rect");
		refCor.setAttribute("x", lx);
		refCor.setAttribute("y", ly + 30 * i);
		refCor.setAttribute("width", 20);
		refCor.setAttribute("height", 20);
		refCor.setAttribute("fill", color);
		refCor.setAttribute("stroke", "black");
		refCor.setAttribute("stroke-width", "1");
		legenda.append(refCor);

		let texto = document.createElementNS(svg, "text");
		texto.setAttribute("x", lx + 30);
		texto.setAttribute("y", ly + 30 * i + 16);
		texto.append(`${Math.round(v / total * 100)}% - ${v} ${labels[i]}`);
		legenda.append(texto);

	});

	chart.append(circle);
	chart.append(legenda);
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