
import { useRef, useMemo } from 'react';
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
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
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
      >
        {label}
      </Text>
    </group>
  );
};

const Scene = ({ data }: { data: any }) => {
  const dataPoints: DataPoint[] = useMemo(() => {
    if (!data) {
      // Default sample data
      return [
        { position: [-3, 1, 0], value: 120, label: 'Jan' },
        { position: [-1, 1.5, 0], value: 150, label: 'Feb' },
        { position: [1, 2, 0], value: 180, label: 'Mar' },
        { position: [3, 2.5, 0], value: 210, label: 'Apr' },
      ];
    }

    const maxValue = Math.max(...data.data.map((row: any[]) => row[1]));
    return data.data.map((row: any[], index: number) => ({
      position: [(index - data.data.length / 2) * 2, row[1] / maxValue * 3, 0] as [number, number, number],
      value: row[1],
      label: row[0],
    }));
  }, [data]);

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {dataPoints.map((point, index) => (
        <AnimatedBar
          key={index}
          position={point.position}
          scale={[1, point.position[1], 1]}
          color={colors[index % colors.length]}
          label={point.label}
        />
      ))}
      
      {/* Grid */}
      <gridHelper args={[10, 10, '#cccccc', '#cccccc']} position={[0, -0.1, 0]} />
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

interface ThreeJSChartProps {
  data: any;
}

export const ThreeJSChart = ({ data }: ThreeJSChartProps) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <Scene data={data} />
      </Canvas>
      <div className="p-4 bg-white border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>🎮 Use mouse to rotate, zoom, and pan</span>
          <span>Interactive 3D visualization powered by Three.js</span>
        </div>
      </div>
    </div>
  );
};
