import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Create a single "Moving Note" component
function MovingNote({ initialPos, symbol, color, size }) {
  const mesh = useRef();
  
  // Give each note a random speed
  const [speed] = useState(() => 0.02 + Math.random() * 0.05);
  
  // Give each note a random rotation speed
  const [rotSpeed] = useState(() => ({
    x: (Math.random() - 0.5) * 0.01,
    y: (Math.random() - 0.5) * 0.01,
    z: (Math.random() - 0.5) * 0.01
  }));

  // This runs 60 times per second (animation loop)
  useFrame(() => {
    if (!mesh.current) return;

    // Move the note closer to the camera (Z-axis)
    mesh.current.position.z += speed;
    
    // Rotate the note slightly as it flies
    mesh.current.rotation.x += rotSpeed.x;
    mesh.current.rotation.y += rotSpeed.y;
    mesh.current.rotation.z += rotSpeed.z;

    // RESET: If the note goes past the camera (z > 5), send it back to "deep space" (z = -20)
    if (mesh.current.position.z > 8) {
      mesh.current.position.z = -20; 
      mesh.current.position.x = (Math.random() - 0.5) * 30; // Random X again
      mesh.current.position.y = (Math.random() - 0.5) * 20; // Random Y again
    }
  });

  return (
    <Text
      ref={mesh}
      position={initialPos}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
    >
      {symbol}
    </Text>
  );
}

// 2. The Main Background Component
export default function ThreeBackground() {
  
  // Generate 80 random notes
  const notes = useMemo(() => {
    return new Array(80).fill(0).map((_, i) => ({
      id: i,
      // Random start position: X(-15 to 15), Y(-10 to 10), Z(-20 to -5)
      position: [
        (Math.random() - 0.5) * 30, 
        (Math.random() - 0.5) * 20, 
        -5 - Math.random() * 20 
      ],
      symbol: Math.random() > 0.5 ? '♪' : '♫', // Random symbol
      color: Math.random() > 0.5 ? '#6366f1' : '#a5b4fc', // Indigo or Light Blue
      size: 0.5 + Math.random() * 1.5, // Random size
    }));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Lights to make them look 3D (though Text is mostly flat, this helps if you add meshes) */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Render all 80 notes */}
        {notes.map((note) => (
          <MovingNote
            key={note.id}
            initialPos={note.position}
            symbol={note.symbol}
            color={note.color}
            size={note.size}
          />
        ))}
      </Canvas>
    </div>
  );
}