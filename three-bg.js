import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'

// ============================================
// TWEE CANVASSEN
// Canvas A: mix-blend-mode difference + wit model → inverteert pills
// Canvas B: mix-blend-mode normal + getextureerd model → echte kleur bovenop
// ============================================

function makeCanvas(blendMode, zIndex) {
  const c = document.createElement('canvas')
  c.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    mix-blend-mode: ${blendMode};
    z-index: ${zIndex};
    opacity: 0;
  `
  document.body.appendChild(c)
  return c
}

const canvasA = makeCanvas('difference', 1000)
const canvasB = makeCanvas('normal', 1001)

// ============================================
// SCENE & CAMERA (gedeeld)
// ============================================

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 4

function makeRenderer(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  r.setSize(window.innerWidth, window.innerHeight)
  r.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  r.setClearColor(0x000000, 0)
  r.outputColorSpace = THREE.SRGBColorSpace
  return r
}

const rendererA = makeRenderer(canvasA)
const rendererB = makeRenderer(canvasB)

// Scene A: wit model (voor inversie)
const sceneA = new THREE.Scene()
sceneA.add(new THREE.AmbientLight(0xffffff, 10))

// Scene B: getextureerd model (echte kleur)
const sceneB = new THREE.Scene()
sceneB.add(new THREE.AmbientLight(0xffffff, 1))
const dirLight = new THREE.DirectionalLight(0xffffff, 4)
dirLight.position.set(3, 5, 3)
sceneB.add(dirLight)

// ============================================
// MODEL
// ============================================

let modelA = null
let modelB = null
let baseScale = 3.5

const textureLoader = new THREE.TextureLoader()
const colorMap = textureLoader.load('/texture/baked1.jpg')
colorMap.flipY = false
colorMap.colorSpace = THREE.SRGBColorSpace

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('/Untitled111.glb', (gltf) => {
  // Model B: echte texture
  modelB = gltf.scene
  modelB.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ map: colorMap })
    }
  })

  // Model A: zelfde geometrie, wit materiaal
  modelA = modelB.clone()
  modelA.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    }
  })

  // Beide centreren en schalen
  const box = new THREE.Box3().setFromObject(modelB)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3()).length()
  baseScale = 3.5 / size

  for (const m of [modelA, modelB]) {
    m.position.sub(center)
    m.scale.setScalar(baseScale)
  }

  sceneA.add(modelA)
  sceneB.add(modelB)
})

// ============================================
// RENDER LOOP
// ============================================

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  const breathe = baseScale * (1 + Math.sin(t * 0.8) * 0.06)
  if (modelA) { modelA.rotation.y = t * 0.4; modelA.scale.setScalar(breathe) }
  if (modelB) { modelB.rotation.y = t * 0.4; modelB.scale.setScalar(breathe) }

  rendererA.render(sceneA, camera)
  rendererB.render(sceneB, camera)
}
animate()

// ============================================
// SHOW / HIDE
// ============================================

function showBg() {
  gsap.killTweensOf([canvasA, canvasB])
  gsap.to(canvasA, { opacity: 1, duration: 0.6, ease: 'power2.out' })
  gsap.to(canvasB, { opacity: 0.55, duration: 0.6, ease: 'power2.out' })
}

function hideBg() {
  gsap.killTweensOf([canvasA, canvasB])
  gsap.to([canvasA, canvasB], { opacity: 0, duration: 0.4, ease: 'power2.in' })
}

// ============================================
// EVENT DELEGATION
// ============================================

const bar = document.querySelector('.bar')

let studioDetailsOpen = false

bar.addEventListener('mouseover', (e) => {
  const pill = e.target.closest('[data-project="studio"]')
  if (pill) showBg()
})

bar.addEventListener('mouseout', (e) => {
  const pill = e.target.closest('[data-project="studio"]')
  if (!pill) return
  if (!pill.contains(e.relatedTarget) && !studioDetailsOpen) hideBg()
})

window.addEventListener('studio-details-open', () => {
  studioDetailsOpen = true
  showBg()
})

window.addEventListener('studio-details-close', () => {
  studioDetailsOpen = false
  hideBg()
})

// ============================================
// RESPONSIVE
// ============================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  for (const r of [rendererA, rendererB]) {
    r.setSize(window.innerWidth, window.innerHeight)
  }
})
