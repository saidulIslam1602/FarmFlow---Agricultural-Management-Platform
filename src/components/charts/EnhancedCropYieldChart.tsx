'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Card from '@/components/ui/Card';
import { Download, ZoomIn, RotateCcw } from 'lucide-react';
import { useExportData } from '@/hooks/useExportData';

interface CropYieldChartProps {
  timeRange: '7d' | '30d' | '90d';
}

export default function EnhancedCropYieldChart({ timeRange }: CropYieldChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { exportToCSV } = useExportData();

  useEffect(() => {
    if (!svgRef.current) return;

    // Generate mock data
    const dataPoints = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = Array.from({ length: dataPoints }, (_, i) => ({
      date: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000),
      yield: 50 + Math.random() * 30 + i * 0.5,
      target: 60 + i * 0.4,
    }));

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 30, right: 60, bottom: 50, left: 60 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.yield, d.target)) as number])
      .nice()
      .range([height, 0]);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 5])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        const newX = event.transform.rescaleX(x);
        setZoomLevel(event.transform.k);
        
        g.select<SVGGElement>('.x-axis').call(
          d3.axisBottom(newX).ticks(6) as any
        );
        
        g.selectAll<SVGPathElement, typeof data>('.line-actual')
          .attr('d', d3.line<typeof data[0]>()
            .x((d) => newX(d.date))
            .y((d) => y(d.yield))
            .curve(d3.curveMonotoneX) as any
          );
        
        g.selectAll<SVGPathElement, typeof data>('.line-target')
          .attr('d', d3.line<typeof data[0]>()
            .x((d) => newX(d.date))
            .y((d) => y(d.target))
            .curve(d3.curveMonotoneX) as any
          );

        g.selectAll<SVGCircleElement, typeof data[0]>('.data-point')
          .attr('cx', (d) => newX(d.date));
      });

    svg.call(zoom as any);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => '')
      );

    // Gradient
    const gradient = g
      .append('defs')
      .append('linearGradient')
      .attr('id', 'yield-gradient-enhanced')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#22c55e').attr('stop-opacity', 0.4);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#22c55e').attr('stop-opacity', 0.05);

    // Area
    const area = d3
      .area<typeof data[0]>()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y(d.yield))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('fill', 'url(#yield-gradient-enhanced)')
      .attr('d', area);

    // Target line (dashed)
    g.append('path')
      .datum(data)
      .attr('class', 'line-target')
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('d', d3.line<typeof data[0]>()
        .x((d) => x(d.date))
        .y((d) => y(d.target))
        .curve(d3.curveMonotoneX)
      );

    // Actual line
    const path = g.append('path')
      .datum(data)
      .attr('class', 'line-actual')
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 3)
      .attr('d', d3.line<typeof data[0]>()
        .x((d) => x(d.date))
        .y((d) => y(d.yield))
        .curve(d3.curveMonotoneX)
      );

    // Animate line
    const pathLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', pathLength)
      .attr('stroke-dashoffset', pathLength)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Data points with tooltips
    const tooltip = d3.select(tooltipRef.current);

    g.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.yield))
      .attr('r', 0)
      .attr('fill', '#22c55e')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .transition()
      .delay((d, i) => i * 50)
      .duration(500)
      .attr('r', 5)
      .end()
      .then(() => {
        g.selectAll<SVGCircleElement, typeof data[0]>('.data-point')
          .on('mouseover', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', 8);

            tooltip
              .style('opacity', 1)
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 40}px`)
              .html(`
                <div class="text-xs font-medium text-gray-900">
                  ${d3.timeFormat('%b %d, %Y')(d.date)}
                </div>
                <div class="mt-1 text-sm font-bold text-green-600">
                  Yield: ${d.yield.toFixed(1)} kg/ha
                </div>
                <div class="text-xs text-gray-500">
                  Target: ${d.target.toFixed(1)} kg/ha
                </div>
              `);
          })
          .on('mouseout', function() {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', 5);

            tooltip.style('opacity', 0);
          });
      });

    // Axes
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6))
      .selectAll('text')
      .style('font-size', '12px')
      .attr('fill', '#6b7280');

    g.append('g')
      .call(d3.axisLeft(y).ticks(6))
      .selectAll('text')
      .style('font-size', '12px')
      .attr('fill', '#6b7280');

    // Y axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 15)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#374151')
      .text('Yield (kg/ha)');

    // Legend
    const legend = g.append('g')
      .attr('transform', `translate(${width - 150}, 0)`);

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 30)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 3);

    legend.append('text')
      .attr('x', 40)
      .attr('y', 5)
      .text('Actual')
      .style('font-size', '12px')
      .attr('fill', '#374151');

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 30)
      .attr('y1', 20)
      .attr('y2', 20)
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    legend.append('text')
      .attr('x', 40)
      .attr('y', 25)
      .text('Target')
      .style('font-size', '12px')
      .attr('fill', '#374151');

    // Export function
    (window as any).exportYieldData = () => {
      exportToCSV(
        data.map(d => ({
          date: d3.timeFormat('%Y-%m-%d')(d.date),
          yield: d.yield.toFixed(2),
          target: d.target.toFixed(2),
        })),
        `crop-yield-${timeRange}`
      );
    };

  }, [timeRange, exportToCSV]);

  const handleResetZoom = () => {
    if (svgRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(750)
        .call((d3.zoom() as any).transform, d3.zoomIdentity);
      setZoomLevel(1);
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Crop Yield Trend</h3>
          <p className="text-sm text-gray-500">Expected yield over time with target comparison</p>
        </div>
        <div className="flex items-center space-x-2">
          {zoomLevel > 1 && (
            <button
              onClick={handleResetZoom}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              title="Reset zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => (window as any).exportYieldData()}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            title="Export data"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {zoomLevel > 1 && (
        <div className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          <ZoomIn className="mr-1 h-3 w-3" />
          Zoom: {zoomLevel.toFixed(1)}x (drag to pan, scroll to zoom)
        </div>
      )}

      <div className="relative mt-4">
        <svg ref={svgRef} className="w-full cursor-move" />
        <div
          ref={tooltipRef}
          className="pointer-events-none fixed z-50 rounded-lg border bg-white p-3 shadow-lg transition-opacity"
          style={{ opacity: 0 }}
        />
      </div>
      
      <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
        <strong>Tip:</strong> Hover over data points for details. Use mouse wheel to zoom, drag to pan.
      </div>
    </Card>
  );
}