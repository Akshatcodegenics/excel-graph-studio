
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
  z: number;
  label: string;
  value: number;
  color: string;
}

interface ThreeJSDataVisualizationProps {
  data: DataPoint[];
  title: string;
}

const DataSphere = ({ point, index }: { point: DataPoint; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const scale = useMemo(() => {
    const baseScale = Math.max(point.value / 1000, 0.1);
    return Math.min(baseScale, 2);
  }, [point.value]);

  return (
    <group position={[point.x, point.y / 100, point.z / 100]}>
      <mesh
        ref={meshRef}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={point.color} />
      </mesh>
      {hovered && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`${point.label}: ${point.value}`}
        </Text>
      )}
    </group>
  );
};

const AxisLines = () => {
  const xAxisPoints = useMemo(() => [
    new THREE.Vector3(-5, 0, 0),
    new THREE.Vector3(5, 0, 0)
  ], []);

  const yAxisPoints = useMemo(() => [
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(0, 5, 0)
  ], []);

  const zAxisPoints = useMemo(() => [
    new THREE.Vector3(0, 0, -5),
    new THREE.Vector3(0, 0, 5)
  ], []);

  return (
    <group>
      {/* X-axis line */}
      <Line
        points={xAxisPoints}
        color="red"
        lineWidth={2}
      />
      
      {/* Y-axis line */}
      <Line
        points={yAxisPoints}
        color="green"
        lineWidth={2}
      />
      
      {/* Z-axis line */}
      <Line
        points={zAxisPoints}
        color="blue"
        lineWidth={2}
      />
      
      {/* Axis Labels */}
      <Text position={[5.5, 0, 0]} fontSize={0.5} color="red">
        X-Axis
      </Text>
      <Text position={[0, 5.5, 0]} fontSize={0.5} color="green">
        Y-Axis
      </Text>
      <Text position={[0, 0, 5.5]} fontSize={0.5} color="blue">
        Z-Axis
      </Text>
    </group>
  );
};

const Scene = ({ data }: { data: DataPoint[] }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AxisLines />
      {data.map((point, index) => (
        <DataSphere key={index} point={point} index={index} />
      ))}
    </>
  );
};

const CameraController = ({ onReset }: { onReset: () => void }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();

  const resetView = () => {
    if (controlsRef.current) {
      camera.position.set(10, 10, 10);
      camera.lookAt(0, 0, 0);
      controlsRef.current.reset();
      onReset();
    }
  };

  React.useEffect(() => {
    if (controlsRef.current) {
      resetView();
    }
  }, []);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
    </>
  );
};

export const ThreeJSDataVisualization = ({ data, title }: ThreeJSDataVisualizationProps) => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  // Ensure data is valid
  const validData = useMemo(() => {
    return data.filter(point => 
      typeof point.x === 'number' && 
      typeof point.y === 'number' && 
      typeof point.z === 'number' &&
      !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z)
    );
  }, [data]);

  if (!validData.length) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No valid data points to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <Button
          onClick={handleReset}
          size="sm"
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
      </div>
      
      <Canvas
        key={resetKey}
        camera={{ position: [10, 10, 10], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CameraController onReset={() => {}} />
        <Scene data={validData} />
      </Canvas>
      
      <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 p-2 rounded">
        <div>Red: X-Axis | Green: Y-Axis | Blue: Z-Axis</div>
        <div>Hover over spheres for details</div>
      </div>
    </div>
  );
};
