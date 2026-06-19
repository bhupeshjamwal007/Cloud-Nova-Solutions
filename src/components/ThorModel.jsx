'use client';

import React, { useRef, useMemo, useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import gsap from 'gsap'

export function ThorModel({ isSubmitted, ...props }) {
  const outerGroup = useRef()
  const innerGroup = useRef()
  // The optimized GLTF now contains all animations
  const { scene, animations } = useGLTF('/models/Thor-optimized.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  
  const { actions } = useAnimations(animations, outerGroup)

  useEffect(() => {
    if (!outerGroup.current || !innerGroup.current || !actions) return;
    
    console.log("AVAILABLE ANIMATIONS:", Object.keys(actions));

    // --- WALKING ENTRANCE SEQUENCE ---
    const tl = gsap.timeline();
    
    // Calculate positions based on screen size so he doesn't walk off-screen on mobile!
    const isMobile = window.innerWidth < 1024;
    const startX = isMobile ? 5 : 10;
    const finalX = isMobile ? 0 : 1.5; // Center him on mobile, place him on the right on desktop

    // 1. Start Walking Animation
    tl.call(() => {
      Object.values(actions).forEach(a => a?.fadeOut(0.5));
      if (actions['Walk_Fwd_C']) actions['Walk_Fwd_C'].reset().fadeIn(0.5).play();
    }, null, 0);

    // 2. Set Initial Position (Off-screen Right)
    gsap.set(outerGroup.current.position, { x: startX, y: -1.5, z: 0 });
    gsap.set(outerGroup.current.rotation, { x: 0, y: -Math.PI / 2, z: 0 }); // Face left
    gsap.set(innerGroup.current.rotation, { x: 0, y: 0, z: 0 }); // Stand perfectly upright

    // 3. Walk towards the final position (takes 4 seconds)
    tl.to(outerGroup.current.position, { x: finalX, duration: 4.0, ease: "power1.out" }, 0);

    // 4. Arrive: Turn forward to face the user
    tl.to(outerGroup.current.rotation, { y: 0, duration: 1.0, ease: "power2.inOut" }, 4.0);

    // 5. Arrive: Play the Hammer Smash Emote!
    tl.call(() => {
      Object.values(actions).forEach(a => a?.fadeOut(0.2));
      if (actions['Emote_10390012010']) actions['Emote_10390012010'].reset().fadeIn(0.2).play();
    }, null, 4.0);

    // 6. Final Hero Pose: Call the Lightning!
    tl.call(() => {
      Object.values(actions).forEach(a => a?.fadeOut(0.5));
      if (actions['103961_ThunderRelease_Loop']) actions['103961_ThunderRelease_Loop'].reset().fadeIn(0.5).play();
      
      // Ignite the WebGL lightning background behind the entire page!
      gsap.to("#lightning-bg", { opacity: 1, duration: 0.5, ease: "power2.in" });
    }, null, 7.0);

    return () => tl.kill();
  }, [actions]);

  // --- FORM SUBMITTED SUCCESS SEQUENCE ---
  useEffect(() => {
    if (!isSubmitted || !actions) return;

    // 1. Turn off the background lightning
    gsap.to("#lightning-bg", { opacity: 0, duration: 0.5 });

    // 2. Play the Thumbs Up animation!
    Object.values(actions).forEach(a => a?.fadeOut(0.5));
    if (actions['Like_Personality']) actions['Like_Personality'].reset().fadeIn(0.5).play();

    // 3. After 3.5 seconds, go back into the epic lightning pose
    const timer = setTimeout(() => {
      Object.values(actions).forEach(a => a?.fadeOut(0.5));
      if (actions['103961_ThunderRelease_Loop']) actions['103961_ThunderRelease_Loop'].reset().fadeIn(0.5).play();
      
      // Reignite the lightning!
      gsap.to("#lightning-bg", { opacity: 1, duration: 1.0, ease: "power2.in" });
    }, 3500);

    return () => clearTimeout(timer);
  }, [isSubmitted, actions]);

  return (
    <group ref={outerGroup} {...props} position={[100, -1.5, 0]} dispose={null}>
      <group ref={innerGroup}>
        <group name="Scene">
          <group name="SK_1039_1039001">
            <primitive object={nodes.root} />
            <group name="SK_1039_1039001001">
              <skinnedMesh name="SK_1039_1039001_1" geometry={nodes.SK_1039_1039001_1.geometry} material={materials['MI_1039001_Eyes_01.001']} skeleton={nodes.SK_1039_1039001_1.skeleton} />
              <skinnedMesh name="SK_1039_1039001_2" geometry={nodes.SK_1039_1039001_2.geometry} material={materials['MI_1039001_Tooth.001']} skeleton={nodes.SK_1039_1039001_2.skeleton} />
              <skinnedMesh name="SK_1039_1039001_3" geometry={nodes.SK_1039_1039001_3.geometry} material={materials['MI_1039001_Hammer_Weapon_01.001']} skeleton={nodes.SK_1039_1039001_3.skeleton} />
              <skinnedMesh name="SK_1039_1039001_4" geometry={nodes.SK_1039_1039001_4.geometry} material={materials['MI_1039001_Head.001']} skeleton={nodes.SK_1039_1039001_4.skeleton} />
              <skinnedMesh name="SK_1039_1039001_5" geometry={nodes.SK_1039_1039001_5.geometry} material={materials['MI_1039001_Hair_01.001']} skeleton={nodes.SK_1039_1039001_5.skeleton} />
              <skinnedMesh name="SK_1039_1039001_6" geometry={nodes.SK_1039_1039001_6.geometry} material={materials['MI_1039001_Body.001']} skeleton={nodes.SK_1039_1039001_6.skeleton} />
              <skinnedMesh name="SK_1039_1039001_7" geometry={nodes.SK_1039_1039001_7.geometry} material={materials['MI_1039001_Equip_01.001']} skeleton={nodes.SK_1039_1039001_7.skeleton} />
              <skinnedMesh name="SK_1039_1039001_8" geometry={nodes.SK_1039_1039001_8.geometry} material={materials['MI_1039001_Equip_02.001']} skeleton={nodes.SK_1039_1039001_8.skeleton} />
              <skinnedMesh name="SK_1039_1039001_9" geometry={nodes.SK_1039_1039001_9.geometry} material={materials['MI_1039001_Hair_04.001']} skeleton={nodes.SK_1039_1039001_9.skeleton} />
              <skinnedMesh name="SK_1039_1039001_10" geometry={nodes.SK_1039_1039001_10.geometry} material={materials['MI_1039001_Hair_03.001']} skeleton={nodes.SK_1039_1039001_10.skeleton} />
              <skinnedMesh name="SK_1039_1039001_11" geometry={nodes.SK_1039_1039001_11.geometry} material={materials['MI_1039001_Eyes_02.001']} skeleton={nodes.SK_1039_1039001_11.skeleton} />
              <skinnedMesh name="SK_1039_1039001_12" geometry={nodes.SK_1039_1039001_12.geometry} material={materials['MI_1039001_Hair_02.001']} skeleton={nodes.SK_1039_1039001_12.skeleton} />
              <skinnedMesh name="SK_1039_1039001_13" geometry={nodes.SK_1039_1039001_13.geometry} material={materials['MI_1039001_Hammer_Weapon_01.001']} skeleton={nodes.SK_1039_1039001_13.skeleton} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Thor-optimized.glb')
