'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';

export default function CropHealthMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Create grid data (10x10 cells representing field zones)
    const gridSize = 8;
    const data: { x: number; y: number; value: number }[] = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        data.push({
          x: i,
          y: j,
          value: 0.3 + Math.random() * 0.7, // Health score 0.3-1.0
        });
      }
    }

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const cellSize = width / gridSize;
    const height = cellSize * gridSize;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Color scale (red to yellow to green)
    const colorScale = d3
      .scaleSequential()
      .domain([0.3, 1])
      .interpolator(d3.interpolateRdYlGn);

    // Create heatmap cells
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => d.x * cellSize)
      .attr('y', (d) => d.y * cellSize)
      .attr('width', cellSize - 2)
      .attr('height', cellSize - 2)
      .attr('fill', (d) => colorScale(d.value))
      .attr('rx', 3)
      .style('opacity', 0)
      .transition()
      .duration(500)
      .delay((d, i) => i * 10)
      .style('opacity', 0.9);

    // Add interactive tooltips
    svg
      .selectAll('rect')
      .on('mouseover', function (event, d: any) {
        d3.select(this).style('opacity', 1).attr('stroke', '#000').attr('stroke-width', 2);
      })
      .on('mouseout', function () {
        d3.select(this).style('opacity', 0.9).attr('stroke', 'none');
      });

    // Add legend
    const legendWidth = 200;
    const legendHeight = 10;
    const legendMargin = { top: height + 30, left: width / 2 - legendWidth / 2 };

    const legendScale = d3
      .scaleLinear()
      .domain([0.3, 1])
      .range([0, legendWidth]);

    const legendAxis = d3
      .axisBottom(legendScale)
      .ticks(5)
      .tickFormat((d) => `${(Number(d) * 100).toFixed(0)}%`);

    // Create gradient for legend
    const defs = svg.append('defs');
    const linearGradient = defs
      .append('linearGradient')
      .attr('id', 'health-gradient');

    linearGradient
      .selectAll('stop')
      .data([
        { offset: '0%', color: colorScale(0.3) },
        { offset: '50%', color: colorScale(0.65) },
        { offset: '100%', color: colorScale(1) },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);

    // Draw legend rectangle
    svg
      .append('rect')
      .attr('x', legendMargin.left)
      .attr('y', legendMargin.top)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#health-gradient)');

    // Add legend axis
    svg
      .append('g')
      .attr('transform', `translate(${legendMargin.left},${legendMargin.top + legendHeight})`)
      .call(legendAxis)
      .selectAll('text')
      .style('font-size', '10px');

    // Legend label
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', legendMargin.top - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text('Crop Health Score');
  }, []);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">Crop Health Heatmap</h3>
      <p className="text-sm text-gray-500">Field zone health distribution</p>
      <div className="mt-4">
        <svg ref={svgRef} className="w-full" />
      </div>
    </Card>
  );
}