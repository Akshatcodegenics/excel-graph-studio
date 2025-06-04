
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DataPoint {
  position: [number, number, number];
  value: number;
  label: string;
}

const AnimatedBar = ({ position, scale, color, label }: { 
  position: [number, number, number]; 
  scale: [number, number, number]; 
  color: string;
  label: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.scale.y = scale[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <Text
        position={[position[0], position[1] - scale[1] / 2 - 0.5, position[2]]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        {label}
      </Text>
      <Text
        position={[position[0], position[1] + scale[1] / 2 + 0.3, position[2]]}
        fontSize={0.2}
        color="#666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        {typeof position[1] === 'number' ? Math.round(position[1] * 1000) : '0'}
      </Text>
    </group>
  );
};

const Scene = ({ data }: { data: any }) => {
  const dataPoints: DataPoint[] = useMemo(() => {
    if (!data) {
      return [
        { position: [-3, 1.2, 0], value: 120, label: 'Jan' },
        { position: [-1, 1.5, 0], value: 150, label: 'Feb' },
        { position: [1, 2.1, 0], value: 210, label: 'Mar' },
        { position: [3, 2.8, 0], value: 280, label: 'Apr' },
      ];
    }

    const maxValue = Math.max(...data.data.map((row: any[]) => Math.abs(Number(row[1]) || 0)));
    return data.data.slice(0, 8).map((row: any[], index: number) => {
      const value = Number(row[1]) || 0;
      const normalizedHeight = maxValue > 0 ? (Math.abs(value) / maxValue) * 3 : 1;
      return {
        position: [(index - data.data.length / 2) * 1.5, normalizedHeight / 2, 0] as [number, number, number],
        value: value,
        label: String(row[0] || `Item ${index + 1}`).substring(0, 8),
      };
    });
  }, [data]);

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#ffffff" />
      
      {dataPoints.map((point, index) => (
        <AnimatedBar
          key={index}
          position={point.position}
          scale={[0.8, point.position[1], 0.8]}
          color={colors[index % colors.length]}
          label={point.label}
        />
      ))}
      
      <gridHelper args={[10, 10, '#e2e8f0', '#f1f5f9']} position={[0, -0.1, 0]} />
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={15}
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
  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden shadow-inner">
        <Suspense fallback={<LoadingFallback />}>
          <div style={{ height: '400px' }}>
            <Canvas camera={{ position: [0, 4, 8], fov: 60 }}>
              <Scene data={data} />
            </Canvas>
          </div>
        </Suspense>
      </div>
      
      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              🎮 <strong>Interactive Controls:</strong>
            </span>
            <span>Drag to rotate</span>
            <span>Scroll to zoom</span>
            <span>Right-click to pan</span>
          </div>
          <span className="text-blue-600 font-medium">Powered by Three.js</span>
        </div>
      </div>
    </div>
  );
};
