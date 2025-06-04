
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Brain, Zap, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface QuickAnalysisPreviewProps {
  data: any;
}

export const QuickAnalysisPreview = ({ data }: QuickAnalysisPreviewProps) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (data) {
      performQuickAnalysis();
    }
  }, [data]);

  const performQuickAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI-powered quick analysis
    setTimeout(() => {
      if (data && data.data.length > 0) {
        const quickStats = generateQuickStats(data);
        setAnalysis(quickStats);
        toast.success("Quick analysis completed!");
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateQuickStats = (data: any) => {
    // Extract numerical columns for analysis
    const numericalColumns = data.headers.filter((header: string, index: number) => {
      return data.data.some((row: any[]) => !isNaN(Number(row[index])) && row[index] !== '');
    });

    const insights = [];
    const trends = [];
    const recommendations = [];

    // Generate insights based on data
    if (numericalColumns.length > 0) {
      const salesColumn = numericalColumns.find((col: string) => 
        col.toLowerCase().includes('sales') || col.toLowerCase().includes('revenue')
      );
      
      if (salesColumn) {
        const salesIndex = data.headers.indexOf(salesColumn);
        const salesData = data.data.map((row: any[]) => Number(row[salesIndex]) || 0);
        const totalSales = salesData.reduce((sum: number, val: number) => sum + val, 0);
        const avgSales = totalSales / salesData.length;
        const maxSales = Math.max(...salesData);
        const minSales = Math.min(...salesData);
        
        insights.push(`Total ${salesColumn}: $${totalSales.toLocaleString()}`);
        insights.push(`Average ${salesColumn}: $${Math.round(avgSales).toLocaleString()}`);
        insights.push(`Peak ${salesColumn}: $${maxSales.toLocaleString()}`);
        
        // Trend analysis
        if (salesData.length > 2) {
          const firstHalf = salesData.slice(0, Math.floor(salesData.length / 2));
          const secondHalf = salesData.slice(Math.floor(salesData.length / 2));
          const firstAvg = firstHalf.reduce((sum: number, val: number) => sum + val, 0) / firstHalf.length;
          const secondAvg = secondHalf.reduce((sum: number, val: number) => sum + val, 0) / secondHalf.length;
          
          if (secondAvg > firstAvg) {
            trends.push("📈 Upward trend detected in sales performance");
            recommendations.push("Continue current strategies to maintain growth momentum");
          } else if (secondAvg < firstAvg) {
            trends.push("📉 Declining trend in sales performance");
            recommendations.push("Investigate factors causing decline and implement corrective measures");
          } else {
            trends.push("➡️ Stable performance pattern observed");
            recommendations.push("Consider strategies to drive growth and avoid stagnation");
          }
        }
      }
    }

    // Data quality insights
    const totalRows = data.data.length;
    const emptyRows = data.data.filter((row: any[]) => row.every((cell: any) => !cell || cell === '')).length;
    const dataQuality = ((totalRows - emptyRows) / totalRows) * 100;
    
    insights.push(`Data Quality Score: ${Math.round(dataQuality)}%`);
    
    if (dataQuality < 90) {
      recommendations.push("Consider data cleaning to improve analysis accuracy");
    }

    // Regional analysis if region data exists
    const regionColumn = data.headers.find((header: string) => 
      header.toLowerCase().includes('region') || header.toLowerCase().includes('location')
    );
    
    if (regionColumn) {
      const regionIndex = data.headers.indexOf(regionColumn);
      const regions = [...new Set(data.data.map((row: any[]) => row[regionIndex]))];
      trends.push(`📍 Analysis covers ${regions.length} different regions/locations`);
      if (regions.length > 1) {
        recommendations.push("Consider regional performance comparison for targeted strategies");
      }
    }

    return {
      summary: {
        totalRecords: totalRows,
        dataQuality: Math.round(dataQuality),
        numericalColumns: numericalColumns.length,
        completeness: `${Math.round(dataQuality)}%`
      },
      insights,
      trends,
      recommendations,
      chartSuggestions: [
        "Bar chart for regional comparison",
        "Line chart for trend analysis",
        "Pie chart for category distribution"
      ]
    };
  };

  if (!data) {
    return (
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h4 className="font-semibold text-gray-600 mb-2">No Data Available</h4>
          <p className="text-sm text-gray-500">Upload an Excel file to see quick analysis preview</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <h4 className="font-semibold text-blue-800 mb-2">🧠 AI Analysis in Progress</h4>
          <p className="text-sm text-blue-600">Analyzing your data patterns and generating insights...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
        <div className="text-center">
          <Zap className="w-12 h-12 mx-auto text-yellow-600 mb-3" />
          <h4 className="font-semibold text-yellow-800 mb-2">Analysis Ready</h4>
          <p className="text-sm text-yellow-700 mb-4">Click to generate AI-powered insights</p>
          <Button onClick={performQuickAnalysis} className="bg-yellow-600 hover:bg-yellow-700">
            <Brain className="w-4 h-4 mr-2" />
            Analyze Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{analysis.summary.totalRecords}</div>
          <div className="text-sm text-blue-600">Total Records</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">{analysis.summary.dataQuality}%</div>
          <div className="text-sm text-green-600">Data Quality</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">{analysis.summary.numericalColumns}</div>
          <div className="text-sm text-purple-600">Numeric Columns</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">{analysis.summary.completeness}</div>
          <div className="text-sm text-orange-600">Completeness</div>
        </div>
      </div>

      {/* Quick Insights */}
      <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.insights.map((insight: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-green-700">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="w-5 h-5" />
            Trends Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.trends.map((trend: string, index: number) => (
              <div key={index} className="text-sm text-blue-700">{trend}</div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Brain className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analysis.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2 text-purple-700">
                <span className="text-purple-500 mt-1">💡</span>
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart Suggestions */}
      <Card className="border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <BarChart3 className="w-5 h-5" />
            Suggested Visualizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.chartSuggestions.map((suggestion: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                {suggestion}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
