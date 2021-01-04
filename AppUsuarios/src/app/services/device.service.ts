import { isDesktop, isBrowser } from './../helper/getInfoDevice';
import {
  AfterViewInit,
  ElementRef,
  Injectable,
  ViewChild,
} from '@angular/core';

const n = navigator,
  userAgent = n.userAgent;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  mediaChunks = null;
  cameraStream = null;
  mediaRecorder: MediaRecorder;
  constraints = {};

  constructor() {
    this.constraints = { audio: true, video: { facingMode: 'user' } };
  }

  generateRecordingPreview(video: HTMLVideoElement, link: HTMLLinkElement) {
    let mediaBlob = new Blob(this.mediaChunks, { type: 'video/webm' });
    let mediaBlobUrl = URL.createObjectURL(mediaBlob);

    video.src = mediaBlobUrl;

    link.setAttribute('href', mediaBlobUrl);
    link.setAttribute('download', 'grabacion.webm');
  }

  startCapture(
    video: HTMLVideoElement,
    video_salida: HTMLVideoElement,
    link: HTMLLinkElement
  ) {
    if (isBrowser.chrome() || isBrowser.safari()) {
      console.log('Entro !!! :)');
      if (this.mediaRecorder) return alert('Ya se está grabando');
      n.mediaDevices
        .getUserMedia(this.constraints)
        .then((mediaStream) => {
          if ('srcObject' in video) {
            video.srcObject = mediaStream;
          } else {
            throw new Error('No es posbile obtener la información');
          }

          this.cameraStream = mediaStream;

          video.play();
          this.mediaRecorder = new MediaRecorder(mediaStream);

          //Arreglo de datos
          this.mediaChunks = [];
          this.mediaRecorder.addEventListener('dataavailable', (evento) => {
            this.mediaChunks.push(evento.data);
            if (this.mediaRecorder.state == 'inactive') {
              this.generateRecordingPreview(video_salida, link);
            }
          });

          this.mediaRecorder.start();
        })
        .catch((err) => {
          console.log(err.name + ': ' + err.message);
        });
    } else {
      alert('Solo será válido para Chrome y Safari');
    }
  }

  stopCapture() {
    if (!this.mediaRecorder) return alert('No se está grabando');

    if (this.cameraStream != null) {
      this.cameraStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }

    if (this.mediaRecorder != null) {
      if (this.mediaRecorder.state == 'recording') {
        this.mediaRecorder.stop();
      }
    }
  }

  // isMediaDeviceValid() {
  //   if (n.mediaDevices === undefined) {
  //     n.mediaDevices.getUserMedia = function (constraintObj) {
  //       let getUserMedia = n.mediaDevices.getUserMedia;
  //       if (!getUserMedia) {
  //         return Promise.reject(
  //           new Error('getUserMedia is not implemented in this browser')
  //         );
  //       }
  //       return new Promise(function (resolve, reject) {
  //         getUserMedia.call(n, constraintObj, resolve, reject);
  //       });
  //     };
  //   } else {
  //     n.mediaDevices
  //       .enumerateDevices()
  //       .then((devices) => {
  //         devices.forEach((device) => {
  //           console.log(device.kind.toUpperCase(), device.label);
  //           //, device.deviceId
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err.name, err.message);
  //       });
  //   }
  // }
}
