import * as THREE from 'three'

// 1) Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf0f0f0)

// 2) Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(0, 0, 5)

// 3) Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 4) Geometry + Material + Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshLambertMaterial({
    color: 0x468585,
    emissive: 0x222222
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// 5) Lights
const dirLight = new THREE.DirectionalLight(0x9cdba6, 2)
dirLight.position.set(1, 1, 1)
scene.add(dirLight)
scene.add(new THREE.AmbientLight(0xffffff, 0.4))

// 6) Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})

// 7) Animate
function animate() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
