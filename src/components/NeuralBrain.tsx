import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useVektorStore } from '../store/useVektorStore'

// Detect mobile for performance optimization
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export function NeuralBrain() {
    const pointsRef = useRef<THREE.Points>(null)
    const linesRef = useRef<THREE.LineSegments>(null)
    const { mouse, viewport } = useThree()

    // Get reactive state from Zustand
    const pulseIntensity = useVektorStore((state) => state.pulseIntensity)
    const currentStep = useVektorStore((state) => state.currentStep)
    const setLoading = useVektorStore((state) => state.setLoading)

    // Signal loading complete on mount
    useEffect(() => {
        setLoading(false)
    }, [setLoading])

    // Particle configuration - reduced on mobile per skill pattern
    const particleCount = isMobile ? 300 : 800
    const connectionDistance = isMobile ? 1.8 : 2.5

    // Generate particle positions with useMemo for performance
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)

        // Minimalist blue color scheme
        const color = new THREE.Color('#3B82F6')
        const dimColor = new THREE.Color('#1E3A5F')

        for (let i = 0; i < particleCount; i++) {
            // Spherical distribution
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            // Increased radius to be visible behind the form card
            const radius = 5 + Math.random() * 4

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            positions[i * 3 + 2] = radius * Math.cos(phi)

            // Randomize brightness
            const brightness = 0.3 + Math.random() * 0.7
            const mixedColor = dimColor.clone().lerp(color, brightness)
            colors[i * 3] = mixedColor.r
            colors[i * 3 + 1] = mixedColor.g
            colors[i * 3 + 2] = mixedColor.b
        }

        return [positions, colors]
    }, [particleCount])

    // Generate connections between nearby particles
    const lineGeometry = useMemo(() => {
        const linePositions: number[] = []

        // Only calculate connections for a subset to save performance
        const checkLimit = Math.min(particleCount, 200)

        for (let i = 0; i < checkLimit; i++) {
            const x1 = positions[i * 3]
            const y1 = positions[i * 3 + 1]
            const z1 = positions[i * 3 + 2]

            for (let j = i + 1; j < checkLimit; j++) {
                const x2 = positions[j * 3]
                const y2 = positions[j * 3 + 1]
                const z2 = positions[j * 3 + 2]

                const distance = Math.sqrt(
                    (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
                )

                if (distance < connectionDistance) {
                    linePositions.push(x1, y1, z1, x2, y2, z2)
                }
            }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(linePositions, 3)
        )
        return geometry
    }, [positions, connectionDistance, particleCount])

    // Track base intensity for pulsing
    const [baseIntensity, setBaseIntensity] = useState(0.4)

    // Update intensity based on currentStep progression
    useEffect(() => {
        const newIntensity = 0.4 + (currentStep / 7) * 0.4
        setBaseIntensity(newIntensity)
    }, [currentStep])

    // Animation loop
    useFrame((_state, delta) => {
        if (pointsRef.current && linesRef.current) {
            // Slow rotation (idle animation)
            pointsRef.current.rotation.y += delta * 0.05
            pointsRef.current.rotation.x += delta * 0.02
            linesRef.current.rotation.y += delta * 0.05
            linesRef.current.rotation.x += delta * 0.02

            // Mouse parallax
            const targetX = (mouse.x * viewport.width) / 20
            const targetY = (mouse.y * viewport.height) / 20

            pointsRef.current.position.x = THREE.MathUtils.lerp(
                pointsRef.current.position.x,
                targetX,
                0.05
            )
            pointsRef.current.position.y = THREE.MathUtils.lerp(
                pointsRef.current.position.y,
                targetY,
                0.05
            )
            linesRef.current.position.x = pointsRef.current.position.x
            linesRef.current.position.y = pointsRef.current.position.y

            // Scale pulse effect - Disabled per user request to avoid "zoom" bug feel
            // const pulseScale = 1 + pulseIntensity * 0.1
            // pointsRef.current.scale.setScalar(pulseScale)
            // linesRef.current.scale.setScalar(pulseScale)
        }
    })

    // Calculate line opacity based on form progress and pulse
    const lineOpacity = baseIntensity + pulseIntensity * 0.3

    return (
        <group>
            {/* Ambient lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />

            {/* Particle cloud */}
            <Points ref={pointsRef} positions={positions} colors={colors}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={isMobile ? 0.06 : 0.05}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Connection lines */}
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    color="#3B82F6"
                    transparent
                    opacity={lineOpacity}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    )
}
