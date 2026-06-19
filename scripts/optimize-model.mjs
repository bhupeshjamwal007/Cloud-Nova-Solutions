import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { resample, prune, dedup } from '@gltf-transform/functions';
import draco3d from 'draco3d';
import fs from 'fs';

async function optimize() {
  console.log('Starting optimization...');
  
  // Set up I/O
  const io = new NodeIO()
    .registerExtensions([KHRDracoMeshCompression])
    .registerDependencies({
      'draco3d.encoder': await draco3d.createEncoderModule(),
      'draco3d.decoder': await draco3d.createDecoderModule(),
    });

  // Read the massive 84MB file
  console.log('Reading Thor.glb...');
  const document = await io.read('public/models/Thor.glb');

  // 1. Keeping animations for the user's requested animation sequence
  console.log('Keeping animations...');

  // 2. Apply general optimizations (remove unused nodes, dedup, etc.)
  console.log('Pruning and deduplicating...');
  await document.transform(
    prune(),
    dedup()
  );

  // 3. Create Draco extension to compress geometry
  console.log('Applying Draco geometry compression...');
  document.createExtension(KHRDracoMeshCompression)
    .setRequired(true)
    .setEncoderOptions({
      method: KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,
      encodeSpeed: 5,
      decodeSpeed: 5,
    });

  // Write the highly optimized file
  console.log('Writing Thor-optimized.glb...');
  await io.write('public/models/Thor-optimized.glb', document);
  
  const oldSize = fs.statSync('public/models/Thor.glb').size / (1024 * 1024);
  const newSize = fs.statSync('public/models/Thor-optimized.glb').size / (1024 * 1024);
  
  console.log(`Optimization Complete!`);
  console.log(`Original Size: ${oldSize.toFixed(2)} MB`);
  console.log(`Optimized Size: ${newSize.toFixed(2)} MB`);
}

optimize().catch(console.error);
