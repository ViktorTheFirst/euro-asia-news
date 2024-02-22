import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

const MeshComponent = () => {
  const fileUrl = '/assets/3DModels/house/scene.gltf';
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.001;
    mesh.current.scale.set(2.5, 2.5, 2.5);
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

const ModelViewer = () => {
  return (
    <div
      style={{ width: '800px', height: '600px ' }}
      className='flex justify-center items-center h-screen'
    >
      <Canvas className='h-4xl w-4xl'>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
