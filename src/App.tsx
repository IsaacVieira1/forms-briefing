import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { NeuralBrain } from './components/NeuralBrain'
import { Interface } from './components/Interface'
import { Loader } from './components/Loader'

function App() {
    return (
        <div className="h-screen w-screen bg-void relative overflow-hidden">
            {/* Loading Overlay */}
            <Loader />

            {/* 3D Neural Network Background */}
            <Canvas
                className="absolute inset-0"
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
            >
                <Suspense fallback={null}>
                    <NeuralBrain />
                </Suspense>
            </Canvas>

            {/* UI Overlay - z-index ensures it's above the canvas */}
            <div className="relative z-10 h-full">
                <Interface />
            </div>
        </div>
    )
}

export default App
