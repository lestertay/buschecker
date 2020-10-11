import * as faceapi from "face-api.js";

// Load models and weights
export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";

  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export async function getFullFaceDescription(blob, inputSize = 512) {
  // tiny_face_detector options
  let scoreThreshold = 0.5;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold,
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors();
  return fullDesc;
}

const maxDescriptorDistance = 0.5;
export async function createMatcher() 
{
  const labeledDescriptors = await loadLabeledImages();
  console.log('after load img', labeledDescriptors);
  return new faceapi.FaceMatcher(labeledDescriptors, maxDescriptorDistance);

}

async function loadLabeledImages()
{
  const labels = ['Darren_Tan', 'Lee_Won_Jenn', 'Looi_Han_Liong', 'Tan_Yi_Heng', 'Garyl_Ng_Xuan', 'Wee_Ren', 'Lester_Tay'] // for WebCam
  return Promise.all(
      labels.map(async (label)=>{
          const descriptions = []
          for(let i=1; i<=4; i++) {
              const img = await faceapi.fetchImage(`http://localhost:3000/labeled_images/${label}/${i}.jpeg`)
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
              descriptions.push(detections.descriptor)
          }
          
          return new faceapi.LabeledFaceDescriptors(label, descriptions.map(d => new Float32Array(d)))
      })
  )
}