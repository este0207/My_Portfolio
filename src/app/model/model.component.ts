import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { ViewStateService } from '../services/view-state.service';
import { Subscription } from 'rxjs';
import { ParticulesComponent } from "../particules/particules.component";


@Component({
  selector: 'app-model',
  standalone: true,
  imports: [ParticulesComponent],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private mixer!: THREE.AnimationMixer;
  private clock: THREE.Clock = new THREE.Clock();
  private model!: THREE.Group;
  private mirror!: Reflector;

  private originalCameraPosition = new THREE.Vector3(0, 2, 50);
  private zoomedCameraPosition = new THREE.Vector3(0, 0, 2);
  private contactPosition = new THREE.Vector3(0, -100, 50);
  private subscription: Subscription;
  private zoomSubscription: Subscription;
  private contactSubscription: Subscription;
  private originalScale = new THREE.Vector3(0.5, 0.5, 0.5);
  private headOnlyScale = new THREE.Vector3(3, 3, 3);
  private originalPosition = new THREE.Vector3(0, -25, 0);
  private headOnlyPosition = new THREE.Vector3(0, -250, 40);

  // Variables pour gérer les animations en cours
  private currentAnimation: string | null = null;
  private animationFrameId: number | null = null;

  constructor(private viewStateService: ViewStateService) {
    this.subscription = this.viewStateService.isHeadOnlyView$.subscribe(isHeadOnly => {
      if (this.model) {
        this.stopCurrentAnimation();
        if (isHeadOnly) {
          this.animateScaleChange(true);
        } else {
          this.resetToDefaultPosition();
        }
      }
    });

    this.zoomSubscription = this.viewStateService.isZoomedView$.subscribe(isZoomed => {
      if (this.camera) {
        this.stopCurrentAnimation();
        this.animateCameraZoom(isZoomed);
      }
    });

    this.contactSubscription = this.viewStateService.isContactView$.subscribe(isContact => {
      if (this.model) {
        this.stopCurrentAnimation();
        if (isContact) {
          this.animateContactView(true);
        } else {
          this.resetToDefaultPosition();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.initThree();
    this.loadModel();
    this.animate();
  }

  private stopCurrentAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.currentAnimation = null;
  }

  private initThree() {
    // Création de la scène
    this.scene = new THREE.Scene();
    this.scene.background = null;

    // Création du miroir
    const mirrorGeometry = new THREE.PlaneGeometry(100, 100);
    this.mirror = new Reflector(mirrorGeometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0x777777
    });
    this.mirror.rotation.x = -Math.PI / 2;
    this.mirror.position.y = -30;
    
    // Configuration de la transparence
    const mirrorMaterial = this.mirror.material as THREE.MeshBasicMaterial;
    mirrorMaterial.opacity = 100;
    mirrorMaterial.transparent = true;
    
    this.scene.add(this.mirror);

    // Ajout de lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalBlueLight = new THREE.DirectionalLight( 0x0e8bf4 , 4);
    directionalBlueLight.position.set(5, 50, 5);
    this.scene.add(directionalBlueLight);

    const directionalWhiteLight = new THREE.DirectionalLight( 0xfcf9c4  , 4);
    directionalWhiteLight.position.set(5, -50, 5);
    this.scene.add(directionalWhiteLight);

    // Configuration de la caméra
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 50);

    // Configuration du renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;

    // Ajout des contrôles OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
    this.controls.enableRotate = true;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private loadModel() {
    const loader = new GLTFLoader();
    const modelPath = '/model/figure.glb';

    console.log('Début du chargement du modèle...');
    loader.load(
      modelPath,
      (gltf: GLTF) => {
        console.log('Modèle chargé avec succès');
        const model = gltf.scene;
        this.model = model;
        
        // Centrer le modèle
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -25, 0);
        // model.rotation.y =+ 1;
        
        console.log('Modèle ajouté à la scène');
        this.scene.add(model);

        if (gltf.animations.length) {
          this.mixer = new THREE.AnimationMixer(model);
          const action = this.mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      (progress: ProgressEvent) => {
        console.log('Chargement en cours:', (progress.loaded / progress.total * 100) + '%');
      },
      (error: unknown) => {
        console.error('Erreur lors du chargement du modèle:', error);
      }
    );
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Rotation du modèle
    if (this.model) {
      this.model.rotation.y += 0.005;
    } else {
      console.log('Modèle non trouvé dans animate()');
    }

    // Mise à jour des animations
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }

    // Mise à jour des contrôles
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  private animateScaleChange(isHeadOnly: boolean) {
    if (this.currentAnimation === 'scale') return;
    
    this.currentAnimation = 'scale';
    const targetScale = isHeadOnly ? this.headOnlyScale : this.originalScale;
    const targetPosition = isHeadOnly ? this.headOnlyPosition : this.originalPosition;
    const duration = 1000; // 1 seconde
    const startTime = Date.now();
    const startScale = this.model.scale.clone();
    const startPosition = this.model.position.clone();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour une animation plus fluide
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.model.scale.lerpVectors(startScale, targetScale, easeProgress);
      this.model.position.lerpVectors(startPosition, targetPosition, easeProgress);
      
      // Réactiver la rotation après l'animation
      if (progress >= 1) {
        this.controls.enableRotate = true;
        this.currentAnimation = null;
        this.animationFrameId = null;
      } else {
        this.controls.enableRotate = false;
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private animateCameraZoom(isZoomed: boolean): void {
    if (this.currentAnimation === 'camera') return;
    
    this.currentAnimation = 'camera';
    const targetPosition = isZoomed ? this.zoomedCameraPosition : this.originalCameraPosition;
    const duration = 800; // Réduit à 800ms pour une transition plus rapide
    const startTime = Date.now();
    const startPosition = this.camera.position.clone();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour une animation plus fluide
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
      this.camera.lookAt(0, 0, 0);

      if (progress >= 1) {
        this.currentAnimation = null;
        this.animationFrameId = null;
      } else {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private animateContactView(isContact: boolean): void {
    if (this.currentAnimation === 'contact') return;
    
    this.currentAnimation = 'contact';
    const targetPosition = isContact ? this.contactPosition : this.originalPosition;
    const duration = 1000;
    const startTime = Date.now();
    const startPosition = this.model.position.clone();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing pour une animation plus fluide
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.model.position.lerpVectors(startPosition, targetPosition, easeProgress);

      if (progress >= 1) {
        this.currentAnimation = null;
        this.animationFrameId = null;
      } else {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private resetToDefaultPosition() {
    if (this.currentAnimation === 'reset') return;
    
    this.currentAnimation = 'reset';
    const duration = 800;
    const startTime = Date.now();
    const startScale = this.model.scale.clone();
    const startPosition = this.model.position.clone();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.model.scale.lerpVectors(startScale, this.originalScale, easeProgress);
      this.model.position.lerpVectors(startPosition, this.originalPosition, easeProgress);
      
      if (progress >= 1) {
        this.controls.enableRotate = true;
        this.currentAnimation = null;
        this.animationFrameId = null;
      } else {
        this.controls.enableRotate = false;
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  private resetCameraToDefault() {
    if (this.currentAnimation === 'camera-reset') return;
    
    this.currentAnimation = 'camera-reset';
    const duration = 800;
    const startTime = Date.now();
    const startPosition = this.camera.position.clone();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(startPosition, this.originalCameraPosition, easeProgress);
      this.camera.lookAt(0, 0, 0);

      if (progress >= 1) {
        this.currentAnimation = null;
        this.animationFrameId = null;
      } else {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  ngOnDestroy() {
    this.stopCurrentAnimation();
    this.subscription.unsubscribe();
    this.zoomSubscription.unsubscribe();
    this.contactSubscription.unsubscribe();
  }
}
