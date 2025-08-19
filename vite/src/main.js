import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Grab canvas
const canvas = document.getElementById('canvas')

// 1. Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x202020) // darker background looks better

// 2. Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(2, 2, 3) // back a bit so object is centered in view

// 3. Object (dodecahedron)
const geometry = new THREE.DodecahedronGeometry(1, 0)
const material = new THREE.MeshStandardMaterial({
    color: 0x468585,
    emissive: 0x102020,
    roughness: 0.4,
    metalness: 0.3
})
const dodecahedron = new THREE.Mesh(geometry, material)
scene.add(dodecahedron)

// 4. Lighting
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
dirLight.position.set(5, 5, 5)
scene.add(dirLight)

const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

// 5. Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 6. OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true // smooth controls
controls.target.set(0, 0, 0) // center focus
controls.update()

// 7. Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// 8. Animation loop
function animate() {
    requestAnimationFrame(animate)

    // auto rotation
    dodecahedron.rotation.x += 0.005
    dodecahedron.rotation.y += 0.01

    controls.update()
    renderer.render(scene, camera)
}
animate()