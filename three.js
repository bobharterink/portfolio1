import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const container = document.querySelector('.logo-3d')

if (container) {

/* ------------------ SCENE ------------------ */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  100
)

camera.position.z = 2.5

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

renderer.setSize(container.clientWidth, container.clientHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
container.appendChild(renderer.domElement)

renderer.domElement.style.opacity = '0'

/* ------------------ LIGHTING ------------------ */

scene.add(new THREE.AmbientLight(0xffffff, 0.8))

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(2, 2, 2)
scene.add(directionalLight)

/* ------------------ LOADER ------------------ */

const loader = new GLTFLoader()
let model

loader.load('/logo.glb', (gltf) => {
  model = gltf.scene

  model.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({
        color: 0xFDFBFB
      })
    }
  })

  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  model.position.sub(center)

  const size = box.getSize(new THREE.Vector3()).length()
  const scale = 1.2 / size
  model.scale.setScalar(scale)

  scene.add(model)
})

/* ------------------ ANIMATION ------------------ */

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)

  const elapsed = clock.getElapsedTime()

  if (model) {
    model.rotation.x = elapsed * 0.4
    model.rotation.y = elapsed * 0.8
    model.rotation.z = elapsed * 0.2

    model.position.y += Math.sin(elapsed * 1.2) * 0.0005
  }

  camera.position.x = Math.sin(elapsed * 0.3) * 0.1
  camera.lookAt(0, 0, 0)

  renderer.render(scene, camera)
}

animate()

/* ------------------ INTRO EVENT ------------------ */

window.addEventListener('intro-complete', () => {
  gsap.to(renderer.domElement, {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out"
  })
})

/* ------------------ RESPONSIVE ------------------ */

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
})

} // end if (container)
