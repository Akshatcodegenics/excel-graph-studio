
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, BarChart3, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

interface AIInsightsProps {
  data: any;
}

export const AIInsights = ({ data }: AIInsightsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const generateInsights = async () => {
    if (!data) {
      toast.error("No data available for analysis");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI analysis with realistic insights
    setTimeout(() => {
      const analysisResult = {
        summary: {
          totalRecords: data.data.length,
          averageSales: Math.round(data.data.reduce((sum: number, row: any[]) => sum + (Number(row[1]) || 0), 0) / data.data.length),
          maxSales: Math.max(...data.data.map((row: any[]) => Number(row[1]) || 0)),
          minSales: Math.min(...data.data.map((row: any[]) => Number(row[1]) || 0)),
        },
        trends: [
          "Sales show an upward trend with 23% growth over the analyzed period",
          "Peak performance observed in Q4 with highest revenue generation",
          "Regional distribution shows North and East regions outperforming others",
          "Customer acquisition rate correlates positively with sales growth"
        ],
        recommendations: [
          "Focus marketing efforts on high-performing regions (North & East)",
          "Investigate factors contributing to Q4 success for replication",
          "Consider expanding operations in underperforming regions",
          "Implement customer retention strategies to maintain growth momentum"
        ],
        anomalies: [
          "Unusual spike in March sales data - investigate for data accuracy",
          "December shows highest growth rate - seasonal factor identified"
        ]
      };

      setInsights(analysisResult);
      setIsGenerating(false);
      toast.success("AI analysis completed successfully!");
    }, 3000);
  };

  const downloadReport = () => {
    if (!insights) return;

    const reportContent = `
AI ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()}

SUMMARY:
- Total Records: ${insights.summary.totalRecords}
- Average Sales: $${insights.summary.averageSales.toLocaleString()}
- Maximum Sales: $${insights.summary.maxSales.toLocaleString()}
- Minimum Sales: $${insights.summary.minSales.toLocaleString()}

TRENDS IDENTIFIED:
${insights.trends.map((trend: string, index: number) => `${index + 1}. ${trend}`).join('\n')}

RECOMMENDATIONS:
${insights.recommendations.map((rec: string, index: number) => `${index + 1}. ${rec}`).join('\n')}

ANOMALIES DETECTED:
${insights.anomalies.map((anomaly: string, index: number) => `${index + 1}. ${anomaly}`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-Analysis-Report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Analysis report downloaded!");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6" />
            AI-Powered Data Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!insights ? (
            <div className="text-center space-y-4">
              <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <Brain className="w-16 h-16 mx-auto text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-purple-800 mb-2">
                  Ready to Analyze Your Data
                </h3>
                <p className="text-purple-600 mb-6">
                  Our AI will analyze your Excel data to identify trends, patterns, and provide actionable insights.
                </p>
                <Button 
                  onClick={generateInsights}
                  disabled={isGenerating || !data}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Analyzing Data...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Generate AI Analysis
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Analysis Results</h3>
                <Button onClick={downloadReport} variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  Download Report
                </Button>
              </div>

              {/* Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <BarChart3 className="w-5 h-5" />
                    Data Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{insights.summary.totalRecords}</div>
                      <div className="text-sm text-blue-600">Total Records</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">${insights.summary.averageSales.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">Avg Sales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">${insights.summary.maxSales.toLocaleString()}</div>
                      <div className="text-sm text-green-600">Max Sales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">${insights.summary.minSales.toLocaleString()}</div>
                      <div className="text-sm text-orange-600">Min Sales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trends */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <TrendingUp className="w-5 h-5" />
                    Key Trends Identified
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {insights.trends.map((trend: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-green-700">
                        <span className="text-green-500 mt-1">•</span>
                        {trend}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Brain className="w-5 h-5" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {insights.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-yellow-700">
                        <span className="text-yellow-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Anomalies */}
              <Card className="bg-red-50 border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    Anomalies Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {insights.anomalies.map((anomaly: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-red-700">
                        <span className="text-red-500 mt-1">•</span>
                        {anomaly}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
