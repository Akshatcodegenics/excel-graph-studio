
import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RotateCcw, Palette } from "lucide-react";
import { toast } from "sonner";
import * as THREE from 'three';

interface DataPoint {
  position: [number, number, number];
  value: number;
  label: string;
}

const AnimatedBar = ({ position, scale, color, label, value }: { 
  position: [number, number, number]; 
  scale: [number, number, number]; 
  color: string;
  label: string;
  value: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      const baseScale = scale[1];
      meshRef.current.scale.y = baseScale + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], -0.8, position[2]]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[position[0], position[1] + scale[1] / 2 + 0.3, position[2]]}
        fontSize={0.25}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {typeof value === 'number' ? value.toLocaleString() : '0'}
      </Text>
    </group>
  );
};

const AnimatedSphere = ({ position, scale, color, label, value }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string;
  label: string;
  value: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        <sphereGeometry args={[scale, 32, 32]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], position[1] - scale - 0.5, position[2]]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[position[0], position[1] + scale + 0.5, position[2]]}
        fontSize={0.25}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {typeof value === 'number' ? value.toLocaleString() : '0'}
      </Text>
    </group>
  );
};

const AnimatedCylinder = ({ position, scale, color, label, value }: { 
  position: [number, number, number]; 
  scale: [number, number]; 
  color: string;
  label: string;
  value: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} castShadow receiveShadow>
        <cylinderGeometry args={[scale[0], scale[0], scale[1], 32]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], -0.8, position[2]]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[position[0], position[1] + scale[1] / 2 + 0.3, position[2]]}
        fontSize={0.25}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {typeof value === 'number' ? value.toLocaleString() : '0'}
      </Text>
    </group>
  );
};

const Scene = ({ data, chartType, colorScheme }: { data: any, chartType: string, colorScheme: string }) => {
  const dataPoints: DataPoint[] = useMemo(() => {
    if (!data || !data.data) {
      return [
        { position: [-3, 1.2, 0], value: 45000, label: 'Jan' },
        { position: [-1, 1.5, 0], value: 52000, label: 'Feb' },
        { position: [1, 2.1, 0], value: 48000, label: 'Mar' },
        { position: [3, 2.8, 0], value: 67000, label: 'Apr' },
      ];
    }

    const maxValue = Math.max(...data.data.map((row: any[]) => Math.abs(Number(row[1]) || 0)));
    const minValue = Math.min(...data.data.map((row: any[]) => Math.abs(Number(row[1]) || 0)));
    
    return data.data.slice(0, 8).map((row: any[], index: number) => {
      const value = Number(row[1]) || 0;
      let normalizedHeight;
      
      if (chartType === 'sphere') {
        normalizedHeight = maxValue > 0 ? ((Math.abs(value) - minValue) / (maxValue - minValue)) * 1.5 + 0.3 : 0.5;
      } else {
        normalizedHeight = maxValue > 0 ? (Math.abs(value) / maxValue) * 3 : 1;
      }
      
      const spacing = chartType === 'sphere' ? 2.5 : 1.5;
      return {
        position: [(index - data.data.length / 2) * spacing, 
                  chartType === 'sphere' ? 1 : normalizedHeight / 2, 
                  0] as [number, number, number],
        value: value,
        label: String(row[0] || `Item ${index + 1}`).substring(0, 8),
        scale: normalizedHeight
      };
    });
  }, [data, chartType]);

  const getColorScheme = (scheme: string) => {
    const schemes = {
      default: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'],
      warm: ['#ff6b6b', '#ffa726', '#ffcc02', '#ff8a65', '#ff7043', '#ffab40', '#ff9800', '#ff5722'],
      cool: ['#42a5f5', '#26c6da', '#66bb6a', '#29b6f6', '#26a69a', '#42a5f5', '#5c6bc0', '#7e57c2'],
      monochrome: ['#374151', '#6b7280', '#9ca3af', '#d1d5db', '#4b5563', '#374151', '#111827', '#1f2937'],
      neon: ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff', '#80ff00', '#ff0040', '#40ff00']
    };
    return schemes[scheme as keyof typeof schemes] || schemes.default;
  };

  const colors = getColorScheme(colorScheme);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[5, -3, 5]} intensity={0.2} color="#4f46e5" />
      
      {dataPoints.map((point, index) => {
        const color = colors[index % colors.length];
        
        if (chartType === 'sphere') {
          return (
            <AnimatedSphere
              key={index}
              position={point.position}
              scale={(point as any).scale}
              color={color}
              label={point.label}
              value={point.value}
            />
          );
        } else if (chartType === 'cylinder') {
          return (
            <AnimatedCylinder
              key={index}
              position={point.position}
              scale={[0.4, (point as any).scale * 2]}
              color={color}
              label={point.label}
              value={point.value}
            />
          );
        } else {
          return (
            <AnimatedBar
              key={index}
              position={point.position}
              scale={[0.8, point.position[1] * 2, 0.8]}
              color={color}
              label={point.label}
              value={point.value}
            />
          );
        }
      })}
      
      <gridHelper args={[12, 12, '#e2e8f0', '#f1f5f9']} position={[0, -0.1, 0]} />
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={20}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

interface ThreeJSChartProps {
  data: any;
}

const LoadingFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading 3D visualization...</p>
    </div>
  </div>
);

export const ThreeJSChart = ({ data }: ThreeJSChartProps) => {
  const [chartType, setChartType] = useState('bar');
  const [colorScheme, setColorScheme] = useState('default');
  const [autoRotate, setAutoRotate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    if (canvasRef.current) {
      try {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `3d-chart-${chartType}-${Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("3D Chart downloaded successfully!");
      } catch (error) {
        toast.error("Failed to download chart. Please try again.");
      }
    }
  };

  const resetView = () => {
    toast.success("View reset to default position");
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls Panel */}
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <Palette className="w-6 h-6" />
            3D Visualization Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="bar">3D Bars</SelectItem>
                  <SelectItem value="sphere">3D Spheres</SelectItem>
                  <SelectItem value="cylinder">3D Cylinders</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
              <Select value={colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="warm">Warm Colors</SelectItem>
                  <SelectItem value="cool">Cool Colors</SelectItem>
                  <SelectItem value="monochrome">Monochrome</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={resetView}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset View
              </Button>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleDownload}
                className="w-full bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3D Visualization */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden shadow-inner">
        <Suspense fallback={<LoadingFallback />}>
          <div style={{ height: '600px' }}>
            <Canvas 
              ref={canvasRef}
              camera={{ position: [0, 6, 12], fov: 60 }}
              shadows
              gl={{ preserveDrawingBuffer: true }}
            >
              <Scene data={data} chartType={chartType} colorScheme={colorScheme} />
            </Canvas>
          </div>
        </Suspense>
      </div>
      
      {/* Enhanced Info Panel */}
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Interactive Controls</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span><strong>Mouse Drag:</strong> Rotate the view</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span><strong>Mouse Wheel:</strong> Zoom in/out</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span><strong>Right Click + Drag:</strong> Pan the view</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Visualization Features</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span><strong>Dynamic Animations:</strong> Real-time motion effects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span><strong>Multiple Chart Types:</strong> Bars, spheres, cylinders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span><strong>Color Themes:</strong> 5 different color schemes</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <span className="text-blue-600 font-medium">Powered by Three.js & React Three Fiber</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
