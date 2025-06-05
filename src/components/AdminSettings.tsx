
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { toast } from "sonner";

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    maxFileSize: "10",
    allowedFileTypes: ".xlsx, .xls, .csv",
    aiProvider: "OpenAI GPT-4",
    aiTimeout: "30",
    maxUsersPerDay: "100",
    backupFrequency: "daily"
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleResetSettings = () => {
    setSettings({
      maxFileSize: "10",
      allowedFileTypes: ".xlsx, .xls, .csv",
      aiProvider: "OpenAI GPT-4",
      aiTimeout: "30",
      maxUsersPerDay: "100",
      backupFrequency: "daily"
    });
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system parameters and preferences</p>
      </div>

      <Card className="shadow-xl border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">File Upload Settings</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max File Size (MB)</label>
                  <Input 
                    type="number" 
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Allowed File Types</label>
                  <Input 
                    value={settings.allowedFileTypes}
                    onChange={(e) => setSettings({...settings, allowedFileTypes: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI Integration</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Provider</label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={settings.aiProvider}
                    onChange={(e) => setSettings({...settings, aiProvider: e.target.value})}
                  >
                    <option>OpenAI GPT-4</option>
                    <option>Claude</option>
                    <option>Custom API</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Analysis Timeout (seconds)</label>
                  <Input 
                    type="number" 
                    value={settings.aiTimeout}
                    onChange={(e) => setSettings({...settings, aiTimeout: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
              <Button onClick={handleResetSettings} variant="outline">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
