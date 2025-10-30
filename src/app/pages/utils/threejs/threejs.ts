import {
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PokemonDetail } from '../../../models/pokemon-detail';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.html',
  styleUrl: './threejs.css',
  imports: [],
})
export class Threejs {
  @ViewChild('webgl', { static: true }) public canvas!: ElementRef<HTMLCanvasElement>;

  private pokemonRecived!: PokemonDetail;

  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private sizes = { w: window.innerWidth, h: 320 };
  constructor(@Inject(DOCUMENT) public document: Document) {}
  @Input()
  public set pokeSet(v: PokemonDetail | undefined) {
    if (v) {
      this.pokemonRecived = v;
      this.initThree();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (!this.document.fullscreenElement) {
      this.resize();
      return;
    }
    this.resize(window.innerHeight);
  }

  resize(h: number = 320) {
    if (this.pokemonRecived) {
      this.sizes = { w: window.innerWidth, h: h };
      this.camera.aspect = this.sizes.w / this.sizes.h;
      this.camera.updateProjectionMatrix();
  
      this.renderer.setSize(this.sizes.w, this.sizes.h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      return;
    }
  }

  private initThree(): void {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.w / this.sizes.h, 0.1, 100);
    this.camera.position.z = 20;
    this.scene.add(this.camera);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      antialias: true,
    });
    this.renderer.setSize(this.sizes.w, this.sizes.h);

    //Texture
    const textureLoader = new THREE.TextureLoader();
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('img/qwantani_moon_noon_puresky_1k.hdr', (texture) => {
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      this.scene.background = envMap;
      this.scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();

      const imgFront = textureLoader.load(this.pokemonRecived.sprites.front_default);
      const imgBack = textureLoader.load(this.pokemonRecived.sprites.back_default);

      const geometry = new THREE.CircleGeometry(5, 32);
      const materialFront = new THREE.MeshStandardMaterial({
        map: imgFront,
        transparent: true,
        envMap: envMap,
        metalness: 0.5,
        roughness: 0.2,
        side: THREE.FrontSide,
      });

      const materialBack = new THREE.MeshStandardMaterial({
        map: imgBack,
        envMap: envMap,
        metalness: 0.5,
        roughness: 0.2,
        side: THREE.BackSide,
        transparent: true,
      });
      const circleFront = new THREE.Mesh(geometry, materialFront);
      const circleBack = new THREE.Mesh(geometry, materialBack);
      this.scene.add(circleFront, circleBack);

      const ringGeometry = new THREE.RingGeometry(5, 5.2, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: '#FFD700',
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      this.scene.add(ring);
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas.nativeElement);
    this.controls.enableDamping = true;

    // Start animation
    this.animate();
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
