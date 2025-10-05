'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';

export default function YieldPredictionChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Generate historical and predicted data
    const historicalData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2025, i, 1),
      actual: 45 + Math.random() * 20 + i * 1.5,
      predicted: null as number | null,
    }));

    const predictedData = Array.from({ length: 6 }, (_, i) => ({
      month: new Date(2026, i, 1),
      actual: null as number | null,
      predicted: 63 + Math.random() * 15 + i * 1.8,
    }));

    const data = [...historicalData, ...predictedData];

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain([data[0].month, data[data.length - 1].month])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.actual || 0, d.predicted || 0)) as number,
      ])
      .nice()
      .range([height, 0]);

    // Actual line
    const actualLine = d3
      .line<typeof data[0]>()
      .defined((d) => d.actual !== null)
      .x((d) => x(d.month))
      .y((d) => y(d.actual as number))
      .curve(d3.curveMonotoneX);

    // Predicted line
    const predictedLine = d3
      .line<typeof data[0]>()
      .defined((d) => d.predicted !== null)
      .x((d) => x(d.month))
      .y((d) => y(d.predicted as number))
      .curve(d3.curveMonotoneX);

    // Add actual line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2.5)
      .attr('d', actualLine);

    // Add predicted line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0ea5e9')
      .attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '5,5')
      .attr('d', predictedLine);

    // Add axes
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6))
      .selectAll('text')
      .style('font-size', '12px');

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(6))
      .selectAll('text')
      .style('font-size', '12px');

    // Add legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 150}, 0)`);

    legend
      .append('line')
      .attr('x1', 0)
      .attr('x2', 30)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 2.5);

    legend
      .append('text')
      .attr('x', 40)
      .attr('y', 5)
      .text('Actual')
      .style('font-size', '12px')
      .attr('fill', '#374151');

    legend
      .append('line')
      .attr('x1', 0)
      .attr('x2', 30)
      .attr('y1', 20)
      .attr('y2', 20)
      .attr('stroke', '#0ea5e9')
      .attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '5,5');

    legend
      .append('text')
      .attr('x', 40)
      .attr('y', 25)
      .text('Predicted')
      .style('font-size', '12px')
      .attr('fill', '#374151');

    // Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6b7280')
      .text('Yield (tons)');
  }, []);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900">
        Yield Prediction Analysis
      </h3>
      <p className="text-sm text-gray-500">
        Historical data and AI-powered predictions
      </p>
      <div className="mt-4">
        <svg ref={svgRef} className="w-full" />
      </div>
    </Card>
  );
}