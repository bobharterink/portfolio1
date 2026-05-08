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
// MODELLEN
// ============================================

const models = {
  studio: { white: null, color: null, baseScale: 3.5 },
  fizzi: { white: null, color: null, baseScale: 1 },
}
let activeProject = null

const textureLoader = new THREE.TextureLoader()
const colorMap = textureLoader.load('/texture/baked1.jpg')
colorMap.flipY = false
colorMap.colorSpace = THREE.SRGBColorSpace

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)

function setProjectVisibility(project) {
  Object.entries(models).forEach(([key, entry]) => {
    if (entry.white) entry.white.visible = key === project
    if (entry.color) entry.color.visible = key === project
  })
}

function fitModel(model, targetSize) {
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3()).length()
  const scale = targetSize / size
  model.position.sub(center)
  model.scale.setScalar(scale)
  return scale
}

function loadFizziModel() {
  loader.load('/fizzi/Soda-can.gltf', (gltf) => {
    const modelB = makeFizziGroup(gltf.scene, false)
    const modelA = makeFizziGroup(gltf.scene, true)
    models.fizzi.white = modelA
    models.fizzi.color = modelB
    sceneA.add(modelA)
    sceneB.add(modelB)
    if (activeProject === 'fizzi') setProjectVisibility('fizzi')
  })
}

loader.load('/Untitled111.glb', (gltf) => {
  // Model B: echte texture
  const modelB = gltf.scene
  modelB.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ map: colorMap })
    }
  })

  // Model A: zelfde geometrie, wit materiaal
  const modelA = modelB.clone()
  modelA.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    }
  })

  // Beide centreren en schalen
  const box = new THREE.Box3().setFromObject(modelB)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3()).length()
  const baseScale = 3.5 / size

  for (const m of [modelA, modelB]) {
    m.position.sub(center)
    m.scale.setScalar(baseScale)
    m.visible = false
  }

  models.studio.white = modelA
  models.studio.color = modelB
  models.studio.baseScale = baseScale
  sceneA.add(modelA)
  sceneB.add(modelB)
  if (activeProject === 'studio') setProjectVisibility('studio')
  loadFizziModel()
}, undefined, () => {
  loadFizziModel()
})

const fizziTextures = {
  blackCherry: textureLoader.load('/fizzi/labels/cherry.png'),
  lemonLime: textureLoader.load('/fizzi/labels/lemon-lime.png'),
  grape: textureLoader.load('/fizzi/labels/grape.png'),
  strawberryLemonade: textureLoader.load('/fizzi/labels/strawberry.png'),
  watermelon: textureLoader.load('/fizzi/labels/watermelon.png'),
}

Object.values(fizziTextures).forEach((texture) => {
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace
})

const fizziFlavors = [
  { flavor: 'blackCherry', position: [-0.95, 0.25, -0.75], rotation: [0.15, -0.55, -0.35] },
  { flavor: 'lemonLime', position: [0.78, 0.28, -0.4], rotation: [-0.05, 0.5, 0.3] },
  { flavor: 'grape', position: [-0.45, -0.55, -0.15], rotation: [0.08, 0.15, -0.1] },
  { flavor: 'strawberryLemonade', position: [0.42, -0.42, 0.25], rotation: [-0.08, -0.2, 0.22] },
  { flavor: 'watermelon', position: [0.08, 0.52, 0], rotation: [0.12, 0.08, -0.18] },
]

function assignFizziMaterials(model, flavor, white = false) {
  const metalMaterial = white
    ? new THREE.MeshBasicMaterial({ color: 0xffffff })
    : new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 1, color: 0xbbbbbb })
  const labelMaterial = white
    ? new THREE.MeshBasicMaterial({ color: 0xffffff })
    : new THREE.MeshStandardMaterial({
        roughness: 0.15,
        metalness: 0.7,
        map: fizziTextures[flavor],
      })

  model.traverse((child) => {
    if (!child.isMesh) return

    if (Array.isArray(child.material)) {
      child.material = child.material.map((_, index) => index === 1 ? labelMaterial : metalMaterial)
    } else if (child.name === 'cylinder_1') {
      child.material = labelMaterial
    } else {
      child.material = metalMaterial
    }
  })
}

function makeFizziGroup(source, white = false) {
  const group = new THREE.Group()
  fizziFlavors.forEach(({ flavor, position, rotation }) => {
    const can = source.clone(true)
    assignFizziMaterials(can, flavor, white)
    fitModel(can, 1.85)
    can.rotation.set(Math.PI, 0, Math.PI)

    const wrapper = new THREE.Group()
    wrapper.position.set(...position)
    wrapper.rotation.set(...rotation)
    wrapper.add(can)
    group.add(wrapper)
  })
  group.scale.setScalar(1.1)
  group.visible = false
  return group
}

// ============================================
// RENDER LOOP
// ============================================

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  const studio = models.studio
  const studioBreathe = studio.baseScale * (1 + Math.sin(t * 0.8) * 0.06)
  if (studio.white) { studio.white.rotation.y = t * 0.4; studio.white.scale.setScalar(studioBreathe) }
  if (studio.color) { studio.color.rotation.y = t * 0.4; studio.color.scale.setScalar(studioBreathe) }

  const fizzi = models.fizzi
  const fizziBreathe = 1.1 * (1 + Math.sin(t * 0.9) * 0.035)
  if (fizzi.white) {
    fizzi.white.rotation.y = Math.sin(t * 0.35) * 0.18
    fizzi.white.scale.setScalar(fizziBreathe)
  }
  if (fizzi.color) {
    fizzi.color.rotation.y = Math.sin(t * 0.35) * 0.18
    fizzi.color.scale.setScalar(fizziBreathe)
  }

  rendererA.render(sceneA, camera)
  rendererB.render(sceneB, camera)
}
animate()

// ============================================
// SHOW / HIDE
// ============================================

function showBg(project) {
  activeProject = project
  setProjectVisibility(project)
  gsap.killTweensOf([canvasA, canvasB])
  gsap.to(canvasA, { opacity: 1, duration: 0.6, ease: 'power2.out' })
  gsap.to(canvasB, { opacity: project === 'fizzi' ? 0.75 : 0.55, duration: 0.6, ease: 'power2.out' })
}

function hideBg() {
  activeProject = null
  gsap.killTweensOf([canvasA, canvasB])
  gsap.to([canvasA, canvasB], { opacity: 0, duration: 0.4, ease: 'power2.in' })
}

// ============================================
// EVENT DELEGATION
// ============================================

const bar = document.querySelector('.bar')

const detailsOpen = {
  studio: false,
  fizzi: false,
}

// bar.addEventListener('mouseover', (e) => {
//   const pill = e.target.closest('[data-project="studio"], [data-project="fizzi"]')
//   if (pill) showBg(pill.dataset.project)
// })

// bar.addEventListener('mouseout', (e) => {
//   const pill = e.target.closest('[data-project="studio"], [data-project="fizzi"]')
//   if (!pill) return
//   const project = pill.dataset.project
//   if (!pill.contains(e.relatedTarget) && !detailsOpen[project] && activeProject === project) hideBg()
// })

window.addEventListener('studio-details-open', () => {
  detailsOpen.studio = true
  showBg('studio')
})

window.addEventListener('studio-details-close', () => {
  detailsOpen.studio = false
  if (!detailsOpen.fizzi) hideBg()
})

window.addEventListener('fizzi-details-open', () => {
  detailsOpen.fizzi = true
  showBg('fizzi')
})

window.addEventListener('fizzi-details-close', () => {
  detailsOpen.fizzi = false
  if (!detailsOpen.studio) hideBg()
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
