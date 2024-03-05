import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';
import { Box } from '@mui/material';
import myTheme from '@/theme';

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
    <Box
      component={Box}
      sx={{
        width: '900px',
        height: '700px',
        [myTheme.breakpoints.down('lg')]: {
          width: '800px',
          height: '600px',
        },
        [myTheme.breakpoints.down('md')]: {
          width: '500px',
          height: '400px',
        },
        [myTheme.breakpoints.down('sm')]: {
          width: '385px',
          height: '450px',
        },
      }}
    >
      <Canvas>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </Box>
  );
};

export default ModelViewer;
