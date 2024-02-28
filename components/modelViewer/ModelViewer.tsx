import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import styled from 'styled-components';

const Container = styled.div`
  @media (max-width: 940px) {
    width: 500px;
    height: 400px;
  }

  @media (max-width: 400px) {
    width: 385px;
    height: 450px;
  }

  width: 800px;
  height: 600px;
`;

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
    <Container>
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </Container>
  );
};

export default ModelViewer;
