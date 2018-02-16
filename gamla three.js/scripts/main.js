			var container;

			var camera, scene, renderer;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;
			
			var pi = 3.14159265359;

			//for spinner
			var oldPosition;
			var force = 10;
			var ellapsedTime = 0;
			var time;
			var startTime;

			//the choices of spinners
			spinnerOne = new Spinner(0.026, 0.00005, 0.0000024, "textures/red.png", "spinner2.obj");
			spinnerTwo = new Spinner(0.026, 0.00005, 0.0000024, "textures/metal.jpg", "gulbatman.obj");
			
			// scene
			scene = new THREE.Scene();
			var sceneRoot = new THREE.Group();
			var fidgetSpin = new THREE.Group();

			init();
			animate();

			function init() {

				startTime = Date.now();

				// skapar fidgetspinnerinstans 
				spinner = spinnerOne;

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				// Sätter upp kameran 
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.z = 1000;
				
				// light 
				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );

				var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );
				
				// texture
				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};

				var textureLoader = new THREE.TextureLoader( manager );
				var texture = textureLoader.load( spinner.texture );

				// model
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};

				var onError = function ( xhr ) {
				};

				var loader = new THREE.OBJLoader( manager );
				loader.load( spinner.object , function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							child.material.map = texture;

						}

					} );
					
					// Rätar upp fidget 
					object.rotation.x = pi/2;
					
					// lägger till rotation och objekt till scengrafen 
					
					scene.add( sceneRoot );
					sceneRoot.add( fidgetSpin );
					fidgetSpin.add( object );

				}, onProgress, onError );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) / 2;
				mouseY = ( event.clientY - windowHalfY ) / 2;

			}


			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {
				
				time = Date.now();
				ellapsedTime = time - startTime;

				camera.lookAt( scene.position );

				oldPosition = spinner.angularPosition;

				if(force != 0 && ellapsedTime > 200) //200 millisec = 0.2 sec
					force = 0; //after some time, stop applying force

				spinner.spin(force, 0.05); 
				//spinner.spin(10, 0.1); 
				
				fidgetSpin.rotation.z += spinner.angularPosition - oldPosition;
				
				renderer.render( scene, camera );

			}