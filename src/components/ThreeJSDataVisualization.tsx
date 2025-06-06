
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import * as THREE from 'three';

interface DataPoint {
  x: number;
  y: number;
  z: number;
  label: string;
  value: number;
  color: string;
}

interface ThreeJSDataVisualizationProps {
  data?: DataPoint[];
  title?: string;
}

const DataSphere = ({ position, color, scale, label, value }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {hovered && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`${label}: ${value}`}
        </Text>
      )}
    </group>
  );
};

const AxisLines = () => {
  return (
    <group>
      {/* X Axis - Red */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([-5, 0, 0, 5, 0, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="red" />
      </line>
      {/* Y Axis - Green */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, -5, 0, 0, 5, 0])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="green" />
      </line>
      {/* Z Axis - Blue */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array([0, 0, -5, 0, 0, 5])}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="blue" />
      </line>
      
      {/* Axis Labels */}
      <Text position={[5.5, 0, 0]} fontSize={0.5} color="red">X</Text>
      <Text position={[0, 5.5, 0]} fontSize={0.5} color="green">Y</Text>
      <Text position={[0, 0, 5.5]} fontSize={0.5} color="blue">Z</Text>
    </group>
  );
};

export const ThreeJSDataVisualization = ({ 
  data = [
    { x: 2, y: 3, z: 1, label: "Sales Q1", value: 150, color: "#3b82f6" },
    { x: -1, y: 2, z: 3, label: "Sales Q2", value: 200, color: "#ef4444" },
    { x: 3, y: -2, z: 2, label: "Sales Q3", value: 175, color: "#10b981" },
    { x: -2, y: -1, z: -1, label: "Sales Q4", value: 225, color: "#f59e0b" },
    { x: 1, y: 4, z: -2, label: "Marketing", value: 100, color: "#8b5cf6" },
    { x: -3, y: 1, z: 2, label: "Operations", value: 125, color: "#06b6d4" }
  ],
  title = "3D Data Visualization"
}: ThreeJSDataVisualizationProps) => {
  const orbitRef = useRef<any>();

  const resetView = () => {
    if (orbitRef.current) {
      orbitRef.current.reset();
    }
  };

  return (
    <div className="w-full h-96 relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <Button
          onClick={resetView}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 z-10 text-white text-sm">
        <div className="bg-black/20 p-2 rounded">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>X-Axis</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Y-Axis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Z-Axis</span>
          </div>
        </div>
      </div>

      <Canvas camera={{ position: [8, 8, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <OrbitControls 
          ref={orbitRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
        
        <AxisLines />
        
        {data.map((point, index) => (
          <DataSphere
            key={index}
            position={[point.x, point.y, point.z]}
            color={point.color}
            scale={point.value / 100}
            label={point.label}
            value={point.value}
          />
        ))}
        
        <gridHelper args={[20, 20, 0x444444, 0x222222]} />
      </Canvas>
    </div>
  );
};
