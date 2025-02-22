// Crear un gráfico de red interactivo con D3.js
const width = 900, height = 600;

const nodes = [
    { id: "Dificultades de la Gestión Financiera", group: 0 },
    { id: "Retraso en la llegada de fondos", group: 1 },
    { id: "Fondos insuficientes", group: 2 },
    { id: "Restricciones en el uso de los fondos", group: 3 },
    { id: "Falta de personal o formación financiera", group: 4 },
    { id: "Burocracia y gestión ineficiente", group: 5 },
    { id: "Infraestructura inadecuada", group: 6 },
    { id: "Falta de Transparencia y Mal Uso de Recursos", group: 7 },
    { id: "Factores Políticos y su Influencia", group: 8 },
    { id: "Relación con el Distrito o Administración", group: 9 }
];

const links = [
    { source: "Dificultades de la Gestión Financiera", target: "Retraso en la llegada de fondos" },
    { source: "Dificultades de la Gestión Financiera", target: "Fondos insuficientes" },
    { source: "Dificultades de la Gestión Financiera", target: "Restricciones en el uso de los fondos" },
    { source: "Dificultades de la Gestión Financiera", target: "Falta de personal o formación financiera" },
    { source: "Dificultades de la Gestión Financiera", target: "Burocracia y gestión ineficiente" },
    { source: "Dificultades de la Gestión Financiera", target: "Infraestructura inadecuada" },
    { source: "Dificultades de la Gestión Financiera", target: "Falta de Transparencia y Mal Uso de Recursos" },
    { source: "Dificultades de la Gestión Financiera", target: "Factores Políticos y su Influencia" },
    { source: "Dificultades de la Gestión Financiera", target: "Relación con el Distrito o Administración" },
    
    { source: "Retraso en la llegada de fondos", target: "Fondos insuficientes" },
    { source: "Retraso en la llegada de fondos", target: "Burocracia y gestión ineficiente" },
    { source: "Fondos insuficientes", target: "Infraestructura inadecuada" },
    { source: "Restricciones en el uso de los fondos", target: "Burocracia y gestión ineficiente" },
    { source: "Burocracia y gestión ineficiente", target: "Falta de personal o formación financiera" },
    { source: "Falta de personal o formación financiera", target: "Infraestructura inadecuada" },
    { source: "Falta de Transparencia y Mal Uso de Recursos", target: "Fondos insuficientes" },
    { source: "Factores Políticos y su Influencia", target: "Retraso en la llegada de fondos" },
    { source: "Relación con el Distrito o Administración", target: "Burocracia y gestión ineficiente" }
];

const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 2);

const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 10)
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

const label = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("dy", -15)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text(d => d.id);

simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);

    label.attr("x", d => d.x)
         .attr("y", d => d.y);
});

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
